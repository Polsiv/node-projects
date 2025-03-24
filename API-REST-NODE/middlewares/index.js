const validaCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');


module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivo    
}