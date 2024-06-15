import React from "react";
import { DivToolbarCalendar } from "../../styles/homestyle";

export const CustomToolbar = ({
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