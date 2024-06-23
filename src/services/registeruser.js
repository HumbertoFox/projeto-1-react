const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/register', async (req, res) => {
    const { cpf, name, dateofbirth, telephone, email, zipcode, street, district, city, residencenumber, building, buildingblock, apartment, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingCpf = await prisma.cpf.findUnique({
            where: { cpf: cpf },
        });

        if (existingCpf) {
            return res.status(400).json({
                error: true,
                message: 'CPF já cadastrado!'
            });
        }

        const newCpf = await prisma.cpf.create({
            data: {
                cpf: cpf,
                name: name,
                dateOfBirth: new Date(dateofbirth)
            }
        });

        const existingTelephone = await prisma.telephone.findUnique({
            where: { telephone: telephone },
        });

        if (!existingTelephone) {
            await prisma.telephone.create({
                data: {
                    telephone: telephone,
                    email: email
                }
            });
        }

        const existingZipcode = await prisma.zipcode.findUnique({
            where: { zipcode: zipcode },
        });

        if (!existingZipcode) {
            await prisma.zipcode.create({
                data: {
                    zipcode: zipcode,
                    street: street,
                    district: district,
                    city: city
                }
            });
        }

        const newAddress = await prisma.address.create({
            data: {
                zipcode: {
                    connect: { zipcode: zipcode }
                },
                residenceNumber: residencenumber,
                building: building,
                buildingBlock: buildingblock,
                apartment: apartment
            }
        });

        const newUser = await prisma.user.create({
            data: {
                cpf: {
                    connect: { cpf: cpf }
                },
                telephone: {
                    connect: { telephone: telephone }
                },
                address: {
                    connect: { id: newAddress.id }
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
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});