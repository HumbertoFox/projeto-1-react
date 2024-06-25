import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/searchpatient', async (req, res) => {
    const { searchpatient } = req.body;

    try {
        const patient = await prisma.patients_all.findUnique({
            where: { cpf: searchpatient },
            include: {
                patients_all_cpf: true,
                parients_all_address_all: {
                    include: {
                        address_all_zipcode: true
                    }
                },
                patients__all_telephone: true,
                Consultation: true
            }
        });

        if (patient) {
            const list_patient = {
                records: {
                    cpf: patient.cpf,
                    name: patient.cpf.name,
                    dateofbirth: patient.cpf_rel.dateofbirth,
                    telephone: patient.telephone,
                    email: patient.telephone.email,
                    address_id: patient.address_id,
                    zipcode: patient.address_rel.zipcode,
                    street: patient.address_rel.zipcode_rel.street,
                    district: patient.address_rel.zipcode_rel.district,
                    city: patient.address_rel.zipcode_rel.city,
                    plan: patient.Consultation[0]?.plan,
                    residencenumber: patient.address_rel.residencenumber,
                    building: patient.address_rel.building,
                    buildingblock: patient.address_rel.buildingblock,
                    apartment: patient.address_rel.apartment
                }
            };
            res.status(200).json(list_patient);
        } else {
            res.status(404).json({ error: true, message: 'Patient not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    };
});