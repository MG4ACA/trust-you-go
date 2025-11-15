// mock-server/controllers/populateLocation.cjs
const locationImagesData = require('../db/locationImages.cjs');

function populateLocation(location) {
  const locationId = location.id;

  // Ensure locationImages data is an array
  const locationImagesArray = Array.isArray(locationImagesData.locationImages)
    ? locationImagesData.locationImages
    : [];

  // Get images for this location
  const images = locationImagesArray
    .filter((img) => img.locationId === locationId)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      thumbnailUrl: img.thumbnailUrl,
      displayOrder: img.displayOrder,
      uploadedAt: img.uploadedAt,
    }));

  return {
    ...location,
    images: images,
  };
}

module.exports = populateLocation;
