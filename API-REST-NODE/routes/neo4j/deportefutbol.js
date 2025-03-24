var Router = require('express');

const { getDeporteFutbol } = require('../../controllers/neo4j/deporte')

const router = Router();
router.get('/', getDeporteFutbol)

module.exports = router