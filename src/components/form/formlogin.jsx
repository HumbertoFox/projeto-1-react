import React, { useEffect, useState } from "react";
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
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [buttonType, setButtonType] = useState("");
    useEffect(() => {
        setTimeout(function () {
            setMsg("");
        }, 3000);
    }, [msg, error]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = async (data) => {
        if (data.cpf && data.password) {
            const url = "http://localhost/projeto-1-react/src/services/login.php";
            const headers = {
                "Accept": "application/json",
                "Content-type": "application/json"
            };
            const requestData = {
                cpf: data.cpf,
                password: data.password
            };
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(requestData)
                });
                const result = await response.json();
                if (result[0].result === "CPF não Cadastrado!" || result[0].result === "Senha Invalida!") {
                    setError(result[0].result);
                } else {
                    setError("");
                    setMsg(result[0].result);
                    login(result[0].user);
                    setTimeout(function () {
                        if (buttonType === "enter") {
                            navigate("/");
                        } else if (buttonType === "register") {
                            navigate("/registerUser");
                        };
                    }, 3000);
                };
            } catch (err) {
                setError("Erro ao fazer login. Tente novamente.");
                console.log(err);
            };
        } else {
            setError("All field are required!");
        };
    };
    const handleButtonClicked = (type) => {
        setButtonType(type);
    };
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <DivFormMsgs>
                {
                    error !== ""
                        ?
                        <span className="msgphperror">{error}</span>
                        :
                        <span className="msgphpsuccess">{msg}</span>
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