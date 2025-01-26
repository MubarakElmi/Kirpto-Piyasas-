import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import foto from "../images/crypto-par-3.png";
import { FaSearch } from "react-icons/fa"; // Importing the search icon
import CryptoChart from "./CryptoChart";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Row,
    Container,
    Col,
} from "reactstrap";
import CryptoTrends from "./CryptoTrends";


const CryptoTable = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [topCryptos, setTopCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 15; // Number of coins per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "try",
                            order: "market_cap_desc",
                            per_page: 300, // Fetch more coins for pagination
                            page: 1,
                            sparkline: true,
                        },
                    }
                );
                setCryptoData(response.data);
                setTopCryptos(response.data.slice(0, 10)); // Get top 5 cryptocurrencies for slider
            } catch (error) {
                console.error("Error fetching crypto data", error);
            }
        };

        fetchCryptoData();
    }, []);

    const handleRowClick = (id) => {
        navigate(`/coin/${id}`);
    };

    // Filtered data based on the search term
    const filteredData = cryptoData.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / coinsPerPage);
    // Get current coins based on currentPage
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = filteredData.slice(indexOfFirstCoin, indexOfLastCoin);

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
            {/*  Slider*/}
            <div className="crypto-slider">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={4}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                >
                    {topCryptos.map((crypto) => (
                        <SwiperSlide key={crypto.id}>
                            <div className="crypto-slide">
                                <img
                                    src={crypto.image}
                                    alt={crypto.name}
                                    width="45"
                                    height="45"
                                />
                                <h4>{crypto.name}</h4>
                                <p>Fiyet: ₺{crypto.current_price.toLocaleString()}</p>
                                <p
                                    style={{
                                        color:
                                            crypto.price_change_percentage_24h > 0 ? "green" : "red",
                                    }}
                                >
                                    24h  Değişim : {crypto.price_change_percentage_24h.toFixed(2)}%
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <section className="hero-section">
                <div className="col-md-6 hero-text">
                    <h2>
                        Kripto <span>Anlık </span>
                        <div>Piyasası</div>
                    </h2>
                </div>

                <div className="col-md-6">
                    <img src={foto} className="laptop-image" alt="Laptop" />
                </div>

                <div className="col-md-6 hero-text1">
                    <h3>Piyasa Değerine Göre Kripto Para Fiyatları</h3>
                </div>
            </section>

            <div className="app-container">
                <CryptoTrends />
            </div>


            {/* Table */}
            <div>
                <div className="crypto-detail-container">
                    <h2> Kripto Anlık Piyasası</h2>
                </div>

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

                <table className="table1">
                    <thead>
                        <tr>
                            <th>Coin`ler</th>
                            <th>Fiyat (TRY)</th>
                            <th>24h Değişim  (%)</th>
                            <th>Chart (7d)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCoins.map((coin) => (
                            <tr
                                key={coin.id}
                                onClick={() => handleRowClick(coin.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <td>
                                    <img src={coin.image} alt={coin.name} width="25" height="25" />{" "}
                                    {coin.name}
                                </td>
                                <td>₺{coin.current_price.toLocaleString()}</td>
                                <td
                                    style={{
                                        color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                                    }}
                                >
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td>
                                    <CryptoChart sparklineData={coin.sparkline_in_7d.price} />
                                </td>
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


            <div className='News'><h2>En Son Kripto Haberleri</h2></div>
            <Container className='Ncart'>
                <Row>
                    <Col md={3}>

                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >
                            <img
                                alt="Sample"
                                src="src\images\LYNXNPEC6413U_M.jpg"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    Ethereum’un Surge Rollup’u
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    Ölçeklenebilirlik ve Güvenlik İçin Yeni Olasılıklar
                                </CardSubtitle>
                                <CardText>
                                    Ethereum’un Layer 2 alanı, Nethermind tarafından geliştirilmiş performansa odaklı Surge Rollup’ın tanıtımıyla daha da rekabetçi hale geldi. Surge Rollup, Ethereum’un..
                                </CardText>
                                <a href='https://coinotag.com/ethereumun-surge-rollupu-olceklenebilirlik-ve-guvenlik-icin-yeni-olasiliklar/' target="_blank" rel="noopener noreferrer">
                                    <Button color="btn btn-outline-secondary">Daha Fazla Oku</Button>
                                </a>



                            </CardBody>
                        </Card>

                    </Col>

                    <Col md={3}>

                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >
                            <img
                                alt="Sample"
                                src="src\images\moved_LYNXMPEK7B0J9_L.jpg"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    Trump'ın seçim zaferi sonrası
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    kripto dünyasında neler bekleniyor?
                                </CardSubtitle>
                                <CardText>
                                    2024 ABD başkanlık seçimlerinin ardından Donald Trump'ın tekrar başkan seçilmesi ve Cumhuriyetçi Parti'nin Seçim sonuçları, Bitcoin ve genel kripto piyasasında ciddi bir yükselişe yol açtı
                                </CardText>
                                <a href='https://tr.investing.com/news/cryptocurrency-news/trumpn-secim-zaferi-sonras-kripto-dunyasnda-neler-bekleniyor-3129764' target="_blank" rel="noopener noreferrer">
                                    <Button color="btn btn-outline-secondary">Daha Fazla Oku</Button>
                                </a>
                            </CardBody>
                        </Card>

                    </Col>

                    <Col md={3}>

                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >
                            <img
                                alt="Sample"
                                src="src\images\mo.jpg"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    Binance
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    TR'den alan adı ve şirket ünvanı değişikliği
                                </CardSubtitle>
                                <CardText>
                                    Binance TR, kullanıcılarını platformda yapılan önemli değişiklikler konusunda bilgilendirdi. Türkiye’de kripto sektörüne yönelik düzenlemelere uyum sağlama amacıyla
                                </CardText>
                                <a href='https://tr.investing.com/news/cryptocurrency-news/binance-trden-alan-ad-ve-sirket-unvan-degisikligi-3129697' target="_blank" rel="noopener noreferrer">
                                    <Button color="btn btn-outline-secondary">Daha Fazla Oku</Button>
                                </a>
                            </CardBody>
                        </Card>

                    </Col>

                    <Col md={3}>

                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >
                            <img
                                alt="Sample"
                                src="src\images\LYM.jpg"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    Trump’ın
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    Kararı XRP İçin Yeni Bir Dönem Başlatabilir!
                                </CardSubtitle>
                                <CardText>
                                    Kripto yorumcusu ve BitBoy olarak tanınan Ben Armstrong, XRP’nin fiyatının büyük bir yükseliş yaşayabileceğini öne sürüyor. Armstrong’un bu öngörüsü,
                                </CardText>
                                <a href='https://koinmedya.com/trumpin-karari-xrp-icin-yeni-bir-donem-baslatabilir/?utm_source=rss&utm_medium=rss&utm_campaign=trumpin-karari-xrp-icin-yeni-bir-donem-baslatabilir' target="_blank" rel="noopener noreferrer">
                                    <Button color="btn btn-outline-secondary">Daha Fazla Oku</Button>
                                </a>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default CryptoTable;
