import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DivNomeEd, DivParticular, DivPlan, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { viaCepApi } from "../../services/viacep";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";

export const FormPatientDrX = () => {

    const [radioSelect, setRadioSelect] = useState("casa");
    const swapRadioSelect = e => {
        setRadioSelect(e.target.value);
    };

    const [selectRadio, setSelectRadio] = useState("plan");
    const swapSelectedRadio = e => {
        setSelectRadio(e.target.value);
    };

    const checkedZipCode = async (e) => {

        const clearZipCode = () => {
            setValue('zipcode', "");
            setValue('street', "");
            setValue('district', "");
            setValue('city', "");
        };

        if (!e.target.value) {
            clearZipCode();
            setFocus('contacttel');
            alert("Formato de CEP inválido.");
            return;
        };

        const zipcode = e.target.value.replace(/\D/g, '');
        var validazipcode = /^[0-9]{8}$/;

        try {
            if (validazipcode.test(zipcode)) {
                const data = await viaCepApi.get(`${zipcode}/json/`)
                    .then(res => res.data);
                if (data && !data.erro) {
                    setValue('street', data.logradouro);
                    setValue('district', data.bairro);
                    setValue('city', data.localidade);
                    setFocus('residencenumber');
                } else {
                    clearZipCode();
                    setFocus('contacttel');
                    alert("CEP não encontrado.");
                }
            } else {
                clearZipCode();
                setFocus('contacttel');
                alert("Formato de CEP inválido.");
            }
        } catch (error) {
            console.error(error);
            clearZipCode();
            setFocus('contacttel');
            alert(`Formato de CEP inválido ou não encontrado.`);
            return;
        }
    };

    const onSubmit = e => {
        console.log(e);
    }

    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        formState: { errors }
    } = useForm();

    return (
        <FormDoctor action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="name">Nome:</LabelText>
            <input
                type="text"
                id="name"
                placeholder={`${errors.name ? "Campo Obrigatório" : ""}`}
                className={`${errors.name ? "required" : ""}`}
                {
                ...register("name", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="cpf">CPF:</LabelText>
            <input
                type="number"
                id="cpf"
                placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                className={`${errors.cpf ? "required" : ""}`}
                {
                ...register("cpf", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="contacttel">Telefone:</LabelText>
            <input
                type="tel"
                id="contacttel"
                placeholder={`${errors.contacttel ? "Campo Obrigatório" : ""}`}
                className={`${errors.contacttel ? "required" : ""}`}
                {
                ...register("contacttel", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="zipcode">CEP</LabelText>
            <input
                type="number"
                id="zipcode"
                {...register("zipcode")}
                onBlur={checkedZipCode}
            />
            <LabelText htmlFor="street">Logradouro: Av/Travessa/Rua</LabelText>
            <input
                type="text"
                id="street"
                placeholder={`${errors.street ? "Campo Obrigatório" : ""}`}
                className={`${errors.street ? "required" : ""}`}
                {
                ...register("street", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="residencenumber">Número da Casa/Edifício</LabelText>
            <input
                type="text"
                id="residencenumber"
                placeholder={`${errors.residencenumber ? "Campo Obrigatório" : ""}`}
                className={`${errors.residencenumber ? "required" : ""}`}
                {
                ...register("residencenumber", {
                    required: "Required field"
                })}
            />
            <DivRadio>
                <LabelText htmlFor="casa">
                    <input type="radio"
                        id="casa"
                        value="casa"
                        checked={radioSelect === "casa" ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Casa
                </LabelText>
                <LabelText htmlFor="edificio">
                    <input type="radio"
                        id="edificio"
                        value="edificio"
                        checked={radioSelect === "edificio" ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Edifício
                </LabelText>
            </DivRadio>
            <DivNomeEd className={radioSelect}>
                <LabelText htmlFor="building">Nome do Edifício</LabelText>
                <input type="text" id="building" {...register("building")} />
                <LabelText htmlFor="block">Bloco</LabelText>
                <input type="text" id="block" {...register("block")} />
                <LabelText htmlFor="apartment">Apartamento</LabelText>
                <input type="text" id="apartment" {...register("apartment")} />
            </DivNomeEd>
            <LabelText htmlFor="district">Bairro/Distrito</LabelText>
            <input
                type="text"
                id="district"
                placeholder={`${errors.district ? "Campo Obrigatório" : ""}`}
                className={`${errors.district ? "required" : ""}`}
                {
                ...register("district", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="city">Cidade</LabelText>
            <input
                type="text"
                id="city"
                placeholder={`${errors.city ? "Campo Obrigatório" : ""}`}
                className={`${errors.city ? "required" : ""}`}
                {
                ...register("city", {
                    required: "Required field"
                })}
            />
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
            <input
                type="date"
                id="consultationdate"
                className={`${errors.consultationdate ? "requireddate" : ""}`}
                {
                ...register("consultationdate", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="observation">Observações:</LabelText>
            <textarea name="observation" id="observation" {...register("observation")}></textarea>
            <SubmitButton value="Agendar" />
        </FormDoctor>
    );
};