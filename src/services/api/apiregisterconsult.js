export const registerConsultation = async (data) => {
    const response = await fetch('http://localhost:3001/registerconsultation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};