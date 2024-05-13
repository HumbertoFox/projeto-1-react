import React, { useState } from "react";
import { Header, ImgMedicina, UlHeader } from "../styles/headerstyle";
import LogoPrincipal from "../../assets/simbolo-de-medicina.png";
import LogoInicial from "../../assets/pagina-inicial.png";
import LogoDoutora from "../../assets/doutorax.png";
import LogoDoutor from "../../assets/doutor.png";
import LogoAgenda from "../../assets/agenda.png";
import LogoConfirmar from "../../assets/confirmar.png";

export const HeaderMenu = () => {

    const [selectMenuLi, setSelectMenuLi] = useState("relatorio");

    const handleMenuLiClick = (element) => {
        setSelectMenuLi(element);
        console.log(element);
    };

    return (
        <Header>
            <ImgMedicina src={LogoPrincipal} alt="Icon Medicina" />
            <UlHeader>
                <li title="Relatório"
                    className={selectMenuLi === "relatorio" ? "active" : ""}
                    onClick={() => handleMenuLiClick("relatorio")}
                >
                    <img src={LogoInicial} alt="Icone Home" />
                    <span>Página Relatório</span>
                </li>
                <li>
                    <img src={LogoDoutora} alt="Icone doutora" />
                    <span>Doutora teste</span>
                </li>
                <li title="Consulta Doutora"
                    className={selectMenuLi === "Consulta Doutora" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Consulta Doutora")}
                >
                    <img src={LogoAgenda} alt="Icone agenda" />
                    <span>Consulta</span>
                </li>
                <li title="Retorno Doutora"
                    className={selectMenuLi === "Retorno Doutora" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Retorno Doutora")}
                >
                    <img src={LogoConfirmar} alt="Icone confirmar" />
                    <span>Retorno</span>
                </li>
                <li>
                    <img src={LogoDoutor} alt="Icone doutor" />
                    <span>Doutor teste</span>
                </li>
                <li title="Consulta Doutor"
                    className={selectMenuLi === "Consulta Doutor" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Consulta Doutor")}
                >
                    <img src={LogoAgenda} alt="Icone agenda" />
                    <span>Consulta</span>
                </li>
                <li title="Retorno Doutor"
                    className={selectMenuLi === "Retorno Doutor" ? "active" : ""}
                    onClick={() => handleMenuLiClick("Retorno Doutor")}
                >
                    <img src={LogoConfirmar} alt="Icone confirmar" />
                    <span>Retorno</span>
                </li>
            </UlHeader>
        </Header>
    )
};