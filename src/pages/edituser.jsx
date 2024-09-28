import React, { useState } from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Search } from "../components/form/search";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FormFull } from "../components/form/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DivForms, DivFormsMenu, MainMenu } from "../styles/mainpagestyle";
library.add(fas);
export const EditUserPage = () => {
    const [searchCpf, setSearchCpf] = useState(null);
    function cpfPatient(cpf) {
        setSearchCpf(cpf);
    };
    return (
        <MainMenu>
            <h1>Editar Usuário</h1>
            <DivFormsMenu>
                <FontAwesomeIcon icon="fa-solid fa-user-pen" />
                <DivForms>
                    <Search searchs={cpfPatient} rotas={"searchuser"} />
                    <FormFull
                        searchs={searchCpf}
                        crms={null}
                        page={"EditUser"}
                        rotas={"edituser"}
                        title={"Editar Usuário"}
                        values={"Editar"}
                    />
                </DivForms>
            </DivFormsMenu>
        </MainMenu>
    );
};