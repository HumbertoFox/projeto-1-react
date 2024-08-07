import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { FormDoctor } from "../../styles/formdrstyle";
import { DivButtons } from "../../styles/mainpagestyle";
import { ActivityClicked } from "../modal/eventsclick";
import { apiDbPostgres } from "../../services/api/apis";
export const FormLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [eventAlert, setEventAlert] = useState(null);
    const [buttonType, setButtonType] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const handleButtonClicked = (type) => {
        setButtonType(type);
    };
    const handleEventAlertClose = () => {
        setEventAlert(null);
    };
    const onSubmit = async (data) => {
        try {
            const response = await apiDbPostgres(data, "loginuser");
            if (response.Error == true) {
                setEventAlert({
                    type: "Error",
                    message: response.message
                });
                setTimeout(() => {
                    window.location.reload();
                    navigate("/login");
                }, 3000);
            } else {
                setEventAlert({
                    type: "Success",
                    message: response.message
                });
                login(response.user);
                setTimeout(() => {
                    if (buttonType == "enter") {
                        navigate("/agenda");
                    } else if (buttonType == "menu") {
                        navigate("/menuRegister");
                    };
                }, 3000);
            };
        } catch (Error) {
            setEventAlert({
                type: "Error",
                message: "Erro ao conectar com o BD!"
            });
            setTimeout(() => {
                window.location.reload();
                navigate("/login");
            }, 3000);
        };
    };
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input
                type="number"
                id="cpf"
                autoComplete="off"
                placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                className={`${errors.cpf ? "required" : ""}`}
                {...register("cpf", { required: true })}
            />
            <LabelText htmlFor="password">Senha</LabelText>
            <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder={`${errors.password ? "Campo Obrigatório" : ""}`}
                className={`${errors.password ? "required" : ""}`}
                {...register("password", { required: true })}
            />
            <DivButtons>
                <SubmitButton title="Entrar" value="Entrar" onClick={() => handleButtonClicked("enter")} />
                <SubmitButton title="Menu" value="Menu" onClick={() => handleButtonClicked("menu")} />
            </DivButtons>
            {eventAlert && <ActivityClicked title={"fechar login"} event={eventAlert} onClose={handleEventAlertClose} />}
        </FormDoctor>
    );
};