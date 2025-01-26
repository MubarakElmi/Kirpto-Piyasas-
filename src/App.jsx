import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CryptoTable from './Components/CryptoTable';
import CryptoDetail from './Components/CryptoDetail';
import Blogs from './Components/Blogs';
import Borsa from './Components/Borsa';
import Heatmap from './Components/Heatmap';
import Tunbur from './Components/tunbur';

function App() {
  return (
    <Router>
      <>
        <Navbar />

        {/* Single Routes Component */}
        <Routes>
          <Route path="/" element={<CryptoTable />} />
          <Route path="/coin/:id" element={<CryptoDetail />} />
          <Route path="/borse" element={<Borsa />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/tunbur" element={<Tunbur />} /> {/* Admin Panel Route */}
        </Routes>

        <Footer />
      </>
    </Router>
  );
}

export default App;

