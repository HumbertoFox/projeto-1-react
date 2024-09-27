import React from "react";
import { Button } from "../../styles/buttonstyle";
import { DivEventsActive, DivMaimEvents } from "../../styles/eventactivitystyle";
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
                <Button type="button" onClick={onClose}>Fechar</Button>
            </DivEventsActive>
        </DivMaimEvents>
    );
};