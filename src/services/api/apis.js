const loginUser = async (data) => {
    const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const registerUser = async (data) => {
    const response = await fetch('http://localhost:3001/registeruser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const registerDoctor = async (data) => {
    const response = await fetch('http://localhost:3001/registerdoctor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const registerConsultation = async (data) => {
    const response = await fetch('http://localhost:3001/registerconsultation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const eventsPatient = async (data) => {
    const response = await fetch('http://localhost:3001/eventspatient', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export { loginUser, registerUser, registerDoctor, registerConsultation, eventsPatient };