import React, { useEffect, useState } from "react";
import { Input } from "../../styles/buttonstyle";
import { useForm } from "react-hook-form";
import { LabelText } from "../../styles/formstyle";
import { FormSerach } from "../../styles/formsearch";
import { apiDbPostgres } from "../../services/api/apis";
import { ActivityClicked } from "../modal/eventsclick";
export const Search = ({ searchs, rotas }) => {
    const [patientSearch, setPatientSearch] = useState(null);
    const [eventAlert, setEventAlert] = useState(null);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    const handleEventAlertClose = () => {
        setEventAlert(null);
    };
    const getCheckedCpf = (data) => {
        const isRepeatedCPF = (cpf) => {
            const firstDigit = cpf[0];
            return cpf.split('').every(digit => digit === firstDigit);
        };
        if (isRepeatedCPF(data)) {
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
    const onSubmit = async (data) => {
        const cpf = data.searchs;
        if (!getCheckedCpf(cpf)) {
            setError("searchs", { type: "focus" }, { shouldFocus: true });
            return;
        };
        try {
            const response = await apiDbPostgres(data, rotas);
            if (response && response.records) {
                setPatientSearch(response.records);
                rotas === "searchpacient" ?
                    setEventAlert({
                        type: "Success",
                        message: "Paciente Encontrado"
                    }) :
                    setEventAlert({
                        type: "Success",
                        message: "Usuário Encontrado"
                    });
            } else {
                setEventAlert({
                    type: "Error",
                    message: response.message
                });
            }
        } catch (Error) {
            setEventAlert({
                type: "Error",
                message: "Paciente não encontrado! Erro com o BD"
            });
        };
    };
    useEffect(() => {
        searchs(patientSearch);
    }, [patientSearch]);
    return (
        <FormSerach onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="searchs">{rotas === "searchpatient" ? "Pesquisar Paciente por CPF" : rotas === "searchdoctor" ? "Pesquisar Doutor(a) por CPF" : "Pesquisar Usuário por CPF"}
                <input
                    type="search"
                    id="searchs"
                    placeholder={`${errors.searchs ? "Campo Obrigatório" : ""}`}
                    className={`${errors.searchs ? "required" : ""}`}
                    {...register("searchs", { required: true, maxLength: 11, pattern: { value: /\d{11}/g } })}
                />
            </LabelText>
            <Input type="submit" title="Pesquisar" value="Pesquisar" />
            {eventAlert && (
                <ActivityClicked event={eventAlert} onClose={handleEventAlertClose} />
            )}
        </FormSerach>
    );
};