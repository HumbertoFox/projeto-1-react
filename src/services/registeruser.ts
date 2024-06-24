import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

interface UserData {
    cpf: string;
    name: string;
    dateofbirth: string;
    telephone: string;
    email: string;
    zipcode: string;
    street: string;
    district: string;
    city: string;
    residencenumber: string;
    building?: string;
    buildingblock?: string;
    apartment?: string;
    password: string;
};

app.post('/registeruser', async (req: Request, res: Response) => {
    const dados: UserData = req.body;

    try {
        const hashedPassword = await bcrypt.hash(dados.password, 10);

        const existingCpf = await prisma.cpf_all.findUnique({
            where: { cpf: dados.cpf }
        });

        if (existingCpf) {
            return res.status(400).json({
                Error: true,
                message: 'CPF já cadastrado!'
            });
        };

        const newCpf = await prisma.cpf_all.create({
            data: {
                cpf: dados.cpf,
                name: dados.name,
                dateofbirth: dados.dateofbirth
            }
        });

        const existingTelephone = await prisma.telephone_all.findUnique({
            where: { telephone: dados.telephone }
        });

        if (!existingTelephone) {
            await prisma.telephone_all.create({
                data: {
                    telephone: dados.telephone,
                    email: dados.email
                }
            });
        };

        const existingZipcode = await prisma.zipcode_all.findUnique({
            where: { zipcode: dados.zipcode }
        });

        if (!existingZipcode) {
            await prisma.zipcode_all.create({
                data: {
                    zipcode: dados.zipcode,
                    street: dados.street,
                    district: dados.district,
                    city: dados.city
                }
            });
        };

        const newAddress_all = await prisma.address_all.create({
            data: {
                address_all_zipcode: {
                    connect: { zipcode: dados.zipcode }
                },
                residencenumber: dados.residencenumber,
                building: dados.building || '',
                buildingblock: dados.buildingblock || '',
                apartment: dados.apartment || ''
            }
        });

        const newUser = await prisma.user_all.create({
            data: {
                user_cpf: {
                    connect: { cpf: dados.cpf }
                },
                user_telephone: {
                    connect: { telephone: dados.telephone }
                },
                address_all: {
                    connect: { address_id: newAddress_all.address_id }
                },
                password: hashedPassword
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