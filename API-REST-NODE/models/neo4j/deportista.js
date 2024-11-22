const instance = require('../../database/Neo4JDbConnection')

// const instance = new Neode(
//     process.env.NEO4JCONN, 
//     process.env.NEO4JUSER, 
//     process.env.PASS
// );

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
