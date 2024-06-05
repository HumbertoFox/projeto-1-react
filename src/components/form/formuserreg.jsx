import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../button/buttonsubmit";
import { ButtonButton } from "../button/buttonbutton";
import { LabelText } from "../../styles/labelstyle";
import { FormDoctor } from "../../styles/formdrstyle";
import { DivButtons, DivFormMsgs } from "../../styles/mainpagestyle";

export const FormUserRegister = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
    };
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <DivFormMsgs>
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
            <LabelText htmlFor="tel">Telefone</LabelText>
            <input
                type="tel"
                id="tel"
                placeholder={`${errors.tel ? "Campo Obrigatório" : ""}`}
                className={`${errors.tel ? "required" : ""}`}
                {...register("tel", {
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
                    required: "Required field"
                })}
            />
            <DivButtons>
                <SubmitButton value="Cadastrar" />
                <ButtonButton>Iniciar</ButtonButton>
            </DivButtons>
        </FormDoctor>
    );
};