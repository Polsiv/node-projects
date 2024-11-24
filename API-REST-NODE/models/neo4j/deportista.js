const instance = require('../../database/Neo4JDbConnection')


const Deportista = instance.model('Deportista', {
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
        valid: ['futbol', 'ciclismo']
    },

    // deportista -> pais
    nacido_en: {
        type: 'relatioship',
        target: 'Pais',
        relationship: 'nacido_en',
        direction: 'out',
        properties: {
            fecha_de_vinculacion: 'date',
            lugar_de_nacimiento: 'string'
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

        }
    }


});

module.exports = Deportista;
