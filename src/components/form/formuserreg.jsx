import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { viaCepApi } from "../../services/viacep";
import { SubmitButton } from "../button/buttonsubmit";
import { ButtonButton } from "../button/buttonbutton";
import { LabelText } from "../../styles/labelstyle";
import { DivDate, DivDateAge, DivDateBirth, DivNameEd, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { DivButtons } from "../../styles/mainpagestyle";
import { ActivityClicked } from "../modal/eventsclick";
import { registerUser } from "../../services/api/apis";
export const FormUserRegister = () => {
    const navigate = useNavigate();
    const [eventAlert, setEventAlert] = useState(null);
    const [radioSelect, setRadioSelect] = useState("house");
    const [age, setAge] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        setError,
        watch,
        formState: { errors }
    } = useForm();
    const password = watch('password');
    const getCheckedCpf = (data) => {
        const isRepeatedCpf = (cpf) => {
            const firstDigit = cpf[0];
            return cpf.split('').every(digit => digit === firstDigit);
        };
        if (isRepeatedCpf(data)) {
            return;
        };
        const calculateCheckDigit = (input) => {
            let sum = 0;
            for (let i = 0; i < input.length; i++) {
                const digit = input.charAt(i);
                const weight = (input.length + 1 - i);
                sum += Number(digit) * weight;
            };
            const remainder = sum % 11;
            return remainder < 2 ? "0" : (11 - remainder);
        };
        let primaryCheckDigit = calculateCheckDigit(data.substring(0, 9));
        let secondaryCheckDigit = calculateCheckDigit(data.substring(0, 9) + primaryCheckDigit);
        let correctCpf = data.substring(0, 9) + primaryCheckDigit + secondaryCheckDigit;
        return data === correctCpf;
    };
    const swapRadioSelect = element => {
        setRadioSelect(element.target.value);
    };
    const checkedZipCode = async (element) => {
        const clearZipCode = () => {
            setValue('zipcode', "");
            setValue('street', "");
            setValue('district', "");
            setValue('city', "");
        };
        if (!element.target.value) {
            clearZipCode();
            setFocus('email');
            alert("Formato de CEP inválido.");
            return;
        };
        const zipcode = element.target.value.replace(/\D/g, '');
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
                    setFocus('email');
                    alert("CEP não encontrado.");
                }
            } else {
                clearZipCode();
                setFocus('email');
                alert("Formato de CEP inválido.");
            }
        } catch (error) {
            console.error(error);
            clearZipCode();
            setFocus('email');
            alert(`Formato de CEP inválido ou não encontrado.`);
            return;
        }
    };
    const handleEventAlertClose = () => {
        setEventAlert(null);
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
    const onSubmit = async (data) => {
        const cpf = data.cpf;
        if (!getCheckedCpf(cpf)) {
            setError("cpf", { type: "focus" }, { shouldFocus: true });
            return;
        };
        try {
            const response = await registerUser(data);
            if (response.Error == true) {
                setEventAlert({
                    type: "Error",
                    message: response.message
                });
            } else {
                setEventAlert({
                    type: "Success",
                    message: response.message
                });
                setTimeout(function () {
                    navigate("/");
                }, 3000);
            };
        } catch (error) {
            setEventAlert({
                type: "Error",
                message: response.message
            });
        };
    };
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input
                type="text"
                id="cpf"
                placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                className={`${errors.cpf ? "required" : ""}`}
                {...register("cpf", { required: true, maxLength: 11, pattern: { value: /\d{11}/g } })}
            />
            <LabelText htmlFor="name">Nome</LabelText>
            <input
                type="text"
                id="name"
                placeholder={`${errors.name ? "Campo Obrigatório" : ""}`}
                className={`${errors.name ? "required" : ""}`}
                {...register("name", { required: true, pattern: { value: /[A-Za-z]{5}/g } })}
            />
            <DivDate>
                <DivDateBirth>
                    <LabelText htmlFor="dateofbirth">Data de Nascimento</LabelText>
                    <input
                        type="date"
                        id="dateofbirth"
                        className={`${errors.dateofbirth ? "requireddate" : ""}`}
                        {...register("dateofbirth", { required: true, onChange: handleDateChange })}
                    />
                </DivDateBirth>
                <DivDateAge>
                    <p>{age}</p>
                    <p>anos</p>
                </DivDateAge>
            </DivDate>
            <LabelText htmlFor="telephone">Telefone</LabelText>
            <input
                type="tel"
                id="telephone"
                placeholder={`${errors.telephone ? "Campo Obrigatório" : ""}`}
                className={`${errors.telephone ? "required" : ""}`}
                {...register("telephone", { required: true, maxLength: 11, pattern: { value: /\d{11}/g } })}
            />
            <LabelText htmlFor="email">Email</LabelText>
            <input
                type="email"
                id="email"
                placeholder={`${errors.email ? "Campo Obrigatório" : ""}`}
                className={`${errors.email ? "required" : ""}`}
                {...register("email", { required: true })}
            />
            <LabelText htmlFor="zipcode">CEP</LabelText>
            <input type="text" id="zipcode" {...register("zipcode", { onBlur: checkedZipCode })} />
            <LabelText htmlFor="street">Logradouro Av/Travessa/Rua</LabelText>
            <input
                type="text"
                id="street"
                placeholder={`${errors.street ? "Campo Obrigatório" : ""}`}
                className={`${errors.street ? "required" : ""}`}
                {...register("street", { required: true })}
            />
            <LabelText htmlFor="residencenumber">Número da Casa/Edifício</LabelText>
            <input
                type="text"
                id="residencenumber"
                placeholder={`${errors.residencenumber ? "Campo Obrigatório" : ""}`}
                className={`${errors.residencenumber ? "required" : ""}`}
                {...register("residencenumber", { required: true })}
            />
            <DivRadio>
                <LabelText htmlFor="house">
                    <input type="radio"
                        id="house"
                        value="house"
                        checked={radioSelect === "house" ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Casa
                </LabelText>
                <LabelText htmlFor="buildingradio">
                    <input type="radio"
                        id="buildingradio"
                        value="buildingradio"
                        checked={radioSelect === "buildingradio" ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Edifício
                </LabelText>
            </DivRadio>
            <DivNameEd className={radioSelect}>
                <LabelText htmlFor="building">Nome do Edifício</LabelText>
                <input type="text" id="building" {...register("building", { value: "..." })} />
                <LabelText htmlFor="buildingblock">Bloco</LabelText>
                <input type="text" id="buildingblock" {...register("buildingblock", { value: "..." })} />
                <LabelText htmlFor="apartment">Apartamento</LabelText>
                <input type="text" id="apartment" {...register("apartment", { value: "..." })} />
            </DivNameEd>
            <LabelText htmlFor="district">Bairro/Distrito</LabelText>
            <input
                type="text"
                id="district"
                placeholder={`${errors.district ? "Campo Obrigatório" : ""}`}
                className={`${errors.district ? "required" : ""}`}
                {...register("district", { required: true })}
            />
            <LabelText htmlFor="city">Cidade</LabelText>
            <input
                type="text"
                id="city"
                placeholder={`${errors.city ? "Campo Obrigatório" : ""}`}
                className={`${errors.city ? "required" : ""}`}
                {...register("city", { required: true })}
            />
            <LabelText htmlFor="password">Senha</LabelText>
            <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder={`${errors.password ? "Campo Obrigatório" : ""}`}
                className={`${errors.password ? "required" : ""}`}
                {...register("password", { required: true })}
            />
            <LabelText htmlFor="passwordchecked">Confirme Senha</LabelText>
            <input
                type="password"
                id="passwordchecked"
                autoComplete="off"
                placeholder={`${errors.passwordchecked ? "Campo Obrigatório" : ""}`}
                className={`${errors.passwordchecked ? "required" : ""}`}
                {...register("passwordchecked", { required: true, validate: (value) => value === password })}
            />
            <DivButtons>
                <SubmitButton title="Cadastrar" value="Cadastrar" />
                <ButtonButton title="Iniciar" onClick={() => navigate("/")}>Iniciar</ButtonButton>
                <ButtonButton title="Menu" onClick={() => navigate("/menuRegister")}>Menu</ButtonButton>
            </DivButtons>
            {eventAlert && <ActivityClicked event={eventAlert} onClose={handleEventAlertClose} />}
        </FormDoctor>
    );
};