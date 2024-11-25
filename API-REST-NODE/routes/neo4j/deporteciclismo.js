var Router = require('express');

const { getDeporteCiclismo } = require('../../controllers/neo4j/deporte')

const router = Router();
router.get('/', getDeporteCiclismo)

module.exports = router