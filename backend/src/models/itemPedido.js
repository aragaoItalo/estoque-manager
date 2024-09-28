const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pedido = require('./pedido');
const Produto = require('./produto');


const ItemPedido = sequelize.define('ItemPedido', {
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

// RELACIONAMENTOS
ItemPedido.belongsTo(Pedido, {
    foreignKey: 'pedidoId'
});
ItemPedido.belongsTo(Produto, { 
    foreignKey: 'produtoId'
});


module.exports = ItemPedido;