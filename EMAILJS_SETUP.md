# EmailJS Setup Guide for True Flow Exteriors

This guide will help you set up EmailJS to send contact form emails directly to `nielsen.chase@icloud.com`.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **For iCloud/Apple Mail**: Choose "Other" or "SMTP"
   - **For Gmail**: Choose "Gmail" (easier setup)
   - **For Outlook**: Choose "Outlook"

### For iCloud Email Setup:
- **Service ID**: `contact_service` (you can name this anything)
- **Email**: `nielsen.chase@icloud.com`
- **SMTP Server**: `smtp.mail.me.com`
- **Port**: `587`
- **Username**: `nielsen.chase@icloud.com`
- **Password**: Your iCloud app-specific password (see below)

### Getting iCloud App-Specific Password:
1. Go to [appleid.apple.com](https://appleid.apple.com/)
2. Sign in with your Apple ID
3. Go to "App-Specific Passwords"
4. Generate a new password for "EmailJS"
5. Use this password in EmailJS setup

## Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Set **Template ID**: `contact_form`
4. Configure the template:

### Template Settings:
- **To Email**: `nielsen.chase@icloud.com`
- **From Name**: `{{name}}` (customer's name)
- **From Email**: Use default
- **Reply To**: `{{email}}` (customer's email)
- **Subject**: `New Contact Form Submission - True Flow Exteriors`

### Template Content:
```
New contact form submission from True Flow Exteriors website:

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Service Requested: {{service}}

Message:
{{message}}

---
This message was sent from the True Flow Exteriors contact form.
Please respond directly to the customer's email address above.
```

## Step 4: Get Your Public Key

1. Go to **Account** in EmailJS dashboard
2. Copy your **Public Key**
3. This will look something like: `user_abc123def456`

## Step 5: Update Website Code

Replace the placeholder values in your website files:

### In `index.html` (line ~9):
```javascript
emailjs.init({
  publicKey: "YOUR_ACTUAL_PUBLIC_KEY_HERE", // Replace with your real public key
});
```

### In `scripts.js` (line ~45):
```javascript
emailjs.sendForm('contact_service', 'contact_form', this, {
    publicKey: 'YOUR_ACTUAL_PUBLIC_KEY_HERE', // Replace with your real public key
})
```

## Step 6: Test the Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email at `nielsen.chase@icloud.com`
4. The email should arrive within a few minutes

## Troubleshooting

### If emails aren't arriving:
1. **Check spam folder** - EmailJS emails sometimes go to spam initially
2. **Verify email service** - Make sure your email service is properly connected
3. **Check template variables** - Ensure template uses correct variable names: `{{name}}`, `{{email}}`, `{{phone}}`, `{{service}}`, `{{message}}`
4. **Test with different email** - Try sending to a Gmail address to test

### Common Issues:
- **iCloud requires app-specific password** - Don't use your regular Apple ID password
- **Template ID mismatch** - Make sure template ID in code matches EmailJS dashboard
- **Service ID mismatch** - Make sure service ID in code matches EmailJS dashboard

## Free Plan Limits

EmailJS free plan includes:
- **200 emails per month**
- **2 email services**
- **3 email templates**

This should be perfect for a growing business!

## Final Code Values

After setup, your code should look like this:

```javascript
// In index.html
emailjs.init({
  publicKey: "user_abc123def456", // Your actual public key
});

// In scripts.js
emailjs.sendForm('contact_service', 'contact_form', this, {
    publicKey: 'user_abc123def456', // Your actual public key
})
```

## Support

If you need help:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. EmailJS has excellent support for setup issues
3. The form will show error messages if something goes wrong

---

**Once configured, customers will be able to send messages directly to nielsen.chase@icloud.com through the website contact form!** 