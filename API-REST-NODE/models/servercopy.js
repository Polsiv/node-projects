const express = require('express')
const cors = require('cors')

const { bdmysql } = require('../database/MariaDbConnection');
const { dbConnectionMongo } = require('../database/MongoDbConnection')
const { dbConnectionNeo4j } = require('../database/Neo4JDbConnection')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.neo4jDriver = null;

        this.pathsMySql = {
            auth: '/api/auth',
            persona: '/api/persona',
            usuario: '/api/usuario',
            ciudad: '/api/ciudad',
        }

        this.pathsMongo = {
            equipos: '/api/equipos',
            futbolistas: '/api/futbolistas',
            contrataciones: '/api/contrataciones'
        }

        this.pathsNeo4j = {
            deportistas: '/api/neo/deportistas',
            equipos: '/api/neo/equipos',
            contratacion: '/api/neo/contrataciones',
            pais: '/api/neo/paises'

        }


        //Aqui me conecto a la BD
        // this.dbConnectionMySql(); EN LA JUEGA QUE ESTE ES LA CONEXION A LA BASE DE DATOS LOCAL HPTA
        this.dbConnecionMongo();
        //this.dbConnectionNeo4j()

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async dbConnectionMySql() {
        try {
            await bdmysql.authenticate();
            console.log('Connection OK a MySQL.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }

    async dbConnecionMongo(){
        await  dbConnectionMongo();
    }

    async dbConnectionNeo4j() {
        try {
            const driver = await dbConnectionNeo4j(); // Await the Neo4j connection
            console.log('Connection OK to Neo4j.');
        } catch (error) {
            console.error('Failed to connect to Neo4j DB:', error);
        }
    }
    routes() {

    //neo4j routes

    this.app.use(this.dbConnectionNeo4j, require('../routes/neodeportista'))

    // outer routes
    this.app.use(this.pathsMySql.persona, require('../routes/persona'));
    this.app.use(this.pathsMySql.usuario, require('../routes/usuario'));
    this.app.use(this.pathsMySql.ciudad, require('../routes/ciudad'));
    this.app.use(this.pathsMongo.equipos, require('../routes/equipo'));
    this.app.use(this.pathsMongo.futbolistas, require('../routes/futbolista'));
    this.app.use(this.pathsMongo.contrataciones, require('../routes/contrataciones'));
    }

    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
