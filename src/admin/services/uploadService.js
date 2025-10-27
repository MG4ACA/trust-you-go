/**
 * Upload Service
 * Handles file uploads to S3 bucket
 * 
 * NOTE: This is a mock implementation for development.
 * In production, this should:
 * 1. Get pre-signed URLs from backend API
 * 2. Upload directly to S3 using pre-signed URLs
 * 3. Return the final S3 URLs
 * 
 * AWS S3 Configuration Required:
 * - Bucket: trust-you-go-bucket
 * - Region: us-east-1 (or your preferred region)
 * - CORS enabled for your domain
 * - Public read access for location-images folder
 */

import apiClient from './api';

const MOCK_S3_BASE_URL = 'https://trust-you-go-bucket.s3.amazonaws.com';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * Validate image file
 */
const validateImage = (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit.');
  }

  return true;
};

/**
 * Generate mock S3 URL for development
 * In production, this would be replaced with actual S3 upload
 */
const generateMockS3Url = (locationId, fileName) => {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-z0-9.]/gi, '-').toLowerCase();
  return `${MOCK_S3_BASE_URL}/locations/${locationId}/${timestamp}-${sanitizedFileName}`;
};

/**
 * Generate thumbnail URL (mock)
 * In production, this would be handled by S3 Lambda or CloudFront
 */
const generateThumbnailUrl = (imageUrl) => {
  const parts = imageUrl.split('/');
  const fileName = parts.pop();
  return `${parts.join('/')}/thumbs/${fileName}`;
};

/**
 * Upload image to S3
 * @param {File} file - Image file to upload
 * @param {string} locationId - Location ID for organizing files
 * @returns {Promise<{imageUrl: string, thumbnailUrl: string}>}
 */
export const uploadLocationImage = async (file, locationId) => {
  try {
    validateImage(file);

    // MOCK: Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // MOCK: Generate S3 URLs
    const imageUrl = generateMockS3Url(locationId, file.name);
    const thumbnailUrl = generateThumbnailUrl(imageUrl);

    // TODO: In production, implement actual S3 upload:
    // 1. Request pre-signed URL from backend
    // const { data } = await apiClient.post('/upload/presigned-url', {
    //   fileName: file.name,
    //   fileType: file.type,
    //   locationId,
    // });
    //
    // 2. Upload to S3 using pre-signed URL
    // await fetch(data.uploadUrl, {
    //   method: 'PUT',
    //   body: file,
    //   headers: { 'Content-Type': file.type },
    // });
    //
    // 3. Return final S3 URLs
    // return {
    //   imageUrl: data.imageUrl,
    //   thumbnailUrl: data.thumbnailUrl,
    // };

    return {
      imageUrl,
      thumbnailUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

/**
 * Upload multiple images for a location
 * @param {File[]} files - Array of image files
 * @param {string} locationId - Location ID
 * @returns {Promise<Array<{imageUrl: string, thumbnailUrl: string}>>}
 */
export const uploadLocationImages = async (files, locationId) => {
  try {
    if (!files || files.length === 0) {
      return [];
    }

    if (files.length > 10) {
      throw new Error('Maximum 10 images allowed per location');
    }

    // Upload all images in parallel
    const uploadPromises = files.map((file) => uploadLocationImage(file, locationId));
    const results = await Promise.all(uploadPromises);

    return results;
  } catch (error) {
    console.error('Batch upload error:', error);
    throw error;
  }
};

/**
 * Delete image from S3
 * @param {string} imageUrl - S3 image URL to delete
 * @returns {Promise<void>}
 */
export const deleteLocationImage = async (imageUrl) => {
  try {
    // MOCK: Simulate delete delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: In production, implement actual S3 delete:
    // await apiClient.delete('/upload/image', {
    //   data: { imageUrl },
    // });

    console.log('Deleting image:', imageUrl);
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

/**
 * Save location images metadata to database
 * @param {string} locationId - Location ID
 * @param {Array<{imageUrl: string, thumbnailUrl: string, displayOrder: number}>} images
 * @returns {Promise<any>}
 */
export const saveLocationImagesMetadata = async (locationId, images) => {
  try {
    const imagesWithMetadata = images.map((img, index) => ({
      locationId,
      imageUrl: img.imageUrl,
      thumbnailUrl: img.thumbnailUrl,
      displayOrder: img.displayOrder ?? index,
      uploadedAt: new Date().toISOString(),
    }));

    // Save to mock database
    const savePromises = imagesWithMetadata.map((imageData) =>
      apiClient.post('/location_images', imageData)
    );

    const results = await Promise.all(savePromises);
    return results.map((res) => res.data);
  } catch (error) {
    console.error('Save images metadata error:', error);
    throw error;
  }
};

/**
 * Get all images for a location
 * @param {string} locationId - Location ID
 * @returns {Promise<Array>}
 */
export const getLocationImages = async (locationId) => {
  try {
    const response = await apiClient.get(`/location_images?locationId=${locationId}&_sort=displayOrder&_order=asc`);
    return response.data;
  } catch (error) {
    console.error('Get location images error:', error);
    throw error;
  }
};

/**
 * Delete location image metadata
 * @param {string} imageId - Image record ID
 * @returns {Promise<void>}
 */
export const deleteLocationImageMetadata = async (imageId) => {
  try {
    await apiClient.delete(`/location_images/${imageId}`);
  } catch (error) {
    console.error('Delete image metadata error:', error);
    throw error;
  }
};

/**
 * Update image display order
 * @param {string} imageId - Image ID
 * @param {number} displayOrder - New display order
 * @returns {Promise<any>}
 */
export const updateImageDisplayOrder = async (imageId, displayOrder) => {
  try {
    const response = await apiClient.patch(`/location_images/${imageId}`, { displayOrder });
    return response.data;
  } catch (error) {
    console.error('Update image order error:', error);
    throw error;
  }
};

export default {
  uploadLocationImage,
  uploadLocationImages,
  deleteLocationImage,
  saveLocationImagesMetadata,
  getLocationImages,
  deleteLocationImageMetadata,
  updateImageDisplayOrder,
};
