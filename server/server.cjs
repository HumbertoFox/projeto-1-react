const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const prisma = new PrismaClient();
const distPath = path.join(__dirname, '..', 'dist');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(distPath));

app.post('/protected', async (req, _) => {
    var dados = req.body;
});

app.get('/protected', (req, res) => {
    if (dados.status === true) {
        res.status(203);
        app.get('*', (_, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        })
    } else if (dados.status === false) {
        res.status(401);
        app.get('*', (_, res) => {
            res.redirect('/login');
        });
    };
});

app.get('*', (_, res) => {
    res.redirect('/protected');
});

// app.get('*', (_, res) => {
//     const indexPath = path.join(distPath, 'index.html');
//     res.sendFile(indexPath, (err) => {
//         if (err) {
//             console.error(`Erro ao enviar o arquivo: ${err}`);
//             res.status(err.status).end();
//         };
//     });
// });

app.post('/registerconsultation', async (req, res) => {
    const dados = req.body;

    try {
        const cpfExists = await prisma.cpf.count({
            where: { cpf: dados.cpf }
        });

        if (cpfExists === 0) {
            await prisma.cpf.create({
                data: {
                    cpf: dados.cpf,
                    name: dados.name,
                    dateofbirth: dados.dateofbirth
                }
            });

            const telephoneExists = await prisma.telephone.count({
                where: { telephone: dados.telephone }
            });

            if (telephoneExists === 0) {
                await prisma.telephone.create({
                    data: {
                        telephone: dados.telephone,
                        email: dados.email
                    }
                });
            };

            const zipcodeExists = await prisma.zipcode.count({
                where: { zipcode: dados.zipcode }
            });

            if (zipcodeExists === 0) {
                await prisma.zipcode.create({
                    data: {
                        zipcode: dados.zipcode,
                        street: dados.street,
                        district: dados.district,
                        city: dados.city
                    }
                });
            };

            let addressId = await prisma.address.findFirst({
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
                const newAddress = await prisma.address.create({
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

            const patient = await prisma.patient.create({
                data: {
                    cpf: dados.cpf,
                    telephone: dados.telephone,
                    address_id: parseInt(addressId.address_id, 10)
                }
            });

            const consultDateExists = await prisma.consultation.count({
                where: {
                    crm: dados.crm,
                    OR: [{
                        consultdatestart: {
                            lte: dados.consultdatestart
                        },
                        consultdateend: {
                            gte: dados.consultdateend
                        }
                    }]
                }
            });

            if (consultDateExists === 0) {
                await prisma.consultation.create({
                    data: {
                        cpf: dados.cpf,
                        crm: dados.crm,
                        plan: dados.plan,
                        particular: dados.particular,
                        courtesy: dados.courtesy,
                        observation: dados.observation,
                        consultdatestart: dados.consultdatestart,
                        consultdateend: dados.consultdateend,
                        patient_id: parseInt(patient.patient_id, 10),
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
            const patientExists = await prisma.patient.count({
                where: { cpf: dados.cpf }
            });

            if (patientExists === 0) {
                let addressId = await prisma.address.findFirst({
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
                    const newAddress = await prisma.address.create({
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

                await prisma.patient.create({
                    data: {
                        cpf: dados.cpf,
                        telephone: dados.telephone,
                        address_id: parseInt(addressId.address_id, 10)
                    }
                });
            };

            const consultExists = await prisma.consultation.count({
                where: {
                    cpf: dados.cpf,
                    crm: dados.crm,
                    OR: [{
                        consultdatestart: {
                            lte: dados.consultdateend
                        },
                        consultdateend: {
                            gte: dados.consultdatestart
                        }
                    }]
                }
            });

            if (consultExists === 0) {
                const consultDateExists = await prisma.consultation.count({
                    where: {
                        crm: dados.crm,
                        OR: [{
                            consultdatestart: {
                                lte: dados.consultdateend
                            },
                            consultdateend: {
                                gte: dados.consultdatestart
                            }
                        }]
                    }
                });

                const patient = await prisma.patient.findUnique({
                    select: { cpf: dados.cpf }
                });

                if (consultDateExists === 0) {
                    await prisma.consultation.create({
                        data: {
                            cpf: dados.cpf,
                            crm: dados.crm,
                            plan: dados.plan,
                            particular: dados.particular,
                            courtesy: dados.courtesy,
                            observation: dados.observation,
                            consultdatestart: dados.consultdatestart,
                            consultdateend: dados.consultdateend,
                            patient_id: parseInt(patient.patient_id, 10),
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
    } catch (Error) {
        console.error(Error);
        res.status(500).json({
            Error: true,
            message: 'Erro interno do BD!'
        });
    };
});

app.post('/loginuser', async (req, res) => {
    const { cpf, password } = req.body;

    try {
        if (cpf === undefined || password === undefined) {
            return res.status(404).json({
                Error: true,
                message: 'CPF ou Senha Inválido!',
            });
        };

        const cpfExists = await prisma.cpf.findFirst({
            where: { cpf }
        });

        if (!cpfExists) {
            return res.status(404).json({
                Error: true,
                message: 'CPF ou Senha Inválido!',
            });
        };

        const user = await prisma.user.findFirst({
            where: { cpf }
        });

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(404).json({
                Error: true,
                message: 'CPF ou Senha Inválido!'
            });
        };

        const user_telephone = await prisma.telephone.findFirst({
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
            message: 'Erro interno do BD!'
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
        const crmCount = await prisma.doctor.count({
            where: { crm: dados.crm }
        });

        if (crmCount > 0) {
            return res.status(400).json({
                error: true,
                message: 'CRM já cadastrado!'
            });
        };

        const cpfCrmCount = await prisma.doctor.count({
            where: { cpf: dados.cpf }
        });

        if (cpfCrmCount > 0) {
            return res.status(400).json({
                error: true,
                message: 'CPF já associado a outro CRM!'
            });
        };

        const existingCrm = await prisma.crm.count({
            where: { crm: dados.crm }
        });

        if (!existingCrm) {
            await prisma.crm.create({
                data: { crm: dados.crm }
            });
        };

        const cpfCount = await prisma.cpf.count({
            where: { cpf: dados.cpf }
        });

        if (cpfCount === 0) {
            await prisma.cpf.create({
                data: {
                    cpf: dados.cpf,
                    name: dados.name,
                    dateofbirth: dados.dateofbirth
                }
            });
        };

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
        };

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
        };

        let addressId = await prisma.address.findFirst({
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
            const newAddress = await prisma.address.create({
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

        const doctor = await prisma.doctor.create({
            data: {
                crm: dados.crm,
                cpf: dados.cpf,
                telephone: dados.telephone,
                address_id: parseInt(addressId.address_id, 10),
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
    } catch (Error) {
        console.error(Error);
        res.status(500).json({
            Error: true,
            message: 'Erro interno do BD!'
        });
    };
});

app.post('/registeruser', async (req, res) => {
    const dados = req.body;

    try {
        const hashedPassword = await bcrypt.hash(dados.password, 10);

        const existingUser = await prisma.user.findFirst({
            where: { cpf: dados.cpf }
        });

        const existingCpf = await prisma.cpf.findFirst({
            where: { cpf: dados.cpf }
        });

        if (existingUser) {
            return res.status(400).json({
                Error: true,
                message: 'Usuário já cadastrado!'
            });
        };

        if (!existingCpf) {
            await prisma.cpf.create({
                data: {
                    cpf: dados.cpf,
                    name: dados.name,
                    dateofbirth: dados.dateofbirth
                }
            });
        };

        const existingTelephone = await prisma.telephone.findFirst({
            where: { telephone: dados.telephone }
        });

        if (!existingTelephone) {
            await prisma.telephone.create({
                data: {
                    telephone: dados.telephone,
                    email: dados.email
                }
            });
        };

        const existingZipcode = await prisma.zipcode.findUnique({
            where: { zipcode: dados.zipcode }
        });

        if (!existingZipcode) {
            await prisma.zipcode.create({
                data: {
                    zipcode: dados.zipcode,
                    street: dados.street,
                    district: dados.district,
                    city: dados.city
                }
            });
        };

        const newAddress = await prisma.address.create({
            data: {
                address_zipcode: {
                    connect: { zipcode: dados.zipcode }
                },
                residencenumber: dados.residencenumber,
                building: dados.building,
                buildingblock: dados.buildingblock,
                apartment: dados.apartment
            }
        });

        await prisma.user.create({
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

app.post('/searchpatient', async (req, res) => {
    const { searchpatient } = req.body;

    try {
        const patient = await prisma.patient.findFirst({
            where: { cpf: searchpatient },
            include: {
                patient_cpf: true,
                parient_address: {
                    include: {
                        address_zipcode: true
                    }
                },
                patient_telephone: true,
                patient_consultation: true
            }
        });

        if (patient) {
            const list_patient = {
                records: {
                    cpf: patient.cpf,
                    name: patient.patient_cpf.name,
                    dateofbirth: patient.patient_cpf.dateofbirth,
                    telephone: patient.telephone,
                    email: patient.patient_telephone.email,
                    address_id: patient.address_id,
                    zipcode: patient.parient_address.address_zipcode.zipcode,
                    street: patient.parient_address.address_zipcode.street,
                    district: patient.parient_address.address_zipcode.district,
                    city: patient.parient_address.address_zipcode.city,
                    plan: patient.patient_consultation[0].plan,
                    residencenumber: patient.parient_address.residencenumber,
                    building: patient.parient_address.building,
                    buildingblock: patient.parient_address.buildingblock,
                    apartment: patient.parient_address.apartment
                }
            };
            console.log(patient);
            res.status(200).json(list_patient);
        } else {
            res.status(404).json({
                Error: true,
                message: 'Patient not found'
            });
        }
    } catch (Error) {
        console.error(Error);
        res.status(500).json({
            Error: true,
            message: 'Internal server error'
        });
    };
});

app.get('/eventspatient', async (_, res) => {
    try {
        const consultations = await prisma.consultation.findMany({
            include: {
                consultation_cpf: true,
                consultation_crm: true
            }
        });

        const listConsults = await Promise.all(consultations.map(async (consultation) => {
            const patient = await prisma.patient.findFirst({
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
    } catch (Error) {
        console.error(Error);
        res.status(500).json({
            Error: true,
            message: 'Erro ao buscar consulta.'
        });
    };
});

app.get('/eventsconsultsy', async (_, res) => {
    try {
        const consultations = await prisma.consultation.findMany({
            include: {
                consultation_cpf: true,
                consultation_crm: true
            },
            where: {
                crm: '5000'
            }
        });

        const listConsults = await Promise.all(consultations.map((consultation) => {
            return {
                id: consultation.consultation_id,
                crm: consultation.crm,
                cpf: consultation.cpf,
                name: consultation.consultation_cpf.name,
                plan: consultation.plan,
                start: consultation.consultdatestart
            };
        }));

        res.status(200).json(listConsults);
    } catch (Error) {
        console.error(Error);
        res.status(500).json({
            Error: true,
            message: 'Erro ao buscar consulta.'
        });
    }
});

app.get('/eventsconsultsx', async (_, res) => {
    try {
        const consultations = await prisma.consultation.findMany({
            include: {
                consultation_cpf: true,
                consultation_crm: true
            },
            where: {
                crm: '5001'
            }
        });

        const listConsults = await Promise.all(consultations.map((consultation) => {
            return {
                id: consultation.consultation_id,
                crm: consultation.crm,
                cpf: consultation.cpf,
                name: consultation.consultation_cpf.name,
                plan: consultation.plan,
                start: consultation.consultdatestart
            };
        }));

        res.status(200).json(listConsults);
    } catch (Error) {
        console.error(Error);
        res.status(500).json({
            Error: true,
            message: 'Erro ao buscar consulta.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});