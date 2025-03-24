var Router = require('express');

const { getContrataciones, getContratacionId, createContratacion, deleteContratacion, updateContratacion } = require('../../controllers/neo4j/contratacion')

const router = Router();
router.get('/', getContrataciones)
router.get('/:id', getContratacionId)
router.post('/', createContratacion)
router.put('/:id', updateContratacion)
router.delete('/:id', deleteContratacion)


module.exports = router