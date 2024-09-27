import React, { useState } from "react";
import { DivForms, DivFormsMenu, MainMenu } from "../styles/mainpagestyle";
import { FormUserRegister } from "../components/form/formuserreg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Search } from "../components/form/search";
library.add(fas);
export const BlockingUserPage = () => {
    const [searchCpf, setSearchCpf] = useState(null);
    function cpfPatient(cpf) {
        setSearchCpf(cpf);
    };
    return (
        <MainMenu>
            <h1>Bloquear Usuário</h1>
            <DivFormsMenu>
                <FontAwesomeIcon icon="fa-solid fa-user-lock" />
                <DivForms>
                    <Search searchPatient={cpfPatient} rotas={"searchuser"} />
                    <FormUserRegister searchPatient={searchCpf} rotas={"blockinguser"} />
                </DivForms>
            </DivFormsMenu>
        </MainMenu>
    );
};