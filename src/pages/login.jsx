import React from "react";
import { DivLogin, MainLogin, SectionLogin } from "../styles/mainpagestyle";
import { FormLogin } from "../components/form/formlogin";
import LogoPrincipal from "../assets/simbolo-de-medicina.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export const LoginPage = () => {
    return (
        <MainLogin>
            <SectionLogin>
                <h1>Usuário do Sistema</h1>
                <img src={LogoPrincipal} alt="Logo Medicina" />
                <DivLogin>
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                    <FormLogin />
                </DivLogin>
            </SectionLogin>
        </MainLogin>
    );
};