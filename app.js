require('dotenv').config();
const Server = require('./models/server');
const { createRoles } = require('./libs/initialSetup');

createRoles();
const server = new Server();



server.listen();