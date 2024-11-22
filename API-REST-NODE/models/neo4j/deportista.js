const instance = require('../../database/Neo4JDbConnection')

instance.model('Deportista', {
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
    partidos: {
        type: 'int',
        required: false,
    },
    titulos: {
        type: 'int',
        required: false,
    }
});

module.exports = instance;
