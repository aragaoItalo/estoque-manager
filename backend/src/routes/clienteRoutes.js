const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/', authController, clienteController.createCliente);
router.get('/', authController, clienteController.getAllClientes);
router.get('/:id', authController, clienteController.getClienteById);
router.put('/:id', authController, clienteController.updateCliente);
router.delete('/:id', authController, clienteController.deleteCliente);

module.exports = router;