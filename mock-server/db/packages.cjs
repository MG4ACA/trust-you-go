// mock-server/db/packages.cjs
const packages = [
  {
    id: '1',
    title: 'Cultural Triangle Explorer',
    description:
      "7-day journey through Sri Lanka's ancient cities including Sigiriya, Polonnaruwa, and Anuradhapura. Explore UNESCO World Heritage Sites.",
    no_of_days: 7,
    base_price: 850,
    is_template: false,
    is_active: true,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-10-30T08:53:29.398Z',
  },
  {
    id: '2',
    title: 'Beach & Wildlife Adventure',
    description:
      '10-day coastal and wildlife experience. Safari in Yala, relax on pristine beaches, and explore Galle Fort.',
    no_of_days: 10,
    base_price: 1250,
    is_template: false,
    is_active: true,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-10-10T14:00:00.000Z',
  },
  {
    id: '3',
    title: 'Hill Country Tea Experience',
    description:
      "5-day exploration of Sri Lanka's picturesque hill country. Visit tea plantations, waterfalls, and charming colonial towns.",
    no_of_days: 5,
    base_price: 650,
    is_template: false,
    is_active: true,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-10-10T14:00:00.000Z',
  },
  {
    id: '4',
    title: 'Complete Sri Lanka',
    description:
      '14-day comprehensive tour covering culture, wildlife, beaches, and hill country. The ultimate Sri Lankan experience.',
    no_of_days: 14,
    base_price: 1850,
    is_template: true,
    is_active: true,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-10-10T14:00:00.000Z',
  },
  {
    id: '5',
    title: 'Weekend Getaway - Kandy & Nuwara Eliya',
    description:
      "3-day quick escape to Sri Lanka's cultural and scenic hill country. Perfect for short trips.",
    no_of_days: 3,
    base_price: 380,
    is_template: true,
    is_active: true,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-10-30T09:05:07.527Z',
  },
];

module.exports = { packages };
