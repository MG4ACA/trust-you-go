// mock-server/db/admins.cjs
const admins = [
  {
    admin_id: '1',
    email: 'admin@trustyougo.com',
    password_hash: 'admin123',
    name: 'Super Admin',
    contact: '+94705045099',
    is_active: true,
    created_at: '2025-01-15T10:00:00.000Z',
    last_login: '2025-10-21T08:00:00.000Z',
  },
  {
    admin_id: '2',
    email: 'manager@trustyougo.com',
    password_hash: 'manager123',
    name: 'Travel Manager',
    contact: '+94705045099',
    is_active: true,
    created_at: '2025-02-10T10:00:00.000Z',
    last_login: '2025-10-15T08:00:00.000Z',
  },
  {
    admin_id: '3',
    email: 'staff@trustyougo.com',
    password_hash: 'staff123',
    name: 'Office Staff',
    contact: '+94705045099',
    is_active: true,
    created_at: '2025-03-05T10:00:00.000Z',
    last_login: '2025-09-20T08:00:00.000Z',
  },
];

module.exports = { admins };
