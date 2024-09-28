const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Cliente = require('./cliente');


const Carrinho = sequelize.define('Carrinho', {
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
});

// RELACIONAR O CARRINHO COM O CLIENTE
Carrinho.belongsTo(Cliente, {
    foreignKey: 'clienteId'
});


module.exports = Carrinho;