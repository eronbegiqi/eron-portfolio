import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function escape(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, project, message } = body as {
    name: string;
    email: string;
    project: string;
    message: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "eronbegiqi8@gmail.com",
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8" /></head>
          <body style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111;">
            <div style="border-left:3px solid #F59E0B;padding-left:20px;margin-bottom:32px;">
              <p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.1em;">New portfolio message</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;">${escape(name)}</h1>
            </div>

            <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.08em;width:110px;">From</td>
                <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-size:14px;"><a href="mailto:${escape(email)}" style="color:#F59E0B;">${escape(email)}</a></td>
              </tr>
              ${project ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Project</td>
                <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-size:14px;">${escape(project)}</td>
              </tr>` : ""}
            </table>

            <div style="background:#fafafa;border:1px solid #e8e8e8;border-radius:8px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0;font-size:14px;line-height:1.75;color:#333;">${escape(message)}</p>
            </div>

            <p style="margin:0;font-size:12px;color:#bbb;">
              Reply directly to this email to respond to ${escape(name)}.
            </p>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
