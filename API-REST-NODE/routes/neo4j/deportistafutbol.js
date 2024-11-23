var Router = require('express');

const { agregarDeportista, getFutbolistas } = require('../../controllers/neo4j/deportista')

const router = Router();
router.post('/', agregarDeportista)
router.get('/', getFutbolistas);
module.exports = router