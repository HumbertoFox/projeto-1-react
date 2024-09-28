import React, { useState } from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FormFull } from "../components/form/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DivForms, DivFormsMenu, MainMenu } from "../styles/mainpagestyle";
import { Search } from "../components/form/search";
library.add(fas);
export const EditDoctorsPage = () => {
    const [searchCrmCpf, setSearchCrmCpf] = useState(null);
    function crmCpfDoctor(cpf) {
        setSearchCrmCpf(cpf);
    };
    return (
        <MainMenu>
            <h1>Editar Doutor(a)</h1>
            <DivFormsMenu>
                <FontAwesomeIcon icon="fa-solid fa-user-nurse" />
                <DivForms>
                    <Search searchs={crmCpfDoctor} rotas={"searchdoctor"} />
                    <FormFull
                        searchs={searchCrmCpf}
                        crms={null}
                        page={"EditDoctors"}
                        rotas={"editdoctor"}
                        title={"Editar Doutor(a)"}
                        values={"Editar"}
                    />
                </DivForms>
            </DivFormsMenu>
        </MainMenu>
    );
};