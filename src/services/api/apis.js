const PORT = process.env.PORT || 3000;

const apiDbPostgres = async (data, rota) => {
    if (rota === 'registeruser' || rota === 'registerconsultation' || rota === 'loginuser' || rota === 'registerdoctor' || rota === 'searchpatient') {
        const response = await fetch(`http://localhost:${PORT}/${rota}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } else if (rota === 'edituser') {
        const response = await fetch(`http://localhost:${PORT}/${rota}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } else if (rota === 'eventspatient' || rota === 'eventsconsultsy' || rota === 'eventsconsultsx') {
        const response = await fetch(`http://localhost:${PORT}/${rota}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    };
};

export { apiDbPostgres };