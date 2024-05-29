import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import widthDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { HeaderMenu } from "../components/header/menuheader";
import { DivHomeMain } from "../styles/homestyle";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { eventsTest } from "../services/eventstest";

const DragAndDropCaledar = widthDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export const HomePage = () => {

    const [events, setEvents] = useState(eventsTest);

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
                        className='calendar'
                    />
                </DivHomeMain>
            </MainSecondary>
        </MainPrimary>
    )
}