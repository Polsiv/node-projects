var Router = require('express');

const { agregarEquipo, getEquiposCiclismo, getEquipoId, updateEquipo, deleteEquipo } = require('../../controllers/neo4j/equipo')

const router = Router();
router.post('/', agregarEquipo)
router.get('/', getEquiposCiclismo)
router.get('/:id', getEquipoId)
router.put('/:id', updateEquipo)
router.delete('/:id', deleteEquipo)
module.exports = router