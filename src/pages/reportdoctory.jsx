import React, { useEffect, useState } from "react";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/menuheader";
import { TableFormInfo, DivInforReport, DivReportMain, Thead, Tbody } from "../styles/reportstyle";
export const ReportDoctoryPage = () => {
    const [consult, setConsult] = useState([]);
    const getConsults = async () => {
        await fetch("http://localhost/projeto-1-react/src/services/getconsultsy.php")
            .then((response) => response.json())
            .then((responseJson) => (
                setConsult(responseJson.records)
            ));
    };
    useEffect(() => {
        getConsults();
    }, []);
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivReportMain>
                    <h1>Lista de Pacientes da Doutor CRM</h1>
                    <DivInforReport>
                        <TableFormInfo>
                            <Thead>
                                <tr>
                                    <th>Código Consulta</th>
                                    <th>CRM Doutor</th>
                                    <th>CPF</th>
                                    <th>Nome</th>
                                    <th>Plano</th>
                                    <th>Data e Horário</th>
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