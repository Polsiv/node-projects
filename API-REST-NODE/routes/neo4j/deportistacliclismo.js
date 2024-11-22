var Router = require('express');

const { agregarDeportista } = require('../../controllers/neo4j/deportistaciclismo')

const router = Router();
router.post('/', agregarDeportista)
module.exports = router