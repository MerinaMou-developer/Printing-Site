import { NextResponse } from "next/server";
import { sendQuoteRequestEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const name    = String(fd.get("name") ?? "");
    const phone   = String(fd.get("phone") ?? "");
    const email   = String(fd.get("email") ?? "");
    const service = String(fd.get("service_slug") ?? "");
    const details = String(fd.get("details") ?? "");
    const f       = fd.get("file");

    // Validate required fields
    if (!name.trim()) {
      return NextResponse.json({ 
        ok: false, 
        error: "Name is required" 
      }, { status: 400 });
    }

    if (!phone.trim() && !email.trim()) {
      return NextResponse.json({ 
        ok: false, 
        error: "Phone or email is required" 
      }, { status: 400 });
    }

    // Build attachments safely
    const attachments: Array<{ filename: string; content: Buffer }> = [];
    if (typeof File !== "undefined" && f instanceof File && f.size > 0) {
      // Check file size (max 10MB)
      if (f.size > 10 * 1024 * 1024) {
        return NextResponse.json({ 
          ok: false, 
          error: "File size too large. Maximum 10MB allowed." 
        }, { status: 400 });
      }
      
      const buf = Buffer.from(await f.arrayBuffer());
      attachments.push({ 
        filename: f.name, 
        content: buf 
      });
    }

    // Send email using SMTP
    await sendQuoteRequestEmail({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: service.trim() || "General Service",
      details: details.trim(),
      attachments
    });

    // Log successful submission
    console.log(`Quote request received from ${name} for ${service}`);

    return NextResponse.json({ 
      ok: true, 
      message: "Quote request sent successfully!" 
    });

  } catch (err: unknown) {
    console.error("Quote submission error:", err);
    
    // Log more detailed error information
    if (err instanceof Error) {
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }
    
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err && "message" in err
        ? String((err as { message: unknown }).message)
        : "Failed to send quote request";

    return NextResponse.json({ 
      ok: false, 
      error: message 
    }, { status: 500 });
  }
}
