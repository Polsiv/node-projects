var Router = require('express');

const { agregarEquipo, getEquiposCiclismo } = require('../../controllers/neo4j/equipo')

const router = Router();
router.post('/', agregarEquipo)
router.get('/', getEquiposCiclismo)
module.exports = router