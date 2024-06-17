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
        formState: { errors }
    } = useForm();
    const handleEventAlertClose = () => {
        setEventAlert(null);
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