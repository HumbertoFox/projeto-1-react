import React from "react";
import { DivLogin, MainLogin, SectionLogin } from "../styles/mainpagestyle";
import { FormLogin } from "../components/form/formlogin";
import LogoPrincipal from "../assets/simbolo-de-medicina.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far);

export const LoginPage = () => {
    return (
        <MainLogin>
            <SectionLogin>
                <h1>Usuário do Sistema</h1>
                <img src={LogoPrincipal} alt="Logo Medicina" />
                <DivLogin>
                    <FontAwesomeIcon icon="fa-regular fa-address-card" />
                    <FormLogin />
                </DivLogin>
            </SectionLogin>
        </MainLogin>
    )
};