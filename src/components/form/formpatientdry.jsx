import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DivDate, DivDateAge, DivDateBirth, DivParticular, DivPlan, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
export const FormPatientDrY = () => {
    const [selectRadio, setSelectRadio] = useState("plan");
    const [age, setAge] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const swapSelectedRadio = element => {
        setSelectRadio(element.target.value);
    };
    const onSubmit = (data) => {
        console.log(data);
    };
    const calculateAge = (data) => {
        const birthDate = new Date(data);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        };
        return age;
    };
    const handleDateChange = (element) => {
        const data = element.target.value;
        if (data) {
            const calculatedAge = calculateAge(data);
            setAge(calculatedAge);
        } else {
            setAge(null);
        };
    };
    return (
        <FormDoctor action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input
                type="number"
                id="cpf"
                placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                className={`${errors.cpf ? "required" : ""}`}
                {...register("cpf", {
                    required: "Required field",
                    pattern: {
                        value: /\d{11}/g
                    }
                })}
            />
            <LabelText htmlFor="name">Nome</LabelText>
            <input
                type="text"
                id="name"
                placeholder={`${errors.name ? "Campo Obrigatório" : ""}`}
                className={`${errors.name ? "required" : ""}`}
                {...register("name", {
                    required: "Required field",
                    pattern: {
                        value: /[A-Za-z]{5}/g
                    }
                })}
            />
            <LabelText htmlFor="telephone">Telefone</LabelText>
            <input
                type="tel"
                id="telephone"
                placeholder={`${errors.telephone ? "Campo Obrigatório" : ""}`}
                className={`${errors.telephone ? "required" : ""}`}
                {...register("telephone", {
                    required: "Required field",
                    pattern: {
                        value: /\d{11}/g
                    }
                })}
            />
            <LabelText htmlFor="email">Email</LabelText>
            <input type="email" id="email" {...register("email", { required: "Required field" })} />
            <DivDate>
                <DivDateBirth>
                    <LabelText htmlFor="dateofbirth">Data d Nascimento</LabelText>
                    <input
                        type="date"
                        id="dateofbirth"
                        className={`${errors.dateofbirth ? "requireddate" : ""}`}
                        {
                        ...register("dateofbirth", {
                            required: "Required field"
                        })}
                        onChange={handleDateChange}
                    />
                </DivDateBirth>
                <DivDateAge>
                    <p>{age}</p>
                    <p>anos</p>
                </DivDateAge>
            </DivDate>
            <LabelText>CRM</LabelText>
            <input type="number" id="crm" disabled={true} {...register("crm", { value: "5000" })} />
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
                <LabelText htmlFor="plan">Plano</LabelText>
                <input type="text" id="plan" {...register("plan", { value: "..." })} />
            </DivPlan>
            <DivParticular className={selectRadio}>
                <LabelText htmlFor="particular">Valor</LabelText>
                <input type="text" id="particular" {...register("particular", { value: "..." })} />
            </DivParticular>
            <LabelText htmlFor="consultationdate">Data da Consulta</LabelText>
            <input
                type="date"
                id="consultationdate"
                className={`${errors.consultationdate ? "requireddate" : ""}`}
                {
                ...register("consultationdate", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="observation">Observações</LabelText>
            <textarea id="observation" {...register("observation", { value: "..." })}></textarea>
            <SubmitButton value="Agendar" />
        </FormDoctor>
    );
};