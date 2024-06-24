import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('consultation', async (req, res) => {
    const dados = req.body;

    try {
        const cpfExists = await prisma.cpf_all.count({
            where: { cpf: dados.cpf }
        });

        if (cpfExists === 0) {
            await prisma.cpf_all.create({
                data: {
                    cpf: dados.cpf,
                    name: dados.name,
                    dateofbirth: dados.dateofbirth
                }
            });

            const telephoneExists = await prisma.telephone_all.count({
                where: { telephone: dados.telephone }
            });

            if (telephoneExists === 0) {
                await prisma.telephone_all.create({
                    data: {
                        telephone: dados.telephone,
                        email: dados.email
                    }
                });
            };

            const zipcodeExists = await prisma.zipcode_all.count({
                where: { zipcode: dados.zipcode }
            });

            if (zipcodeExists === 0) {
                await prisma.zipcode_all.create({
                    data: {
                        zipcode: dados.zipcode,
                        street: dados.street,
                        district: dados.district,
                        city: dados.city
                    }
                });
            };

            let address = await prisma.address_all.findFirst({
                where: {
                    zipcode: dados.zipcode,
                    residencenumber: dados.residencenumber,
                    building: dados.building,
                    buildingblock: dados.buildingblock,
                    apartment: dados.apartment
                }
            });

            if (!address) {
                address = await prisma.address_all.create({
                    data: {
                        zipcode: dados.zipcode,
                        residencenumber: dados.residencenumber,
                        building: dados.building,
                        buildingblock: dados.buildingblock,
                        apartment: dados.apartment
                    }
                });
            };

            await prisma.patients_all.create({
                data: {
                    cpf: dados.cpf,
                    telephone: dados.telephone,
                    address_id: address.address_id
                }
            });

            const consultDateExists = await prisma.consultation_all.count({
                where: {
                    crm: dados.crm,
                    consultdatestart: dados.consultdatestart,
                    consultdateend: dados.consultdateend
                }
            });

            if (consultDateExists === 0) {
                await prisma.consultation_all.create({
                    data: {
                        cpf: dados.cpf,
                        crm: dados.crm,
                        plan: dados.plan,
                        particular: dados.particular,
                        courtesy: dados.courtesy,
                        observation: dados.observation,
                        consultdatestart: dados.consultdatestart,
                        consultdateend: dados.consultdateend,
                        user_id: dados.user_id
                    }
                });
                res.status(200).json({
                    error: false,
                    message: 'Consulta Cadastrada com Sucesso!'
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: 'Horário da Consulta já Agendado!'
                });
            }
        } else {
            const patientExists = await prisma.patients_all.count({
                where: { cpf: dados.cpf }
            });

            if (patientExists === 0) {
                let address = await prisma.address_all.findFirst({
                    where: {
                        zipcode: dados.zipcode,
                        residencenumber: dados.residencenumber,
                        building: dados.building,
                        buildingblock: dados.buildingblock,
                        apartment: dados.apartment
                    }
                });

                if (!address) {
                    address = await prisma.address_all.create({
                        data: {
                            zipcode: dados.zipcode,
                            residencenumber: dados.residencenumber,
                            building: dados.building,
                            buildingblock: dados.buildingblock,
                            apartment: dados.apartment
                        }
                    });
                };

                await prisma.patients_all.create({
                    data: {
                        cpf: dados.cpf,
                        telephone: dados.telephone,
                        address_id: address.address_id
                    }
                });
            };

            const consultExists = await prisma.consultation_all.count({
                where: {
                    cpf: dados.cpf,
                    crm: dados.crm,
                    consultdatestart: dados.consultdatestart,
                    consultdateend: dados.consultdateend
                }
            });

            if (consultExists === 0) {
                const consultDateExists = await prisma.consultation_all.count({
                    where: {
                        crm: dados.crm,
                        consultdatestart: dados.consultdatestart,
                        consultdateend: dados.consultdateend
                    }
                });

                if (consultDateExists === 0) {
                    await prisma.consultation_all.create({
                        data: {
                            cpf: dados.cpf,
                            crm: dados.crm,
                            plan: dados.plan,
                            particular: dados.particular,
                            courtesy: dados.courtesy,
                            observation: dados.observation,
                            consultdatestart: dados.consultdatestart,
                            consultdateend: dados.consultdateend,
                            user_id: dados.user_id
                        }
                    });
                    res.status(200).json({
                        Error: false,
                        message: 'Consulta Cadastrada com Sucesso!'
                    });
                } else {
                    res.status(400).json({
                        Error: true,
                        message: 'Horário da Consulta já Agendado!'
                    });
                };
            } else {
                res.status(400).json({
                    Error: true,
                    message: 'Consulta do Paciente já Agendada!'
                });
            };
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: true,
            message: 'Erro ao processar a requisição.'
        });
    };
});
