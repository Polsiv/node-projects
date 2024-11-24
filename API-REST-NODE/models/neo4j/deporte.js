const instance = require('../../database/Neo4JDbConnection')

const Deporte = instance.model('Deporte', {
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

    pais: {
        type: 'node',
        target: 'Pais',
        relationship: 'la_razon_de',
        direction: 'out',
        eager: 'true'
    }
});

module.exports = Deporte;
