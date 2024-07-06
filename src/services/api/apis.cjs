const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const apiDbPostgres = async (data, rota) => {
    const response = await fetch(`http://localhost:${PORT}/${rota}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const eventsPatient = async (data, rota) => {
    const response = await fetch(`http://localhost:${PORT}/${rota}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export { apiDbPostgres, eventsPatient };