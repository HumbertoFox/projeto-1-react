import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSerach } from "../../styles/formsearch";
import { SubmitButton } from "../button/buttonsubmit";
import { LabelText } from "../../styles/labelstyle";
import { ActivityClicked } from "../modal/eventsclick";
export const Search = ({ searshPatient }) => {
    const [patientSearsh, setPatientSearsh] = useState(null);
    const [eventAlert, setEventAlert] = useState(null);
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();
    const handleEventAlertClose = () => {
        setEventAlert(null);
    };
    const getCheckedCpf = (data) => {
        const checkePrimaryValue = (element) => {
            let sumation = 0;
            for (let i = 0; i < element.length; i++) {
                let currentdigit = element.charAt(i);
                let constant = (element.length + 1 - i);
                sumation += Number(currentdigit) * constant;
            };
            const res = sumation % 11;
            return res < 2 ? "0" : (11 - res);
        };
        let primaryckecked = checkePrimaryValue(data.substring(0, 9));
        let secundechecked = checkePrimaryValue(data.substring(0, 9) + primaryckecked);
        let correctCpf = data.substring(0, 9) + primaryckecked + secundechecked;
        return data !== correctCpf ? setError("searchpatient") : clearErrors("searchpatient");
    };
    const onSubmit = async (data) => {
        await fetch("http://localhost/projeto-1-react/src/services/searshgetpatient.php", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    setPatientSearsh(responseJson.records);
                    setEventAlert({
                        type: "Success",
                        message: "Paciente Encontrado"
                    });
                };
            }).catch(() => {
                setEventAlert({
                    type: "Error",
                    message: "Paciente não encontrado!"
                });
            });
    };
    useEffect(() => {
        searshPatient(patientSearsh);
    }, [patientSearsh]);
    return (
        <FormSerach onSubmit={handleSubmit(onSubmit)}>
            <LabelText htmlFor="searchpatient">Pesquisar Paciente por CPF</LabelText>
            <input
                type="search"
                id="searchpatient"
                placeholder={`${errors.searchpatient ? "Campo Obrigatório" : ""}`}
                className={`${errors.searchpatient ? "required" : ""}`}
                {
                ...register("searchpatient", {
                    required: "Required field",
                    onChange: (element) => getCheckedCpf(element.target.value),
                    pattern: {
                        value: /\d{11}/g
                    }
                })}
            />
            <SubmitButton value="Pesquisar" />
            {eventAlert && <ActivityClicked
                event={eventAlert}
                onClose={handleEventAlertClose}
            />
            }
        </FormSerach>
    );
};