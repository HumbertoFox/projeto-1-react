import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const loginUser = async (data) => {
    const response = await axios.post(`http://localhost:${PORT}/login`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};
console.log(loginUser);

const registerUser = async (data) => {
    const response = await axios.post(`http://localhost:${PORT}/registeruser`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

const registerDoctor = async (data) => {
    const response = await axios.post(`http://localhost:${PORT}/registerdoctor`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

const registerConsultation = async (data) => {
    const response = await axios.post(`http://localhost:${PORT}/registerconsultation`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

const eventsPatient = async (data) => {
    const response = await axios.get(`http://localhost:${PORT}/eventspatient`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export { loginUser, registerUser, registerDoctor, registerConsultation, eventsPatient };