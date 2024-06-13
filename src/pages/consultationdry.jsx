import React, { useState } from "react";
import { HeaderMenu } from "../components/header/menuheader";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { FormPatientDrs } from "../components/form/formpatientdrs";
export const ConsultationDrY = () => {
    const [searshCpf, setSearshCpf] = useState(null);
    function cpfPatient(cpf) {
        setSearshCpf(cpf);
    };
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search searshPatient={cpfPatient} />
                    <FormPatientDrs searshPatient={searshCpf} title={"5000"} />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    );
};