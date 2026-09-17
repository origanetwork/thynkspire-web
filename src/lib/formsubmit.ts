export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Professional service helper to send contact enquiries via FormSubmit.co
 * Receiver target email: support@thynkspire.com
 */
export async function sendViaFormSubmit(data: ContactFormData, reqHeaders?: Headers) {
  const targetEmail = process.env.CONTACT_RECEIVER_EMAIL || "support@thynkspire.com";

  const payload = {
    Name: data.fullName,
    Email: data.email,
    Phone: data.phone,
    Message: data.message,
    _subject: `[Thynkspire Contact Form] New Enquiry from ${data.fullName}`,
    _template: "table",
    _captcha: "false",
  };

  // Determine site referer and origin header so FormSubmit recognizes a valid web server request
  const referer = reqHeaders?.get("referer") || reqHeaders?.get("origin") || "http://localhost:3000";
  let origin = "http://localhost:3000";
  try {
    origin = new URL(referer).origin;
  } catch {
    origin = referer;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": reqHeaders?.get("user-agent") || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: referer,
      Origin: origin,
    },
    body: JSON.stringify(payload),
  });

  return response;
}
