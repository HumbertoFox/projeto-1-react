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
            <LabelText htmlFor="search_patient">Pesquisar Paciente</LabelText>
            <input type="search" id="search_patient" {...register("search_patient")} />
            <SubmitButton value="Pesquisar" />
        </FormSerach>
    )
}