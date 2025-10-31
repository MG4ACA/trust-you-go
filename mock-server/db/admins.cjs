// mock-server/db/admins.cjs
const admins = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@trustyougo.com',
    password: 'admin123',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'super_admin',
    isActive: true,
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-10-21T08:00:00.000Z',
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@trustyougo.com',
    password: 'manager123',
    firstName: 'Travel',
    lastName: 'Manager',
    role: 'admin',
    isActive: true,
    createdAt: '2025-02-10T10:00:00.000Z',
    updatedAt: '2025-10-15T08:00:00.000Z',
  },
  {
    id: '3',
    username: 'staff',
    email: 'staff@trustyougo.com',
    password: 'staff123',
    firstName: 'Office',
    lastName: 'Staff',
    role: 'manager',
    isActive: true,
    createdAt: '2025-03-05T10:00:00.000Z',
    updatedAt: '2025-09-20T08:00:00.000Z',
  },
];

module.exports = { admins };
