/**
 * Location Image Mapper
 * Converts API response (snake_case) to Redux store format (camelCase)
 *
 * API Response Format (snake_case):
 * {
 *   image_id: '1',
 *   location_id: '1',
 *   image_url: 'https://bucket.s3.amazonaws.com/locations/1/image.jpg',
 *   thumbnail_url: 'https://bucket.s3.amazonaws.com/locations/1/thumbs/image.jpg',
 *   display_order: 0,
 *   uploaded_at: '2025-01-10T10:30:00.000Z'
 * }
 *
 * Redux Store Format (camelCase):
 * {
 *   imageId: '1',
 *   locationId: '1',
 *   imageUrl: 'https://bucket.s3.amazonaws.com/locations/1/image.jpg',
 *   thumbnailUrl: 'https://bucket.s3.amazonaws.com/locations/1/thumbs/image.jpg',
 *   displayOrder: 0,
 *   uploadedAt: '2025-01-10T10:30:00.000Z'
 * }
 */

export const locationImageMapper = {
  /**
   * Convert single image from API format to Redux format
   * @param {Object} apiImage - Image object from API (snake_case)
   * @returns {Object} Image object for Redux store (camelCase)
   */
  toRedux: (apiImage) => {
    if (!apiImage) return null;

    return {
      imageId: apiImage.image_id || null,
      locationId: apiImage.location_id || null,
      imageUrl: apiImage.image_url || '',
      thumbnailUrl: apiImage.thumbnail_url || '',
      displayOrder: apiImage.display_order ?? 0,
      uploadedAt: apiImage.uploaded_at || null,
    };
  },

  /**
   * Convert array of images from API format to Redux format
   * @param {Array} apiImages - Array of image objects from API (snake_case)
   * @returns {Array} Array of image objects for Redux store (camelCase)
   */
  toReduxArray: (apiImages) => {
    if (!Array.isArray(apiImages)) return [];
    return apiImages.map((image) => locationImageMapper.toRedux(image));
  },

  /**
   * Convert image from Redux format to API format (for create/update)
   * @param {Object} reduxImage - Image object from Redux store (camelCase)
   * @returns {Object} Image object for API request (snake_case)
   */
  toAPI: (reduxImage) => {
    if (!reduxImage) return null;

    return {
      image_id: reduxImage.imageId || null,
      location_id: reduxImage.locationId || null,
      image_url: reduxImage.imageUrl || '',
      thumbnail_url: reduxImage.thumbnailUrl || '',
      display_order: reduxImage.displayOrder ?? 0,
      uploaded_at: reduxImage.uploadedAt || new Date().toISOString(),
    };
  },

  /**
   * Convert form data to API format
   * Used when uploading or updating image from form
   * @param {Object} formData - Form data (camelCase)
   * @returns {Object} API format (snake_case)
   */
  formToAPI: (formData) => {
    return {
      location_id: formData.locationId || null,
      image_url: formData.imageUrl || '',
      thumbnail_url: formData.thumbnailUrl || '',
      display_order: formData.displayOrder ?? 0,
    };
  },
};

export default locationImageMapper;
