import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Borsa = () => {
    const [memeCoins, setMemeCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 40;

    // Fetch meme coins data
    useEffect(() => {
        const fetchMemeCoins = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'try',
                        category: 'meme-token',
                        order: 'market_cap_desc',
                        per_page: 250,
                        page: 1,
                    },
                });
                setMemeCoins(response.data);
            } catch (error) {
                console.error('Error fetching meme coins data:', error);
            }
        };

        fetchMemeCoins();
    }, []);

    // Filtered data based on the search term
    const filteredCoins = memeCoins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

    // Pagination logic
    const getPaginationButtons = () => {
        const buttons = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, startPage + 3);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }
        if (startPage > 1) {
            buttons.unshift("...");
            buttons.unshift(1);
        }
        if (endPage < totalPages) {
            buttons.push("...");
            buttons.push(totalPages);
        }
        return buttons;
    };

    return (

        <>


            <img
                src="src\images\old2.png" className='meme'
            />            <div>




                <div className="container">

                    <h2 className="my-4 text-center text-white">Meme Token Market</h2>

                    {/* Search Bar */}
                    {/* Search input with icon */}
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for a meme coin..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>


                    {/* Table */}
                    <table >
                        <thead className="table-dark">
                            <tr>
                                <th>Meme Coin`ler</th>
                                <th>Fiyat (TRY)</th>
                                <th>24h Değişim  (%)</th>
                                <th>Market Hacmi (TRY)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCoins.map(coin => (
                                <tr key={coin.id}>
                                    <td>
                                        <img src={coin.image} alt={coin.name} width="30" height="30" className="me-2" />
                                        {coin.name}
                                    </td>
                                    <td>₺{coin.current_price.toLocaleString()}</td>
                                    <td style={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </td>
                                    <td>₺{coin.market_cap.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="pagination">
                        {getPaginationButtons().map((button, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (typeof button === "number") {
                                        setCurrentPage(button);
                                    }
                                }}
                                className={currentPage === button ? "active" : ""}
                                disabled={button === "..."}
                            >
                                {button}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Borsa;
