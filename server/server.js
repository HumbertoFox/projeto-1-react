import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const PORT = process.env.PORT || 3001;

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
    const { cpf, password } = req.body;

    try {
        const cpfExists = await prisma.cpf_all.findFirst({
            where: { cpf: cpf }
        });

        if (!cpfExists) {
            return res.status(401).json({
                Error: true,
                message: 'CPF ou Senha Inválidos!',
            });
        };

        const user = await prisma.user_all.findFirst({
            where: { cpf: cpf }
        });
        
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                Error: true,
                message: 'CPF ou Senha Inválidos!'
            });
        };

        const user_telephone = await prisma.telephone_all.findFirst({
            where: { telephone: user.telephone }
        });

        const userData = {
            id: user.user_id,
            email: user_telephone.email,
            password: user.password
        };

        res.status(201).json({
            Error: false,
            message: 'Usuário logado com Sucesso! Redirecionando ...',
            user: userData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: true,
            message: 'Erro interno do servidor.'
        });
    };
});

app.post('/registeruser', async (req, res) => {
    const { cpf, name, dateofbirth, telephone, email, zipcode, street, district, city, residencenumber, building, buildingblock, apartment, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingCpf = await prisma.cpf_all.findFirst({
            where: { cpf: cpf }
        });

        if (existingCpf) {
            return res.status(400).json({
                Error: true,
                message: 'CPF já cadastrado!'
            });
        }

        await prisma.cpf_all.create({
            data: {
                cpf: cpf,
                name: name,
                dateofbirth: new Date(dateofbirth)
            }
        });

        const existingTelephone = await prisma.telephone_all.findFirst({
            where: { telephone: telephone }
        });

        if (!existingTelephone) {
            await prisma.telephone_all.create({
                data: {
                    telephone: telephone,
                    email: email
                }
            });
        };

        const existingZipcode = await prisma.zipcode_all.findFirst({
            where: { zipcode: zipcode }
        });

        if (!existingZipcode) {
            await prisma.zipcode_all.create({
                data: {
                    zipcode: zipcode,
                    street: street,
                    district: district,
                    city: city
                }
            });
        };

        const newAddress = await prisma.address_all.create({
            data: {
                address_all_zipcode: {
                    connect: { zipcode: zipcode }
                },
                residencenumber: residencenumber,
                building: building,
                buildingblock: buildingblock,
                apartment: apartment
            }
        });

        await prisma.user_all.create({
            data: {
                cpf: cpf,
                telephone: telephone,
                password: hashedPassword,
                address_id: newAddress.address_id
            }
        });

        res.status(201).json({
            Error: false,
            message: 'Usuário Cadastrado com Sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: true,
            message: 'Erro ao cadastrar usuário!'
        });
    };
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});