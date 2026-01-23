// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const RESEND_API_KEY = getEnvVar("RESEND_API_KEY");
const RESEND_FROM = getEnvVar("RESEND_FROM");
const RESEND_TO = getEnvVar("RESEND_TO");

const resend = new Resend(RESEND_API_KEY);

type ContactRequestBody = {
  name: string;
  email: string;
  message: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as Partial<ContactRequestBody>;
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          ok: false,
          message: "Name, email, and message are all required.",
        },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO,
      subject: `New Contact from ${name}`,
      text: `
New contact message from your portfolio site:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to send email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Email sent successfully.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        ok: false,
        message: "Unexpected error while sending message.",
      },
      { status: 500 }
    );
  }
}

export function GET(): NextResponse {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
