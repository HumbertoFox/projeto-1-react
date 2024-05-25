import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DivParticular, DivPlan, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";

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
            <LabelText htmlFor="name">Nome:</LabelText>
            <input type="text" id="name" {...register("name")} />
            <LabelText htmlFor="cpf">CPF:</LabelText>
            <input type="number" id="cpf" {...register("cpf")} />
            <LabelText htmlFor="contacttel">Telefone:</LabelText>
            <input type="tel" id="contacttel" {...register("contacttel")} />
            <LabelText htmlFor="email">Email:</LabelText>
            <input type="email" id="email" {...register("email")} />
            <DivRadio>
                <LabelText htmlFor="plan">
                    <input type="radio"
                        id="plan"
                        value="plan"
                        checked={selectRadio === "plan" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Plano
                </LabelText>
                <LabelText htmlFor="particular">
                    <input type="radio"
                        value="particular"
                        id="particular"
                        checked={selectRadio === "particular" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Particular
                </LabelText>
                <LabelText htmlFor="courtesy">
                    <input type="radio"
                        value="courtesy"
                        id="courtesy"
                        checked={selectRadio === "courtesy" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Cortesia
                </LabelText>
            </DivRadio>
            <DivPlan className={selectRadio}>
                <LabelText htmlFor="plan">Plano:</LabelText>
                <input type="text" id="plan" {...register("plan")} />
            </DivPlan>
            <DivParticular className={selectRadio}>
                <LabelText htmlFor="particular">Valor:</LabelText>
                <input type="number" id="particular" {...register("particular")} />
            </DivParticular>
            <LabelText htmlFor="consultationdate">Data da Consulta</LabelText>
            <input type="date" id="consultationdate" {...register("consultationdate")} />
            <LabelText htmlFor="observation">Observações:</LabelText>
            <textarea id="observation" {...register("observation")}></textarea>
            <SubmitButton value="Agendar" />
        </FormDoctor>
    )
}