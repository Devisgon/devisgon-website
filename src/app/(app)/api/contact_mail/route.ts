import { NextResponse } from "next/server";
import { Resend } from "resend";

import { MAX_INQUIRY_BODY_BYTES, validateInquiry, verifyInquiryChallenge } from "@/lib/inquiry-validation";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanValue(value: unknown, fallback = "Not provided") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function POST(req: Request) {
  try {
   
    const origin = req.headers.get("origin");
    if (origin && origin !== new URL(req.url).origin) {
      return NextResponse.json({ success: false, message: "Invalid request origin." }, { status: 403 });
    }
    if (Number(req.headers.get("content-length")) > MAX_INQUIRY_BODY_BYTES) {
      return NextResponse.json({ success: false, message: "Request is too large." }, { status: 413 });
    }
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody) > MAX_INQUIRY_BODY_BYTES) {
      return NextResponse.json({ success: false, message: "Request is too large." }, { status: 413 });
    }
    let body;
    try { body = JSON.parse(rawBody); } catch {
      return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
    }
    const validationError = validateInquiry(body);
    if (validationError) return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    if (body.website?.trim()) return NextResponse.json({ success: false, message: "Unable to accept this request." }, { status: 400 });
    const challengeSecret = process.env.TURNSTILE_SECRET_KEY;
    if (Boolean(challengeSecret) !== Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)) {
      return NextResponse.json({ success: false, message: "The enquiry form is temporarily unavailable. Please contact us by email." }, { status: 503 });
    }
    if (challengeSecret && !await verifyInquiryChallenge(body.turnstileToken, challengeSecret)) {
      return NextResponse.json({ success: false, message: "Please complete verification and try again." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_DOMAIN || !process.env.RESEND_EMAIL_USER) {
      return NextResponse.json({ success: false, message: "The enquiry form is temporarily unavailable. Please contact us by email." }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "Unavailable";
    // Country is supplied by the visitor. Third-party enrichment must not delay
    // or misidentify an enquiry using the hosting server's public IP address.
    const locationString = "No external location lookup";
    const {
      name, email, phone, company, country, projectType, projectSize, budget, timeline, projectDetail, message,
      sourceType, industryName, serviceName, sourcePage,
      fileBase64, fileName, fileType,
    } = body;

    const attachments = fileBase64
      ? [{ filename: fileName || "attachment", content: fileBase64, type: fileType, disposition: "attachment" }]
      : undefined;

    const inquiryMessage = cleanValue(projectDetail || message);
    const selectedService = cleanValue(serviceName || projectType);
    const selectedIndustry = cleanValue(industryName);
    const sourceLabel = cleanValue(sourceType, "contact");
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(cleanValue(phone));
    const safeCompany = escapeHtml(cleanValue(company));
    const safeCountry = escapeHtml(cleanValue(country));
    const safeService = escapeHtml(selectedService);
    const safeIndustry = escapeHtml(selectedIndustry);
    const safeSourceType = escapeHtml(sourceLabel);
    const safeSourcePage = escapeHtml(cleanValue(sourcePage));
    const safeBudget = escapeHtml(cleanValue(budget));
    const safeTimeline = escapeHtml(cleanValue(timeline));
    const safeProjectType = escapeHtml(cleanValue(projectType));
    const safeProjectSize = escapeHtml(cleanValue(projectSize));
    const safeMessage = escapeHtml(inquiryMessage);
    const safeIp = escapeHtml(ip);
    const safeLocation = escapeHtml(locationString);
    const subjectContext =
      sourceLabel === "industry" && selectedIndustry !== "Not provided"
        ? `Industry Inquiry: ${selectedIndustry}`
        : selectedService !== "Not provided"
          ? `Service Inquiry: ${selectedService}`
          : "New Contact Form Submission";
  
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_DOMAIN!,
      to: [process.env.RESEND_EMAIL_USER!],
      subject: subjectContext,
      replyTo: email,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9fb;">
  
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e1e1e8;">
    
    <div style="background: linear-gradient(135deg, #8145B5 0%, #402060 100%); padding: 40px 20px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">DEVISGON</h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 400;">Project Inquiry Notification</p>
    </div>

    <div style="padding: 40px 35px;">
      <h2 style="color: #1a1a1a; font-size: 20px; margin-top: 0; margin-bottom: 20px; font-weight: 700;">You've got a new lead!</h2>
      <p style="color: #666666; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
        A potential client has reached out through the DEVISGON inquiry form.
      </p>

      <div style="background-color: #fcfaff; border-radius: 12px; padding: 20px; border: 1px solid #f0e6f7;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase;">Client Name</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; font-weight: 500;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Email</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">
              <a href="mailto:${safeEmail}" style="color: #8145B5; text-decoration: none; font-weight: 600;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Phone Number</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Company</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safeCompany}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Country</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safeCountry}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Inquiry Source</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safeSourceType}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Service Name</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safeService}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Industry Name</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safeIndustry}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Source Page</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safeSourcePage}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Project Type / Size</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safeProjectType} / ${safeProjectSize}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Budget / Timeline</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1a1a1a; text-align: right; border-top: 1px solid #ede7f3;">${safeBudget} / ${safeTimeline}</td>
          </tr>
          
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">IP Address</td>
            <td style="padding: 10px 0; font-size: 15px; color: #666; text-align: right; border-top: 1px solid #ede7f3;">${safeIp}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #8145B5; font-weight: 700; text-transform: uppercase; border-top: 1px solid #ede7f3;">Location</td>
            <td style="padding: 10px 0; font-size: 15px; color: #666; text-align: right; border-top: 1px solid #ede7f3;">${safeLocation}</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 30px;">
        <p style="color: #1a1a1a; font-weight: 700; font-size: 14px; margin-bottom: 12px; text-transform: uppercase;">Message:</p>
        <div style="background-color: #ffffff; border: 1.5px dashed #d1c4e9; padding: 20px; border-radius: 8px; color: #444444; line-height: 1.7; font-size: 15px; font-style: italic;">
          "${safeMessage}"
        </div>
      </div>
      
    </div>
  </div>
</body>
</html>
`,
      attachments,
    });
    
    if (error || !data?.id) {
      console.error("Inquiry email provider did not accept the message.");
      return NextResponse.json({ success: false, message: "We could not send your enquiry. Please try again or email info@devisgon.com." }, { status: 502 });
    }
    return NextResponse.json({ success: true, message: "Enquiry accepted" });
  } catch (error) {
    console.error("Inquiry request failed:", error instanceof Error ? error.name : "Unknown error");
    return NextResponse.json({ success: false, message: "We could not send your enquiry. Please try again or email info@devisgon.com." }, { status: 500 });
  }
}
