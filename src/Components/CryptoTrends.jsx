import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoTrends = () => {
    const [topGainers, setTopGainers] = useState([]);
    const [topLosers, setTopLosers] = useState([]);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "usd",
                            order: "market_cap_desc",
                            per_page: 250, // Fetch 100 coins to ensure diversity
                            page: 1,
                        },
                    }
                );

                const data = response.data;

                // Sort data for gainers and losers
                const sortedByChange = [...data].sort(
                    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
                );

                // Set state for each category
                setTopGainers(sortedByChange.slice(0, 6)); // Top 6 gainers
                setTopLosers(sortedByChange.slice(-6).reverse()); // Bottom 6 losers
            } catch (error) {
                console.error("Error fetching crypto data:", error);
            }
        };

        fetchCryptoData();
    }, []);

    return (
        <div className="crypto-trends-container">
            {/* Top Gainers Section */}
            <div className="trend-box">
                <h4>En Çok Yükselen Coinler</h4>
                <ul>
                    {topGainers.map((coin) => (
                        <li key={coin.id}>
                            <div className="coin-info">
                                <img src={coin.image} alt={coin.name} width="24" />
                                <span>{coin.name}</span>
                            </div>
                            <span style={{ color: "green" }}>
                                +{coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Top Losers Section */}
            <div className="trend-box">
                <h4>En Çok Düşen Coinler</h4>
                <ul>
                    {topLosers.map((coin) => (
                        <li key={coin.id}>
                            <div className="coin-info">
                                <img src={coin.image} alt={coin.name} width="24" />
                                <span>{coin.name}</span>
                            </div>
                            <span style={{ color: "red" }}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CryptoTrends;
