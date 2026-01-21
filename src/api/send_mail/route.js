import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const projectType = formData.get('projectType');
    const budget = formData.get('budget');
    const timeline = formData.get('timeline');
    const projectDetail = formData.get('projectDetail');

    const file = formData.get('file');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
       
      },
    });

    const mailOptions = {
      from: email,
      to: 'dudeking1432@gmail.com',
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

    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      mailOptions.attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}