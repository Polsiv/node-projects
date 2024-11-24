const instance = require('../../database/Neo4JDbConnection')
const { v4: uuidv4 } = require('uuid');

const Equipo = instance.model('Equipo', {
    id_equipo: {
        type: 'string',
        required: true,
        primary: true, 
        default: () => uuidv4(), 
    },
    nombre: {
        type: 'string',
        required: true,
    },
    
    titulos: {
        type: 'int',
        required: true,
    },

    estadio: {
        type: 'string',
        required: false,
    },

    especialidad: {
        type: 'string',
        required: false,
    },
   
    // equipo -> contrataciones
    genera_una: {
        type: 'relationship',
        target: 'Contratacion',
        relationship: 'genera_una',
        direction: 'out',
        eager: 'true'
    },

    // equipo -> deportista
    conformado_por: {
        type: 'relationship',
        target: 'Deportista',
        relationship: 'conformado_por',
        direction: 'out',
        eager: 'true'
    },

    // equipos -> deporte
    asignado_a: {
        type: 'relationship',
        target: 'Deporte',
        relationship: 'asignado_a',
        direction: 'out',
        eager: 'true'
    },

    deporte: {
        type: 'node',
        target: 'Deporte',
        relationship: 'fundado_en',
        direction: 'out',
        eager: 'true'
    },

    pais: {
        type: 'node',
        target: 'Pais',
        relationship: 'fundado_en',
        direction: 'out',
        eager: 'true'
    },

    // equipos -> pais
    fundado_en: {
        type: 'relationship',
        target: 'Pais',
        relationship: 'fundado_en',
        direction: 'out',
        eager: 'true'
    }
});

module.exports = Equipo;
