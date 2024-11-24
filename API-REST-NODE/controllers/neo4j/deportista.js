const Deportista = require('../../models/neo4j/deportista');
const { filtroFutbolista, filtroCiclista } = require('../../helpers/filtros')

const agregarDeportista = async (req, res) => {
    const { nombres, apellidos, fecha_nacimiento, sexo, partidos, titulos, deporte } = req.body;
    try {
        const payload = {
            nombres, apellidos, fecha_nacimiento, sexo, deporte,
            // include if defined (ONLY)
            ...(titulos !== undefined && { titulos }), 
            ...(partidos !== undefined && { partidos }) 
        };
        await Deportista.create(payload);

        res.status(201).json({
            ok: true, 
            msg: "Deporista created!",
        });
    } catch (error) {
        console.error('Error adding Deportista:', error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to add Deportista',
        });
    }
};


const getFutbolistas = async (req, res) => {
    try {
        const collection = await Deportista.all({ deporte: 'futbol' });
        const deportistas = filtroFutbolista(collection);
        res.status(200).json({
            ok: true,
            data: deportistas,
        });
    } catch (error) {
        console.error('Error al traer los futbolistas', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al traer los futbolistas',
        });
    }
};

const getCiclistas = async (req, res) => {
    try {
        const collection = await Deportista.all({ deporte: 'ciclismo' });
        const deportistas = filtroCiclista(collection);
        res.status(200).json({
            ok: true,
            data: deportistas,
        });
    } catch (error) {
        console.error('Error al traer los ciclistas', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al traer los ciclistas'
        });
    }
};


module.exports = { agregarDeportista, getCiclistas, getFutbolistas };
