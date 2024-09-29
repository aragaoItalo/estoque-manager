const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    hooks: {
        //ESSE HOOK CRIPTOGRAFA A SENHA ANTES DE SALVAR
        beforeCreate: async (cliente) => {
            const salt = await bcrypt.genSalt(10);
            cliente.senha = await bcrypt.hash(cliente.senha, salt);
        },
        //ESSE HOOK CRIPTOGRAFA A SENHA CASO SEJA ATUALIZADA 
        beforeUpdate: async (cliente) => {
            if (cliente.changed('senha')) {
                const salt = await bcrypt.genSalt(10);
                cliente.senha = await bcrypt.hash(cliente.senha, salt);
            }
        }
    }    
});


//METODO QUE VERIFICA A SENHA (COMPARA A INSERIDA PELO USER COM A CRIPTOGRAFDADA)
Cliente.prototype.validPassword = async function(senha) {
    return await bcrypt.compare(senha, this.senha);
};


module.exports = Cliente;