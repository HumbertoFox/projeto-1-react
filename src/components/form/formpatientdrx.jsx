import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DivParticular, DivPlan, DivRadio, FormDoctor, Input } from "../../styles/formdrstyle";

export const FormPatientDrX = () => {

    const [selectRadio, setSelectRadio] = useState("plan");
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
            </DivRadio>
            <DivPlan className={selectRadio}>
                <label htmlFor="plan">Plano:</label>
                <input type="text" name="plan" id="plan" />
            </DivPlan>
            <DivParticular className={selectRadio}>
                <label htmlFor="particular">Valor:</label>
                <input type="number" name="particular" id="particular" />
            </DivParticular>
            <label htmlFor="consultationdate">Data da Consulta</label>
            <input type="date" name="consultationdate" id="consultationdate" />
            <label htmlFor="observation">Observações:</label>
            <textarea name="observation" id="observation"></textarea>
            <Input type="submit" value="Agendar" />
        </FormDoctor>
    )
}