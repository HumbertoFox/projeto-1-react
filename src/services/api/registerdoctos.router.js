const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/register-doctor', async (req, res) => {
    const dados = req.body;

    if (!dados) {
        return res.status(400).json({
            error: true,
            message: 'Dados do doutor não fornecidos!'
        });
    }

    try {
        const crmCount = await prisma.doctors.count({
            where: { crm: dados.crm }
        });

        if (crmCount > 0) {
            return res.status(400).json({
                error: true,
                message: 'CRM já cadastrado!'
            });
        }

        const cpfCrmCount = await prisma.doctors.count({
            where: { cpf: dados.cpf }
        });

        if (cpfCrmCount > 0) {
            return res.status(400).json({
                error: true,
                message: 'CPF já associado a outro CRM!'
            });
        }

        await prisma.crm.create({
            data: { crm: dados.crm }
        });

        const cpfCount = await prisma.cpf.count({
            where: { cpf: dados.cpf }
        });

        if (cpfCount === 0) {
            await prisma.cpf.create({
                data: {
                    cpf: dados.cpf,
                    name: dados.name,
                    dateofbirth: new Date(dados.dateofbirth)
                }
            });
        }

        const telephoneCount = await prisma.telephone.count({
            where: { telephone: dados.telephone }
        });

        if (telephoneCount === 0) {
            await prisma.telephone.create({
                data: {
                    telephone: dados.telephone,
                    email: dados.email
                }
            });
        }

        const zipcodeCount = await prisma.zipcode.count({
            where: { zipcode: dados.zipcode }
        });

        if (zipcodeCount === 0) {
            await prisma.zipcode.create({
                data: {
                    zipcode: dados.zipcode,
                    street: dados.street,
                    district: dados.district,
                    city: dados.city
                }
            });
        }

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
        }

        const doctor = await prisma.doctors.create({
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
                error: false,
                message: 'Doutor cadastrado com sucesso!'
            });
        } else {
            res.status(400).json({
                error: true,
                message: 'Doutor não cadastrado!'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Erro interno do servidor.'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});