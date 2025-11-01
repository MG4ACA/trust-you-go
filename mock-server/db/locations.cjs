// mock-server/db/locations.cjs
const locations = [
  {
    location_id: '1',
    name: 'Sigiriya Rock Fortress',
    description:
      'Ancient rock fortress and palace ruins, UNESCO World Heritage Site. Features stunning frescoes and landscaped gardens.',
    location_type: 'tourist_spot',
    location_url: 'https://maps.google.com/maps?q=Sigiriya+Rock+Fortress',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '2',
    name: 'Temple of the Tooth',
    description:
      'Sacred Buddhist temple housing a tooth relic of Buddha. Located in the royal palace complex of Kandy.',
    location_type: 'tourist_spot',
    location_url: 'https://maps.google.com/maps?q=Temple+of+the+Tooth+Kandy',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '3',
    name: 'Yala National Park',
    description:
      'Premier wildlife sanctuary known for leopards, elephants, and diverse bird species. Safari destination.',
    location_type: 'tourist_spot',
    location_url: 'https://maps.google.com/maps?q=Yala+National+Park',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '4',
    name: 'Galle Fort',
    description:
      'Historic fort built by Portuguese and fortified by Dutch. Picturesque streets, cafes, and colonial architecture.',
    location_type: 'tourist_spot',
    location_url: 'https://maps.google.com/maps?q=Galle+Fort',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '5',
    name: 'Nuwara Eliya Tea Plantations',
    description:
      "Lush tea estates in Sri Lanka's hill country. Cool climate, British colonial architecture, and scenic views.",
    location_type: 'tourist_spot',
    location_url: 'https://maps.google.com/maps?q=Nuwara+Eliya+Tea+Plantations',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '6',
    name: 'Mirissa Beach',
    description:
      'Pristine beach destination perfect for whale watching, surfing, and relaxation. Crystal clear waters.',
    location_type: 'tourist_spot',
    location_url: 'https://maps.google.com/maps?q=Mirissa+Beach',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '7',
    name: 'Grand Hotel Kandy',
    description:
      'Luxury colonial hotel overlooking Kandy Lake with traditional Sri Lankan architecture.',
    location_type: 'accommodation',
    location_url: 'https://maps.google.com/maps?q=Grand+Hotel+Kandy',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '8',
    name: 'Jetwing Yala',
    description:
      'Luxury safari lodge located within Yala National Park with wildlife viewing opportunities.',
    location_type: 'accommodation',
    location_url: 'https://maps.google.com/maps?q=Jetwing+Yala',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '9',
    name: 'The Fortress Galle',
    description: 'Boutique hotel located within the historic Galle Fort walls.',
    location_type: 'accommodation',
    location_url: 'https://maps.google.com/maps?q=The+Fortress+Galle',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '10',
    name: 'Heritage Restaurant Kandy',
    description: 'Traditional Sri Lankan cuisine in a colonial setting overlooking the lake.',
    location_type: 'restaurant',
    location_url: 'https://maps.google.com/maps?q=Heritage+Restaurant+Kandy',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
  {
    location_id: '11',
    name: 'Safari Jeep Tour',
    description: 'Guided wildlife safari through Yala National Park in an open jeep.',
    location_type: 'activity',
    location_url: 'https://maps.google.com/maps?q=Yala+Safari+Jeep+Tour',
    is_active: true,
    created_at: '2025-01-10T10:00:00.000Z',
    updated_at: '2025-10-15T14:00:00.000Z',
  },
];

module.exports = { locations };
