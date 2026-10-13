import { api } from "./api";
import type { CheckoutOrder } from "./types";

type RazorpaySuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayFailure = { error: { description?: string; reason?: string; metadata?: { order_id?: string; payment_id?: string } } };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open(): void;
      on(event: "payment.failed", cb: (r: RazorpayFailure) => void): void;
    };
  }
}

let loader: Promise<void> | null = null;

function loadScript() {
  if (typeof window !== "undefined" && window.Razorpay) return Promise.resolve();
  loader ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => {
      loader = null;
      reject(new Error("Could not load Razorpay. Please check your connection."));
    };
    document.body.appendChild(s);
  });
  return loader;
}

export type PayResult =
  | { status: "success"; teamId: string; teamCode: string | null }
  | { status: "failed"; reason: string; orderId: string; amount: number }
  | { status: "dismissed"; orderId: string; amount: number };

/**
 * Opens Razorpay Checkout for an order created by our server, then verifies the payment server-side.
 * Resolves once the user finishes, fails, or closes the checkout.
 */
export async function payWithRazorpay(order: CheckoutOrder): Promise<PayResult> {
  await loadScript();
  const Razorpay = window.Razorpay!;

  return new Promise<PayResult>((resolve) => {
    let failure: RazorpayFailure["error"] | null = null;

    const rzp = new Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: order.name,
      description: order.description,
      prefill: order.prefill,
      theme: { color: "#00BF62" },
      handler: async (r: RazorpaySuccess) => {
        try {
          const out = await api<{ team: { id: string; teamCode: string | null } }>("/payments/verify", { method: "POST", body: r });
          resolve({ status: "success", teamId: out.team.id, teamCode: out.team.teamCode });
        } catch (e) {
          resolve({ status: "failed", reason: e instanceof Error ? e.message : "Verification failed", orderId: order.orderId, amount: order.amount });
        }
      },
      modal: {
        ondismiss: async () => {
          const reason = failure?.description;
          await api("/payments/failed", {
            method: "POST",
            body: { razorpay_order_id: order.orderId, razorpay_payment_id: failure?.metadata?.payment_id, reason },
          }).catch(() => undefined);
          resolve(
            failure
              ? { status: "failed", reason: reason || "Payment failed", orderId: order.orderId, amount: order.amount }
              : { status: "dismissed", orderId: order.orderId, amount: order.amount },
          );
        },
      },
    });

    // Razorpay keeps the modal open after a failure so the user can retry; we record the last error.
    rzp.on("payment.failed", (r) => {
      failure = r.error;
    });
    rzp.open();
  });
}
