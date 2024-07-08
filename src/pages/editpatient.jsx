import React, { useState } from "react";
import { DivForms, DivLogin, MainLogin, SectionLogin } from "../styles/mainpagestyle";
import { FormPatientDrs } from "../components/form/formpatientdrs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Search } from "../components/form/search";
library.add(fas);
export const EditPatientPage = () => {
    const [searchCpf, setSearchCpf] = useState(null);
    function cpfPatient(cpf) {
        setSearchCpf(cpf);
    };
    return (
        <MainLogin>
            <SectionLogin>
                <h1>Editar Paciente</h1>
                <DivLogin>
                    <FontAwesomeIcon icon="fa-solid fa-bed-pulse" />
                    <DivForms>
                        <Search searchPatient={cpfPatient} rotas={"searchpatient"} />
                        <FormPatientDrs searchPatient={searchCpf} rotas={"editpatient"} />
                    </DivForms>
                </DivLogin>
            </SectionLogin>
        </MainLogin>
    );
};