// src/components/CryptoChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const CryptoChart = ({ sparklineData }) => {
    const formattedData = sparklineData.map((price, index) => ({
        time: index,
        price,
    }));

    return (
        <LineChart className='chart' width={150} height={50} data={formattedData}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
            <XAxis dataKey="time" hide={true} />
            <YAxis domain={['auto', 'auto']} hide={true} />
            <Tooltip />
        </LineChart>
    );
};

export default CryptoChart;
