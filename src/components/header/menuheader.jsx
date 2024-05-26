import React, { useState } from "react";
import { Header, ImgMedicina, UlHeader } from "../../styles/headerstyle";
import LogoPrincipal from "../../assets/simbolo-de-medicina.png";
import LogoDoutora from "../../assets/doutora.png";
import LogoDoutor from "../../assets/doutor.png";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);
var MenuSelection;

export const HeaderMenu = () => {

    const [selectMenuLi, setSelectMenuLi] = useState(MenuSelection);

    const handleMenuLiClick = (element) => {
        setSelectMenuLi(element);
        MenuSelection = element;
    };

    return (
        <Header>
            <ImgMedicina src={LogoPrincipal} alt="Icon Medicina" />
            <UlHeader>
                <li title="Calendario"
                    className={selectMenuLi === "calendario" ? "active" : ""}
                    onClick={() => handleMenuLiClick("calendario")}
                >
                    <Link to={"/"}>
                        <FontAwesomeIcon icon="fa-solid fa-book-open-reader" />
                        <span>Calendario</span>
                    </Link>
                </li>
                <li>
                    <img src={LogoDoutora} alt="Icone doutora" />
                    <span>Doutora teste</span>
                </li>
                <li title="Consulta Doutora"
                    className={selectMenuLi === "Consulta Doutora" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Consulta Doutora")}
                >
                    <Link to={"/ConsultationDRX"}>
                        <FontAwesomeIcon icon="fa-solid fa-notes-medical" />
                        <span>Consulta</span>
                    </Link>
                </li>
                <li title="Pacientes Doutora"
                    className={selectMenuLi === "Patients Doctorx" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Patients Doctorx")}
                >
                    <Link to={"/ReportDoctorX"}>
                        <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
                        <span>Lista Pacientes</span>
                    </Link>
                </li>
                <li>
                    <img src={LogoDoutor} alt="Icone doutor" />
                    <span>Doutor teste</span>
                </li>
                <li title="Consulta Doutor"
                    className={selectMenuLi === "Consulta Doutor" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Consulta Doutor")}
                >
                    <Link to={"/ConsultationDRY"}>
                        <FontAwesomeIcon icon="fa-solid fa-notes-medical" />
                        <span>Consulta</span>
                    </Link>
                </li>
                <li title="Pacientes Doutor"
                    className={selectMenuLi === "Patients doctor" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Patients doctor")}
                >
                    <Link to={"/ReportDoctorY"}>
                        <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
                        <span>Lista Pacientes</span>
                    </Link>
                </li>
            </UlHeader>
        </Header>
    )
};