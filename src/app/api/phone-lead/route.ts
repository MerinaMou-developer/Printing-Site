import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { name, phone, service, callDuration } = body;

    // Validate required fields
    if (!phone?.trim()) {
      return NextResponse.json({ 
        ok: false, 
        error: "Phone number is required" 
      }, { status: 400 });
    }

    // Send phone call lead notification email
    const template = {
      subject: `Phone Call Lead: ${service || 'General Service'} - ${name || 'Unknown'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Phone Call Lead</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .phone-box { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff; }
            .cta-button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px; }
            .urgent-badge { background: #dc3545; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📞 Phone Call Lead</h1>
              <p>SEHAM ADVERTISING - Dubai</p>
            </div>
            
            <div class="content">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">Incoming Call</h2>
                <span class="urgent-badge">URGENT</span>
              </div>
              
              <div class="phone-box">
                <h3 style="margin-top: 0; color: #0056b3;">📱 New Phone Inquiry</h3>
                <p><strong>Customer:</strong> ${name || 'Unknown'}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service || 'General Service'}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}</p>
                ${callDuration ? `<p><strong>Call Duration:</strong> ${callDuration} seconds</p>` : ''}
              </div>
              
              <p><strong>Action Required:</strong> Call the customer back as soon as possible.</p>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="tel:${phone}" class="cta-button">📞 Call Back Now</a>
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" class="cta-button">💬 WhatsApp</a>
              </div>
              
              <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #ffc107;">
                <p style="margin: 0; color: #856404;"><strong>💡 Tip:</strong> Call back within 5 minutes for best conversion rates!</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Phone Call Lead - SEHAM ADVERTISING

Customer Information:
- Name: ${name || 'Unknown'}
- Phone: ${phone}
- Service: ${service || 'General Service'}
- Time: ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}
${callDuration ? `- Call Duration: ${callDuration} seconds` : ''}

Action Required: Call the customer back as soon as possible.

Call: tel:${phone}
WhatsApp: https://wa.me/${phone.replace(/\D/g, '')}

---
SEHAM ADVERTISING
Professional Printing & Signage Services in Dubai
      `
    };

    await sendEmail({
      to: 'merinamou3@gmail.com', // Fixed: Direct business email
      subject: template.subject,
      html: template.html,
      text: template.text
    });

    console.log(`Phone call lead received from ${phone}${name ? ` (${name})` : ''}`);

    return NextResponse.json({ 
      ok: true, 
      message: "Phone call lead notification sent!" 
    });

  } catch (err: unknown) {
    console.error("Phone call lead error:", err);
    
    const message =
      err instanceof Error
        ? err.message
        : "Failed to send phone call lead notification";

    return NextResponse.json({ 
      ok: false, 
      error: message 
    }, { status: 500 });
  }
}
