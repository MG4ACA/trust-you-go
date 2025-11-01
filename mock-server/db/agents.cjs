// mock-server/db/agents.cjs
const agents = [
  {
    agent_id: '1',
    name: 'Nimal Perera',
    contact: '+94777654321',
    email: 'nimal.perera@Lanka-tours.com',
    commission_rate: 12.0,
    is_active: true,
    notes: 'Specializes in cultural tours. Based in Kandy. 32 total bookings.',
    created_at: '2024-08-20T10:00:00.000Z',
    updated_at: '2025-10-18T11:15:00.000Z',
  },
  {
    agent_id: '2',
    name: 'Amara Silva',
    contact: '+94712345678',
    email: 'amara.silva@srilankatravel.lk',
    commission_rate: 18.0,
    is_active: true,
    notes:
      'Premium agent based in Galle. Specializes in beach and wildlife tours. 58 total bookings.',
    created_at: '2024-05-10T10:00:00.000Z',
    updated_at: '2025-10-21T09:00:00.000Z',
  },
  {
    agent_id: '3',
    name: 'Priyanka Rathnayake',
    contact: '+94778901234',
    email: 'priyanka.r@paradisetravel.lk',
    commission_rate: 20.0,
    is_active: true,
    notes: 'Expert in hill country tours. Based in Nuwara Eliya. 67 total bookings.',
    created_at: '2024-04-01T10:00:00.000Z',
    updated_at: '2025-10-19T13:45:00.000Z',
  },
];

module.exports = { agents };
