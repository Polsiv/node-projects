var Router = require('express');

const { agregarDeportista } = require('../../controllers/neo4j/deportista')

const router = Router();
router.post('/', agregarDeportista)
module.exports = router