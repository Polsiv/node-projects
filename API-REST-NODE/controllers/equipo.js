const Equipo = require('../models/equipo.model'); 
const obtenerEquiposGet = async (req, res) => {
    try {
        const equipos = await Equipo.find(); 
        console.log('Equipos found:', equipos);

        res.json({
            equipos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error fetching equipos'
        });
    }
};


module.exports = {
    obtenerEquiposGet
};
