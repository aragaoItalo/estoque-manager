const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente');

//Registra cliente (SIGNUP)
exports.signup = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verifica se o cliente já está registrado
        const clienteExistente = await Cliente.findOne({ where: { email } });
        if (clienteExistente) {
            return res.status(400).json({ error: 'E-mail já está registrado' });
        }
        
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criar o cliente no banco de dados
        const novoCliente = await Cliente.create({
            nome,
            email,
            senha: hashedPassword
        });

        res.status(201).json({ message: 'Cliente registrado com sucesso', clienteId: novoCliente.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar cliente' });
    }
};

// Login do cliente (SIGNIN)
exports.signin = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o cliente existe
        const cliente = await Cliente.findOne({ where: { email } });
        if (!cliente) {
            return res.status(400).json({ error: 'E-mail ou senha inválidos' });
        }

        // Comparar senhas
        const senhaCorreta = await bcrypt.compare(senha, cliente.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ error: 'E-mail ou senha inválidos' });
        }
        
        // Gerar token JWT -> Usado para autenticação
        const token = jwt.sign(
            { id: cliente.id, email: cliente.email },
            process.env.JWT_SECRET, // Chave secreta definida no .env
            { expiresIn: '1h' } //Tempo para o token expirar
        );

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};