// src/components/Heatmap.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Heatmap = () => {
    const [cryptoData, setCryptoData] = useState([]);

    const fetchCryptoData = async () => {
        try {
            const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                    vs_currency: "usd",
                    order: "market_cap_desc",
                    per_page: 100,
                    page: 1,
                },
            });
            setCryptoData(response.data);
        } catch (error) {
            console.error("Error fetching crypto data:", error);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchCryptoData();

        // Set up real-time updates every 30 seconds
        const interval = setInterval(fetchCryptoData, 30000); // 30 seconds
        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <>
            <h2 className="my-4 text-center text-white">Canlı Kripto Para Isı Haritası
            </h2>


            <div className="heatmap-container">

                {cryptoData.map((coin) => {
                    const isPositive = coin.price_change_percentage_24h > 0;
                    const backgroundColor = isPositive
                        ? `rgba(0, 200, 0, ${Math.min(1, coin.price_change_percentage_24h / 10)})`
                        : `rgba(200, 0, 0, ${Math.min(1, Math.abs(coin.price_change_percentage_24h) / 10)})`;

                    return (

                        <div

                            key={coin.id}
                            className="heatmap-box"
                            style={{ backgroundColor }}
                        >
                            <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                            <span className="coin-price">{coin.current_price.toFixed(2)} USD</span>
                            <span
                                className={`coin-change ${isPositive ? "positive" : "negative"}`}
                            >
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Heatmap;
