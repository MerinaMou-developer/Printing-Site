import nodemailer from 'nodemailer';
import { createWhatsAppLink, createPhoneLink, formatPhoneNumber } from './whatsapp';

// Site configuration - you can move this to a separate config file
const SITE_CONFIG = {
  brand: "PrintPro Dubai",
  email: "alarqauae@gmail.com",
  phone: "+971569324947",
  whatsapp: "+971569324947",
  address: "Dubai, U.A.E."
};

// SMTP Configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'merinamou3@gmail.com',
      pass: process.env.SMTP_PASS || 'kjwyawwlkxbzavsp',
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Email Templates
export const emailTemplates = {
  // WhatsApp notification template
  whatsappNotification: (data: {
    name: string;
    phone: string;
    service: string;
  }) => ({
    subject: `WhatsApp Lead: ${data.service} - ${data.name}`,
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
              <p><strong>Customer:</strong> ${data.name}</p>
              <p><strong>Phone:</strong> <a href="https://wa.me/${data.phone.replace(/\D/g, '')}">${data.phone}</a></p>
              <p><strong>Service:</strong> ${data.service}</p>
            </div>
            
            <p><strong>Action Required:</strong> Contact the customer via WhatsApp as soon as possible.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Phone call notification template
  phoneCallNotification: (data: {
    name: string;
    phone: string;
    service: string;
  }) => ({
    subject: `Phone Call Lead: ${data.service} - ${data.name}`,
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📞 Phone Call Lead</h1>
            <p>PrintPro Dubai - Dubai</p>
          </div>
          
          <div class="content">
            <div class="phone-box">
              <h3 style="margin-top: 0; color: #0056b3;">📱 New Phone Inquiry</h3>
              <p><strong>Customer:</strong> ${data.name}</p>
              <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
              <p><strong>Service:</strong> ${data.service}</p>
            </div>
            
            <p><strong>Action Required:</strong> Call the customer back as soon as possible.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),
  quoteRequest: (data: {
    name: string;
    phone: string;
    email: string;
    service: string;
    details: string;
    companyName?: string;
  }) => ({
    subject: `New Quote Request: ${data.service || 'General Service'} - ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Quote Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .info-row { display: flex; margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 5px; }
          .info-label { font-weight: bold; color: #1e40af; min-width: 120px; }
          .info-value { flex: 1; }
          .details-box { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
          .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px; }
          .priority-badge { background: #fbbf24; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Quote Request</h1>
            <p>PrintPro Dubai - Dubai</p>
          </div>
          
          <div class="content">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">Customer Information</h2>
              <span class="priority-badge">HIGH PRIORITY</span>
            </div>
            
            <div class="info-row">
              <div class="info-label">👤 Name:</div>
              <div class="info-value">${data.name || 'Not provided'}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">📞 Phone:</div>
              <div class="info-value">${data.phone || 'Not provided'}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">📧 Email:</div>
              <div class="info-value">${data.email || 'Not provided'}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">🛠️ Service:</div>
              <div class="info-value">${data.service || 'General Service'}</div>
            </div>
            
            ${data.details ? `
            <div class="details-box">
              <h3 style="margin-top: 0; color: #1e40af;">📝 Project Details:</h3>
              <p style="white-space: pre-wrap;">${data.details}</p>
            </div>
            ` : ''}
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="tel:${data.phone}" class="cta-button">📞 Call Customer</a>
              <a href="mailto:${data.email}" class="cta-button">📧 Email Customer</a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>PrintPro Dubai</strong></p>
            <p>Professional Printing & Signage Services in Dubai</p>
            <p>This email was sent from your website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Quote Request - PrintPro Dubai

Customer Information:
- Name: ${data.name || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}
- Email: ${data.email || 'Not provided'}
- Service: ${data.service || 'General Service'}

${data.details ? `Project Details:\n${data.details}\n` : ''}

Please contact the customer as soon as possible.

---
PrintPro Dubai
Professional Printing & Signage Services in Dubai
    `
  }),

  customerConfirmation: (data: {
    name: string;
    email: string;
    service: string;
  }) => ({
    subject: `Thank you for your quote request - PrintPro Dubai`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - PrintPro Dubai</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .highlight-box { background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🙏 Thank You!</h1>
            <p>PrintPro Dubai - Dubai</p>
          </div>
          
          <div class="content">
            <h2>Hello ${data.name},</h2>
            
            <p>Thank you for your interest in our <strong>${data.service}</strong> services!</p>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0;">✅ Your request has been received</h3>
              <p>Our team will review your requirements and get back to you within <strong>2-4 hours</strong> during business hours.</p>
            </div>
            
            <h3>What happens next?</h3>
            <ul>
              <li>📋 We'll review your project details</li>
              <li>💰 Prepare a detailed quote for you</li>
              <li>📞 Contact you via phone or WhatsApp</li>
              <li>🎨 Provide design consultation if needed</li>
            </ul>
            
            <p><strong>Need immediate assistance?</strong></p>
            <p>Call us at: <a href="${createPhoneLink(SITE_CONFIG.whatsapp)}">${formatPhoneNumber(SITE_CONFIG.phone)}</a></p>
            <p>WhatsApp: <a href="${createWhatsAppLink(SITE_CONFIG.whatsapp)}">${formatPhoneNumber(SITE_CONFIG.phone)}</a></p>
          </div>
          
          <div class="footer">
            <p><strong>PrintPro Dubai</strong></p>
            <p>Professional Printing & Signage Services in Dubai</p>
            <p>📧 ${SITE_CONFIG.email} | 📞 ${formatPhoneNumber(SITE_CONFIG.phone)}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Thank you for your quote request - PrintPro Dubai

Hello ${data.name},

Thank you for your interest in our ${data.service} services!

Your request has been received and our team will review your requirements and get back to you within 2-4 hours during business hours.

What happens next?
- We'll review your project details
- Prepare a detailed quote for you
- Contact you via phone or WhatsApp
- Provide design consultation if needed

Need immediate assistance?
Call us at: ${formatPhoneNumber(SITE_CONFIG.phone)}
WhatsApp: ${formatPhoneNumber(SITE_CONFIG.phone)}

---
PrintPro Dubai
Professional Printing & Signage Services in Dubai
📧 ${SITE_CONFIG.email} | 📞 ${formatPhoneNumber(SITE_CONFIG.phone)}
    `
  })
};

// Email sending functions
export const sendEmail = async (options: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}) => {
  const transporter = createTransporter();
  
                     // Format attachments for nodemailer
  // nodemailer requires specific format: filename, content (Buffer), and contentType
  const attachments = options.attachments?.map(att => {
    // Ensure we have a valid Buffer
    const content = Buffer.isBuffer(att.content) ? att.content : Buffer.from(att.content);
    
    // nodemailer attachment format
    // For binary files (PDF, images), use Buffer with explicit contentType
    // IMPORTANT: Do NOT use 'cid' (content-id) - that makes it inline, not an attachment
    return {
      filename: att.filename,
      content: content,
      contentType: att.contentType || 'application/octet-stream',
      // Ensure it's an attachment, not inline
      // Removing any potential inline properties
    };
  }).filter(att => att !== undefined && att !== null); // Remove any null/undefined attachments

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER || 'merinamou3@gmail.com',
    to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: attachments || []
  };

  try {
    console.log('Attempting to send email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      attachmentsCount: options.attachments?.length || 0
    });
    
    // Log attachment details for debugging
    if (options.attachments && options.attachments.length > 0) {
      options.attachments.forEach((att, idx) => {
        console.log(`Attachment ${idx + 1}:`, {
          filename: att.filename,
          size: att.content.length,
          contentType: att.contentType || 'application/octet-stream'
        });
      });
      
      // Log what actually gets passed to nodemailer
      console.log('Mail options attachments count:', mailOptions.attachments?.length || 0);
      mailOptions.attachments?.forEach((att, idx) => {
        console.log(`  Attachment ${idx + 1}:`, {
          filename: att.filename,
          contentType: att.contentType,
          size: Buffer.isBuffer(att.content) ? att.content.length : (att.content as any)?.length || 0,
          isBuffer: Buffer.isBuffer(att.content),
          firstBytes: Buffer.isBuffer(att.content) ? att.content.slice(0, 20).toString('hex') : 'N/A'
        });
      });
    }
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Log more detailed error information
    if (error instanceof Error) {
      console.error('Email error name:', error.name);
      console.error('Email error message:', error.message);
      console.error('Email error stack:', error.stack);
    }
    
    throw error;
  }
};

// Quote request email function
export const sendQuoteRequestEmail = async (data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  details: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
}) => {
  const template = emailTemplates.quoteRequest(data);
  
  // Send to business email
  await sendEmail({
    to: 'merinamou3@gmail.com', // Fixed: Direct business email
    subject: template.subject,
    html: template.html,
    text: template.text,
    attachments: data.attachments
  });

  // Send confirmation to customer
  if (data.email) {
    const customerTemplate = emailTemplates.customerConfirmation(data);
    await sendEmail({
      to: data.email,
      subject: customerTemplate.subject,
      html: customerTemplate.html,
      text: customerTemplate.text
    });
  }
};

// Order email template
export const emailTemplates_order = {
  orderNotification: (data: {
    name: string;
    phone: string;
    email: string;
    address: string;
    product: string;
    productSlug: string;
    quantity: string;
    specifications: string;
  }) => ({
    subject: `New Order: ${data.product} (Qty: ${data.quantity}) - ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f5a100 0%, #d98f00 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .info-row { display: flex; margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 5px; }
          .info-label { font-weight: bold; color: #1e40af; min-width: 140px; }
          .info-value { flex: 1; }
          .order-box { background: #fff7e6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f5a100; }
          .specs-box { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
          .cta-button { display: inline-block; background: #f5a100; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px; }
          .priority-badge { background: #fbbf24; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛒 New Order Received</h1>
            <p>PrintPro Dubai - Dubai</p>
          </div>
          
          <div class="content">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">Customer Information</h2>
              <span class="priority-badge">NEW ORDER</span>
            </div>
            
            <div class="info-row">
              <div class="info-label">👤 Name:</div>
              <div class="info-value">${data.name || 'Not provided'}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">📞 Phone:</div>
              <div class="info-value">${data.phone || 'Not provided'}</div>
            </div>
            
            ${data.email ? `
            <div class="info-row">
              <div class="info-label">📧 Email:</div>
              <div class="info-value">${data.email}</div>
            </div>
            ` : ''}
            
            ${data.address ? `
            <div class="info-row">
              <div class="info-label">📍 Address:</div>
              <div class="info-value">${data.address}</div>
            </div>
            ` : ''}
            
            <div class="order-box">
              <h3 style="margin-top: 0; color: #d98f00;">🛍️ Order Details</h3>
              <div class="info-row" style="background: white;">
                <div class="info-label">Product:</div>
                <div class="info-value"><strong>${data.product}</strong></div>
              </div>
              <div class="info-row" style="background: white;">
                <div class="info-label">Quantity:</div>
                <div class="info-value"><strong>${data.quantity}</strong></div>
              </div>
              ${data.productSlug ? `
              <div class="info-row" style="background: white;">
                <div class="info-label">Product Slug:</div>
                <div class="info-value">${data.productSlug}</div>
              </div>
              ` : ''}
            </div>
            
            ${data.specifications ? `
            <div class="specs-box">
              <h3 style="margin-top: 0; color: #1e40af;">📝 Specifications:</h3>
              <p style="white-space: pre-wrap;">${data.specifications}</p>
            </div>
            ` : ''}
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="tel:${data.phone}" class="cta-button">📞 Call Customer</a>
              ${data.email ? `<a href="mailto:${data.email}" class="cta-button">📧 Email Customer</a>` : ''}
            </div>
            
            <p style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; color: #92400e;">
              <strong>⚠️ Action Required:</strong> Process this order and contact the customer to confirm details and arrange payment.
            </p>
          </div>
          
          <div class="footer">
            <p><strong>PrintPro Dubai</strong></p>
            <p>Professional Printing & Signage Services in Dubai</p>
            <p>This email was sent from your website order form.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Order Received - PrintPro Dubai

Customer Information:
- Name: ${data.name || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}
${data.email ? `- Email: ${data.email}\n` : ''}
${data.address ? `- Address: ${data.address}\n` : ''}

Order Details:
- Product: ${data.product}
- Quantity: ${data.quantity}
${data.productSlug ? `- Product Slug: ${data.productSlug}\n` : ''}

${data.specifications ? `Specifications:\n${data.specifications}\n` : ''}

Action Required: Process this order and contact the customer to confirm details and arrange payment.

---
PrintPro Dubai
Professional Printing & Signage Services in Dubai
    `
  }),

  orderConfirmation: (data: {
    name: string;
    email: string;
    product: string;
    quantity: string;
  }) => ({
    subject: `Order Confirmation - ${data.product} | PrintPro Dubai`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - PrintPro Dubai</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f5a100 0%, #d98f00 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .highlight-box { background: #fff7e6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f5a100; }
          .order-summary { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Order Confirmed!</h1>
            <p>PrintPro Dubai - Dubai</p>
          </div>
          
          <div class="content">
            <h2>Hello ${data.name},</h2>
            
            <p>Thank you for your order! We've received your order request for <strong>${data.product}</strong>.</p>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0;">📋 Order Summary</h3>
              <p><strong>Product:</strong> ${data.product}</p>
              <p><strong>Quantity:</strong> ${data.quantity}</p>
            </div>
            
            <div class="order-summary">
              <h3 style="margin-top: 0;">What happens next?</h3>
              <ul>
                <li>📋 We'll review your order and custom files</li>
                <li>💰 We'll prepare pricing and contact you for payment confirmation</li>
                <li>📞 You'll receive a call or WhatsApp message within 2-4 hours</li>
                <li>🎨 Our team will confirm design details and specifications</li>
                <li>⚡ Production will begin after payment confirmation</li>
              </ul>
            </div>
            
            <p><strong>Need immediate assistance?</strong></p>
            <p>Call us at: <a href="${createPhoneLink(SITE_CONFIG.whatsapp)}">${formatPhoneNumber(SITE_CONFIG.phone)}</a></p>
            <p>WhatsApp: <a href="${createWhatsAppLink(SITE_CONFIG.whatsapp)}">${formatPhoneNumber(SITE_CONFIG.phone)}</a></p>
          </div>
          
          <div class="footer">
            <p><strong>PrintPro Dubai</strong></p>
            <p>Professional Printing & Signage Services in Dubai</p>
            <p>📧 ${SITE_CONFIG.email} | 📞 ${formatPhoneNumber(SITE_CONFIG.phone)}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Order Confirmation - PrintPro Dubai

Hello ${data.name},

Thank you for your order! We've received your order request for ${data.product}.

Order Summary:
- Product: ${data.product}
- Quantity: ${data.quantity}

What happens next?
- We'll review your order and custom files
- We'll prepare pricing and contact you for payment confirmation
- You'll receive a call or WhatsApp message within 2-4 hours
- Our team will confirm design details and specifications
- Production will begin after payment confirmation

Need immediate assistance?
Call us at: ${formatPhoneNumber(SITE_CONFIG.phone)}
WhatsApp: ${formatPhoneNumber(SITE_CONFIG.phone)}

---
PrintPro Dubai
Professional Printing & Signage Services in Dubai
📧 ${SITE_CONFIG.email} | 📞 ${formatPhoneNumber(SITE_CONFIG.phone)}
    `
  })
};

// Order email function
export const sendOrderEmail = async (data: {
  name: string;
  phone: string;
  email: string;
  companyName?: string;
  address: string;
  country: string;
  products: Array<{
    productSlug: string;
    productName: string;
    quantity: number;
  }>;
  orderNotes?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
}) => {
  const totalQuantity = data.products.reduce((sum, p) => sum + p.quantity, 0);
  const productsList = data.products.map(p => `${p.productName} x ${p.quantity}`).join('\n');
  
  // Build email HTML
  const orderEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f5a100 0%, #d98f00 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .info-row { display: flex; margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 5px; }
        .info-label { font-weight: bold; color: #1e40af; min-width: 140px; }
        .info-value { flex: 1; }
        .order-box { background: #fff7e6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f5a100; }
        .product-item { padding: 10px; background: white; margin: 8px 0; border-radius: 5px; }
        .notes-box { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        .cta-button { display: inline-block; background: #f5a100; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px; }
        .priority-badge { background: #fbbf24; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px; }
        .files-list { background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .file-item { padding: 8px; background: white; margin: 5px 0; border-radius: 5px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛒 New Order Received</h1>
          <p>PrintPro Dubai - Dubai</p>
        </div>
        
        <div class="content">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0;">Customer Information</h2>
            <span class="priority-badge">NEW ORDER</span>
          </div>
          
          <div class="info-row">
            <div class="info-label">👤 Name:</div>
            <div class="info-value">${data.name}</div>
          </div>
          
          ${data.companyName ? `
          <div class="info-row">
            <div class="info-label">🏢 Company:</div>
            <div class="info-value">${data.companyName}</div>
          </div>
          ` : ''}
          
          <div class="info-row">
            <div class="info-label">📞 Phone:</div>
            <div class="info-value">${data.phone}</div>
          </div>
          
          <div class="info-row">
            <div class="info-label">📧 Email:</div>
            <div class="info-value">${data.email}</div>
          </div>
          
          <div class="info-row">
            <div class="info-label">📍 Address:</div>
            <div class="info-value">${data.address || 'Not provided'}</div>
          </div>
          
          <div class="info-row">
            <div class="info-label">🌍 Country:</div>
            <div class="info-value">${data.country || 'Not provided'}</div>
          </div>
          
          <div class="order-box">
            <h3 style="margin-top: 0; color: #d98f00;">🛍️ Order Details</h3>
            <div class="info-row" style="background: white;">
              <div class="info-label">Total Items:</div>
              <div class="info-value"><strong>${data.products.length} product(s)</strong></div>
            </div>
            <div class="info-row" style="background: white;">
              <div class="info-label">Total Quantity:</div>
              <div class="info-value"><strong>${totalQuantity}</strong></div>
            </div>
            <div style="margin-top: 15px;">
              <strong>Products:</strong>
              ${data.products.map(p => `
                <div class="product-item">
                  <strong>${p.productName}</strong> x ${p.quantity}
                  <br><small style="color: #64748b;">Slug: ${p.productSlug}</small>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="files-list">
            <h3 style="margin-top: 0; color: #0369a1;">📎 Attached Files (${data.attachments?.length || 0} files):</h3>
            ${data.attachments?.map(att => `
              <div class="file-item">📄 ${att.filename}</div>
            `).join('') || '<p>No files attached</p>'}
          </div>
          
          ${data.orderNotes ? `
          <div class="notes-box">
            <h3 style="margin-top: 0; color: #1e40af;">📝 Order Notes:</h3>
            <p style="white-space: pre-wrap;">${data.orderNotes}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="tel:${data.phone}" class="cta-button">📞 Call Customer</a>
            <a href="mailto:${data.email}" class="cta-button">📧 Email Customer</a>
          </div>
          
          <p style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; color: #92400e;">
            <strong>⚠️ Action Required:</strong> Process this order and contact the customer to confirm details and arrange payment. All files are attached to this email.
          </p>
        </div>
        
        <div class="footer">
          <p><strong>PrintPro Dubai</strong></p>
          <p>Professional Printing & Signage Services in Dubai</p>
          <p>This email was sent from your website order form.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const orderEmailText = `
New Order Received - PrintPro Dubai

Customer Information:
- Name: ${data.name}
${data.companyName ? `- Company: ${data.companyName}\n` : ''}
- Phone: ${data.phone}
- Email: ${data.email}
- Address: ${data.address || 'Not provided'}
- Country: ${data.country || 'Not provided'}

Order Details:
- Total Items: ${data.products.length} product(s)
- Total Quantity: ${totalQuantity}

Products:
${productsList}

Attached Files (${data.attachments?.length || 0} files):
${data.attachments?.map(att => `- ${att.filename}`).join('\n') || 'No files attached'}

${data.orderNotes ? `Order Notes:\n${data.orderNotes}\n` : ''}

Action Required: Process this order and contact the customer to confirm details and arrange payment.

---
PrintPro Dubai
Professional Printing & Signage Services in Dubai
  `;

  // Send to business email
  await sendEmail({
    to: 'merinamou3@gmail.com',
    subject: `New Order: ${data.products.length} product(s) (Qty: ${totalQuantity}) - ${data.name}`,
    html: orderEmailHtml,
    text: orderEmailText,
    attachments: data.attachments
  });

  // Send confirmation to customer
  if (data.email) {
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f5a100 0%, #d98f00 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .highlight-box { background: #fff7e6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f5a100; }
          .order-summary { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Order Confirmed!</h1>
            <p>PrintPro Dubai - Dubai</p>
          </div>
          
          <div class="content">
            <h2>Hello ${data.name},</h2>
            
            <p>Thank you for your order! We've received your order request.</p>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0;">📋 Order Summary</h3>
              <p><strong>Products:</strong> ${data.products.length} item(s)</p>
              <p><strong>Total Quantity:</strong> ${totalQuantity}</p>
              ${data.products.map(p => `<p style="margin: 5px 0;">• ${p.productName} x ${p.quantity}</p>`).join('')}
            </div>
            
            <div class="order-summary">
              <h3 style="margin-top: 0;">What happens next?</h3>
              <ul>
                <li>📋 We'll review your order and attached files</li>
                <li>💰 We'll prepare pricing and contact you for payment confirmation</li>
                <li>📞 You'll receive a call or WhatsApp message within 2-4 hours</li>
                <li>🎨 Our team will confirm design details and specifications</li>
                <li>⚡ Production will begin after payment confirmation</li>
              </ul>
            </div>
            
            <p><strong>Need immediate assistance?</strong></p>
            <p>Call us at: <a href="${createPhoneLink(SITE_CONFIG.whatsapp)}">${formatPhoneNumber(SITE_CONFIG.phone)}</a></p>
            <p>WhatsApp: <a href="${createWhatsAppLink(SITE_CONFIG.whatsapp)}">${formatPhoneNumber(SITE_CONFIG.phone)}</a></p>
          </div>
          
          <div class="footer">
            <p><strong>PrintPro Dubai</strong></p>
            <p>Professional Printing & Signage Services in Dubai</p>
            <p>📧 ${SITE_CONFIG.email} | 📞 ${formatPhoneNumber(SITE_CONFIG.phone)}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: data.email,
      subject: `Order Confirmation - ${data.products.length} product(s) | PrintPro Dubai`,
      html: customerEmailHtml,
      text: `Order Confirmation - Thank you for your order! We've received your order for ${data.products.length} product(s).`
    });
  }
};

const emailService = {
  sendEmail,
  sendQuoteRequestEmail,
  sendOrderEmail,
  emailTemplates,
  emailTemplates_order
};

export default emailService;
