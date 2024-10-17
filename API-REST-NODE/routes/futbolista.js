const { Router } = require('express');
const { check } = require("express-validator");
const { obtenerFutbolistas, obtenerFutbolistaId } = require('../controllers/futbolista');
const { validarCampos } = require("../middlewares/validar-campos")
const { existeFutbolistaPorId }= require("../helpers/db-validators")

const router = Router();

router.get('/', obtenerFutbolistas );

router.get('/:id',
    [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeFutbolistaPorId),
    validarCampos,
    ],
    obtenerFutbolistaId);

module.exports = router;