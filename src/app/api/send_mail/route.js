import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // 1. Parse the FormData directly from the request
    const formData = await req.formData();

    // 2. Extract simple fields
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const projectType = formData.get('projectType');
    const budget = formData.get('budget');
    const timeline = formData.get('timeline');
    const projectDetail = formData.get('projectDetail');

    // 3. Extract the file
    const file = formData.get('/app/contact');

    // 4. Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abdullahshafique319@gmail.com',
        // ⚠️ SECURITY WARNING: Use process.env.GMAIL_APP_PASSWORD here
        pass: "gzoc ubdr xcme ilin",  
      },
    });

    const mailOptions = {
      from: email,
      to: 'abdullahshafique319@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company}
        Project Type: ${projectType}
        Budget: ${budget}
        Timeline: ${timeline}
        Project Detail: ${projectDetail}
      `,
      attachments: [],
    };

    // 5. Convert the file to a Buffer for Nodemailer
    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      mailOptions.attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // 6. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}