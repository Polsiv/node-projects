const { Equipo } = require("../models");

const existeEquipoPorId = async (id) => {
    // Verificar si el correo existe
    const existeEquipo = await Equipo.findById(id);
    if (!existeEquipo) {
        throw new Error(`El id del Equipo no existe ${id}`);
    }
};

module.exports = {
    existeEquipoPorId
};




