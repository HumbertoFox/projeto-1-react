import React from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FormLogin } from "../components/form/formlogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainLogin, SectionLogin, DivLogin } from "../styles/mainpagestyle";
import LogoPrincipal from "../assets/simbolo-de-medicina.png";
library.add(fas);
export const LoginPage = () => {
    return (
        <MainLogin>
                <h1>Usuário do Sistema</h1>
            <SectionLogin>
                <DivLogin>
                <img src={LogoPrincipal} alt="Logo Medicina" />
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                    <FormLogin />
                </DivLogin>
            </SectionLogin>
        </MainLogin>
    );
};