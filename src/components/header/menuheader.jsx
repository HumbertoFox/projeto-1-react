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
                <li title="Relatório"
                    className={selectMenuLi === "relatorio" ? "active" : ""}
                    onClick={() => handleMenuLiClick("relatorio")}
                >
                    <Link to={"/"}>
                        <FontAwesomeIcon icon="fa-solid fa-book-open-reader" />
                        <span>Página Relatório</span>
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
                    <Link to={"/ConsultationDRA"}>
                        <FontAwesomeIcon icon="fa-solid fa-notes-medical" />
                        <span>Consulta</span>
                    </Link>
                </li>
                <li title="Retorno Doutora"
                    className={selectMenuLi === "Retorno Doutora" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Retorno Doutora")}
                >
                    <Link>
                        <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
                        <span>Retorno</span>
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
                    <Link to={"/ConsultationDR"}>
                        <FontAwesomeIcon icon="fa-solid fa-notes-medical" />
                        <span>Consulta</span>
                    </Link>
                </li>
                <li title="Retorno Doutor"
                    className={selectMenuLi === "Retorno Doutor" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Retorno Doutor")}
                >
                    <Link>
                        <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
                        <span>Retorno</span>
                    </Link>
                </li>
            </UlHeader>
        </Header>
    )
};