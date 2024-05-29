const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

const eventsTest = [{
    id: 1,
    title: 'Paciente Ciclano',
    start: new Date(currentYear, currentMonth, currentDay, 14, 0),
    end: new Date(currentYear, currentMonth, currentDay, 14, 30),
    desc: 'Paciente Doutora',
    tipo: 'activity'
},
{
    id: 2,
    title: 'Paciente Fulano',
    start: new Date(currentYear, currentMonth, currentDay, 7, 0),
    end: new Date(currentYear, currentMonth, currentDay, 7, 10),
    desc: 'Paciente Doutor',
    tipo: 'activity'
}];

export { eventsTest };