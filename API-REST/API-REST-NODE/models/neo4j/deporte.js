const instance = require('../../database/Neo4JDbConnection')
const { v4: uuidv4 } = require('uuid');

const Deporte = instance.model('Deporte', {
    id_deporte: {
        type: 'string',
        required: true,
        primary: true, 
        default: () => uuidv4(), 
    },
    nombre: {
        type: 'string',
        required: true,
    },
    pais_origen: {
        type: 'string',
        required: true,
    },

    // deporte -> equipos
    la_razon_de: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'la_razon_de',
        direction: 'out',
        eager: 'true'
    },
    
    //nodos
    equipos: {
        type: 'nodes',
        target: 'Equipo',
        relationship: 'la_razon_de',
        direction: 'out',
        eager: 'true'
    },
});

module.exports = Deporte;
