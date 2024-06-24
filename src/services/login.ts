import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

interface LoginRequestBody {
    cpf: string;
    password: string;
};

app.post('/login', async (req: Request, res: Response) => {
    const { cpf, password }: LoginRequestBody = req.body;

    try {
        const user = await prisma.user_all.findFirst({
            where: { cpf: cpf, password: { equals: password } }
        });

        const telephone = await prisma.telephone_all.findUnique({
            where: { telephone: user?.telephone }
        });

        if (user && bcrypt.compareSync(password, user.password)) {
            const userData = {
                id: user.user_id,
                email: telephone?.email,
                password: user.password
            };

            res.json({
                Error: false,
                message: 'Usuário logado com Sucesso! Redirecionando ...',
                user: userData
            });
        } else {
            res.status(401).json({
                Error: true,
                message: 'CPF ou Senha Inválidos!'
            });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: true,
            message: 'Erro interno do servidor.'
        });
    };
});