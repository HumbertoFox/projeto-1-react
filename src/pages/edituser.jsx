import React from "react";
import { DivLogin, MainLogin, SectionLogin } from "../styles/mainpagestyle";
import { FormUserRegister } from "../components/form/formuserreg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
export const EditUserPage = () => {
    return (
        <MainLogin>
            <SectionLogin>
                <h1>Editar Usuário do Sistema</h1>
                <DivLogin>
                    <FontAwesomeIcon icon="fa-solid fa-user-pen" />
                    <FormUserRegister rotas={"edituser"} />
                </DivLogin>
            </SectionLogin>
        </MainLogin>
    );
};