var Router = require('express');
const { obtenerDeportistas } = require('../controllers/neodeportista')

const router = Router();

router.get('/', obtenerDeportistas)

module.exports = router