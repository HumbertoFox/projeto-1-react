import React from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FormFull } from "../components/form/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DivFormsMenu, MainMenu } from "../styles/mainpagestyle";
library.add(fas);
export const RegisterDoctorsPage = () => {
    return (
        <MainMenu>
            <h1>Cadastrar Doutor(a)</h1>
            <DivFormsMenu>
                <FontAwesomeIcon icon="fa-solid fa-user-doctor" />
                <FormFull
                    searchs={null}
                    crms={null}
                    page={"RegisterDoctors"}
                    rotas={"registerdoctor"}
                    title={"Cadastrar Doutor(a)"}
                    values={"Cadastrar"}
                />
            </DivFormsMenu>
        </MainMenu>
    );
};