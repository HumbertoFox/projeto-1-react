import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import widthDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { HeaderMenu } from "../components/header/menuheader";
import { DivHomeMain } from "../styles/homestyle";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";

const DragAndDropCaledar = widthDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export const HomePage = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivHomeMain>
                    <DragAndDropCaledar
                        defaultDate={moment().toDate()}
                        defaultView='month'
                        events={[{}]}
                        localizer={localizer}
                        resizable
                        className='calendar'
                    />
                </DivHomeMain>
            </MainSecondary>
        </MainPrimary>
    )
}