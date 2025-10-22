# 📧 Complete Email System for SEHAM ADVERTISING

## Overview
This Next.js application includes a comprehensive email system that automatically sends professional emails when customers interact with your website.

## 🚀 Features

### ✅ What Happens When Customers Submit Forms:
1. **Quote Request Form** → Business notification email + Customer confirmation
2. **WhatsApp Button Click** → WhatsApp lead notification email  
3. **Phone Call Button Click** → Phone call lead notification email
4. **File Uploads** → Attachments included in emails (up to 10MB)

### 📧 Email Types Sent:

#### 1. **Business Notification Emails**
- **Quote Requests**: Professional HTML email with customer details
- **WhatsApp Leads**: Green-themed notification for WhatsApp inquiries
- **Phone Call Leads**: Blue-themed notification for phone inquiries
- **All emails include**: Customer info, service requested, timestamps, action buttons

#### 2. **Customer Confirmation Emails**
- **Auto-sent to customers** who provide email addresses
- **Professional branding** with SEHAM ADVERTISING logo
- **Next steps explanation** and contact information
- **Mobile-responsive design**

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install nodemailer @types/nodemailer
```

### 2. Configure Environment Variables
Create `.env.local` file:
```bash
# SMTP Configuration (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Email Recipients
QUOTE_TO=info@sehamadvertising.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://sehamadvertising.com
```

### 3. Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Use this 16-character password as `SMTP_PASS`
3. **Never use your regular password** - always use app passwords

### 4. Test the System
1. Fill out the contact form on your website
2. Check your email for the business notification
3. Check customer email for confirmation
4. Verify file attachments work properly

## 📁 File Structure

```
src/
├── lib/
│   └── email.ts                 # Email utilities and templates
├── app/api/
│   ├── quote/route.ts          # Quote form submissions
│   ├── whatsapp-lead/route.ts  # WhatsApp button tracking
│   └── phone-lead/route.ts     # Phone call tracking
└── EMAIL_SETUP.md              # Detailed setup guide
```

## 🎨 Email Templates

### Professional HTML Design Features:
- **Mobile-responsive** layouts
- **Brand colors** and gradients
- **Action buttons** for quick responses
- **Professional typography**
- **Company branding** throughout
- **Priority badges** for urgent leads

### Template Types:
1. **Quote Request Template** - Blue gradient header
2. **WhatsApp Lead Template** - Green WhatsApp colors
3. **Phone Call Template** - Blue phone colors
4. **Customer Confirmation** - Professional thank you message

## 🔧 API Endpoints

### 1. Quote Form Submission
```
POST /api/quote
Content-Type: multipart/form-data

Fields:
- name (required)
- phone or email (at least one required)
- service_slug
- details
- file (optional, max 10MB)
```

### 2. WhatsApp Lead Tracking
```
POST /api/whatsapp-lead
Content-Type: application/json

Body:
{
  "name": "Customer Name",
  "phone": "+971501234567",
  "service": "Screen Printing"
}
```

### 3. Phone Call Tracking
```
POST /api/phone-lead
Content-Type: application/json

Body:
{
  "name": "Customer Name",
  "phone": "+971501234567", 
  "service": "LED Signs",
  "callDuration": 45
}
```

## 📱 Frontend Integration

### Quote Form Integration
The contact forms automatically use the email system. No additional setup needed.

### WhatsApp Button Tracking
Add this JavaScript to track WhatsApp clicks:
```javascript
// Track WhatsApp button clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
  button.addEventListener('click', async () => {
    const phone = button.href.match(/wa\.me\/(\d+)/)?.[1];
    if (phone) {
      try {
        await fetch('/api/whatsapp-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Website Visitor',
            phone: phone,
            service: 'General Inquiry'
          })
        });
      } catch (error) {
        console.log('WhatsApp tracking failed:', error);
      }
    }
  });
});
```

### Phone Call Tracking
Add this JavaScript to track phone clicks:
```javascript
// Track phone button clicks
document.querySelectorAll('a[href^="tel:"]').forEach(button => {
  button.addEventListener('click', async () => {
    const phone = button.href.replace('tel:', '');
    try {
      await fetch('/api/phone-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Website Visitor',
          phone: phone,
          service: 'General Inquiry'
        })
      });
    } catch (error) {
      console.log('Phone tracking failed:', error);
    }
  });
});
```

## 🔒 Security Features

### ✅ Built-in Security:
- **Input validation** for all form fields
- **File size limits** (10MB maximum)
- **Email sanitization** to prevent injection
- **Rate limiting** ready (can be added)
- **Error handling** without exposing sensitive info

### 🛡️ Best Practices:
- Use **app passwords** instead of main passwords
- Enable **2FA** on your email account
- Never commit `.env.local` to version control
- Regularly **rotate app passwords**
- Monitor **email delivery rates**

## 🚀 Deployment

### Production Setup:
1. **Set environment variables** in your hosting platform
2. **Use your domain email** for professional appearance
3. **Test thoroughly** before going live
4. **Monitor email delivery** rates
5. **Set up email analytics** if needed

### Hosting Platforms:
- **Vercel**: Set env vars in dashboard
- **Netlify**: Set env vars in site settings
- **Railway**: Set env vars in project settings
- **DigitalOcean**: Set env vars in app settings

## 🐛 Troubleshooting

### Common Issues:

#### ❌ "Authentication failed"
- Check your SMTP credentials
- Ensure you're using an app password, not your main password
- Verify 2FA is enabled on your email account

#### ❌ "Connection timeout"
- Check SMTP host and port settings
- Verify firewall isn't blocking the connection
- Try different SMTP ports (587, 465, 25)

#### ❌ "Emails not received"
- Check spam/junk folder
- Verify recipient email address
- Check email provider's sending limits
- Test with a simple email first

#### ❌ "File upload issues"
- Ensure file size is under 10MB
- Check file type restrictions
- Verify server upload limits

### Debug Mode:
Add this to your `.env.local` for debugging:
```bash
DEBUG_EMAIL=true
```

## 📊 Email Analytics (Optional)

### Track Email Performance:
- **Delivery rates** - Monitor successful sends
- **Open rates** - Track customer engagement  
- **Click rates** - Measure button effectiveness
- **Response times** - Monitor lead follow-up

### Integration Options:
- **Google Analytics** - Track email events
- **Mailgun** - Professional email delivery
- **SendGrid** - Advanced email analytics
- **Postmark** - Transactional email focus

## 🎯 Lead Management

### Automatic Lead Processing:
1. **Instant notifications** when leads arrive
2. **Priority categorization** (WhatsApp = High, Phone = Urgent)
3. **Customer information** clearly formatted
4. **Direct action buttons** for quick response
5. **Timestamp tracking** for follow-up timing

### Lead Follow-up Workflow:
1. **Receive email notification** within seconds
2. **Click action button** to contact customer
3. **Follow up within 5 minutes** for best conversion
4. **Track response times** and conversion rates

## 💡 Pro Tips

### Maximize Lead Conversion:
- **Respond within 5 minutes** to new leads
- **Use action buttons** in emails for quick contact
- **Follow up multiple times** if no initial response
- **Track which services** generate most leads
- **Monitor peak inquiry times** for staffing

### Email Template Customization:
- **Modify colors** to match your brand
- **Add your logo** to email headers
- **Customize messaging** for different services
- **A/B test** different subject lines
- **Add seasonal promotions** to templates

## 🆘 Support

### Getting Help:
1. **Check the setup guide** first
2. **Verify all environment variables** are set
3. **Test with a simple email** to isolate issues
4. **Check your email provider's documentation**
5. **Contact your hosting provider** if deployment issues

### Contact Information:
- **Email**: info@sehamadvertising.com
- **Phone**: +971 50 123 4567
- **WhatsApp**: +971 50 123 4567

---

## 🎉 You're All Set!

Your email system is now ready to automatically capture and notify you of every customer inquiry. This will help you:

- ✅ **Never miss a lead** - Instant email notifications
- ✅ **Respond faster** - Direct action buttons in emails  
- ✅ **Look professional** - Beautiful branded email templates
- ✅ **Track performance** - Know which services generate most leads
- ✅ **Convert more customers** - Faster response times

**Happy selling! 🚀**
