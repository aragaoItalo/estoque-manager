const express = require('express');
const router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');

router.post('/:pedidoId', itemPedidoController.addItemToPedido);
router.put('/:itemId', itemPedidoController.updateItemInPedido);
router.delete('/:itemId', itemPedidoController.removeItemFromPedido);

module.exports = router;