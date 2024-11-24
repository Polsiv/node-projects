var Router = require('express');

const { agregarEquipo, getEquiposFutbol, getEquipoId, updateEquipo } = require('../../controllers/neo4j/equipo')

const router = Router();
router.post('/', agregarEquipo)
router.get('/', getEquiposFutbol)
router.get('/:id', getEquipoId)
router.put('/:id', updateEquipo)
module.exports = router