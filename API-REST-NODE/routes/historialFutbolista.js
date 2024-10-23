const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos")
const { existeFutbolistaPorId }= require("../helpers/db-validators")
const { obtenerContratacionPorId } = require("../controllers/historialFutbolista")


const router = Router();

router.get('/:id',
    [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeFutbolistaPorId ),
    validarCampos,
    ],
    obtenerContratacionPorId );

module.exports = router;