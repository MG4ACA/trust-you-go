/**
 * Booking Mapper
 * Converts API response (snake_case) to Redux store format (camelCase)
 *
 * API Response Format (snake_case):
 * {
 *   booking_id: '1',
 *   package_id: '1',
 *   traveler_id: '101',
 *   agent_id: '2',
 *   status: 'confirmed',
 *   no_of_travelers: 2,
 *   start_date: '2025-12-15',
 *   end_date: '2025-12-22',
 *   total_amount: 1700.00,
 *   payment_status: 'paid',
 *   booking_date: '2025-10-01T10:30:00.000Z',
 *   confirmation_date: '2025-10-02T14:20:00.000Z',
 *   confirmed_by: '1',
 *   admin_notes: 'Premium booking',
 *   traveler_notes: 'Vegetarian meals preferred',
 *   created_at: '2025-10-01T10:30:00.000Z',
 *   updated_at: '2025-10-02T14:20:00.000Z'
 * }
 *
 * Redux Store Format (camelCase):
 * {
 *   bookingId: '1',
 *   packageId: '1',
 *   travelerId: '101',
 *   agentId: '2',
 *   status: 'confirmed',
 *   noOfTravelers: 2,
 *   startDate: '2025-12-15',
 *   endDate: '2025-12-22',
 *   totalAmount: 1700.00,
 *   paymentStatus: 'paid',
 *   bookingDate: '2025-10-01T10:30:00.000Z',
 *   confirmationDate: '2025-10-02T14:20:00.000Z',
 *   confirmedBy: '1',
 *   adminNotes: 'Premium booking',
 *   travelerNotes: 'Vegetarian meals preferred',
 *   createdAt: '2025-10-01T10:30:00.000Z',
 *   updatedAt: '2025-10-02T14:20:00.000Z'
 * }
 */

export const bookingMapper = {
  /**
   * Convert single booking from API format to Redux format
   * @param {Object} apiBooking - Booking object from API (snake_case)
   * @returns {Object} Booking object for Redux store (camelCase)
   */
  toRedux: (apiBooking) => {
    if (!apiBooking) return null;

    return {
      bookingId: apiBooking.booking_id || null,
      packageId: apiBooking.package_id || null,
      travelerId: apiBooking.traveler_id || null,
      agentId: apiBooking.agent_id || null,
      status: apiBooking.status || 'temporary',
      noOfTravelers: apiBooking.no_of_travelers || 1,
      startDate: apiBooking.start_date || null,
      endDate: apiBooking.end_date || null,
      totalAmount: apiBooking.total_amount ?? 0,
      paymentStatus: apiBooking.payment_status || 'pending',
      bookingDate: apiBooking.booking_date || null,
      confirmationDate: apiBooking.confirmation_date || null,
      confirmedBy: apiBooking.confirmed_by || null,
      adminNotes: apiBooking.admin_notes || '',
      travelerNotes: apiBooking.traveler_notes || '',
      createdAt: apiBooking.created_at || null,
      updatedAt: apiBooking.updated_at || null,
    };
  },

  /**
   * Convert array of bookings from API format to Redux format
   * @param {Array} apiBookings - Array of booking objects from API (snake_case)
   * @returns {Array} Array of booking objects for Redux store (camelCase)
   */
  toReduxArray: (apiBookings) => {
    if (!Array.isArray(apiBookings)) return [];
    return apiBookings.map((booking) => bookingMapper.toRedux(booking));
  },

  /**
   * Convert booking from Redux format to API format (for create/update)
   * @param {Object} reduxBooking - Booking object from Redux store (camelCase)
   * @returns {Object} Booking object for API request (snake_case)
   */
  toAPI: (reduxBooking) => {
    if (!reduxBooking) return null;

    return {
      booking_id: reduxBooking.bookingId || null,
      package_id: reduxBooking.packageId || null,
      traveler_id: reduxBooking.travelerId || null,
      agent_id: reduxBooking.agentId || null,
      status: reduxBooking.status || 'temporary',
      no_of_travelers: reduxBooking.noOfTravelers || 1,
      start_date: reduxBooking.startDate || null,
      end_date: reduxBooking.endDate || null,
      total_amount: reduxBooking.totalAmount ?? 0,
      payment_status: reduxBooking.paymentStatus || 'pending',
      booking_date: reduxBooking.bookingDate || new Date().toISOString(),
      confirmation_date: reduxBooking.confirmationDate || null,
      confirmed_by: reduxBooking.confirmedBy || null,
      admin_notes: reduxBooking.adminNotes || '',
      traveler_notes: reduxBooking.travelerNotes || '',
      created_at: reduxBooking.createdAt || new Date().toISOString(),
      updated_at: reduxBooking.updatedAt || new Date().toISOString(),
    };
  },

  /**
   * Convert form data to API format
   * Used when creating or updating booking from form
   * @param {Object} formData - Form data (camelCase)
   * @returns {Object} API format (snake_case)
   */
  formToAPI: (formData) => {
    return {
      package_id: formData.packageId || null,
      traveler_id: formData.travelerId || null,
      agent_id: formData.agentId || null,
      status: formData.status || 'temporary',
      no_of_travelers: formData.noOfTravelers || 1,
      start_date: formData.startDate || null,
      end_date: formData.endDate || null,
      total_amount: formData.totalAmount ?? 0,
      payment_status: formData.paymentStatus || 'pending',
      admin_notes: formData.adminNotes || '',
      traveler_notes: formData.travelerNotes || '',
    };
  },
};

export default bookingMapper;
