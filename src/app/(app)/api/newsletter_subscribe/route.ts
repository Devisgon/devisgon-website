import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_DOMAIN;
const adminInbox = process.env.RESEND_EMAIL_USER;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const isLocalDev = process.env.NODE_ENV !== "production";
const devRedirectToAdmin =
  process.env.NEWSLETTER_DEV_REDIRECT_TO_ADMIN === "true";

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
      const intendedRecipient = email;
      const recipient =
        isLocalDev && devRedirectToAdmin && adminInbox
          ? adminInbox
          : intendedRecipient;

      const response = await resend.emails.send({
        from: fromAddress,
        to: [recipient],
        subject:
          recipient === intendedRecipient
            ? "Welcome to Devisgon Newsletter"
            : `DEV MODE: Welcome email for ${intendedRecipient}`,
        html: `
<div style="background-color: #ffffff; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 480px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 16px; text-align: center; padding: 40px 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
    
    <h2 style="margin: 0 0 12px; color: #1a1a1a; font-size: 22px; font-weight: 600;">Thanks for subscribing!</h2>
    
    <p style="margin: 0 0 24px; color: #52525b; font-size: 15px; line-height: 1.6;">
      You will now receive our latest newsletter about our website updates.
    </p>

   

    ${recipient !== intendedRecipient ? `
      <p style="margin-top: 25px; font-size: 12px; color: #a1a1aa; font-style: italic;">
        Dev redirect: ${intendedRecipient}
      </p>
    ` : ""}
  </div>
</div>
`
      });

      if (response?.error) {
        console.error(
          "[newsletter_subscribe] Resend rejected welcome email",
          response.error,
        );
      }
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
