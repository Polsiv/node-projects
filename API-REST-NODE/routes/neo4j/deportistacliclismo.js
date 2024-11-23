var Router = require('express');

const { agregarDeportista, getCiclistas } = require('../../controllers/neo4j/deportista')

const router = Router();
router.post('/', agregarDeportista)
router.get('/', getCiclistas)
module.exports = router