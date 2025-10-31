// mock-server/db/locationImages.cjs
const locationImages = [
  {
    id: '1',
    locationId: '1',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/sigiriya-main.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/thumbs/sigiriya-main.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T10:30:00.000Z',
  },
  {
    id: '2',
    locationId: '1',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/sigiriya-view.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/thumbs/sigiriya-view.jpg',
    displayOrder: 1,
    uploadedAt: '2025-01-10T10:31:00.000Z',
  },
  {
    id: '3',
    locationId: '1',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/sigiriya-frescoes.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/thumbs/sigiriya-frescoes.jpg',
    displayOrder: 2,
    uploadedAt: '2025-01-10T10:32:00.000Z',
  },
  {
    id: '4',
    locationId: '2',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/2/temple-exterior.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/2/thumbs/temple-exterior.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T11:00:00.000Z',
  },
  {
    id: '5',
    locationId: '2',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/2/temple-interior.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/2/thumbs/temple-interior.jpg',
    displayOrder: 1,
    uploadedAt: '2025-01-10T11:01:00.000Z',
  },
  {
    id: '6',
    locationId: '3',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/yala-leopard.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/thumbs/yala-leopard.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T12:00:00.000Z',
  },
  {
    id: '7',
    locationId: '3',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/yala-elephant.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/thumbs/yala-elephant.jpg',
    displayOrder: 1,
    uploadedAt: '2025-01-10T12:01:00.000Z',
  },
  {
    id: '8',
    locationId: '3',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/yala-landscape.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/thumbs/yala-landscape.jpg',
    displayOrder: 2,
    uploadedAt: '2025-01-10T12:02:00.000Z',
  },
  {
    id: '9',
    locationId: '4',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/4/galle-fort-main.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/4/thumbs/galle-fort-main.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T13:00:00.000Z',
  },
  {
    id: '10',
    locationId: '5',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/5/tea-plantations.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/5/thumbs/tea-plantations.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T14:00:00.000Z',
  },
  {
    id: '11',
    locationId: '6',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/6/mirissa-beach.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/6/thumbs/mirissa-beach.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T15:00:00.000Z',
  },
  {
    id: '12',
    locationId: '7',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/7/grand-hotel.jpg',
    thumbnailUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/7/thumbs/grand-hotel.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T16:00:00.000Z',
  },
  {
    id: '13',
    locationId: '8',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/8/jetwing-yala.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/8/thumbs/jetwing-yala.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T17:00:00.000Z',
  },
  {
    id: '14',
    locationId: '9',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/9/fortress-galle.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/9/thumbs/fortress-galle.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T18:00:00.000Z',
  },
  {
    id: '15',
    locationId: '10',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/10/heritage-restaurant.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/10/thumbs/heritage-restaurant.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T19:00:00.000Z',
  },
  {
    id: '16',
    locationId: '11',
    imageUrl: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/11/safari-jeep.jpg',
    thumbnailUrl:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/11/thumbs/safari-jeep.jpg',
    displayOrder: 0,
    uploadedAt: '2025-01-10T20:00:00.000Z',
  },
];

module.exports = { locationImages };
