import React, { useEffect, useState } from "react";
import { HeaderMenu } from "../components/header/menuheader";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { FormFull } from "../components/form/forms";
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
                    <Search searchs={cpfPatient} rotas={"searchpatient"} />
                    <FormFull
                        searchs={searchCpf}
                        crms={crmxEnv}
                        page={"RegisterConsultDoctorx"}
                        rotas={"registerconsultation"}
                        title={"Agendar Paciente"}
                        values={"Agendar"}
                    />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    );
};