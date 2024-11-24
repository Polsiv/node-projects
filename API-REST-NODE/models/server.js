const express = require('express')
const cors = require('cors')

const { bdmysql } = require('../database/MariaDbConnection');
const { dbConnectionMongo } = require('../database/MongoDbConnection')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
null;

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
            
            deportistas_futbol: '/api/neo/futbol/deportistas/',
            deportistas_ciclismo: '/api/neo/ciclismo/deportistas/',
            equipos_futbol: '/api/neo/futbol/equipos',
            equipos_ciclismo: '/api/neo/ciclismo/equipos',
            contratacion: '/api/neo/contrataciones',
            pais: '/api/neo/paises'

        }

        // this.dbConnectionMySql(); EN LA JUEGA QUE ESTE ES LA CONEXION A LA BASE DE DATOS LOCAL HPTA
        
        //Aqui me conecto a la BD
        //this.dbConnecionMongo();

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

    routes() {
    
        this.app.use(this.pathsNeo4j.deportistas_futbol, require('../routes/neo4j/deportistafutbol'))
        this.app.use(this.pathsNeo4j.deportistas_ciclismo, require('../routes/neo4j/deportistacliclismo'))
        this.app.use(this.pathsNeo4j.equipos_futbol, require('../routes/neo4j/equipofutbol'))
        this.app.use(this.pathsNeo4j.equipos_ciclismo, require('../routes/neo4j/equipociclismo'))
        this.app.use(this.pathsNeo4j.pais, require('../routes/neo4j/pais'))
    
        // outer routes
        this.app.use(this.pathsMongo.futbolistas, require('../routes/futbolista'));
        this.app.use(this.pathsMongo.equipos, require('../routes/equipo'));
        this.app.use(this.pathsMongo.contrataciones, require('../routes/contrataciones'));
        this.app.use(this.pathsMySql.usuario, require('../routes/usuario'));
        this.app.use(this.pathsMySql.persona, require('../routes/persona'));
        this.app.use(this.pathsMySql.ciudad, require('../routes/ciudad'));
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
