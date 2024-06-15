import React, { useEffect, useState } from "react";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/menuheader";
import { TableFormInfo, DivInforReport, DivReportMain, Thead, Tbody } from "../styles/reportstyle";
export const ReportDoctorxPage = () => {
    const [consult, setConsult] = useState({});
    const getConsults = async () => {
        try {
            const response = await fetch("http://localhost/projeto-1-react/src/services/getconsultsx.php");
            const responseJson = await response.json();
            for (const key in responseJson) {
                responseJson[key].cpf = responseJson[key].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                responseJson[key].consultdatestart = responseJson[key].consultdatestart.replace(/-/g, "/");
            };
            setConsult(responseJson);
        } catch (error) {
            console.error("Error fetching events:", error);
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
                    <h1>Lista de Pacientes Dra 5001</h1>
                    <DivInforReport>
                        <TableFormInfo>
                            <Thead>
                                <tr>
                                    <th>Cód. Con.</th>
                                    <th>CRM</th>
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