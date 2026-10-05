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
  if (order.mock) return payWithMockWindow(order);
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

/**
 * TEMPORARY test checkout used while Razorpay keys are not configured (server PAYMENT_MOCK=true).
 * Lets the tester choose success, failure or cancel; the server runs the same confirm / fail logic.
 */
function payWithMockWindow(order: CheckoutOrder): Promise<PayResult> {
  return new Promise<PayResult>((resolve) => {
    const overlay = document.createElement("div");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(2,6,23,0.75);font-family:inherit";
    const rupees = `₹${(order.amount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    const btn = "display:block;width:100%;padding:12px;border-radius:12px;font-weight:600;font-size:14px;cursor:pointer;border:1px solid transparent;margin-top:10px";
    overlay.innerHTML = `
      <div style="width:100%;max-width:380px;border-radius:20px;background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.1);padding:24px;box-shadow:0 20px 60px rgba(0,0,0,0.5)">
        <div style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.04em;color:#fcd34d;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.4);border-radius:999px;padding:3px 10px">TEST MODE · NO REAL PAYMENT</div>
        <h2 style="margin:14px 0 4px;font-size:18px;font-weight:700;color:#fff"></h2>
        <p data-desc style="margin:0;font-size:13px;color:#94a3b8"></p>
        <p style="margin:16px 0 4px;font-size:28px;font-weight:700;color:#fff">${rupees}</p>
        <p style="margin:0 0 14px;font-size:12px;color:#64748b;word-break:break-all">Order ${order.orderId}</p>
        <label style="display:block;font-size:12px;color:#94a3b8;margin-bottom:6px">Payment method</label>
        <select data-method style="width:100%;padding:10px;border-radius:10px;background:#1e293b;color:#fff;border:1px solid rgba(255,255,255,0.15)">
          <option value="upi">UPI</option><option value="card">Card</option><option value="netbanking">Net banking</option><option value="wallet">Wallet</option>
        </select>
        <p data-error style="display:none;margin:12px 0 0;font-size:13px;color:#fca5a5"></p>
        <button data-act="success" style="${btn};margin-top:18px;background:#00BF62;color:#04130b">Simulate successful payment</button>
        <button data-act="failed" style="${btn};background:rgba(248,113,113,0.12);color:#fca5a5;border-color:rgba(248,113,113,0.4)">Simulate failed payment</button>
        <button data-act="cancel" style="${btn};background:transparent;color:#cbd5e1;border-color:rgba(255,255,255,0.15)">Cancel (close checkout)</button>
      </div>`;
    overlay.querySelector("h2")!.textContent = order.name;
    overlay.querySelector("[data-desc]")!.textContent = order.description;
    document.body.appendChild(overlay);

    const errorEl = overlay.querySelector<HTMLElement>("[data-error]")!;
    const buttons = overlay.querySelectorAll<HTMLButtonElement>("button");
    const finish = (r: PayResult) => {
      overlay.remove();
      resolve(r);
    };

    buttons.forEach((b) =>
      b.addEventListener("click", async () => {
        const act = b.dataset.act;
        const method = overlay.querySelector<HTMLSelectElement>("[data-method]")!.value;
        buttons.forEach((x) => (x.disabled = true));
        errorEl.style.display = "none";
        try {
          if (act === "cancel") {
            await api("/payments/failed", { method: "POST", body: { razorpay_order_id: order.orderId, reason: "Checkout closed before payment" } }).catch(() => undefined);
            return finish({ status: "dismissed", orderId: order.orderId, amount: order.amount });
          }
          const out = await api<{ outcome: string; reason?: string; team?: { id: string; teamCode: string | null } }>("/payments/mock", {
            method: "POST",
            body: { orderId: order.orderId, outcome: act, method },
          });
          if (act === "failed" || !out.team) {
            return finish({ status: "failed", reason: out.reason ?? "Payment failed", orderId: order.orderId, amount: order.amount });
          }
          finish({ status: "success", teamId: out.team.id, teamCode: out.team.teamCode });
        } catch (e) {
          errorEl.textContent = e instanceof Error ? e.message : "Something went wrong";
          errorEl.style.display = "block";
          buttons.forEach((x) => (x.disabled = false));
        }
      }),
    );
  });
}
