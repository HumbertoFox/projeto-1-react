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

app.post('/registerdoctor', async (req, res) => {
    const dados = req.body;

    if (!dados) {
        return res.status(400).json({
            error: true,
            message: 'Dados do doutor não fornecidos!'
        });
    };

    try {
        const crmCount = await prisma.doctors_all.count({
            where: { crm: dados.crm }
        });

        if (crmCount > 0) {
            return res.status(400).json({
                error: true,
                message: 'CRM já cadastrado!'
            });
        };

        const cpfCrmCount = await prisma.doctors_all.count({
            where: { cpf: dados.cpf }
        });

        if (cpfCrmCount > 0) {
            return res.status(400).json({
                error: true,
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
                    dateofbirth: new Date(dados.dateofbirth)
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

app.post('/registeruser', async (req, res) => {
    const dados = req.body;

    try {
        const hashedPassword = await bcrypt.hash(dados.password, 10);

        const existingCpf = await prisma.cpf_all.findFirst({
            where: { cpf: dados.cpf }
        });

        if (existingCpf) {
            return res.status(400).json({
                Error: true,
                message: 'CPF já cadastrado!'
            });
        };

        await prisma.cpf_all.create({
            data: {
                cpf: dados.cpf,
                name: dados.name,
                dateofbirth: new Date(dados.dateofbirth)
            }
        });

        const existingTelephone = await prisma.telephone_all.findFirst({
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

        const existingZipcode = await prisma.zipcode_all.findFirst({
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

        const newAddress = await prisma.address_all.create({
            data: {
                address_all_zipcode: {
                    connect: { zipcode: dados.zipcode }
                },
                residencenumber: dados.residencenumber,
                building: dados.building,
                buildingblock: dados.buildingblock,
                apartment: dados.apartment
            }
        });

        await prisma.user_all.create({
            data: {
                cpf: dados.cpf,
                telephone: dados.telephone,
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
            message: 'Erro interno do servidor.'
        });
    };
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});