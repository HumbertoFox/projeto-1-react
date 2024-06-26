import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authcontext";
import { viaCepApi } from "../../services/viacep";
import { useForm } from "react-hook-form";
import { DivCourtesy, DivDate, DivDateAge, DivDateBirth, DivNameEd, DivParticular, DivPlan, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { ActivityClicked } from "../modal/eventsclick";
import { registerConsultation } from "../../services/api/apiregisterconsult";
export const FormPatientDrs = ({ title, searchPatient }) => {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16);
    const userSystem = useAuth().user;
    const [radioSelect, setRadioSelect] = useState("house");
    const [selectRadio, setSelectRadio] = useState("planradio");
    const [eventAlert, setEventAlert] = useState(null);
    const [endDateStart, setEndDateStart] = useState(formattedNow);
    const [age, setAge] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        setError,
        reset,
        watch,
        formState: { errors }
    } = useForm();
    const value = watch("particular");
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
    const formatAsCurrency = (value) => {
        if (!value) return "0";
        const numericalValue = parseFloat(value.replace(/[^\d]/g, "")) / 100;
        return numericalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    };
    const crmInputText = () => {
        setValue("crm", title);
    };
    const swapRadioSelect = element => {
        const selectValue = element.target.value;
        setRadioSelect(selectValue);
        setValue("building", selectValue !== "buildingradio" ? "..." : "");
        setValue("buildingblock", selectValue !== "buildingradio" ? "..." : "");
        setValue("apartment", selectValue !== "buildingradio" ? "..." : "");
    };
    const swapSelectedRadio = element => {
        const selectedValue = element.target.value;
        setSelectRadio(selectedValue);
        setValue("courtesy", selectedValue !== "courtesyradio" ? "Não" : "Sim");
        setValue("plan", selectedValue !== "planradio" ? "..." : "");
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
            const response = await registerConsultation(data);
            if (response.Error == true) {
                setEventAlert({
                    type: "Error",
                    message: response.message
                });
            } else {
                reset();
                crmInputText();
                setEventAlert({
                    type: "Success",
                    message: response.message
                });
            };
        } catch (error) {
            setEventAlert({
                type: "Error",
                message: response.message
            });
        };
    };
    useEffect(() => {
        const formatValue = formatAsCurrency(value);
        setValue("particular", formatValue, { shouldValidate: true });
    }, [value, setValue]);
    useEffect(() => {
        crmInputText();
    }, []);
    useEffect(() => {
        if (searchPatient !== null) {
            setValue("cpf", searchPatient.cpf);
            setValue("name", searchPatient.name);
            setValue("dateofbirth", searchPatient.dateofbirth);
            setValue("telephone", searchPatient.telephone);
            setValue("email", searchPatient.email);
            setValue("zipcode", searchPatient.zipcode);
            setValue("street", searchPatient.street);
            setValue("district", searchPatient.district);
            setValue("city", searchPatient.city);
            setValue("plan", searchPatient.plan);
            setValue("residencenumber", searchPatient.residencenumber);
            setValue("building", searchPatient.building);
            setValue("buildingblock", searchPatient.buildingblock);
            setValue("apartment", searchPatient.apartment);
        };
    }, [searchPatient]);
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input
                type="number"
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
            <input
                type="number"
                id="zipcode"
                {...register("zipcode", { required: true, onBlur: checkedZipCode })}
            />
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
                <input type="text" id="building" {...register("building", { required: true, value: "..." })} />
                <LabelText htmlFor="buildingblock">Bloco</LabelText>
                <input type="text" id="buildingblock" {...register("buildingblock", { required: true, value: "..." })} />
                <LabelText htmlFor="apartment">Apartamento</LabelText>
                <input type="text" id="apartment" {...register("apartment", { required: true, value: "..." })} />
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
            <LabelText>CRM</LabelText>
            <input type="number" id="crm" disabled={true} {...register("crm")} />
            <DivRadio>
                <LabelText htmlFor="planradio">
                    <input type="radio"
                        id="planradio"
                        value="planradio"
                        checked={selectRadio === "planradio" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Plano
                </LabelText>
                <LabelText htmlFor="particularradio">
                    <input type="radio"
                        value="particularradio"
                        id="particularradio"
                        checked={selectRadio === "particularradio" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Particular
                </LabelText>
                <LabelText htmlFor="courtesyradio">
                    <input type="radio"
                        value="courtesyradio"
                        id="courtesyradio"
                        checked={selectRadio === "courtesyradio" ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Cortesia
                </LabelText>
            </DivRadio>
            <DivPlan className={selectRadio}>
                <LabelText htmlFor="plan">Plano</LabelText>
                <input
                    type="text"
                    id="plan"
                    placeholder={`${errors.plan ? "Campo Obrigatório" : ""}`}
                    className={`${errors.plan ? "required" : ""}`}
                    {...register("plan", { required: true })} />
            </DivPlan>
            <DivParticular className={selectRadio}>
                <LabelText htmlFor="particular">Valor</LabelText>
                <input type="text" id="particular" {...register("particular")} />
            </DivParticular>
            <DivCourtesy className={selectRadio}>
                <LabelText htmlFor="courtesy">Cortesia</LabelText>
                <input type="text" id="courtesy" {...register("courtesy", { value: "Não" })} />
            </DivCourtesy>
            <LabelText htmlFor="consultdatestart">Data da Consulta</LabelText>
            <input
                type="datetime-local"
                id="consultdatestart"
                min={formattedNow}
                className={`${errors.consultdatestart ? "requireddate" : ""}`}
                {...register("consultdatestart", { required: true, onBlur: (elementDate) => setEndDateStart(elementDate.target.value) })}
            />
            <LabelText htmlFor="consultdateend">Data da Consulta</LabelText>
            <input
                type="datetime-local"
                id="consultdateend"
                min={endDateStart == "" ? formattedNow : endDateStart}
                className={`${errors.consultdateend ? "requireddate" : ""}`}
                {...register("consultdateend", { required: true })}
            />
            <LabelText htmlFor="observation">Observações</LabelText>
            <textarea id="observation" {...register("observation", { value: "..." })} />
            <SubmitButton value="Agendar" />
            {eventAlert && <ActivityClicked event={eventAlert} onClose={handleEventAlertClose} />}
        </FormDoctor>
    );
};