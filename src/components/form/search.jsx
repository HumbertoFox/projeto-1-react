import React from "react";
import { FormSerach } from "../../styles/formsearch";
import { Input } from "../../styles/formdrstyle";
import { useForm } from "react-hook-form";

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
            <label htmlFor="search_patient">Pesquisar Paciente</label>
            <input type="search" id="search_patient" {...register("search_patient")} />
            <Input type="submit" value="Pesquisar" />
        </FormSerach>
    )
}