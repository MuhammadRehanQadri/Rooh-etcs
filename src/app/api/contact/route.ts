import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  subject: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";

  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }
  // honeypot triggered → silently accept
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const data = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || "info@etcs.sa";
  const from = process.env.CONTACT_FROM_EMAIL || "ETCS Inquiry <onboarding@resend.dev>";

  // If Resend isn't configured (dev mode), accept and log so the form still works.
  if (!process.env.RESEND_API_KEY) {
    console.info("[contact] (dev) RESEND_API_KEY not set — would send:", { to, from, data });
    return NextResponse.json({ ok: true, mode: "dev" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `[ETCS website] ${data.subject || data.service || "New inquiry"} — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Company: ${data.company || "—"}`,
        `Service: ${data.service || "—"}`,
        `Subject: ${data.subject || "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
    if (result.error) {
      console.error("[contact] resend returned error:", JSON.stringify(result.error));
      return NextResponse.json(
        { ok: false, error: "resend_rejected", detail: result.error },
        { status: 502 }
      );
    }
    console.log("[contact] resend ok id=", result.data?.id, "to=", to, "from=", from);
    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error("[contact] resend threw:", err);
    return NextResponse.json(
      { ok: false, error: "send_failed", message: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    );
  }
}
