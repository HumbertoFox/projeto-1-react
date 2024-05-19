import React from "react";
import { FormSerach } from "../../styles/formsearch";
import { Input } from "../../styles/formdrstyle";

export const Search = () => {
    return (
        <FormSerach action="/" method="POST">
            <label htmlFor="search_patient">Pesquisar Paciente</label>
            <input type="search" name="search_patient" id="search_patient" />
            <Input type="submit" value="Pesquisar" />
        </FormSerach>
    )
}