import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DivParticular, DivPlan, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { SubmitButton } from "../button/buttonsubmit";

export const FormPatientDrY = () => {

    const [selectRadio, setSelectRadio] = useState("plan");
    const swapSelectedRadio = e => {
        setSelectRadio(e.target.value);
    }

    const onSubmit = e => {
        console.log(e);
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <FormDoctor action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" {...register("name")} />
            <label htmlFor="cpf">CPF:</label>
            <input type="number" id="cpf" {...register("cpf")} />
            <label htmlFor="contacttel">Telefone:</label>
            <input type="tel" id="contacttel" {...register("contacttel")} />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" {...register("email")} />
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
            <DivPlan className={selectRadio}>
                <label htmlFor="plan">Plano:</label>
                <input type="text" id="plan" {...register("plan")} />
            </DivPlan>
            <DivParticular className={selectRadio}>
                <label htmlFor="particular">Valor:</label>
                <input type="number" id="particular" {...register("particular")} />
            </DivParticular>
            <label htmlFor="consultationdate">Data da Consulta</label>
            <input type="date" id="consultationdate" {...register("consultationdate")} />
            <label htmlFor="observation">Observações:</label>
            <textarea id="observation" {...register("observation")}></textarea>
            <SubmitButton value="Agendar" />
        </FormDoctor>
    )
}