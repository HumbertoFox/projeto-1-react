import React from "react";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { FormDoctor } from "../../styles/formdrstyle";
import { DivFormMsgs } from "../../styles/mainpagestyle";

export const FormUserRegister = () => {
    return (
        <FormDoctor>
            <DivFormMsgs>
            </DivFormMsgs>
            <LabelText htmlFor="name">Nome</LabelText>
            <input type="text" id="name" />
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input type="number" id="cpf" />
            <LabelText htmlFor="tel">Telefone</LabelText>
            <input type="tel" id="tel" />
            <LabelText htmlFor="email">Email</LabelText>
            <input type="email" id="email" />
            <LabelText htmlFor="password">Senha</LabelText>
            <input type="password" id="password" autoComplete="off" />
            <LabelText htmlFor="passwordchecked">Confirme Senha</LabelText>
            <input type="password" id="passwordchecked" autoComplete="off" />
            <SubmitButton value="Cadastrar" />
        </FormDoctor>
    );
};