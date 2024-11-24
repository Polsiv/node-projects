var Router = require('express');

const { agregarEquipo } = require('../../controllers/neo4j/equipo')

const router = Router();
router.post('/', agregarEquipo)
module.exports = router