const {Equipo} = require("../models");

const obtenerEquiposGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    try {
      const [total, equipos] = await Promise.all([
        Equipo.countDocuments(),
        Equipo.find({})
          .skip(Number(desde))
          .sort({nombre:1})
      ]);
 
      res.json({ Ok: true, total: total, resp: equipos });
    } catch (error) {
      res.json({ Ok: false, resp: error });
    }
  };

const obtenerEquipoGet = async (req, res = response) => {
    const { id } = req.params;
    try {
      const equipo = await Equipo.findById(id);
       
      res.json({ Ok: true, resp: equipo });
    } catch (error) {
      res.json({ Ok: false, resp: error });
    }  
};
  

module.exports = {
    obtenerEquiposGet, obtenerEquipoGet
}