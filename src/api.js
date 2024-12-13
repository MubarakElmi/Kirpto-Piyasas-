// src/api.js
import axios from 'axios';

export const fetchCoinHistory = async (id, days) => {
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
            {
                params: {
                    vs_currency: 'usd',
                    days, // number of days (e.g., '30')
                },
            }
        );
        return response.data.prices;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return [];
    }
};
