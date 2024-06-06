import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../button/buttonsubmit";
import { ButtonButton } from "../button/buttonbutton";
import { LabelText } from "../../styles/labelstyle";
import { FormDoctor } from "../../styles/formdrstyle";
import { DivButtons, DivFormMsgs } from "../../styles/mainpagestyle";

export const FormUserRegister = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState({
        type: "",
        message: ""
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = async (data) => {
        await fetch("http://localhost/projeto-1-react/src/services/registeruser.php", {
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
                    setTimeout(function () {
                        navigate("/");
                    }, 3000);
                    setStatus({
                        type: "success",
                        message: responseJson.message
                    });
                };
            }).catch(() => {
                setStatus({
                    type: "error",
                    message: "Usuário não cadastrado, erro com o Bando!"
                });
            });
    };
    const password = watch('password');
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <DivFormMsgs>
                {status.type == "error"
                    ?
                    <span className="msgphperror">{status.message}</span>
                    :
                    <span className="msgphpsuccess">{status.message}</span>
                }
                {status.type == "sucess"
                    ?
                    <span className="msgphperror">{status.message}</span>
                    :
                    <span className="msgphpsuccess">{status.message}</span>
                }
            </DivFormMsgs>
            <LabelText htmlFor="name">Nome</LabelText>
            <input
                type="text"
                id="name"
                placeholder={`${errors.name ? "Campo Obrigatório" : ""}`}
                className={`${errors.name ? "required" : ""}`}
                {...register("name", {
                    required: "Required field",
                    pattern: {
                        value: /[A-Za-z]{5}/g
                    }
                })}
            />
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input
                type="number"
                id="cpf"
                placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                className={`${errors.cpf ? "required" : ""}`}
                {...register("cpf", {
                    required: "Required field",
                    pattern: {
                        value: /\d{11}/g
                    }
                })}
            />
            <LabelText htmlFor="telephone">Telefone</LabelText>
            <input
                type="tel"
                id="telephone"
                placeholder={`${errors.tel ? "Campo Obrigatório" : ""}`}
                className={`${errors.tel ? "required" : ""}`}
                {...register("telephone", {
                    required: "Required field",
                    pattern: {
                        value: /\d{11}/g
                    }
                })}
            />
            <LabelText htmlFor="email">Email</LabelText>
            <input
                type="email"
                id="email"
                placeholder={`${errors.email ? "Campo Obrigatório" : ""}`}
                className={`${errors.email ? "required" : ""}`}
                {...register("email", {
                    required: "Required field"
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
            <LabelText htmlFor="passwordchecked">Confirme Senha</LabelText>
            <input
                type="password"
                id="passwordchecked"
                autoComplete="off"
                placeholder={`${errors.passwordchecked ? "Campo Obrigatório" : ""}`}
                className={`${errors.passwordchecked ? "required" : ""}`}
                {...register("passwordchecked", {
                    required: "Checked required field",
                    validate: (value) =>
                        value === password || "The password do not match"
                })}
            />
            <DivButtons>
                <SubmitButton title="Cadastrar" value="Cadastrar" />
                <ButtonButton title="Iniciar" onClick={() => navigate("/")}>Iniciar</ButtonButton>
            </DivButtons>
        </FormDoctor>
    );
};