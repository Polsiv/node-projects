const { Equipo } = require("../models/");
const { Futbolista } = require("../models/")

const existeEquipoPorId = async (id) => {
    const existeEquipo = await Equipo.findById(id);
    if (!existeEquipo) {
        throw new Error(`El id del Equipo no existe ${id}`);
    }
};

const existeFutbolistaPorId = async (id) => {
    const existeFutbolista = await Futbolista.findById(id);
    if (!existeFutbolista) {
        throw new Error(`El id del futbolista no existe mi papacho ${id}`);
    }
};



module.exports = {
    existeEquipoPorId, existeFutbolistaPorId
};




