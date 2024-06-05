import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../button/buttonsubmit";
import { ButtonButton } from "../button/buttonbutton";
import { LabelText } from "../../styles/labelstyle";
import { FormDoctor } from "../../styles/formdrstyle";
import { DivButtons, DivFormMsgs } from "../../styles/mainpagestyle";

export const FormUserRegister = () => {
    const navigate = useNavigate();
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
            <DivButtons>
            <SubmitButton value="Cadastrar" />
            <ButtonButton>Iniciar</ButtonButton>
            </DivButtons>
        </FormDoctor>
    );
};