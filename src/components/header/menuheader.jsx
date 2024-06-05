import React, { useEffect, useState } from "react";
import { Header, ImgMedicina, LiLogout, UlHeader } from "../../styles/headerstyle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";
import LogoPrincipal from "../../assets/simbolo-de-medicina.png";
import LogoDoutora from "../../assets/doutora.png";
import LogoDoutor from "../../assets/doutor.png";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

export const HeaderMenu = () => {
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();
    const [selectMenuLi, setSelectMenuLi] = useState("");
    const handleMenuLiClick = (element) => {
        setSelectMenuLi(element);
        localStorage.setItem("activeMenuSelection", element);
    };
    useEffect(() => {
        const activeMenuSelection = localStorage.getItem("activeMenuSelection");
        if (activeMenuSelection !== null) {
            setSelectMenuLi(activeMenuSelection);
            if (activeMenuSelection === "doctorxconsultation") {
                navigate("/consultationDRX");
            } else if (activeMenuSelection === "patientsdoctorx") {
                navigate("/reportDoctorX");
            } else if (activeMenuSelection === "doctoryconsultation") {
                navigate("/consultationDRY");
            } else if (activeMenuSelection === "patientsdoctory") {
                navigate("/reportDoctorY");
            };
        } else {
            setSelectMenuLi("calendar");
        };
    }, []);
    return (
        <Header>
            <ImgMedicina src={LogoPrincipal} alt="Icon Medicina" />
            <UlHeader>
                <li key={"Calendar"}
                    title="Calendario"
                    className={selectMenuLi === "calendar" ? "active" : ""}
                    onClick={() => handleMenuLiClick("calendar")}
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
                <li key={"Consultation DoctorX"}
                    title="Consulta Doutora"
                    className={selectMenuLi === "doctorxconsultation" ? "active" : ""}
                    onClick={() => handleMenuLiClick("doctorxconsultation")}
                >
                    <Link to={"/consultationDRX"}>
                        <FontAwesomeIcon icon="fa-solid fa-notes-medical" />
                        <span>Consulta</span>
                    </Link>
                </li>
                <li key={"Patients DoctorX"}
                    title="Pacientes Doutora"
                    className={selectMenuLi === "patientsdoctorx" ? "active" : ""}
                    onClick={() => handleMenuLiClick("patientsdoctorx")}
                >
                    <Link to={"/reportDoctorX"}>
                        <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
                        <span>Lista Pacientes</span>
                    </Link>
                </li>
                <li>
                    <img src={LogoDoutor} alt="Icone doutor" />
                    <span>Doutor teste</span>
                </li>
                <li key={"Consultation DoctorY"}
                    title="Consulta Doutor"
                    className={selectMenuLi === "doctoryconsultation" ? "active" : ""}
                    onClick={() => handleMenuLiClick("doctoryconsultation")}
                >
                    <Link to={"/consultationDRY"}>
                        <FontAwesomeIcon icon="fa-solid fa-notes-medical" />
                        <span>Consulta</span>
                    </Link>
                </li>
                <li key={"Patients DoctorY"}
                    title="Pacientes Doutor"
                    className={selectMenuLi === "patientsdoctory" ? "active" : ""}
                    onClick={() => handleMenuLiClick("patientsdoctory")}
                >
                    <Link to={"/reportDoctorY"}>
                        <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
                        <span>Lista Pacientes</span>
                    </Link>
                </li>
                <LiLogout
                    title="Sair do Sistema"
                >
                    <Link to={"/Login"} onClick={logout}>
                        <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                        <span>Sair do Sistema</span>
                    </Link>
                </LiLogout>
            </UlHeader>
        </Header>
    )
};