import React, { useState } from "react";
import { HeaderMenu } from "../components/header/menuheader";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { FormPatientDrs } from "../components/form/formpatientdrs";
export const ConsultationDrY = () => {
    const [searchCpf, setSearchCpf] = useState(null);
    function cpfPatient(cpf) {
        setSearchCpf(cpf);
    };
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search searchPatient={cpfPatient} />
                    <FormPatientDrs searchPatient={searchCpf} title={"5000"} />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    );
};