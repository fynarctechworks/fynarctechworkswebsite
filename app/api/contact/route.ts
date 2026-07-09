import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

// Validate at the boundary. Honeypot field `website` must stay empty (bots fill it).
const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("A valid email is required").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(4000),
  // Honeypot — accept any string; the drop happens in the handler so a filled
  // value returns a fake success instead of a validation error.
  website: z.string().max(200).optional(),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  const { website, ...data } = parsed.data;
  // Honeypot tripped → pretend success, drop silently.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact form: missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return NextResponse.json(
      { error: "Email service is not configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New contact enquiry from the FYN ARC Techworks website</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ""}
    ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `New enquiry from ${data.name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
