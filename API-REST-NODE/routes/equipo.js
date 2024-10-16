const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos")
const existeEquipoPorId = require("../helpers/db-validators")

const { obtenerEquiposGet, obtenerEquipoGet } = require("../controllers/equipo")


const router = Router();


router.get('/', obtenerEquiposGet)


router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    //check('id').custom( existeEquipoPorId ),
    validarCampos,
], obtenerEquipoGet );



module.exports = router