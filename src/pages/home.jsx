import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/dist/locale/pt-br";
import moment from "moment";
import widthDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { HeaderMenu } from "../components/header/menuheader";
import { DivHomeMain, DivToolbarCalendar } from "../styles/homestyle";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { eventsTest } from "../services/eventstest";
import { ActivityActive } from "../components/modal/eventactivity";
const DragAndDropCaledar = widthDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
export const HomePage = () => {
    const [events, setEvents] = useState(eventsTest);
    const [eventSelected, setEventSelected] = useState(null);
    const styleColor = (element) => ({
        style: {
            backgroundColor: element.color
        }
    });
    const handleEventSelectClick = (element) => {
        setEventSelected(element);
    };
    const handleEventSelectClose = () => {
        setEventSelected(null);
    };
    const CustomToolbar = ({
        onView = ['month', 'week', 'day', 'agenda'],
        label = ['date', 'label'],
        onNavigate = ['TODAY', 'PREV', 'NEXT']
    }) => (
        <DivToolbarCalendar className="rbc-toolbar">
            <div className="rbc-btn-group">
                <button type="button" onClick={() => onNavigate('PREV')}>Voltar</button>
                <button type="button" onClick={() => onNavigate('TODAY')}>Hoje</button>
                <button type="button" onClick={() => onNavigate('NEXT')}>Avançar</button>
            </div>
            <div className="rbc-toolbar-label">
                <h2>{label}</h2>
            </div>
            <div className="rbc-btn-group">
                <button type="button" onClick={() => onView('day')}>Dia</button>
                <button type="button" onClick={() => onView('week')}>Semana</button>
                <button type="button" onClick={() => onView('month')}>Mês</button>
                <button type="button" onClick={() => onView('agenda')}>Agenda</button>
            </div>
        </DivToolbarCalendar>
    );
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
                        components={{
                            toolbar: CustomToolbar,
                        }}
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
    );
};