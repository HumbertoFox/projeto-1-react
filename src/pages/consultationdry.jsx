import React, { useEffect, useState } from "react";
import { HeaderMenu } from "../components/header/menuheader";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { FormPatientDrs } from "../components/form/formpatientdrs";
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
                    <FormPatientDrs searchPatient={searchCpf} title={crmyEnv} />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    );
};