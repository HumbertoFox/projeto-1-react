import React from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FormFull } from "../components/form/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DivForms, DivFormsMenu, MainMenu } from "../styles/mainpagestyle";
library.add(fas);
export const RegisterPatientPage = () => {
    return (
        <MainMenu>
            <h1>Cadastrar Paciente</h1>
            <DivFormsMenu>
                <FontAwesomeIcon icon="fa-solid fa-bed-pulse" />
                <DivForms>
                    <FormFull
                        searchs={null}
                        crms={null}
                        page={"RegisterPatients"}
                        rotas={"registerpatient"}
                        title={"Cadastrar Paciente"}
                        values={"Cadastrar"}
                    />
                </DivForms>
            </DivFormsMenu>
        </MainMenu>
    );
};