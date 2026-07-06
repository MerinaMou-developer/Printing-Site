import { sendQuoteRequestEmail } from "@/lib/email";
import { getFileAttachment, getString } from "@/lib/form-utils";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const fd = await request.formData();

    const name = getString(fd, "name");
    const phone = getString(fd, "phone");

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 }
      );
    }

    const attachment = await getFileAttachment(fd, "file");

    await sendQuoteRequestEmail({
      name,
      phone,
      email: getString(fd, "email"),
      service: getString(fd, "service_slug") || "General inquiry",
      details: getString(fd, "details"),
      attachments: attachment
        ? [{ filename: attachment.filename, content: attachment.content }]
        : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to send quote request.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
