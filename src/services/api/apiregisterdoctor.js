export const registerDoctor = async (data) => {
    const response = await fetch('http://localhost:3001/registerdoctor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};