const PORT = process.env.PORT || 3000;

const loginUser = async (data) => {
    const response = await fetch(`http://localhost:${PORT}/loginuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const registerUser = async (data) => {
    const response = await fetch(`http://localhost:${PORT}/registeruser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const registerDoctor = async (data) => {
    const response = await fetch(`http://localhost:${PORT}/registerdoctor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const registerConsultation = async (data) => {
    const response = await fetch(`http://localhost:${PORT}/registerconsultation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const eventsPatient = async (data) => {
    const response = await fetch(`http://localhost:${PORT}/eventspatient`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export { loginUser, registerUser, registerDoctor, registerConsultation, eventsPatient };