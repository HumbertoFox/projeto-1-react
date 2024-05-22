import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DivNomeEd, DivParticular, DivPlan, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { viaCepApi } from "../../services/viacep";
import { SubmitButton } from "../button/buttonsubmit";

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
            setValue('neighborhood', "");
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
                    setValue('neighborhood', data.bairro);
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
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" {...register("name")} />
            <label htmlFor="cpf">CPF:</label>
            <input type="number" id="cpf" {...register("cpf")} />
            <label htmlFor="contacttel">Telefone:</label>
            <input type="tel" id="contacttel" {...register("contacttel")} />
            <label htmlFor="zipcode">CEP</label>
            <input type="number" id="zipcode" {...register("zipcode")} onBlur={checkedZipCode} />
            <label htmlFor="street">Logradouro: Av/Travessa/Rua</label>
            <input type="text" id="street" {...register("street")} />
            <label htmlFor="residencenumber">Número da Casa/Edifício</label>
            <input type="text" id="residencenumber" {...register("residencenumber")} />
            <DivRadio>
                <label htmlFor="casa">
                    <input type="radio"
                        id="casa"
                        value="casa"
                        checked={radioSelect === "casa" ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Casa
                </label>
                <label htmlFor="edificio">
                    <input type="radio"
                        id="edificio"
                        value="edificio"
                        checked={radioSelect === "edificio" ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Edifício
                </label>
            </DivRadio>
            <DivNomeEd className={radioSelect}>
                <label htmlFor="building">Nome do Edifício</label>
                <input type="text" id="building" {...register("building")} />
                <label htmlFor="block">Bloco</label>
                <input type="text" id="block" {...register("block")} />
                <label htmlFor="apartment">Apartamento</label>
                <input type="text" id="apartment" {...register("apartment")} />
            </DivNomeEd>
            <label htmlFor="neighborhood">Bairro/Distrito</label>
            <input type="text" id="neighborhood" {...register("neighborhood")} />
            <label htmlFor="city">Cidade</label>
            <input type="text" id="city" {...register("city")} />
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
            <textarea name="observation" id="observation" {...register("observation")}></textarea>
            <SubmitButton value="Agendar" />
        </FormDoctor>
    )
};