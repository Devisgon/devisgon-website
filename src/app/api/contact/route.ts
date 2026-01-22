import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      projectDetail,
      fileBase64, 
      fileName,   
      fileType,  
    } = body;

    const attachments = fileBase64
      ? [
          {
            filename: fileName || "attachment",
            content: fileBase64,
            type: fileType,
            disposition: "attachment",
          },
        ]
      : undefined;

const response = await resend.emails.send({
      from: process.env.RESEND_DOMAIN!,  
    to: [process.env.RESEND_EMAIL_USER!],        

      subject: "New Contact Form Submission",
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Project Details:</strong></p>
        <p>${projectDetail}</p>
      `,
      attachments,
    });
console.log("Resend Response:", response);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
