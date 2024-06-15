import React from "react";
import { DivEventsActive, DivMaimEvents } from "../../styles/eventactivitystyle";
import { ButtonButton } from "../button/buttonbutton";

export const ActivityActive = ({ event, onClose }) => {
    return (
        <DivMaimEvents>
            <DivEventsActive>
                <h2>{event.title}</h2>
                <h3>{event.name}</h3>
                <p>{event.telephone}</p>
                <p>{event.plan}</p>
                <span>{event.desc}</span>
                <p>Início do atendimento: {event.start.toLocaleString()}</p>
                <p>Termino do atendimento: {event.end.toLocaleString()}</p>
                <ButtonButton onClick={onClose}>Fechar</ButtonButton>
            </DivEventsActive>
        </DivMaimEvents>
    );
};