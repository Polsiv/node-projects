const instance = require('../../database/Neo4JDbConnection')

const deporte = instance.model('Deporte', {
    nombre: {
        type: 'string',
        required: true,
    },
    pais_origen: {
        type: '',
        required: true,
    },

    // deporte -> equipos
    la_razon_de: {
        type: 'relatioship',
        target: 'Equipo',
        relationship: 'la_razon-de',
        direction: 'out',
        eager: 'true'
    },
});

module.exports = deporte;
