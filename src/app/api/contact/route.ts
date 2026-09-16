import { NextResponse } from "next/server";
import { sendViaFormSubmit } from "@/lib/formsubmit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, message } = body;

    // Server-side validation
    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // Phone number validation (digits check: 7 to 15 digits allowed)
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number (digits only)." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Send via FormSubmit service with incoming request headers
    const res = await sendViaFormSubmit({ fullName, email, phone, message }, request.headers);
    const resData = await res.json();

    if (res.ok && (resData.success === "true" || resData.success === true)) {
      return NextResponse.json(
        { success: true, message: "Enquiry submitted successfully!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: resData.message || "FormSubmit error. Please try again." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
