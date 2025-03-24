var Router = require('express');

const { getPaises, agregarPais } = require('../../controllers/neo4j/pais')

const router = Router();
router.post('/', agregarPais)
router.get('/', getPaises);
module.exports = router