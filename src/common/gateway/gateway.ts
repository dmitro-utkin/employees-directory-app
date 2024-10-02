const serverUrl = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchWorkersData = async () => {
    const response = await fetch(serverUrl);
    
    if (!response.ok) {
        throw new Error('Failed to fetch workers');
    }

    const data = await response.json();
    return data;
};