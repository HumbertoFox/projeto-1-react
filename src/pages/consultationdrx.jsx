import React, { useEffect, useState } from "react";
import { HeaderMenu } from "../components/header/menuheader";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { FormPatientDrs } from "../components/form/formpatientdrs";
export const ConsultationDrXPage = () => {
    const [searchCpf, setSearchCpf] = useState(null);
    const [crmxEnv, setCrmxEnv] = useState(null);
    function cpfPatient(cpf) {
        setSearchCpf(cpf);
    };
    useEffect(() => {
        setCrmxEnv(process.env.DOCTORX_CRM);
    }, []);
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search searchPatient={cpfPatient} rotas={"searchpatient"} />
                    <FormPatientDrs searchPatient={searchCpf} title={crmxEnv} />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    );
};