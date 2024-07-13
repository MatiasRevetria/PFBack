const express = require('express');
const router = express.Router();

const controller = require('../controllers/productos.controller');

router.get('/', controller.index);

router.get("/:id",controller.individual);

router.post('/',controller.agregar);

router.put('/:id',controller.modificar);

router.delete('/:id',controller.borrar);


module.exports = router;