import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const router = Router();

router.post('/loginuser', async (req, res) => {
  const { cpf, password } = req.body;

  try {
    const user = await prisma.user_all.findUnique({
      where: { cpf: cpf },
    });
    const user_email = await prisma.telephone_all.findUnique({
      where: { telephone: user.telephone }
    })
    if (user && bcrypt.compareSync(password, user.password)) {
      const userData = {

        id: user.id,
        email: user_email.email,
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

export default router;