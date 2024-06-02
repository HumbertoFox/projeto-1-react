import React from "react";
import { useForm } from "react-hook-form";
import { FormSerach } from "../../styles/formsearch";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";

export const Search = () => {

    const onSubmit = e => {
        console.log(e);
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <FormSerach action="/" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="searchpatient">Pesquisar Paciente</LabelText>
            <input
                type="search"
                id="searchpatient"
                placeholder={`${errors.searchpatient ? "Campo Obrigatório" : ""}`}
                className={`${errors.searchpatient ? "required" : ""}`}
                {
                ...register("searchpatient", {
                    required: "Required field"
                })}
            />
            <SubmitButton value="Pesquisar" />
        </FormSerach>
    )
};