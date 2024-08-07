const apiDbPostgres = async (data, rota) => {
    if (rota === 'registeruser' || rota === 'registerconsultation' || rota === 'loginuser' || rota === 'registerdoctor' || rota === 'searchpatient' || rota === 'searchuser') {
        const response = await fetch(`/${rota}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } else if (rota === 'edituser' || rota === 'editpatient') {
        const response = await fetch(`/${rota}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } else if (rota === 'eventspatient' || rota === 'eventsconsultsy' || rota === 'eventsconsultsx') {
        const response = await fetch(`/${rota}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } else if (rota === 'removeuser') {
        const response = await fetch(`/${rota}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    };
};

export { apiDbPostgres };