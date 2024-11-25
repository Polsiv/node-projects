const instance = require('../../database/Neo4JDbConnection')
const { v4: uuidv4 } = require('uuid');

const Deportista = instance.model('Deportista', {
    id_deportista: {
        type: 'string',
        required: true,
        primary: true, 
        default: () => uuidv4(), 
    },
    nombres: {
        type: 'string',
        required: true,
    },
    apellidos: {
        type: 'string',
        required: true,
    },
    fecha_nacimiento: {
        type: 'date',
        required: true,
    },
    sexo: {
        type: 'string',
        required: true,
        valid: ['masculino', 'femenino']
    },
    partidos: {
        type: 'int',
        required: false,
    },
    titulos: {
        type: 'int',
        required: false,
    },

    deporte: {
        type: 'string',
        required: true,  
        valid: ['Futbol', 'Ciclismo']
    },

    // deportista -> pais
    nacido_en: {
        type: 'relationship',
        target: 'Pais',
        relationship: 'nacido_en',
        direction: 'out',
        properties: {
            fecha_nacimiento: 'date',
            ciudad_de_nacimiento: 'string'
        },
        eager: 'true'
    },

    // deportista -> Contrataciion
    tiene_una: {
        type: 'relationship',
        target: 'Contratacion',
        relationship: 'tiene_una',
        direction: 'out',
        eager: 'true'
    },

    // deportista -> equipos
    pertenece_a: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'pertenece_e',
        direction: 'out',
        properties: {
            fecha_de_vinculacion: 'date'
        },
        eager: 'true'
    },

    //nodes
    contratacion: {
        type: 'node',
        target: 'Contratacion',
        relationship: 'tiene_una',
        direction: 'out',
        eager: 'true'
    },
    pais: {
        type: 'node',
        target: 'Pais',
        relationship: 'nacido_en',
        direction: 'out',
        eager: 'true'
    },

    equipo: {
        type: 'node',
        target: 'Equipo',
        relationship: 'pertenece_a',
        direction: 'out',
        eager: 'true'
    }
});

module.exports = Deportista;
