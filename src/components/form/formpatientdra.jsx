import React from "react";
import { useForm } from "react-hook-form";
import { FormDoctorx } from "../../styles/formdrxstyle";

export const FormPatientDra = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <FormDoctorx action="" method="POST">
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" id="nome" />
            <label htmlFor="cpf">CPF:</label>
            <input type="number" name="cpf" id="cpf" />
            <label htmlFor="">Telefone:</label>
            <input type="tel" name="contatotel" id="contatotel" />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="plan">Plano:</label>
            <input type="text" name="plan" id="plan" />
            <label htmlFor="consultationdate">Data da Consulta</label>
            <input type="date" name="consultationdate" id="consultationdate" />
            <label htmlFor="observation">Observações:</label>
            <textarea name="observation" id="observation"></textarea>
            <input type="submit" value="Agendar" />
        </FormDoctorx>
    )
}