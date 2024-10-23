const { Router } = require('express');
const { check } = require("express-validator");
const { obtenerFutbolistas, obtenerFutbolistaId, crearFutbolistaPost, actualizarFutbolistaPut, borrarFutbolistaDelete } = require('../controllers/futbolista');
const { validarCampos } = require("../middlewares/validar-campos")
const { existeFutbolistaPorId }= require("../helpers/db-validators")

const router = Router();

router.get('/', obtenerFutbolistas );
router.delete('/:id', borrarFutbolistaDelete)

router.get('/:id',
    [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeFutbolistaPorId),
    validarCampos,
    ],
    obtenerFutbolistaId);

router.put('/:id', actualizarFutbolistaPut)

router.post('/', [
        //validarJWT,
        //check('nombre','El nombre del heroe es obligatorio').not().isEmpty(),
        validarCampos
    ], crearFutbolistaPost );

module.exports = router;