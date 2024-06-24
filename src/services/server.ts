import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

interface LoginRequestBody {
    cpf: string;
    password: string;
};

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

app.post('/loginuser', async (req: Request, res: Response) => {
    const { cpf, password }: LoginRequestBody = req.body;

    try {
        const user = await prisma.user_all.findFirst({
            where: { cpf: cpf, password: { equals: password } }
        });

        const telephone = await prisma.telephone_all.findUnique({
            where: { telephone: user?.telephone }
        });

        if (user && bcrypt.compareSync(password, user.password)) {
            const userData = {
                id: user.user_id,
                email: telephone?.email,
                password: user.password
            };

            res.json({
                Error: false,
                message: 'Usuário logado com Sucesso! Redirecionando ...',
                user: userData
            });
        } else {
            res.status(401).json({
                Error: true,
                message: 'CPF ou Senha Inválidos!'
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

app.get('/agendaconsultations', async (req, res) => {
    try {
        const consultations = await prisma.consultation_all.findMany({
            include: {
                consultation_cpf: true,
                consultation_crm: true
            }
        });

        const listConsults = consultations.map(consultation => ({
            id: consultation.consultation_id,
            title: consultation.cpf,
            name: consultation.consultation_cpf.name,
            telephone: consultation.consultation_cpf,
            start: consultation.consultdatestart,
            end: consultation.consultdateend,
            desc: consultation.crm,
            plan: consultation.plan,
            observation: consultation.observation
        }));

        res.status(200).json(listConsults);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Erro ao buscar consultas.'
        });
    };
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});