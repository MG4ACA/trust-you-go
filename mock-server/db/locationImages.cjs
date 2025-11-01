// mock-server/db/locationImages.cjs
const locationImages = [
  {
    image_id: '1',
    location_id: '1',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/sigiriya-main.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/thumbs/sigiriya-main.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T10:30:00.000Z',
  },
  {
    image_id: '2',
    location_id: '1',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/sigiriya-view.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/thumbs/sigiriya-view.jpg',
    display_order: 1,
    uploaded_at: '2025-01-10T10:31:00.000Z',
  },
  {
    image_id: '3',
    location_id: '1',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/sigiriya-frescoes.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/1/thumbs/sigiriya-frescoes.jpg',
    display_order: 2,
    uploaded_at: '2025-01-10T10:32:00.000Z',
  },
  {
    image_id: '4',
    location_id: '2',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/2/temple-exterior.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/2/thumbs/temple-exterior.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T11:00:00.000Z',
  },
  {
    image_id: '5',
    location_id: '2',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/2/temple-interior.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/2/thumbs/temple-interior.jpg',
    display_order: 1,
    uploaded_at: '2025-01-10T11:01:00.000Z',
  },
  {
    image_id: '6',
    location_id: '3',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/yala-leopard.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/thumbs/yala-leopard.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T12:00:00.000Z',
  },
  {
    image_id: '7',
    location_id: '3',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/yala-elephant.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/thumbs/yala-elephant.jpg',
    display_order: 1,
    uploaded_at: '2025-01-10T12:01:00.000Z',
  },
  {
    image_id: '8',
    location_id: '3',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/yala-landscape.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/3/thumbs/yala-landscape.jpg',
    display_order: 2,
    uploaded_at: '2025-01-10T12:02:00.000Z',
  },
  {
    image_id: '9',
    location_id: '4',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/4/galle-fort-main.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/4/thumbs/galle-fort-main.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T13:00:00.000Z',
  },
  {
    image_id: '10',
    location_id: '5',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/5/tea-plantations.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/5/thumbs/tea-plantations.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T14:00:00.000Z',
  },
  {
    image_id: '11',
    location_id: '6',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/6/mirissa-beach.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/6/thumbs/mirissa-beach.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T15:00:00.000Z',
  },
  {
    image_id: '12',
    location_id: '7',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/7/grand-hotel.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/7/thumbs/grand-hotel.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T16:00:00.000Z',
  },
  {
    image_id: '13',
    location_id: '8',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/8/jetwing-yala.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/8/thumbs/jetwing-yala.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T17:00:00.000Z',
  },
  {
    image_id: '14',
    location_id: '9',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/9/fortress-galle.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/9/thumbs/fortress-galle.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T18:00:00.000Z',
  },
  {
    image_id: '15',
    location_id: '10',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/10/heritage-restaurant.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/10/thumbs/heritage-restaurant.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T19:00:00.000Z',
  },
  {
    image_id: '16',
    location_id: '11',
    image_url: 'https://trust-you-go-bucket.s3.amazonaws.com/locations/11/safari-jeep.jpg',
    thumbnail_url:
      'https://trust-you-go-bucket.s3.amazonaws.com/locations/11/thumbs/safari-jeep.jpg',
    display_order: 0,
    uploaded_at: '2025-01-10T20:00:00.000Z',
  },
];

module.exports = { locationImages };
