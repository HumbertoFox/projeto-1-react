import React, { useState } from "react";
import { useAuth } from "../../contexts/authcontext";
import { useForm } from "react-hook-form";
import { viaCepApi } from "../../services/api/viacep";
import { DivButtons } from "../../styles/mainpagestyle";
import { useNavigate } from "react-router-dom";
import { apiDbPostgres } from "../../services/api/apis";
import { Button, Input } from "../../styles/buttonstyle";
import { ActivityClicked } from "../modal/eventsclick";
import { DivDate, DivDateAge, DivDateBirth, DivNameEd, DivRadio, FormDoctor, LabelText } from "../../styles/formstyle";
export const FormDoctorsRegister = () => {
    const userSystem = useAuth().user;
    const navigate = useNavigate();
    const [eventAlert, setEventAlert] = useState(null);
    const [radioSelect, setRadioSelect] = useState("house");
    const [age, setAge] = useState(null);
    const { register, handleSubmit, setValue, setFocus, setError, reset, formState: { errors } } = useForm();
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
        data.user_id = userSystem.id;
        try {
            const response = await apiDbPostgres(data, "registerdoctor");
            if (response.error == true) {
                setEventAlert({
                    type: "Error",
                    message: response.message
                });
            } else {
                setEventAlert({
                    type: "Success",
                    message: response.message
                });
                reset();
            };
        } catch (error) {
            setEventAlert({
                type: "Error",
                message: "Erro ao conectar com o BD!"
            });
        };
    };
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="crm">CRM
                <input
                    type="text"
                    id="crm"
                    placeholder={`${errors.crm ? "Campo Obrigatório" : ""}`}
                    className={`${errors.crm ? "required" : ""}`}
                    {...register("crm", { required: true, pattern: { value: /\d{4}/g } })}
                />
            </LabelText>
            <LabelText htmlFor="cpf">CPF
                <input
                    type="text"
                    id="cpf"
                    placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                    className={`${errors.cpf ? "required" : ""}`}
                    {...register("cpf", { required: true, maxLength: 11, pattern: { value: /\d{11}/g } })}
                />
            </LabelText>
            <LabelText htmlFor="name">Nome
                <input
                    type="text"
                    id="name"
                    placeholder={`${errors.name ? "Campo Obrigatório" : ""}`}
                    className={`${errors.name ? "required" : ""}`}
                    {...register("name", { required: true, pattern: { value: /[A-Za-z]{5}/g } })}
                />
            </LabelText>
            <DivDate>
                <DivDateBirth>
                    <LabelText htmlFor="dateofbirth">Data de Nascimento
                        <input
                            type="date"
                            id="dateofbirth"
                            className={`${errors.dateofbirth ? "requireddate" : ""}`}
                            {...register("dateofbirth", { required: true, onChange: handleDateChange })}
                        />
                    </LabelText>
                </DivDateBirth>
                <DivDateAge>
                    <p>{age}</p>
                    <p>anos</p>
                </DivDateAge>
            </DivDate>
            <LabelText htmlFor="telephone">Telefone
                <input
                    type="tel"
                    id="telephone"
                    placeholder={`${errors.telephone ? "Campo Obrigatório" : ""}`}
                    className={`${errors.telephone ? "required" : ""}`}
                    {...register("telephone", { required: true, maxLength: 11, pattern: { value: /\d{11}/g } })}
                />
            </LabelText>
            <LabelText htmlFor="email">Email
                <input
                    type="email"
                    id="email"
                    placeholder={`${errors.email ? "Campo Obrigatório" : ""}`}
                    className={`${errors.email ? "required" : ""}`}
                    {...register("email", { required: true })}
                />
            </LabelText>
            <LabelText htmlFor="zipcode">CEP
                <input type="text" id="zipcode" {...register("zipcode", { onBlur: checkedZipCode })} />
            </LabelText>
            <LabelText htmlFor="street">Logradouro Av/Travessa/Rua
                <input
                    type="text"
                    id="street"
                    placeholder={`${errors.street ? "Campo Obrigatório" : ""}`}
                    className={`${errors.street ? "required" : ""}`}
                    {...register("street", { required: true })}
                />
            </LabelText>
            <LabelText htmlFor="residencenumber">Número da Casa/Edifício
                <input
                    type="text"
                    id="residencenumber"
                    placeholder={`${errors.residencenumber ? "Campo Obrigatório" : ""}`}
                    className={`${errors.residencenumber ? "required" : ""}`}
                    {...register("residencenumber", { required: true })}
                />
            </LabelText>
            <DivRadio>
                <LabelText htmlFor="house">
                    <input
                        type="radio"
                        id="house"
                        value="house"
                        checked={radioSelect === "house" ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Casa
                </LabelText>
                <LabelText htmlFor="buildingradio">
                    <input
                        type="radio"
                        id="buildingradio"
                        value="buildingradio"
                        checked={radioSelect === "buildingradio" ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Edifício
                </LabelText>
            </DivRadio>
            <DivNameEd className={radioSelect}>
                <LabelText htmlFor="building">Nome do Edifício
                    <input type="text" id="building" {...register("building", { value: "..." })} />
                </LabelText>
                <LabelText htmlFor="buildingblock">Bloco
                    <input type="text" id="buildingblock" {...register("buildingblock", { value: "..." })} />
                </LabelText>
                <LabelText htmlFor="apartment">Apartamento
                    <input type="text" id="apartment" {...register("apartment", { value: "..." })} />
                </LabelText>
            </DivNameEd>
            <LabelText htmlFor="district">Bairro/Distrito
                <input
                    type="text"
                    id="district"
                    placeholder={`${errors.district ? "Campo Obrigatório" : ""}`}
                    className={`${errors.district ? "required" : ""}`}
                    {...register("district", { required: true })}
                />
            </LabelText>
            <LabelText htmlFor="city">Cidade
                <input
                    type="text"
                    id="city"
                    placeholder={`${errors.city ? "Campo Obrigatório" : ""}`}
                    className={`${errors.city ? "required" : ""}`}
                    {...register("city", { required: true })}
                />
            </LabelText>
            <DivButtons>
                <Input type="submit" title="Cadastrar" value="Cadastrar" />
                <Button type="button" title="Iniciar" onClick={() => navigate("/agenda")}>Iniciar</Button>
                <Button type="button" title="Menu" onClick={() => navigate("/menuRegister")}>Menu</Button>
            </DivButtons>
            {eventAlert && <ActivityClicked event={eventAlert} onClose={handleEventAlertClose} />}
        </FormDoctor>
    );
};