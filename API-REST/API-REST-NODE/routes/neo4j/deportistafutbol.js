var Router = require('express');

const { agregarDeportista, getFutbolistas, updateDeportista, deleteDeportista, getFutbolistaId } = require('../../controllers/neo4j/deportista')

const router = Router();
router.post('/', agregarDeportista);
router.get('/', getFutbolistas);
router.get('/:id', getFutbolistaId);
router.put('/:id', updateDeportista);
router.delete('/:id', deleteDeportista)
module.exports = router