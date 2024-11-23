const instance = require('../../database/Neo4JDbConnection')

const pais = instance.model('Pais', {
    nombre: {
        type: 'string',
        required: true,
    },

    // pais -> Deportista
    lugar_de_nacimiento_de: {
        type: 'relationship',
        target: 'Deportista',
        relationship: 'lugar_de_nacimiento_de',
        direction: 'out',
        eager: 'true'
    },

    // pais -> equipo
    lugar_de_origen: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'lugar_de_origen',
        direction: 'out',
        eager: 'true'
    }
});

module.exports = pais;
