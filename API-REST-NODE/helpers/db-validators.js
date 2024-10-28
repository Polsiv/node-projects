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

const existeFutbolistaPorIdEquipo = async (id) => {
    const [total, equipos] = await Promise.all([
        Futbolista.countDocuments({id_equipo:id}),
        Futbolista.find({id_equipo:id})]);
    
    if (total>0) {
        throw new Error(`No se puede borrar el equipo, el equipo tiene ${total} jugadores`);
    }
};

module.exports = {
    existeEquipoPorId, existeFutbolistaPorId, existeFutbolistaPorIdEquipo
};




