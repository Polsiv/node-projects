var Router = require('express');

const { agregarEquipo, getEquiposFutbol } = require('../../controllers/neo4j/equipo')

const router = Router();
router.post('/', agregarEquipo)
router.get('/', getEquiposFutbol)
module.exports = router