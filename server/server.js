import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3001;

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.post('/registerconsultation', async (req, res) => {
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

            await prisma.patients_all.create({
                data: {
                    cpf: dados.cpf,
                    telephone: dados.telephone,
                    address_id: parseInt(addressId.address_id, 10)
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
                        user_id: parseInt(dados.user_id, 10)
                    }
                });

                res.status(200).json({
                    Error: false,
                    message: 'Consulta Agendada com Sucesso!'
                });
            } else {
                res.status(400).json({
                    Error: true,
                    message: 'Horário da Consulta já Agendado!'
                });
            };
        } else {
            const patientExists = await prisma.patients_all.count({
                where: { cpf: dados.cpf }
            });

            if (patientExists === 0) {
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

                await prisma.patients_all.create({
                    data: {
                        cpf: dados.cpf,
                        telephone: dados.telephone,
                        address_id: parseInt(addressId.address_id, 10)
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
                            user_id: parseInt(dados.user_id, 10)
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

app.post('/login', async (req, res) => {
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
            id: parseInt(user.user_id, 10),
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
                user_id: parseInt(dados.user_id, 10)
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
                dateofbirth: dados.dateofbirth
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
                address_id: parseInt(newAddress.address_id, 10)
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

app.get('/eventspatient', async (req, res) => {
    try {
        const consultations = await prisma.consultation_all.findMany({
            include: {
                consultation_cpf: true,
                consultation_crm: true
            }
        });

        const listConsults = await Promise.all(consultations.map(async (consultation) => {
            const patient = await prisma.patients_all.findUnique({
                where: { cpf: consultation.cpf }
            });

            return {
                id: consultation.consultation_id,
                title: consultation.cpf,
                name: consultation.consultation_cpf.name,
                telephone: patient ? patient.telephone : null,
                start: consultation.consultdatestart,
                end: consultation.consultdateend,
                desc: consultation.crm,
                plan: consultation.plan,
                observation: consultation.observation,
            };
        }));

        res.status(200).json(listConsults);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: true,
            message: 'Erro ao buscar consulta.'
        });
    };
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});