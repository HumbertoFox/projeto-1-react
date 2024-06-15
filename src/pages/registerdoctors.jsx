import React from "react";
import { DivLogin, MainLogin, SectionLogin } from "../styles/mainpagestyle";
import { FormDoctorsRegister } from "../components/form/formdoctorreg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
export const RegisterDoctorsPage = () => {
    return (
        <MainLogin>
            <SectionLogin>
                <h1>Cadastrar Doutora/Doutor no Sistema</h1>
                <DivLogin>
                    <FontAwesomeIcon icon="fa-solid fa-user-doctor" />
                    <FormDoctorsRegister />
                </DivLogin>
            </SectionLogin>
        </MainLogin>
    );
};