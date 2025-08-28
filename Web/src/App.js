import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MapaOportunidades from './pages/MapaOportunidades';
import GeneradorOfertas from './pages/GeneradorOfertas';
import AsistenteOnboarding from './pages/AsistenteOnboarding';
import PanelMonitoreo from './pages/PanelMonitoreo';
import ReportesInteligencia from './pages/ReportesInteligencia';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mapa-oportunidades" element={<MapaOportunidades />} />
            <Route path="/generador-ofertas" element={<GeneradorOfertas />} />
            <Route path="/asistente-onboarding" element={<AsistenteOnboarding />} />
            <Route path="/panel-monitoreo" element={<PanelMonitoreo />} />
            <Route path="/reportes-inteligencia" element={<ReportesInteligencia />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
