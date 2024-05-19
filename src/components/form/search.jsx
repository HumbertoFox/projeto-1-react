import React from "react";
import { FormSerach } from "../../styles/formsearch";

export const Search = () => {
    return (
        <FormSerach action="/" method="POST">
            <label htmlFor="search_patient">Pesquisar Paciente</label>
            <input type="search" name="search_patient" id="search_patient" />
            <input type="submit" value="Pesquisar" />
        </FormSerach>
    )
}