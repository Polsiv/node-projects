var Router = require('express');

const { agregarDeportista, getCiclistas, updateDeportista, deleteDeportista, getCiclistaId } = require('../../controllers/neo4j/deportista')

const router = Router();
router.post('/', agregarDeportista)
router.get('/', getCiclistas)
router.get('/:id', getCiclistaId)
router.put('/:id', updateDeportista)
router.delete('/:id', deleteDeportista)
module.exports = router