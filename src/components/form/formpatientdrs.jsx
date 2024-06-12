import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authcontext";
import { viaCepApi } from "../../services/viacep";
import { useForm } from "react-hook-form";
import { DivCourtesy, DivDate, DivDateAge, DivDateBirth, DivNameEd, DivParticular, DivPlan, DivRadio, FormDoctor } from "../../styles/formdrstyle";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { ActivityClicked } from "../modal/eventsclick";
export const FormPatientDrs = ({ title }) => {
    const userSystem = useAuth().user;
    const [radioSelect, setRadioSelect] = useState("casa");
    const [selectRadio, setSelectRadio] = useState("plan");
    const [eventAlert, setEventAlert] = useState(null);
    const [age, setAge] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        watch,
        formState: { errors }
    } = useForm();
    const value = watch("particular");
    const checkedCpf = (data) => {
        const checkePrimaryValue = (element) => {
            let summation = 0;
            for (let i = 0; i < element.length; i++) {
                let currentdigit = element.charAt(i);
                let constant = (element.length + 1 - i);
                summation += Number(currentdigit) * constant;
            };
            const res = summation % 11;
            return res < 2 ? "0" : (11 - res);
        };
        let primaryckecked = checkePrimaryValue(data.substring(0,9));
        let secundechecked = checkePrimaryValue(data.substring(0,9) + primaryckecked);
        let correctCpf = data.substring(0,9) + primaryckecked + secundechecked;
    };
    const formatAsCurrency = (value) => {
        if (!value) return "0";
        const numericalValue = parseFloat(value.replace(/[^\d]/g, "")) / 100;
        return numericalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    };
    useEffect(() => {
        const formatValue = formatAsCurrency(value);
        setValue("particular", formatValue, { shouldValidate: true });
    }, [value, setValue]);
    useEffect(() => {
        setValue("crm", title);
    }, []);
    const swapRadioSelect = element => {
        const selectValue = element.target.value;
        setRadioSelect(selectValue);
    };
    const swapSelectedRadio = element => {
        const selectedValue = element.target.value;
        const isCourtesy = selectedValue !== "courtesy";
        setSelectRadio(selectedValue);
        setValue("courtesy", isCourtesy ? "Não" : "Sim");
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
        data.user_id = userSystem.id;
        await fetch("http://localhost/projeto-1-react/src/services/registerconsult.php", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    setEventAlert({
                        type: "error",
                        message: responseJson.message
                    });
                } else {
                    setEventAlert({
                        type: "success",
                        message: responseJson.message
                    });
                };
            }).catch(() => {
                setEventAlert({
                    type: "error",
                    message: "Consulta não agendada, Erro com o Banco!"
                });
            });
    };
    return (
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="cpf">CPF</LabelText>
            <input
                type="text"
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
            <DivDate>
                <DivDateBirth>
                    <LabelText htmlFor="dateofbirth">Data de Nascimento</LabelText>
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
            <input
                type="email"
                id="email"
                placeholder={`${errors.telephone ? "Campo Obrigatório" : ""}`}
                className={`${errors.telephone ? "required" : ""}`}
                {...register("email", {
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
            <LabelText htmlFor="street">Logradouro Av/Travessa/Rua</LabelText>
            <input
                type="text"
                id="street"
                placeholder={`${errors.street ? "Campo Obrigatório" : ""}`}
                className={`${errors.street ? "required" : ""}`}
                {...register("street", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="residencenumber">Número da Casa/Edifício</LabelText>
            <input
                type="text"
                id="residencenumber"
                placeholder={`${errors.residencenumber ? "Campo Obrigatório" : ""}`}
                className={`${errors.residencenumber ? "required" : ""}`}
                {...register("residencenumber", {
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
                {...register("district", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="city">Cidade</LabelText>
            <input
                type="text"
                id="city"
                placeholder={`${errors.city ? "Campo Obrigatório" : ""}`}
                className={`${errors.city ? "required" : ""}`}
                {...register("city", {
                    required: "Required field"
                })}
            />
            <LabelText>CRM</LabelText>
            <input type="number" id="crm" disabled={true} {...register("crm")} />
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
            <DivCourtesy className={selectRadio}>
                <LabelText htmlFor="courtesy">Cortesia</LabelText>
                <input type="text" id="courtesy" {...register("courtesy", { value: "Não" })} />
            </DivCourtesy>
            <LabelText htmlFor="consultdatestart">Data da Consulta</LabelText>
            <input
                type="datetime-local"
                id="consultdatestart"
                className={`${errors.consultdatestart ? "requireddate" : ""}`}
                {
                ...register("consultdatestart", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="consultdateend">Data da Consulta</LabelText>
            <input
                type="datetime-local"
                id="consultdateend"
                className={`${errors.consultdateend ? "requireddate" : ""}`}
                {
                ...register("consultdateend", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="observation">Observações</LabelText>
            <textarea id="observation" {...register("observation", { value: "..." })} />
            <SubmitButton value="Agendar" />
            {eventAlert && <ActivityClicked
                event={eventAlert}
                onClose={handleEventAlertClose}
            />
            }
        </FormDoctor>
    );
};