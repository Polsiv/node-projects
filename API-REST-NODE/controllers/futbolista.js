const { Futbolista } = require("../models");

const obtenerFutbolistas = async (req, res = response) => {
  const {desde = 0 } = req.query;

  try {
    const [total, futbolistas] = await Promise.all([
      Futbolista.countDocuments(),
      Futbolista.find({})
        .skip(Number(desde))
        .sort({nombre:1})
    ]);
    
    res.json({ Ok: true, total: total, resp: futbolistas });
    
  } catch (error) {
    console.log("ERROR",error);
    res.json({ Ok: false, resp: error });
  }
};


const obtenerFutbolistaId = async (req, res = response) => {
    const { id } = req.params;
    try {
      const equipo = await Futbolista.findById(id);
       
      res.json({ Ok: true, resp: equipo });
    } catch (error) {
      res.json({ Ok: false, resp: error });
    }  
};


module.exports = {
    obtenerFutbolistas, obtenerFutbolistaId
  };