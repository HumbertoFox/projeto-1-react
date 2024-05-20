import React from "react";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/menuheader";
import { TableFormInfo, DivInforReport, DivReportMain, Thead, Tbody } from "../styles/reportstyle";

export const ReportDoctorxPage = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivReportMain>
                    <h1>Lista de Pacientes do Doutora ???</h1>
                    <DivInforReport>
                        <TableFormInfo>
                            <Thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                    <th>Plano</th>
                                </tr>
                            </Thead>
                            <Tbody>
                            </Tbody>
                        </TableFormInfo>
                    </DivInforReport>
                </DivReportMain>
            </MainSecondary>
        </MainPrimary>
    )
}