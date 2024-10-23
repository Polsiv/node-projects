const Historial = require('../models/historialFutbolista');  // Importar el modelo Historial

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Asegúrate de importar ObjectId


const obtenerContratacionPorId = async (req, res = response) => {
    const { id } = req.params;  // ID del futbolista o historial
    console.log('ID del futbolista desde la petición:', id); // Log para depuración

    // Verificar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            Ok: false,
            resp: 'ID de futbolista no válido'
        });
    }

    try {
        const objectId = new mongoose.Types.ObjectId(id); // Crear el ObjectId
        console.log('Buscando historial con ObjectId:', objectId); // Log del ObjectId que se busca

        const historial = await Historial.findOne({ 'idfutbolista': objectId })
            .populate({
                path: 'contrataciones.idequipo',  // Poblar con datos de la colección "Equipos"
                select: 'equiponombre pais',  // Solo seleccionar el nombre y país del equipo
            });

        if (!historial) {
            console.log('Historial no encontrado'); // Log adicional para depuración
            return res.status(404).json({
                Ok: false,
                resp: 'Historial no encontrado para este futbolista'
            });
        }

        const contratacionesConDetalles = historial.contrataciones.flatMap((contratacion) => {
            return contratacion.map((contrato) => {
                const equipo = contrato.idequipo || {};
                return {
                    equipo: {
                        nombre: equipo.equiponombre || 'No disponible',
                        pais: equipo.pais || 'No disponible'
                    },
                    fechaInicio: contrato.fechaInicio,
                    fechaFinal: contrato.fechaFinal
                };
            });
        });

        res.json({
            Ok: true,
            resp: contratacionesConDetalles
        });
    } catch (error) {
        console.error('Error al buscar historial:', error);
        res.status(500).json({
            Ok: false,
            resp: 'Error al obtener las contrataciones',
            error: error.message || error
        });
    }
};

module.exports = {
    obtenerContratacionPorId
}