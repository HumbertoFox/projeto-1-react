import React from "react";
import { Link } from "react-router-dom";
import { DivMenus, DivIconDoble, MainMenu } from "../styles/mainpagestyle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
export const MenuRegistersPage = () => {
    return (
        <MainMenu>
            <h1>Página de Menu</h1>
            <DivMenus>
                <DivIconDoble>
                    <Link to={"/agenda"} title="Agenda">
                        <FontAwesomeIcon icon="fa-solid fa-calendar-check" />
                    </Link>
                    <Link to={"/registerPatient"} title="Cadastrar Paciente">
                        <FontAwesomeIcon icon="fa-solid fa-bed" />
                    </Link>
                </DivIconDoble>
                <DivIconDoble>
                    <Link to={"/agenda"} title="Cadastrar Doutores">
                        <FontAwesomeIcon icon="fa-solid fa-book-medical" />
                    </Link>
                    <Link to={"/agenda"} title="Cadastrar Usuário">
                        <FontAwesomeIcon icon="fa-solid fa-book-medical" />
                    </Link>
                </DivIconDoble>
                <DivIconDoble>
                    <Link to={"/registerUser"} title="Cadastrar Usuário">
                        <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                    </Link>
                    <Link to={"/registerDoctors"} title="Cadastrar Doutores">
                        <FontAwesomeIcon icon="fa-solid fa-user-doctor" />
                    </Link>
                </DivIconDoble>
                <DivIconDoble>
                    <Link to={"/editDoctors"} title="Editar Doutor(a)">
                        <FontAwesomeIcon icon="fa-solid fa-user-nurse" />
                    </Link>
                    <Link to={"/editPatient"} title="Editar Paciente">
                        <FontAwesomeIcon icon="fa-solid fa-bed-pulse" />
                    </Link>
                </DivIconDoble>
                <DivIconDoble>
                    <Link to={"/editarUser"} title="Editar Usuário">
                        <FontAwesomeIcon icon="fa-solid fa-user-pen" />
                    </Link>
                    <Link to={"/blockingUser"} title="Bloquear Usuário">
                        <FontAwesomeIcon icon="fa-solid fa-user-lock" />
                    </Link>
                </DivIconDoble>
            </DivMenus>
        </MainMenu>
    );
};