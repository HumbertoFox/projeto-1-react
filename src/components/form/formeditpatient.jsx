import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authcontext";
import { viaCepApi } from "../../services/api/viacep";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DivDate, DivDateAge, DivDateBirth, DivNameEd, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { ActivityClicked } from "../modal/eventsclick";
import { apiDbPostgres } from "../../services/api/apis";
import { DivButtons } from "../../styles/mainpagestyle";
import { ButtonButton } from "../button/buttonbutton";
export const FormEditPatient = ({ searchPatient, rotas }) => {
    const userSystem = useAuth().user;
    const navigate = useNavigate();
    const [radioSelect, setRadioSelect] = useState("house");
    const [eventAlert, setEventAlert] = useState(null);
    const [age, setAge] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        setError,
        reset,
        formState: { errors }
    } = useForm();
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
        const selectValue = element.target.value;
        setRadioSelect(selectValue);
        setValue("building", selectValue !== "buildingradio" ? "..." : "");
        setValue("buildingblock", selectValue !== "buildingradio" ? "..." : "");
        setValue("apartment", selectValue !== "buildingradio" ? "..." : "");
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
            const response = await apiDbPostgres(data, rotas);
            if (response.Error == true) {
                setEventAlert({
                    type: "Error",
                    message: response.message
                });
            } else {
                reset();
                setEventAlert({
                    type: "Success",
                    message: response.message
                });
            };
        } catch (Error) {
            setEventAlert({
                type: "Error",
                message: "Erro ao conectar com o BD!"
            });
        };
    };
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
            setValue("observation", searchPatient.observation)
        };
    }, [searchPatient]);
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input
                type="number"
                id="cpf"
                disabled={true}
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
            <DivButtons $rota={rotas}>
                <SubmitButton title="Editar Paciente" value="Editar" />
                <ButtonButton title="Iniciar" onClick={() => navigate("/agenda")}>Iniciar</ButtonButton>
                <ButtonButton title="Menu" onClick={() => navigate("/menuRegister")}>Menu</ButtonButton>
            </DivButtons>
            {eventAlert && <ActivityClicked event={eventAlert} onClose={handleEventAlertClose} />}
        </FormDoctor>
    );
};