import React, { useEffect, useState } from "react";
import { HeaderMenu } from "../components/header/menuheader";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { FormFull } from "../components/form/forms";
export const ConsultationDrYPage = () => {
    const [searchCpf, setSearchCpf] = useState(null);
    const [crmyEnv, setCrmyEnv] = useState(null);
    function cpfPatient(cpf) {
        setSearchCpf(cpf);
    };
    useEffect(() => {
        setCrmyEnv(process.env.DOCTORY_CRM);
    }, []);
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search searchPatient={cpfPatient} rotas={"searchpatient"} />
                    <FormFull searchPatient={searchCpf} title={crmyEnv} page={"RegisterConsultDoctory"} />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    );
};