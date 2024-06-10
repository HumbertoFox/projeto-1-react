import React from "react";
import { Link } from "react-router-dom";
import { MainLogin, SectionLogin, DivMenus } from "../styles/mainpagestyle";
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
                    <Link to={"/"} title="Agenda" className="calendar">
                        <FontAwesomeIcon icon="fa-solid fa-calendar-check" />
                    </Link>
                    <Link to={"/registerDoctors"} title="Cadastrar Doutores" className="doctor">
                        <FontAwesomeIcon icon="fa-solid fa-user-doctor" />
                    </Link>
                    <Link to={"/registerUser"} title="Cadastrar Usuário" className="adduser">
                        <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                    </Link>
                    <Link to={"/"} title="Excluir Usuário" className="deluser">
                        <FontAwesomeIcon icon="fa-solid fa-user-xmark" />
                    </Link>
                </DivMenus>
            </SectionLogin>
        </MainLogin>
    );
};