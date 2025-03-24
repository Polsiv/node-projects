require('dotenv').config();
require('./models/neo4j/deporte')
require('./models/neo4j/equipo')
require('./models/neo4j/contratacion')
require('./models/neo4j/pais')
require('./models/neo4j/deportista')

const Server = require('./models/server')
const server = new Server();

server.listen();