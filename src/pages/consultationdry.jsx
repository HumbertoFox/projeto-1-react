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
                    <Search searchs={cpfPatient} rotas={"searchpatient"} />
                    <FormFull
                        searchs={searchCpf}
                        crms={crmyEnv}
                        page={"RegisterConsultDoctory"}
                        rotas={"registerconsultation"}
                        title={"Agendar Paciente"}
                        values={"Agendar"}
                    />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    );
};