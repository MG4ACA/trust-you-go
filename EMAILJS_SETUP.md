# EmailJS Setup Instructions for Hostinger Email

Follow these steps to enable email notifications for booking inquiries:

## 1. Create EmailJS Account

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign up or log in
3. Click on "Add New Service"

## 2. Configure Email Service (Hostinger)

Since you're using Hostinger email, you'll need to set up an SMTP service:

1. In EmailJS Dashboard, click "Add New Service"
2. Select "SMTP" (not Gmail, Outlook, etc.)
3. Fill in your Hostinger SMTP details:
   - **Service Name**: Give it a name (e.g., "Hostinger Email")
   - **SMTP Server**: `smtp.hostinger.com`
   - **Port**: `465` (SSL) or `587` (TLS)
   - **Username**: Your full Hostinger email address (e.g., info@trustyougo.com)
   - **Password**: Your Hostinger email password
   - **Secure**: Check this box if using port 465
4. Click "Create Service"
5. **Copy the Service ID** - you'll need this later

## 3. Create Email Template

1. In EmailJS Dashboard, go to "Email Templates"
2. Click "Create New Template"
3. In the template editor:
   - **Subject Line**: `New Booking Inquiry - {{selected_package}}`
   - **Content**: Switch to HTML mode and paste the template below

### HTML Template (Copy this):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #075b95 0%, #065a87 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                🎯 New Booking Inquiry
                            </h1>
                            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                                Trust You Go - Sri Lanka Tours
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Selected Package Badge -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f8f9fa; border-bottom: 3px solid #075b95;">
                            <div style="background-color: #075b95; color: #ffffff; padding: 15px; border-radius: 8px; text-align: center;">
                                <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">
                                    Selected Package
                                </p>
                                <h2 style="margin: 5px 0 0 0; font-size: 22px; font-weight: bold;">
                                    {{selected_package}}
                                </h2>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Customer Details -->
                    <tr>
                        <td style="padding: 30px;">
                            <h3 style="color: #075b95; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #075b95; padding-bottom: 8px;">
                                👤 Customer Details
                            </h3>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 14px; width: 40%;">
                                        <strong>Name:</strong>
                                    </td>
                                    <td style="padding: 8px 0; color: #333; font-size: 14px;">
                                        {{from_name}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 14px;">
                                        <strong>Email:</strong>
                                    </td>
                                    <td style="padding: 8px 0; color: #333; font-size: 14px;">
                                        <a href="mailto:{{from_email}}" style="color: #075b95; text-decoration: none;">
                                            {{from_email}}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Travel Details -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h3 style="color: #075b95; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #075b95; padding-bottom: 8px;">
                                ✈️ Travel Details
                            </h3>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 14px; width: 40%;">
                                        <strong>Check-in Date:</strong>
                                    </td>
                                    <td style="padding: 8px 0; color: #333; font-size: 14px;">
                                        {{checkin_date}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 14px;">
                                        <strong>Check-out Date:</strong>
                                    </td>
                                    <td style="padding: 8px 0; color: #333; font-size: 14px;">
                                        {{checkout_date}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 14px;">
                                        <strong>Number of Guests:</strong>
                                    </td>
                                    <td style="padding: 8px 0; color: #333; font-size: 14px;">
                                        {{number_of_guests}}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Preferences -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h3 style="color: #075b95; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #075b95; padding-bottom: 8px;">
                                🎨 Preferences
                            </h3>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 14px; width: 40%;">
                                        <strong>Accommodation Type:</strong>
                                    </td>
                                    <td style="padding: 8px 0; color: #333; font-size: 14px;">
                                        {{accommodation_type}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 14px;">
                                        <strong>Selected Vehicle:</strong>
                                    </td>
                                    <td style="padding: 8px 0; color: #333; font-size: 14px;">
                                        {{selected_vehicle}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 14px; vertical-align: top;">
                                        <strong>Selected Activities:</strong>
                                    </td>
                                    <td style="padding: 8px 0; color: #333; font-size: 14px;">
                                        {{selected_activities}}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Additional Message -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h3 style="color: #075b95; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #075b95; padding-bottom: 8px;">
                                💬 Additional Message
                            </h3>
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #075b95;">
                                <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{{additional_message}}</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Action Button -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px; text-align: center;">
                            <a href="mailto:{{from_email}}" style="display: inline-block; background-color: #28a745; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
                                📧 Reply to Customer
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #666; font-size: 12px; line-height: 1.5;">
                                This inquiry was submitted from <strong>Trust You Go</strong> website<br>
                                <a href="mailto:{{from_email}}" style="color: #075b95; text-decoration: none;">{{from_email}}</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

### Alternative: Simple Text Template

If you prefer a simpler text-based email, use this instead:

```
Subject: New Booking Inquiry - {{selected_package}}

Hello,

You have received a new booking inquiry from your website.

CUSTOMER DETAILS:
-----------------
Name: {{from_name}}
Email: {{from_email}}
Selected Package: {{selected_package}}

TRAVEL DETAILS:
--------------
Check-in Date: {{checkin_date}}
Check-out Date: {{checkout_date}}
Number of Guests: {{number_of_guests}}

PREFERENCES:
-----------
Accommodation Type: {{accommodation_type}}
Selected Vehicle: {{selected_vehicle}}
Selected Activities: {{selected_activities}}

ADDITIONAL MESSAGE:
------------------
{{additional_message}}

---
This inquiry was submitted from Trust You Go website.
Reply directly to: {{from_email}}
```

4. Click "Save"
5. **Copy the Template ID** - you'll need this later

## 4. Get Your Public Key

1. In EmailJS Dashboard, go to "Account" → "General"
2. Find your **Public Key** (looks like: abcd1234efgh5678)
3. **Copy the Public Key**

## 5. Update Environment Variables

Open the `.env` file in your project and update with your values:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx      # From Step 2
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx    # From Step 3
VITE_EMAILJS_PUBLIC_KEY=your_public_key      # From Step 4
VITE_EMAILJS_TO_EMAIL=your-email@yourdomain.com  # Your Hostinger email
```

## 6. Restart Development Server

After updating the `.env` file:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## 7. Test the Email

1. Go to your website's booking page
2. Fill out the form
3. Submit the booking
4. Check your Hostinger email inbox

## Important Notes

- **NEVER commit the `.env` file to Git** - it's already in `.gitignore`
- For production deployment (AWS Amplify), add these environment variables in the Amplify Console under "Environment Variables"
- The free EmailJS plan allows 200 emails per month
- Make sure your Hostinger email password is correct and 2FA is disabled for SMTP access

## Troubleshooting

### Email not sending?

1. Check EmailJS dashboard for error logs
2. Verify your Hostinger SMTP credentials are correct
3. Make sure the `.env` file has all required variables
4. Check browser console for errors
5. Verify your Hostinger email has SMTP access enabled

### Getting "SMTP Authentication Failed"?

- Double-check your email and password
- Some Hostinger accounts require you to enable "Less secure app access" or create an App Password
- Contact Hostinger support if SMTP is not working

### Still not working?

- Check EmailJS dashboard under "Email Services" to see if the service is active
- Test sending from EmailJS dashboard directly
- Make sure port 465 or 587 is not blocked by your firewall

---

For more help, visit [EmailJS Documentation](https://www.emailjs.com/docs/)
