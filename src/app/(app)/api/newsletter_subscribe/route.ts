import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_DOMAIN;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const emailRaw = body?.email;

    if (typeof emailRaw !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 },
      );
    }

    const email = emailRaw.trim().toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email." },
        { status: 400 },
      );
    }

    const payload = await getPayload({ config });
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const existing = (await (payload as any).find({
      collection: "newsletter-subscribers",
      where: { email: { equals: email } },
      depth: 0,
      limit: 1,
      overrideAccess: true,
    })) as { docs: Array<{ id: string; isActive?: boolean }> };

    if (existing.docs.length > 0) {
      const subscriber = existing.docs[0];
      if (!subscriber.isActive) {
        await (payload as any).update({
          collection: "newsletter-subscribers",
          id: subscriber.id,
          data: { isActive: true },
          overrideAccess: true,
        });
      }

      return NextResponse.json({
        success: true,
        alreadySubscribed: true,
        message: "You are already subscribed.",
      });
    }

    await (payload as any).create({
      collection: "newsletter-subscribers",
      data: {
        email,
        isActive: true,
      },
      overrideAccess: true,
    });

    if (resend && fromAddress) {
      await resend.emails.send({
        from: fromAddress,
        to: [email],
        subject: "Welcome to Devisgon Newsletter",
        html: `
<div style="font-family:Arial,sans-serif;max-width:620px;margin:20px auto;padding:24px;border:1px solid #ececf4;border-radius:14px;">
  <h2 style="margin:0 0 12px;color:#402060;">Thanks for subscribing!</h2>
  <p style="margin:0 0 14px;color:#333;line-height:1.6;">
    You will now receive updates about new blogs, job/internship openings, and important website updates from Devisgon.
  </p>
  <a href="https://www.devisgon.com" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#8145B5;color:#fff;text-decoration:none;font-weight:600;">Visit Website</a>
</div>`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully.",
    });
  } catch (error) {
    console.error("[newsletter_subscribe] error", error);
    return NextResponse.json(
      { success: false, message: "Subscription failed." },
      { status: 500 },
    );
  }
}
