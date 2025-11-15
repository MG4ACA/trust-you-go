// mock-server/server.cjs
const jsonServer = require('json-server');
console.log('Creating server...');
const server = jsonServer.create();
console.log('Loading database...');
const router = jsonServer.router(require('./db/db.cjs')()); // Initialize with empty DB

// Middleware
console.log('Setting up middleware...');
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

// Load routes
console.log('Loading routes...');
require('./router/router.cjs')(server, router.db);

// Start server
console.log('Starting server...');
// Start server
server.listen(3001, () => console.log('Mock server running on http://localhost:3001'));
