const { Schema, model } = require('mongoose');

const mongoose = require('mongoose');

const HistorialSchema = new mongoose.Schema({
    idfutbolista: { type: mongoose.Schema.Types.ObjectId, ref: 'Futbolista', required: true },
    contrataciones: [
        [
            {
                idequipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true },
                fechaInicio: { type: Date, required: true },
                fechaFinal: { type: Date, required: true }
            }
        ]
    ]
});

module.exports = model('Historial', HistorialSchema);
