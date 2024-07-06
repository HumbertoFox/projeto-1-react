import React, { useEffect, useState } from "react";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/menuheader";
import { TableFormInfo, DivInforReport, DivReportMain, Thead, Tbody } from "../styles/reportstyle";
import { eventsPatient } from "../services/api/apis";
export const ReportDoctoryPage = () => {
    const [consult, setConsult] = useState({});
    const getConsults = async (data) => {
        try {
            const response = await eventsPatient(data, "eventsconsultsy");
            for (const key in response) {
                response[key].cpf = response[key].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                let dateTimeParts = response[key].start.split('-');
                let dateParts = dateTimeParts[2].split('T');
                response[key].start = `${dateParts[1]} ${dateParts[0]}/${dateTimeParts[1]}/${dateTimeParts[0]}`;
            };
            let consultArray = Object.values(response);
            consultArray.sort((a, b) => b.id - a.id);
            setConsult(consultArray);
        } catch (Error) {
            console.error({
                type: "Error",
                message: "Erro interno do BD!"
            });
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
                                    <tr key={consul.id}>
                                        <td>{consul.id}</td>
                                        <td>{consul.crm}</td>
                                        <td>{consul.cpf}</td>
                                        <td>{consul.name}</td>
                                        <td>{consul.plan}</td>
                                        <td>{consul.start}</td>
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