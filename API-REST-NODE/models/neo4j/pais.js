const instance = require('../../database/Neo4JDbConnection')
const { v4: uuidv4 } = require('uuid');

const Pais = instance.model('Pais', {
    id_pais: {
        type: 'string',
        required: true,
        primary: true, 
        default: () => uuidv4(), 
    },
    
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
    },

    equipos: {
        type: 'nodes',
        target: 'Equipo',
        relationship: 'lugar_de_origen',
        direction: 'out',
        eager: 'true'
    }
});

module.exports = Pais;
