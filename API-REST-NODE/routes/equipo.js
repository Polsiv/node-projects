const { Router } = require("express");
//const { check } = require("express-validator");



const { obtenerEquiposGet } = require("../controllers/equipo")


const router = Router();


router.get('/', obtenerEquiposGet)

module.exports = router