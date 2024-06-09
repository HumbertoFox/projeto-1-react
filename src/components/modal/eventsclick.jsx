import React from "react";
import { DivEvents, DivMaimEvents } from "../../styles/eventactivitystyle";
import { ButtonButton } from "../button/buttonbutton";

export const ActivityClicked = ({ event, onClose }) => {
    return (
        <DivMaimEvents>
            <DivEvents>
                <h2 className={event.type}>{event.type}</h2>
                <p className={event.type}>{event.message}</p>
                <ButtonButton onClick={onClose}>Fechar</ButtonButton>
            </DivEvents>
        </DivMaimEvents>
    );
};