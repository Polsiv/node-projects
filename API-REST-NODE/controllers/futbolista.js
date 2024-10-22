const { Futbolista } = require("../models");
const { Equipo } = require("../models/");

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

const crearFutbolistaPost = async (req, res = response) => {


  const body = req.body;
  errorEquipo = ""
  try {
    
    const equipoDB = await Equipo.findById(body.id_equipo);

    if (!equipoDB) {
      return res
      //.status(400)
      .json({
        Ok: false,
        msg: `El Equipo ${body.equiponombre}, No existe`,
      });
    }
  
  
    const futbolista = new Futbolista(body);


    // Guardar DB
    await futbolista.save();

    res
    //.status(201)
    .json({ Ok: true, msg: 'Futbolista Insertado', resp: futbolista});
  } catch (error) {
    //console.log("ERROR:INSERTAR",error);


    res.json({ Ok: false, msg: errorEquipo, resp: error });
  }
};


module.exports = {
    obtenerFutbolistas, obtenerFutbolistaId, crearFutbolistaPost
  };