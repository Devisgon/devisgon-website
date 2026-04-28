import type { Payload } from "payload";
import { Resend } from "resend";

type NewsletterCampaign = {
  subject: string;
  title: string;
  message: string;
  ctaText?: string;
  ctaUrl?: string;
};

type SubscriberDoc = {
  email: string;
  isActive?: boolean;
};

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_DOMAIN;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

async function getActiveSubscriberEmails(payload: Payload) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const result = (await (payload as any).find({
    collection: "newsletter-subscribers",
    depth: 0,
    limit: 10000,
    pagination: false,
    overrideAccess: true,
    where: {
      isActive: {
        equals: true,
      },
    },
  })) as { docs: SubscriberDoc[] };

  return Array.from(
    new Set(
      result.docs
        .map((doc) => doc.email?.trim().toLowerCase())
        .filter((email): email is string => Boolean(email)),
    ),
  );
}

function campaignHtml({
  title,
  message,
  ctaText,
  ctaUrl,
}: Omit<NewsletterCampaign, "subject">) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f7f7fb;">
  <div style="max-width:620px;margin:30px auto;background:#fff;border:1px solid #e8e8f0;border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#8145B5 0%,#402060 100%);padding:28px 24px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:26px;letter-spacing:.3px;">DEVISGON</h1>
    </div>
    <div style="padding:28px 26px;">
      <h2 style="margin:0 0 14px;color:#1a1a1a;font-size:22px;">${title}</h2>
      <p style="margin:0 0 22px;color:#454545;font-size:15px;line-height:1.7;">${message}</p>
      ${
        ctaText && ctaUrl
          ? `<a href="${ctaUrl}" style="display:inline-block;background:#8145B5;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700;font-size:14px;">${ctaText}</a>`
          : ""
      }
      <p style="margin:26px 0 0;color:#8d8d8d;font-size:12px;">You are receiving this because you subscribed to Devisgon updates.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendNewsletterCampaign(
  payload: Payload,
  campaign: NewsletterCampaign,
) {
  if (!resend || !fromAddress) {
    console.warn(
      "[newsletter] Skipping send because RESEND_API_KEY or RESEND_DOMAIN is missing.",
    );
    return { sent: 0, skipped: true };
  }

  const recipients = await getActiveSubscriberEmails(payload);
  if (recipients.length === 0) {
    return { sent: 0, skipped: false };
  }

  const html = campaignHtml(campaign);
  let sent = 0;

  for (const email of recipients) {
    try {
      await resend.emails.send({
        from: fromAddress,
        to: [email],
        subject: campaign.subject,
        html,
      });
      sent += 1;
    } catch (error) {
      console.error(`[newsletter] Failed to send to ${email}`, error);
    }
  }

  return { sent, skipped: false };
}
