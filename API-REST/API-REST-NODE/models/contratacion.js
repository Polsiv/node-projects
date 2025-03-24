const { Schema, model } = require('mongoose');

const ContratacionSchema = Schema({
    id_equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    id_futbolista: {
        type: Schema.Types.ObjectId,
        ref: 'Futbolista',
        required: true
    },
    fechaContratacion: {
        type: String,
        required: [true, 'La fecha de inicio es obligatoria'],
    },
    fechaFinalizacion: {
        type: String,
        required: [true, 'La fecha de finalización es obligatoria'],
    }
}, { collection: 'contrataciones' });

ContratacionSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
};

module.exports = model('Contratacion', ContratacionSchema); // Asegúrate de que el nombre sea correcto
