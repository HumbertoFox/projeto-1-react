const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/login', async (req, res) => {
    const { cpf, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { cpf: cpf },
        });

        if (user && bcrypt.compareSync(password, user.password)) {
            const userData = {
                id: user.id,
                email: user.email,
                password: user.password,
            };

            res.json({
                Error: false,
                message: 'Usuário logado com Sucesso! Redirecionando ...',
                user: userData,
            });
        } else {
            res.status(401).json({
                Error: true,
                message: 'CPF ou Senha Inválidos!',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: true,
            message: 'Erro interno do servidor.',
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});