# 📧 Email Setup Guide - SMTP Configuration

## Overview
This website uses SMTP to send emails when customers submit quote requests. The system sends:
1. **Business notification** to your email with customer details
2. **Customer confirmation** email to the customer

## Environment Variables Setup

Create a `.env.local` file in your project root with these variables:

```bash
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Email Recipients
QUOTE_TO=info@printprodubai.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://printprodubai.com
```

## Email Provider Setup

### Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password as `SMTP_PASS`
3. **Configuration**:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   ```

### Outlook/Hotmail Setup
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Setup
```
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### Custom SMTP Server
```
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```

## Features

### ✅ What the Email System Does:
- **Professional HTML emails** with your branding
- **Customer information** clearly formatted
- **File attachments** support (up to 10MB)
- **Automatic customer confirmation** emails
- **Mobile-responsive** email templates
- **Error handling** and validation

### 📧 Email Templates Include:
- **Business Notification Email**:
  - Customer contact details
  - Service requested
  - Project details
  - Direct action buttons (Call, Email)
  - Professional branding

- **Customer Confirmation Email**:
  - Thank you message
  - Next steps explanation
  - Contact information
  - Professional appearance

## Testing

### Test Your Setup:
1. Fill out the contact form on your website
2. Check your email for the business notification
3. Check the customer email for the confirmation
4. Verify attachments are received properly

### Troubleshooting:
- **Authentication failed**: Check your SMTP credentials
- **Connection timeout**: Verify SMTP host and port
- **Emails not received**: Check spam folder
- **File upload issues**: Ensure file size is under 10MB

## Security Notes:
- Never commit `.env.local` to version control
- Use app passwords instead of main passwords
- Enable 2FA on your email account
- Regularly rotate your app passwords

## Production Deployment:
- Set environment variables in your hosting platform
- Use your domain's email for professional appearance
- Test thoroughly before going live
- Monitor email delivery rates

## Support:
If you need help setting up email:
1. Check your email provider's SMTP documentation
2. Verify all environment variables are set correctly
3. Test with a simple email first
4. Contact your hosting provider if issues persist
