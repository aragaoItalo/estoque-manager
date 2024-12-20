const Cliente = require('../models/cliente');

//Cria cliente
exports.createCliente = async (req, res) => {
    try{
        const cliente = await Cliente.create(req.body);
        res.status(201).json(cliente);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar novo cliente'});
    }
};

//Lista os clientes
exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar os clientes' });
    }
};

//Busca pelo id
exports.getClienteById = async (req, res) => {
    try  {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json(cliente);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar cliente'});
    }
};

//Atualiza pelo id
exports.updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado'});
        }
        await cliente.update(req.body);
        res.status(200).json(cliente);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

//Deleta pelo id
exports.deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        await cliente.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};