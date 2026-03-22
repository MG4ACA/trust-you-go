import axios from 'axios';

// Points to the backend API. In production this is proxied by Nginx at /api.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Send a booking inquiry to the backend, which forwards it via Hostinger SMTP.
 *
 * @param {Object} templateParams - Booking form data (matches keys sent from Booking.jsx)
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const sendBookingEmail = async (templateParams) => {
  const payload = {
    name: templateParams.from_name,
    email: templateParams.from_email,
    selected_package: templateParams.selected_package,
    checkin_date: templateParams.checkin_date,
    checkout_date: templateParams.checkout_date,
    number_of_guests: templateParams.number_of_guests,
    accommodation_type: templateParams.accommodation_type,
    selected_vehicle: templateParams.selected_vehicle,
    selected_activities: templateParams.selected_activities,
    message: templateParams.additional_message,
  };

  const response = await axios.post(`${API_BASE_URL}/contact`, payload);
  return response.data; // { success: true, message: '...' }
};

/**
 * Generic email sender — kept for backward compatibility.
 * Now also routes through the backend.
 *
 * @param {Object} emailData
 * @param {Object} emailData.templateParams
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const sendEmail = async ({ templateParams }) => {
  try {
    return await sendBookingEmail(templateParams);
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
      error,
    };
  }
};
