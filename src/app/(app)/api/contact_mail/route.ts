import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function isValidEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: unknown) {
  return typeof value === "string" && /^\+?[0-9\s().-]{7,20}$/.test(value.trim());
}

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
   
    let ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip");
    let locationString = "Location Unavailable";

    if (!ip || ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168")) {
      try {
        const ipRes = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipRes.json();
        ip = ipData.ip;
      } catch (e) {
        console.error("Failed to fetch public IP:", e);
        ip = "Unknown";
      }
    }

    if (ip && ip !== "Unknown") {
      try {
        const geoRes = await fetch(`https://ipwho.is/${ip}`);
        const geo = await geoRes.json();
        
        if (geo.success) {
          locationString = `${geo.city || "Unknown City"}, ${geo.country || "Unknown Country"}`;
        } else {
          console.warn("Geo lookup failed:", geo.message);
        }
      } catch (e) {
        console.error("Geo fetch error:", e);
      }
    }
    const body = await req.json();
    const {
      name, email, phone, company, country, projectType, budget, timeline, projectDetail, message,
      sourceType, industryName, serviceName, sourcePage,
      fileBase64, fileName, fileType,
    } = body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !isValidEmail(email) ||
      !isValidPhone(phone)
    ) {
      return NextResponse.json(
        { success: false, message: "Name, email, and phone number are required." },
        { status: 400 },
      );
    }

    const attachments = fileBase64
      ? [{ filename: fileName || "attachment", content: fileBase64, type: fileType, disposition: "attachment" }]
      : undefined;

    const inquiryMessage = cleanValue(projectDetail || message);
    const selectedService = cleanValue(serviceName || projectType);
    const selectedIndustry = cleanValue(industryName);
    const sourceLabel = cleanValue(sourceType, "contact");
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCompany = escapeHtml(cleanValue(company));
    const safeCountry = escapeHtml(cleanValue(country));
    const safeService = escapeHtml(selectedService);
    const safeIndustry = escapeHtml(selectedIndustry);
    const safeSourceType = escapeHtml(sourceLabel);
    const safeSourcePage = escapeHtml(cleanValue(sourcePage));
    const safeBudget = escapeHtml(cleanValue(budget));
    const safeTimeline = escapeHtml(cleanValue(timeline));
    const safeMessage = escapeHtml(inquiryMessage);
    const safeIp = escapeHtml(ip);
    const safeLocation = escapeHtml(locationString);
    const subjectContext =
      sourceLabel === "industry" && selectedIndustry !== "Not provided"
        ? `Industry Inquiry: ${selectedIndustry}`
        : selectedService !== "Not provided"
          ? `Service Inquiry: ${selectedService}`
          : "New Contact Form Submission";
  
    await resend.emails.send({
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
    
    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
