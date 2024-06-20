import React from "react";
import { DivEventsMessage, DivMaimEvents } from "../../styles/eventactivitystyle";
import { ButtonButton } from "../button/buttonbutton";
export const ActivityClicked = ({ event, onClose, title }) => {
    return (
        <DivMaimEvents>
            <DivEventsMessage className={event.type}>
                <h2>{event.type}</h2>
                <p>{event.message}</p>
                <ButtonButton title={title} onClick={onClose}>Fechar</ButtonButton>
            </DivEventsMessage>
        </DivMaimEvents>
    );
};