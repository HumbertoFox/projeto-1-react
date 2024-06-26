import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSerach } from "../../styles/formsearch";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { ActivityClicked } from "../modal/eventsclick";
export const Search = ({ searchPatient }) => {
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
        const cpf = data.searchpatient;
        if (!getCheckedCpf(cpf)) {
            setError("searchpatient", { type: "focus" }, { shouldFocus: true });
            return;
        };
        try {
            const response = await fetch("http://localhost/projeto-1-react/src/services/searchgetpatient.php", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const responseJson = await response.json();
            if (responseJson && responseJson.records) {
                setPatientSearch(responseJson.records);
                setEventAlert({
                    type: "Success",
                    message: "Paciente Encontrado"
                });
            } else {
                setEventAlert({
                    type: "Error",
                    message: "Paciente não encontrado! Erro com o BD"
                });
            }
        } catch (error) {
            setEventAlert({
                type: "Error",
                message: "Paciente não encontrado!"
            });
        };
    };
    useEffect(() => {
        searchPatient(patientSearch);
    }, [patientSearch]);
    return (
        <FormSerach onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="searchpatient">Pesquisar Paciente por CPF</LabelText>
            <input
                type="search"
                id="searchpatient"
                placeholder={`${errors.searchpatient ? "Campo Obrigatório" : ""}`}
                className={`${errors.searchpatient ? "required" : ""}`}
                {...register("searchpatient", { required: true, maxLength: 11, pattern: { value: /\d{11}/g } })}
            />
            <SubmitButton value="Pesquisar" />
            {eventAlert && <ActivityClicked event={eventAlert} onClose={handleEventAlertClose} />}
        </FormSerach>
    );
};