import React, { useEffect, useState } from "react";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/menuheader";
import { TableFormInfo, DivInforReport, DivReportMain, Thead, Tbody } from "../styles/reportstyle";
import { eventsPatient } from "../services/api/apis";
export const ReportDoctoryPage = () => {
    const [consult, setConsult] = useState({});
    const getConsults = async (data) => {
        try {
            const response = await eventsPatient(data, 'eventsconsults');
            for (const key in response) {
                response[key].cpf = response[key].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                let dateTimeParts = response[key].consultdatestart.split(' ');
                let dateParts = dateTimeParts[0].split('-');
                let timePart = dateTimeParts[1].substring(0, 5);
                response[key].consultdatestart = `${timePart} ${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            };
            let consultArray = Object.values(response);
            consultArray.sort((a, b) => b.consultation_id - a.consultation_id);
            setConsult(consultArray);
        } catch (Error) {
            console.error("Error fetching events:", Error);
        };
    };
    useEffect(() => {
        getConsults();
    }, []);
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivReportMain>
                    <h1>Lista de Pacientes Dr 5000</h1>
                    <DivInforReport>
                        <TableFormInfo>
                            <Thead>
                                <tr>
                                    <th>Cód. Con.</th>
                                    <th>CRM</th>
                                    <th>CPF</th>
                                    <th>Nome</th>
                                    <th>Plano</th>
                                    <th>Horário e Data</th>
                                </tr>
                            </Thead>
                            <Tbody>
                                {Object.values(consult).map(consul => (
                                    <tr key={consul.consultation_id}>
                                        <td>{consul.consultation_id}</td>
                                        <td>{consul.crm}</td>
                                        <td>{consul.cpf}</td>
                                        <td>{consul.name}</td>
                                        <td>{consul.plan}</td>
                                        <td>{consul.consultdatestart}</td>
                                    </tr>
                                ))}
                            </Tbody>
                        </TableFormInfo>
                    </DivInforReport>
                </DivReportMain>
            </MainSecondary>
        </MainPrimary>
    );
};