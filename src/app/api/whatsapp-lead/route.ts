import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { name, phone, service } = body;

    // Validate required fields
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ 
        ok: false, 
        error: "Name and phone are required" 
      }, { status: 400 });
    }

    // Send WhatsApp lead notification email
    const template = {
      subject: `WhatsApp Lead: ${service || 'General Service'} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>WhatsApp Lead</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .whatsapp-box { background: #dcf8c6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #25D366; }
            .cta-button { display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 WhatsApp Lead</h1>
              <p>PrintPro Dubai - Dubai</p>
            </div>
            
            <div class="content">
              <div class="whatsapp-box">
                <h3 style="margin-top: 0; color: #128C7E;">📱 New WhatsApp Inquiry</h3>
                <p><strong>Customer:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service || 'General Service'}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}</p>
              </div>
              
              <p><strong>Action Required:</strong> Contact the customer via WhatsApp as soon as possible.</p>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" class="cta-button">💬 Contact via WhatsApp</a>
                <a href="tel:${phone}" class="cta-button">📞 Call Customer</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
WhatsApp Lead - PrintPro Dubai

Customer Information:
- Name: ${name}
- Phone: ${phone}
- Service: ${service || 'General Service'}
- Time: ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}

Action Required: Contact the customer via WhatsApp as soon as possible.

WhatsApp: https://wa.me/${phone.replace(/\D/g, '')}
Call: tel:${phone}

---
PrintPro Dubai
Professional Printing & Signage Services in Dubai
      `
    };

    await sendEmail({
      to: 'merinamou3@gmail.com', // Fixed: Direct business email
      subject: template.subject,
      html: template.html,
      text: template.text
    });

    console.log(`WhatsApp lead received from ${name} - ${phone}`);

    return NextResponse.json({ 
      ok: true, 
      message: "WhatsApp lead notification sent!" 
    });

  } catch (err: unknown) {
    console.error("WhatsApp lead error:", err);
    
    const message =
      err instanceof Error
        ? err.message
        : "Failed to send WhatsApp lead notification";

    return NextResponse.json({ 
      ok: false, 
      error: message 
    }, { status: 500 });
  }
}
