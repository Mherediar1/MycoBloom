
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PredictPage } from './pages/PredictPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutMycorrhizaPage } from './pages/AboutMycorrhizaPage';
import { FieldGuidePage } from './pages/FieldGuidePage';

const AppContent = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen selection:bg-accent selection:text-bg-dark bg-bg-dark text-white font-sans">
      <Navbar />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-[80px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/analizador" element={<PredictPage />} />
              <Route path="/historial" element={<HistoryPage />} />
              <Route path="/sobre-micorrizas" element={<AboutMycorrhizaPage />} />
              <Route path="/guia-de-campo" element={<FieldGuidePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
