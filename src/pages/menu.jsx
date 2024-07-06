import React from "react";
import { Link } from "react-router-dom";
import { MainLogin, SectionLogin, DivMenus, DivIconDoble } from "../styles/mainpagestyle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
export const MenuRegistersPage = () => {
    return (
        <MainLogin>
            <SectionLogin>
                <h1>Página de Menus</h1>
                <DivMenus>
                    <DivIconDoble>
                        <Link to={"/agenda"} title="Agenda">
                            <FontAwesomeIcon icon="fa-solid fa-calendar-check" />
                        </Link>
                        <Link to={"/registerDoctors"} title="Cadastrar Doutores">
                            <FontAwesomeIcon icon="fa-solid fa-user-doctor" />
                        </Link>
                    </DivIconDoble>
                    <DivIconDoble>
                        <Link to={"/registerUser"} title="Cadastrar Usuário">
                            <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                        </Link>
                        <Link to={"/agenda"} title="Excluir Usuário">
                            <FontAwesomeIcon icon="fa-solid fa-user-xmark" />
                        </Link>
                    </DivIconDoble>
                </DivMenus>
            </SectionLogin>
        </MainLogin>
    );
};