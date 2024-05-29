import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import widthDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { HeaderMenu } from "../components/header/menuheader";
import { DivHomeMain } from "../styles/homestyle";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { eventsTest } from "../services/eventstest";
import { ActivityActive } from "../components/modal/eventactivity";

const DragAndDropCaledar = widthDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export const HomePage = () => {

    const [events, setEvents] = useState(eventsTest);
    const [eventSelected, setEventSelected] = useState(null);

    const styleColor = (e) => ({
        style: {
            backgroundColor: e.color
        }
    });

    const handleEventSelectClick = (e) => {
        setEventSelected(e);
    };

    const handleEventSelectClose = () => {
        setEventSelected(null);
    };

    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivHomeMain>
                    <DragAndDropCaledar
                        defaultDate={moment().toDate()}
                        defaultView='month'
                        events={events}
                        localizer={localizer}
                        resizable
                        eventPropGetter={styleColor}
                        onSelectEvent={handleEventSelectClick}
                        className='calendar'
                    />
                    {eventSelected && (
                        <ActivityActive
                            event={eventSelected}
                            onClose={handleEventSelectClose}
                        />
                    )}
                </DivHomeMain>
            </MainSecondary>
        </MainPrimary>
    )
}