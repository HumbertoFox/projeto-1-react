import React from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { FormDoctor } from "../../styles/formdrstyle";
import { DivButtons } from "../../styles/mainpagestyle";

export const FormLogin = () => {
    const onSubmit = e => {
        console.log(e);
    };

    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        formState: { errors }
    } = useForm();

    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
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
                        value: /\d/g
                    },
                    minLength: {
                        value: 11
                    },
                    maxLength: {
                        value: 11
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
                <SubmitButton value="Entrar" />
                <SubmitButton value="Cadastrar Usuário" />
            </DivButtons>
        </FormDoctor>
    )
};