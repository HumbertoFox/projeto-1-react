import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/dist/locale/pt-br";
import moment from "moment";
import widthDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { HeaderMenu } from "../components/header/menuheader";
import { DivHomeMain } from "../styles/homestyle";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { CustomToolbar } from "../components/toobar/tobarcalendar";
import { ActivityActive } from "../components/modal/eventactivity";
import { apiDbPostgres } from "../services/api/apis";
const DragAndDropCaledar = widthDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
export const AgendaPage = () => {
    const [events, setEvents] = useState("");
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
    const eventAgendCalendar = async (data) => {
        try {
            const response = await apiDbPostgres(data, 'eventspatient');
            for (const key in response) {
                response[key].color = response[key].desc == "5001" ? "#FF0075" : "#3C91E6";
                response[key].tipo = "activity";
                response[key].start = response[key].start.replace(/-/g, ',').replace(/T/g, ' ');
                response[key].end = response[key].end.replace(/-/g, ',').replace(/T/g, ' ');
                response[key].title = response[key].title.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                response[key].telephone = response[key].telephone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
            };
            const formattedEvents = Object.values(response).map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            }));
            setEvents(formattedEvents);
        } catch (Error) {
            console.error({
                type: "Error",
                message: "Erro interno do BD!"
            });
        };
    };
    useEffect(() => {
        eventAgendCalendar();
    }, []);
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
                    {eventSelected && (<ActivityActive event={eventSelected} onClose={handleEventSelectClose} />)}
                </DivHomeMain>
            </MainSecondary>
        </MainPrimary>
    );
};