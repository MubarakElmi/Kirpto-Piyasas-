/// src/components/CryptoDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CryptoDetail = () => {
    const { id } = useParams();  // Get coin ID from the URL
    const [historicalData, setHistoricalData] = useState([]);
    const [timeRange, setTimeRange] = useState('24h');  // Default time range is 24 hours
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoinHistory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'TRY',
                        days: timeRange,  // Dynamically fetch based on selected time range
                    },
                });
                setHistoricalData(response.data.prices);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
            setLoading(false);
        };

        fetchCoinHistory();
    }, [id, timeRange]);  // Refetch data when time range changes

    // Convert API data to chart-friendly format
    const formattedData = historicalData.map((entry) => ({
        date: new Date(entry[0]).toLocaleDateString(),
        price: entry[1],
    }));

    return (
        <div className="crypto-detail-container">
            <h2>{id.toUpperCase()} Price Chart</h2>

            {/* Time range selection */}
            <div className="time-range-buttons">
                <button
                    onClick={() => setTimeRange('1')}
                    className={timeRange === '1' ? 'active' : ''}
                >
                    1 Saat
                </button>
                <button
                    onClick={() => setTimeRange('7')}
                    className={timeRange === '7' ? 'active' : ''}
                >
                    1 Hafta
                </button>
                <button
                    onClick={() => setTimeRange('30')}
                    className={timeRange === '30' ? 'active' : ''}
                >
                    1 Ay
                </button>
                <button
                    onClick={() => setTimeRange('365')}
                    className={timeRange === '365' ? 'active' : ''}
                >
                    1 Yıl
                </button>
            </div>

            {/* Chart */}
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <div className="chart-container">
                    <LineChart className='chart' width={800} height={400} data={formattedData}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={2} />
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                    </LineChart>
                </div>

            )}
        </div>
    );
};

export default CryptoDetail;
