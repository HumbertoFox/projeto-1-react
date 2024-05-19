import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DivPlan, DivRadio, FormDoctor, Input } from "../../styles/formdrstyle";

export const FormPatientDr = () => {

    const [selectRadio, setSelectRadio] = useState("");
    const swapSelectedRadio = e => {
        setSelectRadio(e.target.value);
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <FormDoctor action="" method="POST">
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" id="nome" />
            <label htmlFor="cpf">CPF:</label>
            <input type="number" name="cpf" id="cpf" />
            <label htmlFor="">Telefone:</label>
            <input type="tel" name="contatotel" id="contatotel" />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" />
            <DivRadio>
                <label htmlFor="plan">
                    <input type="radio"
                        id="plan"
                        value="plan"
                        checked={selectRadio === "plan" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Plano
                </label>
                <label htmlFor="particular">
                    <input type="radio"
                        value="particular"
                        id="particular"
                        checked={selectRadio === "particular" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Particular
                </label>
                <label htmlFor="courtesy">
                    <input type="radio"
                        value="courtesy"
                        id="courtesy"
                        checked={selectRadio === "courtesy" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Cortesia
                </label>
            </DivRadio>
            <DivPlan>
                <label htmlFor="plan">Plano:</label>
                <input type="text" name="plan" id="plan" />
            </DivPlan>
            <label htmlFor="consultationdate">Data da Consulta</label>
            <input type="date" name="consultationdate" id="consultationdate" />
            <label htmlFor="observation">Observações:</label>
            <textarea name="observation" id="observation"></textarea>
            <Input type="submit" value="Agendar" />
        </FormDoctor>
    )
}