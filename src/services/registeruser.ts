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

app.post('/register', async (req: Request, res: Response) => {
    const {
        cpf,
        name,
        dateofbirth,
        telephone,
        email,
        zipcode,
        street,
        district,
        city,
        residencenumber,
        building,
        buildingblock,
        apartment,
        password
    }: UserData = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingCpf = await prisma.cpf_all.findUnique({
            where: { cpf: cpf },
        });

        if (existingCpf) {
            return res.status(400).json({
                error: true,
                message: 'CPF já cadastrado!'
            });
        };

        const newCpf = await prisma.cpf_all.create({
            data: {
                cpf: cpf,
                name: name,
                dateofbirth: new Date(dateofbirth)
            }
        });

        const existingTelephone = await prisma.telephone_all.findUnique({
            where: { telephone: telephone },
        });

        if (!existingTelephone) {
            await prisma.telephone_all.create({
                data: {
                    telephone: telephone,
                    email: email
                }
            });
        };

        const existingZipcode = await prisma.zipcode_all.findUnique({
            where: { zipcode: zipcode },
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

        const newAddress_all = await prisma.address_all.create({
            data: {
                address_all_zipcode: {
                    connect: { zipcode: zipcode }
                },
                residencenumber: residencenumber,
                building: building || '',
                buildingblock: buildingblock || '',
                apartment: apartment || ''
            }
        });

        const newUser = await prisma.user_all.create({
            data: {
                user_cpf: {
                    connect: { cpf: cpf }
                },
                user_telephone: {
                    connect: { telephone: telephone }
                },
                address_all: {
                    connect: { address_id: newAddress_all.address_id }
                },
                password: hashedPassword
            }
        });

        res.status(201).json({
            error: false,
            message: 'Usuário Cadastrado com Sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Erro ao cadastrar usuário!'
        });
    };
});