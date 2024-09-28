import React, { useState } from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../styles/buttonstyle";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authcontext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { DivButtons } from "../../styles/mainpagestyle";
import { useNavigate } from "react-router-dom";
import { apiDbPostgres } from "../../services/api/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActivityClicked } from "../modal/eventsclick";
import { DivBtnPassword, FormsFull, LabelText } from "../../styles/formstyle";
library.add(fas);
export const FormLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [eventAlert, setEventAlert] = useState(null);
    const [ispass, setIspass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleEventAlertClose = () => {
        setEventAlert(null);
    };
    const handlePass = () => setIspass(!ispass);
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
                    navigate("/agenda");
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
        <FormsFull onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="cpf">CPF
                <input
                    type="number"
                    id="cpf"
                    autoComplete="off"
                    placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                    className={`${errors.cpf ? "required" : ""}`}
                    {...register("cpf", { required: true })}
                />
            </LabelText>
            <DivBtnPassword>
                <LabelText htmlFor="password">Senha
                    <input
                        type={ispass ? 'text' : 'password'}
                        id="password"
                        autoComplete="off"
                        placeholder={`${errors.password ? "Campo Obrigatório" : ""}`}
                        className={`${errors.password ? "requiredpassword" : ""}`}
                        {...register("password", { required: true })}
                    />
                    <button type='button' onClick={handlePass}>
                        {!ispass && <FontAwesomeIcon icon="fa-solid fa-eye" />}
                        {ispass && <FontAwesomeIcon icon="fa-solid fa-eye-slash" />}
                    </button>
                </LabelText>
            </DivBtnPassword>
            <DivButtons>
                <Input type="submit" title="Entrar" value="Entrar" />
            </DivButtons>
            {eventAlert && (
                <ActivityClicked title={"fechar login"} event={eventAlert} onClose={handleEventAlertClose} />
            )}
        </FormsFull>
    );
};