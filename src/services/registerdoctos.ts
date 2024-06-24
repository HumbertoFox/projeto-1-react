import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

interface DoctorData {
    crm: string;
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
    building: string;
    buildingblock: string;
    apartment: string;
    user_id: number;
};

app.post('/registerdoctor', async (req: Request, res: Response) => {
    const dados: DoctorData = req.body;

    if (!dados) {
        return res.status(400).json({
            Error: true,
            message: 'Dados do doutor não fornecidos!'
        });
    };

    try {
        const crmCount = await prisma.doctors_all.count({
            where: { crm: dados.crm }
        });

        if (crmCount > 0) {
            return res.status(400).json({
                Error: true,
                message: 'CRM já cadastrado!'
            });
        }

        const cpfCrmCount = await prisma.doctors_all.count({
            where: { cpf: dados.cpf }
        });

        if (cpfCrmCount > 0) {
            return res.status(400).json({
                Error: true,
                message: 'CPF já associado a outro CRM!'
            });
        };

        await prisma.crm_all.create({
            data: { crm: dados.crm }
        });

        const cpfCount = await prisma.cpf_all.count({
            where: { cpf: dados.cpf }
        });

        if (cpfCount === 0) {
            await prisma.cpf_all.create({
                data: {
                    cpf: dados.cpf,
                    name: dados.name,
                    dateofbirth: dados.dateofbirth
                }
            });
        };

        const telephoneCount = await prisma.telephone_all.count({
            where: { telephone: dados.telephone }
        });

        if (telephoneCount === 0) {
            await prisma.telephone_all.create({
                data: {
                    telephone: dados.telephone,
                    email: dados.email
                }
            });
        };

        const zipcodeCount = await prisma.zipcode_all.count({
            where: { zipcode: dados.zipcode }
        });

        if (zipcodeCount === 0) {
            await prisma.zipcode_all.create({
                data: {
                    zipcode: dados.zipcode,
                    street: dados.street,
                    district: dados.district,
                    city: dados.city
                }
            });
        };

        let addressId = await prisma.address_all.findFirst({
            where: {
                zipcode: dados.zipcode,
                residencenumber: dados.residencenumber,
                building: dados.building,
                buildingblock: dados.buildingblock,
                apartment: dados.apartment
            },
            select: {
                address_id: true
            }
        });

        if (!addressId) {
            const newAddress = await prisma.address_all.create({
                data: {
                    zipcode: dados.zipcode,
                    residencenumber: dados.residencenumber,
                    building: dados.building,
                    buildingblock: dados.buildingblock,
                    apartment: dados.apartment
                }
            });
            addressId = newAddress;
        };

        const doctor = await prisma.doctors_all.create({
            data: {
                crm: dados.crm,
                cpf: dados.cpf,
                telephone: dados.telephone,
                address_id: addressId.address_id,
                user_id: dados.user_id
            }
        });

        if (doctor) {
            res.json({
                Error: false,
                message: 'Doutor cadastrado com sucesso!'
            });
        } else {
            res.status(400).json({
                Error: true,
                message: 'Doutor não cadastrado!'
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