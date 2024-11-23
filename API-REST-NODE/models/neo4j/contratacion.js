const instance = require('../../database/Neo4JDbConnection')

instance.model('Contratacion', {
    fecha_inicio: {
        type: 'date',
        required: true,
    },
    fecha_finalizacion: {
        type: 'date',
        required: true,
    },
    valor: {
        type: 'int',
        required: true,
    },

    // contratacion -> deportista
    para_el: {
        type: 'relatioship',
        target: 'Deportista',
        relationship: 'para_el',
        direction: 'out',
        eager: 'true'
    },

    // contratacion -> equipo


    realizada_por: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'realizada_por',
        direction: 'out',
        eager: 'true'
    },


});

module.exports = instance;
