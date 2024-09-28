import React from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FormFull } from "../components/form/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DivFormsMenu, MainMenu } from "../styles/mainpagestyle";
library.add(fas);
export const RegisterUserPage = () => {
    return (
        <MainMenu>
            <h1>Cadastrar Usuário</h1>
            <DivFormsMenu>
                <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                <FormFull
                searchs={null}
                crms={null}
                page={"RegisterUser"}
                rotas={"registeruser"}
                title={"Cadastrar Usuário"}
                values={"Cadastrar"}
                />
            </DivFormsMenu>
        </MainMenu>
    );
};