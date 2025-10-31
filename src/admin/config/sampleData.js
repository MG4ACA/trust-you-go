/**
 * Sample Data Configuration
 * This file contains sample data for all forms in the admin panel.
 * Use this data to quickly populate forms during development and testing.
 */

export const SAMPLE_DATA = {
  // Sample data for Agent form
  agent: {
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@travelagency.com',
    phone: '+94771234567',
    address: '123 Main Street, Colombo',
    city: 'Colombo',
    province: 'Western Province',
    licenseNumber: 'TAG-2024-001',
    commissionRate: 12.5,
    specialization: 'Adventure Tours',
    experience: 8,
    status: 'active',
    emergencyContact: '+94712345678',
    bankAccount: 'LK94BOSL0000000000000000000',
  },

  // Sample data for Location form
  location: {
    name: 'Sigiriya Rock Fortress',
    description:
      'An ancient rock fortress located in the central province of Sri Lanka. Sigiriya is considered one of the most important historical sites in Sri Lanka and is a UNESCO World Heritage Site. The fortress is believed to have been built during the reign of King Kashyapa I in the 5th century. The site features a rock plateau with an elevation of about 370 meters.',
    city: 'Sigiriya',
    province: 'Central Province',
    location_type: 'historical',
    latitude: 7.957,
    longitude: 80.7603,
    entryFee: 30.0,
    bestTimeToVisit: 'December to April',
    averageVisitDuration: '3-4 hours',
    isActive: true,
  },

  // Sample data for Package form
  package: {
    name: 'Cultural Triangle Tour',
    description:
      'Explore the rich cultural heritage of Sri Lanka. This comprehensive tour covers three ancient capitals: Anuradhapura, Polonnaruwa, and Kandy. Visit UNESCO World Heritage Sites, ancient temples, and learn about Buddhist history and architecture.',
    duration: 5,
    price: 899.99,
    maxPeople: 15,
    difficulty: 'easy',
    category: 'cultural',
    includes: [
      'Accommodation in 3-star hotels',
      'Daily breakfast and dinner',
      'All entrance fees',
      'Professional tour guide',
      'Comfortable transportation',
    ],
    excludes: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Tips and gratuities',
    ],
    highlights: [
      'Visit Sigiriya Rock Fortress',
      'Explore Anuradhapura Ancient City',
      'Visit Polonnaruwa Archaeological Site',
      'Tour Kandy Temple of the Tooth',
      'Experience local cuisine',
    ],
    isActive: true,
  },

  // Sample data for Admin form
  admin: {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@travelapp.com',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    role: 'administrator',
    phone: '+94771111111',
    status: 'active',
  },
};

/**
 * Get sample data for a specific form
 * @param {string} formType - The type of form ('agent', 'location', 'package', 'admin')
 * @returns {object} Sample data object for the specified form type
 */
export const getSampleData = (formType) => {
  const type = formType?.toLowerCase();
  return SAMPLE_DATA[type] || null;
};

/**
 * Get all available sample data types
 * @returns {array} Array of available sample data types
 */
export const getAvailableSampleDataTypes = () => {
  return Object.keys(SAMPLE_DATA);
};
