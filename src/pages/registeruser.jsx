import React from "react";
import { DivLogin, MainLogin, SectionLogin } from "../styles/mainpagestyle";
import { FormUserRegister } from "../components/form/formuserreg";

export const RegisterUserPage = () => {
    return (
        <MainLogin>
            <SectionLogin>
                <h1>Cadastrar Usuário no Sistema</h1>
                <DivLogin>
                    <FormUserRegister />
                </DivLogin>
            </SectionLogin>
        </MainLogin>
    );
};