import React, { useState } from "react";
import { DivForms, DivLogin, MainLogin, SectionLogin } from "../styles/mainpagestyle";
import { FormUserRegister } from "../components/form/formuserreg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Search } from "../components/form/search";
library.add(fas);
export const RemoveUserPage = () => {
    const [searchCpf, setSearchCpf] = useState(null);
    function cpfPatient(cpf) {
        setSearchCpf(cpf);
    };
    return (
        <MainLogin>
            <SectionLogin>
                <h1>Remover Usuário do Sistema</h1>
                <DivLogin>
                    <FontAwesomeIcon icon="fa-solid fa-user-xmark" />
                    <DivForms>
                        <Search searchPatient={cpfPatient} rotas={"searchuser"} />
                        <FormUserRegister searchPatient={searchCpf} rotas={"removeuser"} />
                    </DivForms>
                </DivLogin>
            </SectionLogin>
        </MainLogin>
    );
};