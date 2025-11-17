import emailjs from '@emailjs/browser';

/**
 * Email Service for sending emails using EmailJS
 * This service can be used across both SPA and Admin sections
 */

/**
 * Send booking inquiry email
 * @param {Object} templateParams - The email template parameters
 * @returns {Promise<Object>} - { success: boolean, result?: any, error?: any }
 */
export const sendBookingEmail = async (templateParams) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Validate required environment variables
  if (!serviceId || !templateId || !userId) {
    throw new Error('EmailJS configuration is missing. Please check environment variables.');
  }

  // Initialize EmailJS with public key
  emailjs.init({
    publicKey: userId,
    // Do not allow headless browsers
    blockHeadless: true,
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });

  // Send email using EmailJS
  const result = await emailjs.send(serviceId, templateId, templateParams);

  console.log('Email sent successfully:', result);

  return {
    success: true,
    result,
  };
};

/**
 * Send a general email (can be used for admin notifications, contact forms, etc.)
 * @param {Object} emailData - The email data
 * @param {string} emailData.templateId - The EmailJS template ID to use
 * @param {Object} emailData.templateParams - The template parameters
 * @returns {Promise<Object>} - { success: boolean, message: string, result?: any, error?: any }
 */
export const sendEmail = async ({ templateId, templateParams }) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const userId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Validate required environment variables
    if (!serviceId || !templateId || !userId) {
      throw new Error('EmailJS configuration is missing. Please check environment variables.');
    }

    // Initialize EmailJS with public key
    emailjs.init({
      publicKey: userId,
    });

    // Send email using EmailJS
    const result = await emailjs.send(serviceId, templateId, templateParams, userId);

    console.log('Email sent successfully:', result);

    return {
      success: true,
      message: 'Email sent successfully!',
      result,
    };
  } catch (error) {
    console.error('Failed to send email:', error);

    return {
      success: false,
      message: 'Failed to send email. Please try again.',
      error,
    };
  }
};
