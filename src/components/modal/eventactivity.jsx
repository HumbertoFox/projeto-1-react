import React from "react";
import { ButtonButton } from "../button/buttonbutton";
import { DivEvents, DivMaimEvents } from "../../styles/eventactivitystyle";

export const ActivityActive = ({ event, onClose }) => {
    return (
        <DivMaimEvents>
            <DivEvents>
                <h2>{event.title}</h2>
                <h3>{event.name}</h3>
                <p>{event.telephone}</p>
                <p>{event.plan}</p>
                <p>{event.desc}</p>
                <p>Início do atendimento: {event.start.toLocaleString()}</p>
                <p>Termino do atendimento: {event.end.toLocaleString()}</p>
                <ButtonButton onClick={onClose}>Fechar</ButtonButton>
            </DivEvents>
        </DivMaimEvents>
    );
};