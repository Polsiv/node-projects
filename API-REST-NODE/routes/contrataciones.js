var express = require('express');
var router = express.Router();

const {postContrat, getContrat, getByIdContrat, updateByIdContrat, deleteByIdContrat} = require('../controllers/contrataciones')

router.post('/', postContrat)
router.get('/', getContrat)
router.get('/:id', getByIdContrat)
router.put('/:id', updateByIdContrat)
router.delete('/:id', deleteByIdContrat)

module.exports = router