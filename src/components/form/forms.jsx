import React, { useEffect, useState } from "react";
import { Button, Input } from "../../styles/buttonstyle";
import { useAuth } from "../../contexts/authcontext";
import { useForm } from "react-hook-form";
import { viaCepApi } from "../../services/api/viacep";
import { useNavigate } from "react-router-dom";
import { apiDbPostgres } from "../../services/api/apis";
import { ActivityClicked } from "../modal/eventsclick";
import { DivButtons, DivDate, DivDateAge, DivDateBirth, DivNameEd, DivRadio, Fieldset, FormsFull, LabelText, LabelTextRadios } from "../../styles/formstyle";
export const FormFull = ({ crms, searchs, page, rotas, title, values }) => {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16);
    const userSystem = useAuth().user;
    const navigate = useNavigate();
    const [radioSelect, setRadioSelect] = useState("house");
    const [selectRadio, setSelectRadio] = useState("planradio");
    const [eventAlert, setEventAlert] = useState(null);
    const [isReturn, setIsReturn] = useState(false);
    const [endDateStart, setEndDateStart] = useState(formattedNow);
    const [age, setAge] = useState(null);
    const { register, handleSubmit, setValue, setFocus, setError, reset, watch, formState: { errors } } = useForm();
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
    const swapRadioSelect = element => {
        const selectValue = element.target.value;
        setRadioSelect(selectValue);
    };
    const swapSelectedRadio = element => {
        const selectedValue = element.target.value;
        setSelectRadio(selectedValue);
        setValue("courtesy", selectedValue !== "courtesyradio" ? "Não" : "Sim");
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
        const formatValue = formatAsCurrency(value);
        setValue("particular", formatValue, { shouldValidate: true });
    }, [value, setValue]);
    useEffect(() => {
        setValue("crm", crms);
    }, [crms]);
    useEffect(() => {
        if (searchs !== null) {
            setValue("cpf", searchs.cpf);
            setValue("name", searchs.name);
            setValue("dateofbirth", searchs.dateofbirth);
            setValue("telephone", searchs.telephone);
            setValue("email", searchs.email);
            setValue("zipcode", searchs.zipcode);
            setValue("street", searchs.street);
            setValue("district", searchs.district);
            setValue("city", searchs.city);
            setValue("covenant", searchs.covenant);
            setValue("residencenumber", searchs.residencenumber);
            setValue("building", searchs.building);
            setValue("buildingblock", searchs.buildingblock);
            setValue("apartment", searchs.apartment);
            setValue("observation", searchs.observation);
            setIsReturn(searchs.isLastConsultationOld);
        };
    }, [searchs]);
    return (
        <FormsFull onSubmit={handleSubmit(onSubmit)}>
            <Fieldset disabled={rotas === "blockinguser" ? true : false}>
                {(page === "RegisterConsultDoctorx" ||
                    page === "RegisterConsultDoctory" ||
                    page === "RegisterDoctors" ||
                    page === "EditDoctors") && (
                        <LabelText>CRM
                            <input
                                type="number"
                                id="crm"
                                disabled={page === "RegisterDoctors" ? false : true}
                                {...register('crm', { required: true, maxLength: 4, pattern: /\d{4}/g })} />
                        </LabelText>
                    )}
                <LabelText htmlFor="cpf">CPF
                    <input
                        type="number"
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
                    <input
                        type="number"
                        id="zipcode"
                        {...register("zipcode", { required: true, onBlur: checkedZipCode })}
                    />
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
                    <LabelTextRadios htmlFor="house">
                        <input type="radio"
                            id="house"
                            value="house"
                            defaultChecked
                            {...register("typeresidence", { onChange: swapRadioSelect })}
                        />
                        Casa
                    </LabelTextRadios>
                    <LabelTextRadios htmlFor="buildingradio">
                        <input type="radio"
                            id="buildingradio"
                            value="buildingradio"
                            {...register("typeresidence")}
                        />
                        Edifício
                    </LabelTextRadios>
                </DivRadio>
                {radioSelect === "buildingradio" && (
                    <DivNameEd>
                        <LabelText htmlFor="building">Nome do Edifício
                            <input
                                type="text"
                                id="building"
                                placeholder={`${errors.building ? "Campo Obrigatório" : ""}`}
                                className={`${errors.building ? "required" : ""}`}
                                {...register("building", { required: true })}
                            />
                        </LabelText>
                        <LabelText htmlFor="buildingblock">Bloco
                            <input
                                type="text"
                                id="buildingblock"
                                placeholder={`${errors.buildingblock ? "Campo Obrigatório" : ""}`}
                                className={`${errors.buildingblock ? "required" : ""}`}
                                {...register("buildingblock", { required: true })}
                            />
                        </LabelText>
                        <LabelText htmlFor="apartment">Apartamento
                            <input
                                type="text"
                                id="apartment"
                                placeholder={`${errors.apartment ? "Campo Obrigatório" : ""}`}
                                className={`${errors.apartment ? "required" : ""}`}
                                {...register("apartment", { required: true })}
                            />
                        </LabelText>
                    </DivNameEd>
                )}
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
                {(page === "RegisterConsultDoctorx" ||
                    page === "RegisterConsultDoctory") && (
                        <DivRadio>
                            <LabelTextRadios htmlFor="planradio">
                                <input type="radio"
                                    id="planradio"
                                    value="planradio"
                                    defaultChecked
                                    {...register("typeservice", { onChange: swapSelectedRadio })}
                                />
                                Plano
                            </LabelTextRadios>
                            <LabelTextRadios htmlFor="particularradio">
                                <input type="radio"
                                    value="particularradio"
                                    id="particularradio"
                                    {...register("typeservice")}
                                />
                                Particular
                            </LabelTextRadios>
                            {page === "RegisterConsultDoctory" && (
                                <LabelTextRadios htmlFor="courtesyradio">
                                    <input type="radio"
                                        value="courtesyradio"
                                        id="courtesyradio"
                                        {...register("typeservice")}
                                    />
                                    Cortesia
                                </LabelTextRadios>
                            )}
                        </DivRadio>
                    )}
                {(page === "RegisterConsultDoctorx" ||
                    page === "RegisterConsultDoctory") && (
                        <div>
                            {selectRadio === "planradio" && (
                                <LabelText htmlFor="covenant">Covênio
                                    <input
                                        type="text"
                                        id="covenant"
                                        placeholder={`${errors.covenant ? "Campo Obrigatório" : ""}`}
                                        className={`${errors.covenant ? "required" : ""}`}
                                        {...register("covenant", { required: true })}
                                    />
                                </LabelText>
                            )}
                            {selectRadio === "particularradio" && (
                                <LabelText htmlFor="particular">Valor
                                    <input
                                        type="text"
                                        id="particular"
                                        {...register("particular", { value: "0" })} />
                                </LabelText>
                            )}
                            {(page === "RegisterConsultDoctory" && selectRadio === "courtesyradio") && (
                                <LabelText htmlFor="courtesy">Cortesia
                                    <input
                                        type="text"
                                        id="courtesy"
                                        disabled
                                        {...register("courtesy", { required: true, value: "Não" })}
                                    />
                                </LabelText>
                            )}
                        </div>
                    )}
                {isReturn && (
                    <LabelText htmlFor="returnconsult">Volta/Retorno
                        <select
                            {...register("returnconsult")}>
                            <option value="yes">Sim</option>
                            <option value="no">Não</option>
                        </select>
                    </LabelText>
                )}
                {(page === "RegisterConsultDoctorx" ||
                    page === "RegisterConsultDoctory") && (
                        <div>
                            <LabelText htmlFor="consultdatestart">Data da Consulta Inicio
                                <input
                                    type="datetime-local"
                                    id="consultdatestart"
                                    min={formattedNow}
                                    className={`${errors.consultdatestart ? "requireddate" : ""}`}
                                    {...register("consultdatestart", { required: true, onBlur: (elementDate) => setEndDateStart(elementDate.target.value) })}
                                />
                            </LabelText>
                            <LabelText htmlFor="consultdateend">Data da Consulta Termino
                                <input
                                    type="datetime-local"
                                    id="consultdateend"
                                    min={endDateStart == "" ? formattedNow : endDateStart}
                                    className={`${errors.consultdateend ? "requireddate" : ""}`}
                                    {...register("consultdateend", { required: true })}
                                />
                            </LabelText>
                            <LabelText htmlFor="observation">Observações
                                <textarea
                                    id="observation"
                                    className={`${errors.observation ? "requireddate" : ""}`}
                                    {...register("observation", { required: true })}
                                />
                            </LabelText>
                        </div>
                    )}
            </Fieldset>
            <DivButtons>
                <Input type="submit" title={title} value={values} />
                {(page === "BlockingUser" ||
                    page === "EditPatients" ||
                    page === "EditUser" ||
                    page === "RegisterDoctors" ||
                    page === "EditDoctors" ||
                    page === "RegisterPatients" ||
                    page === "RegisterUser") && (
                        <Button type="button" title="Menu" onClick={() => navigate("/menuRegister")}>Menu</Button>
                    )}
            </DivButtons>
            {eventAlert && (
                <ActivityClicked event={eventAlert} onClose={handleEventAlertClose} />
            )}
        </FormsFull>
    );
};