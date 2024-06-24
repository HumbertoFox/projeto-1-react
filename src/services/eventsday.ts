import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

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