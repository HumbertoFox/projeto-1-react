import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { FormDoctor } from "../../styles/formdrstyle";
import { DivButtons, DivFormMsgs } from "../../styles/mainpagestyle";

export const FormLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [status, setStatus] = useState({
        type: "",
        message: ""
    });
    const [buttonType, setButtonType] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = async (data) => {
        await fetch("http://localhost/projeto-1-react/src/services/login.php", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    setStatus({
                        type: "error",
                        message: responseJson.message
                    });
                } else {
                    setStatus({
                        type: "success",
                        message: responseJson[0].message
                    });
                    login(responseJson[0].user);
                    setTimeout(function () {
                        if (buttonType === "enter") {
                            navigate("/");
                        } else if (buttonType === "register") {
                            navigate("/registerUser");
                        };
                    }, 3000);
                };
            }).catch(() => {
                setStatus({
                    type: "error",
                    message: "Erro ao fazer login, Tente novamente!"
                });
            });
    };
    const handleButtonClicked = (type) => {
        setButtonType(type);
    };
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <DivFormMsgs>
                {status.type === "error"
                    ?
                    <span className="msgphperror">{status.message}</span>
                    :
                    <span className="msgphpsuccess">{status.message}</span>
                }
                {status.type === "success"
                    ?
                    <span className="msgphpsuccess">{status.message}</span>
                    :
                    <span className="msgphperror">{status.message}</span>
                }
            </DivFormMsgs>
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input
                type="number"
                id="cpf"
                autoComplete="off"
                placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                className={`${errors.cpf ? "required" : ""}`}
                {...register("cpf", {
                    required: "Required field",
                    pattern: {
                        value: /\d{11}/g
                    }
                })}
            />
            <LabelText htmlFor="password">Senha</LabelText>
            <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder={`${errors.password ? "Campo Obrigatório" : ""}`}
                className={`${errors.password ? "required" : ""}`}
                {...register("password", {
                    required: "Required field"
                })}
            />
            <DivButtons>
                <SubmitButton title="Entrar" value="Entrar" onClick={() => handleButtonClicked("enter")} />
                <SubmitButton title="Cadastrar Usuário" value="Cadastrar Usuário" onClick={() => handleButtonClicked("register")} />
            </DivButtons>
        </FormDoctor>
    )
};