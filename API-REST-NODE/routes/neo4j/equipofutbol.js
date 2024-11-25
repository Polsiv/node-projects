var Router = require('express');

const { agregarEquipo, getEquiposFutbol, getEquipoId, updateEquipo, deleteEquipo } = require('../../controllers/neo4j/equipo')

const router = Router();
router.post('/', agregarEquipo)
router.get('/', getEquiposFutbol)
router.get('/:id', getEquipoId)
router.put('/:id', updateEquipo)
router.delete('/:id', deleteEquipo)
module.exports = router