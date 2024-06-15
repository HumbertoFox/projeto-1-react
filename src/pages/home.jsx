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
const DragAndDropCaledar = widthDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
export const HomePage = () => {
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
    const eventAgendCalendar = async () => {
        try {
            const response = await fetch("http://localhost/projeto-1-react/src/services/eventsday.php");
            const responseJson = await response.json();
            for (const key in responseJson) {
                responseJson[key].color = responseJson[key].desc == "5001" ? "#FF0075" :"#3C91E6";
                responseJson[key].tipo = "activity";
                responseJson[key].start = responseJson[key].start.replace(/-/g, ",");
                responseJson[key].end = responseJson[key].end.replace(/-/g, ",");
                responseJson[key].title = responseJson[key].title.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                responseJson[key].telephone = responseJson[key].telephone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
            };
            const formattedEvents = Object.values(responseJson).map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
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