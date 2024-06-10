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
export const FormDoctorsRegister = () => {
    const navigate = useNavigate();
    const [eventAlert, setEventAlert] = useState(null);
    const [radioSelect, setRadioSelect] = useState("casa");
    const [age, setAge] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        watch,
        formState: { errors }
    } = useForm();
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
    const onSubmit = async (data) => {
        await fetch("http://localhost/projeto-1-react/src/services/registeruser.php", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.erro) {
                    setFocus("cpf");
                    setEventAlert({
                        type: "erro",
                        message: responseJson.message
                    });
                } else {
                    setFocus("cpf");
                    setEventAlert({
                        type: "success",
                        message: responseJson.message
                    });
                    setTimeout(function () {
                        navigate("/");
                    }, 3000);
                };
            }).catch(() => {
                setFocus("cpf");
                setEventAlert({
                    type: "erro",
                    message: "Usuário não cadastrado, erro com o Banco!"
                });
            });
    };
    const password = watch('password');
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
        <FormDoctor onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="crm">CRM</LabelText>
            <input
                type="text"
                id="crm"
                placeholder={`${errors.cpf ? "Campo Obrigatório" : ""}`}
                className={`${errors.cpf ? "required" : ""}`}
                {...register("crm", {
                    required: "Required field",
                    pattern: {
                        value: /\d{11}/g
                    }
                })}
            />
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
                placeholder={`${errors.tel ? "Campo Obrigatório" : ""}`}
                className={`${errors.tel ? "required" : ""}`}
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
                placeholder={`${errors.email ? "Campo Obrigatório" : ""}`}
                className={`${errors.email ? "required" : ""}`}
                {...register("email", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="zipcode">CEP</LabelText>
            <input
                type="text"
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
            <LabelText htmlFor="password">Senha</LabelText>
            <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder={`${errors.password ? "Campo Obrigatório" : ""}`}
                className={`${errors.password ? "required" : ""}`}
                {...register("password", {
                    required: "Required field"
                })}
            />
            <LabelText htmlFor="passwordchecked">Confirme Senha</LabelText>
            <input
                type="password"
                id="passwordchecked"
                autoComplete="off"
                placeholder={`${errors.passwordchecked ? "Campo Obrigatório" : ""}`}
                className={`${errors.passwordchecked ? "required" : ""}`}
                {...register("passwordchecked", {
                    required: "Checked required field",
                    validate: (value) =>
                        value === password || "A senha não corresponde"
                })}
            />
            <DivButtons>
                <SubmitButton title="Cadastrar" value="Cadastrar" />
                <ButtonButton title="Iniciar" onClick={() => navigate("/")}>Iniciar</ButtonButton>
            </DivButtons>
            {eventAlert && <ActivityClicked
                event={eventAlert}
                onClose={handleEventAlertClose}
            />
            }
        </FormDoctor>
    );
};