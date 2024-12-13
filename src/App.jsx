import './App.css';
import Navbar from './Components/Navbar';
import Header from './Components/Header';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CryptoTable from './Components/CryptoTable';
import CryptoDetail from './Components/CryptoDetail';
import "slick-carousel/slick/slick.css";
import Footer from './Components/Footer';
import Blogs from './Components/Blogs';
import Borsa from './Components/Borsa';
import Heatmap from './Components/Heatmap';

function App() {
  return (
    <Router>
      <>
        <Navbar />


        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<CryptoTable />} />
          <Route path="/coin/:id" element={<CryptoDetail />} />


        </Routes>
        <Routes>
          <Route path="/borse" element={<Borsa />} />
          <Route path="/heatmap" element={<Heatmap />} />


          <Route path="/blogs" element={<Blogs />} />
        </Routes>
        <Footer />

      </>
    </Router>

  );
}

export default App;

