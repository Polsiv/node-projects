const { Router } = require('express');
const { check } = require("express-validator");
const { obtenerFutbolistas, obtenerFutbolistaId, crearFutbolistaPost } = require('../controllers/futbolista');
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

router.post('/', [
        //validarJWT,
        //check('nombre','El nombre del heroe es obligatorio').not().isEmpty(),
        validarCampos
    ], crearFutbolistaPost );

module.exports = router;