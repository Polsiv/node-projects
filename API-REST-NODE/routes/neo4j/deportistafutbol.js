var Router = require('express');

const { agregarDeportista } = require('../../controllers/neo4j/deportistafutbol')

const router = Router();
router.post('/', agregarDeportista)
module.exports = router