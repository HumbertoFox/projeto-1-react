import React from "react";
import { Button } from "../../styles/buttonstyle";
import { DivEventsMessage, DivMaimEvents } from "../../styles/eventactivitystyle";
export const ActivityClicked = ({ event, onClose, title }) => {
    return (
        <DivMaimEvents>
            <DivEventsMessage className={event.type}>
                <h2>{event.type}</h2>
                <p>{event.message}</p>
                <Button type="button" title={title} onClick={onClose}>Fechar</Button>
            </DivEventsMessage>
        </DivMaimEvents>
    );
};