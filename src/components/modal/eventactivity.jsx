import React from "react";
import { DivEventsActive, DivMaimEvents } from "../../styles/eventactivitystyle";
import { ButtonButton } from "../button/buttonbutton";
export const ActivityActive = ({ event, onClose }) => {
    return (
        <DivMaimEvents>
            <DivEventsActive>
                <h2>CPF: {event.title}</h2>
                <h3>Nome: {event.name}</h3>
                <p>Telefone: {event.telephone}</p>
                <p>Plano: {event.plan}</p>
                <span>CRM: {event.desc}</span>
                <p>OBS: {event.observation}</p>
                <p>Início do atendimento: {event.start.toLocaleString()}</p>
                <p>Termino do atendimento: {event.end.toLocaleString()}</p>
                <ButtonButton onClick={onClose}>Fechar</ButtonButton>
            </DivEventsActive>
        </DivMaimEvents>
    );
};