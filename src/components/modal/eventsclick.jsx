import React from "react";
import { DivEventsMessage, DivMaimEvents } from "../../styles/eventactivitystyle";
import { ButtonButton } from "../button/buttonbutton";
export const ActivityClicked = ({ event, onClose }) => {
    return (
        <DivMaimEvents>
            <DivEventsMessage className={event.type}>
                <h2>{event.type}</h2>
                <p>{event.message}</p>
                <ButtonButton onClick={onClose}>Fechar</ButtonButton>
            </DivEventsMessage>
        </DivMaimEvents>
    );
};