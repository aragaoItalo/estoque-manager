const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Alterar para o caminho correto
const Cliente = require('./cliente'); // Alterar para o caminho correto


const Pedido = sequelize.define('Pedido', {
    status: {
        type: DataTypes.ENUM('Pendente', 'Em processamento', 'Enviado', 'Entregue'),
        defaultValue: 'Pendente',
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

//RELACIONAR PEDIDO QUE PERTENCE AO CLIENTE
Pedido.belongsTo(Cliente, {
    foreignKey: 'clienteId'
});


module.exports = Pedido;