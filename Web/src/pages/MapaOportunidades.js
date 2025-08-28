import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  DollarSign,
  Filter,
  Download,
  Info,
  Calendar,
  Map
} from 'lucide-react';

const MapaOportunidades = () => {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone] = useState(null);
  const [filters, setFilters] = useState({
    density: 'all',
    penetration: 'all',
    businessType: 'all'
  });

  // Datos simulados de zonas de oportunidad en San Isidro (Anexo 150131)
  const opportunityZones = [
    {
      id: 1,
      name: 'Zona Financiera',
      position: [-12.0975, -77.0315],
      density: 'high',
      penetration: 'medium',
      businessCount: 156,
      iziPayClients: 34,
      avgTicket: 78,
      opportunityScore: 92,
      businessTypes: ['financial', 'services', 'restaurants']
    },
         {
       id: 2,
       name: 'Zona CaminoReal',
       position: [-12.0950, -77.0450],
       density: 'medium',
       penetration: 'low',
       businessCount: 89,
       iziPayClients: 23,
       avgTicket: 65,
       opportunityScore: 75,
       businessTypes: ['financial', 'services', 'restaurants']
     },
     {
       id: 3,
       name: 'Zona Begonias',
       position: [-12.1025, -77.0250],
       density: 'high',
       penetration: 'very_low',
       businessCount: 203,
       iziPayClients: 12,
       avgTicket: 45,
       opportunityScore: 95,
       businessTypes: ['restaurants', 'retail', 'services']
     },
    {
      id: 4,
      name: 'Zona PetitThouars',
      position: [-12.1045, -77.0428],
      density: 'medium',
      penetration: 'low',
      businessCount: 134,
      iziPayClients: 28,
      avgTicket: 38,
      opportunityScore: 81,
      businessTypes: ['retail', 'restaurants', 'services']
    }
  ];

  // Todos los eventos de San Isidro
  const sanIsidroEvents = [
    { 
      name: 'Tech Summit San Isidro', 
      description: 'Conferencia tecnológica para empresas del distrito con ponentes internacionales',
      location: 'Centro Empresarial Real',
      sector: 'Tecnología',
      source: 'instagram'
    },
    { 
      name: 'Expo Financiera 2024', 
      description: 'Exposición de servicios financieros y fintech para el sector empresarial',
      location: 'Hotel Country Club',
      sector: 'Financiero',
      source: 'facebook'
    },
    { 
      name: 'Business Forum El Golf', 
      description: 'Foro de networking empresarial con líderes del sector',
      location: 'Club El Golf',
      sector: 'Empresarial',
      source: 'instagram'
    },
    { 
      name: 'Feria Gastronómica San Isidro', 
      description: 'Feria gastronómica con restaurantes del distrito y degustaciones',
      location: 'Parque Kennedy',
      sector: 'Gastronomía',
      source: 'facebook'
    },
    { 
      name: 'Feria de Emprendedores', 
      description: 'Feria para emprendedores y startups con oportunidades de networking',
      location: 'Centro Comercial San Isidro',
      sector: 'Emprendimiento',
      source: 'twitter'
    },
    { 
      name: 'Workshop de Pagos Digitales', 
      description: 'Taller sobre soluciones de pago digital para comercios',
      location: 'Cámara de Comercio de Lima',
      sector: 'Fintech',
      source: 'instagram'
    }
  ];

  const getZoneColor = (zone) => {
    if (zone.penetration === 'very_low' && zone.density === 'high') return '#ef4444';
    if (zone.penetration === 'low' && zone.density === 'high') return '#f59e0b';
    if (zone.penetration === 'low' && zone.density === 'medium') return '#3b82f6';
    return '#10b981';
  };

  const getZoneRadius = (zone) => {
    return zone.businessCount * 2;
  };

  const getPenetrationText = (penetration) => {
    switch (penetration) {
      case 'very_low': return 'Muy Baja';
      case 'low': return 'Baja';
      case 'medium': return 'Media';
      case 'high': return 'Alta';
      default: return 'Desconocida';
    }
  };

  const getDensityText = (density) => {
    switch (density) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Desconocida';
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'instagram': return '#e4405f';
      case 'facebook': return '#1877f2';
      case 'twitter': return '#1da1f2';
      default: return '#6b7280';
    }
  };

  const getSourceText = (source) => {
    switch (source) {
      case 'instagram': return 'Instagram';
      case 'facebook': return 'Facebook';
      case 'twitter': return 'Twitter';
      default: return 'Otro';
    }
  };

  const addToTeamsCalendar = (event) => {
    // Simulación de integración con Teams Calendar
    const teamsUrl = `https://teams.microsoft.com/l/meeting/new?subject=${encodeURIComponent(event.name)}&location=${encodeURIComponent(event.location)}&content=${encodeURIComponent(event.description)}`;
    window.open(teamsUrl, '_blank');
  };

  const filteredZones = opportunityZones.filter(zone => {
    if (!zone || !zone.density || !zone.penetration || !zone.businessTypes) return false;
    if (filters.density !== 'all' && zone.density !== filters.density) return false;
    if (filters.penetration !== 'all' && zone.penetration !== filters.penetration) return false;
    if (filters.businessType !== 'all' && !zone.businessTypes.includes(filters.businessType)) return false;
    return true;
  });

  const exportData = () => {
    const data = filteredZones.map(zone => ({
      Zona: zone.name,
      'Densidad Comercial': getDensityText(zone.density),
      'Penetración IziPay': getPenetrationText(zone.penetration),
      'Total Comercios': zone.businessCount,
      'Clientes IziPay': zone.iziPayClients,
      'Ticket Promedio': `S/ ${zone.avgTicket}`,
      'Score de Oportunidad': zone.opportunityScore
    }));

    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'oportunidades_izi_copilot.csv';
    a.click();
  };

  return (
    <div className="mapa-oportunidades">
      <div className="page-header">
        <h1 className="page-title">🗺️ Mapa de Oportunidades</h1>
        <p className="page-subtitle">
          Identifica zonas con alta densidad comercial pero baja penetración de IziPay
        </p>
      </div>

             {/* Filtros */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Filter size={20} />
            Filtros de Oportunidades
          </h3>
          <button onClick={exportData} className="btn btn-secondary">
            <Download size={16} />
            Exportar Datos
          </button>
        </div>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Densidad Comercial</label>
            <select 
              value={filters.density} 
              onChange={(e) => setFilters({...filters, density: e.target.value})}
            >
              <option value="all">Todas</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Penetración IziPay</label>
            <select 
              value={filters.penetration} 
              onChange={(e) => setFilters({...filters, penetration: e.target.value})}
            >
              <option value="all">Todas</option>
              <option value="very_low">Muy Baja</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Tipo de Negocio</label>
            <select 
              value={filters.businessType} 
              onChange={(e) => setFilters({...filters, businessType: e.target.value})}
            >
              <option value="all">Todos</option>
              <option value="restaurants">Restaurantes</option>
              <option value="retail">Retail</option>
              <option value="services">Servicios</option>
              <option value="financial">Financiero</option>
              <option value="entertainment">Entretenimiento</option>
            </select>
          </div>
        </div>
      </div>

      <div className="content-grid">
        {/* Mapa Interactivo */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Mapa de Calor de Oportunidades</h3>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
                <span>Alta Prioridad</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
                <span>Media Prioridad</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                <span>Baja Prioridad</span>
              </div>
            </div>
          </div>
          <div className="map-container">
            <MapContainer 
              center={[-12.1209, -77.0302]} 
              zoom={12} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredZones.map((zone) => (
                <Circle
                  key={zone.id}
                  center={zone.position}
                  radius={getZoneRadius(zone)}
                  pathOptions={{
                    color: getZoneColor(zone),
                    fillColor: getZoneColor(zone),
                    fillOpacity: 0.3,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => setSelectedZone(zone)
                  }}
                >
                  <Popup>
                    <div className="zone-popup">
                      <h4>{zone.name}</h4>
                      <p><strong>Score de Oportunidad:</strong> {zone.opportunityScore}/100</p>
                      <p><strong>Comercios:</strong> {zone.businessCount}</p>
                      <p><strong>Clientes IziPay:</strong> {zone.iziPayClients}</p>
                      <p><strong>Ticket Promedio:</strong> S/ {zone.avgTicket}</p>
                    </div>
                  </Popup>
                </Circle>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Panel de Información */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Información de Zona</h3>
          </div>
          {selectedZone ? (
            <div className="zone-details">
              <h4>{selectedZone.name}</h4>
              
              <div className="zone-stats">
                <div className="zone-stat">
                  <TrendingUp size={20} />
                  <div>
                    <span className="stat-value">{selectedZone.opportunityScore}</span>
                    <span className="stat-label">Score de Oportunidad</span>
                  </div>
                </div>
                <div className="zone-stat">
                  <Users size={20} />
                  <div>
                    <span className="stat-value">{selectedZone.businessCount}</span>
                    <span className="stat-label">Total Comercios</span>
                  </div>
                </div>
                <div className="zone-stat">
                  <DollarSign size={20} />
                  <div>
                    <span className="stat-value">S/ {selectedZone.avgTicket}</span>
                    <span className="stat-label">Ticket Promedio</span>
                  </div>
                </div>
              </div>

              <div className="zone-metrics">
                <div className="metric">
                  <label>Densidad Comercial:</label>
                  <span className={`badge badge-${selectedZone.density === 'high' ? 'success' : selectedZone.density === 'medium' ? 'warning' : 'info'}`}>
                    {getDensityText(selectedZone.density)}
                  </span>
                </div>
                <div className="metric">
                  <label>Penetración IziPay:</label>
                  <span className={`badge badge-${selectedZone.penetration === 'very_low' || selectedZone.penetration === 'low' ? 'danger' : selectedZone.penetration === 'medium' ? 'warning' : 'success'}`}>
                    {getPenetrationText(selectedZone.penetration)}
                  </span>
                </div>
                <div className="metric">
                  <label>Clientes IziPay:</label>
                  <span>{selectedZone.iziPayClients} / {selectedZone.businessCount}</span>
                </div>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/generador-ofertas', { state: { zone: selectedZone } })}
                >
                  Crear oferta para esta zona
                </button>
              </div>

              {/* Removed events display from individual zones */}

              
            </div>
          ) : (
            <div className="no-selection">
              <Info size={48} />
              <p>Selecciona una zona en el mapa para ver los detalles</p>
            </div>
          )}
                 </div>
       </div>

       {/* Eventos de San Isidro */}
       <div className="card">
         <div className="card-header">
           <h3 className="card-title">
             <Calendar size={20} />
             Eventos en San Isidro
           </h3>
           <span className="badge badge-info">{sanIsidroEvents.length} eventos</span>
         </div>
         <div className="events-grid">
           {sanIsidroEvents.map((event, index) => (
             <div key={index} className="event-card">
               <div className="event-header">
                 <div className="event-type-badge" style={{ backgroundColor: getSourceColor(event.source) }}>
                   {getSourceText(event.source)}
                 </div>
                 <div className="event-sector">
                   <span>{event.sector}</span>
                 </div>
               </div>
               <div className="event-content">
                 <h4 className="event-title">{event.name}</h4>
                 <p className="event-description">{event.description}</p>
                 <div className="event-details">
                   <div className="event-detail">
                     <MapPin size={14} />
                     <span>{event.location}</span>
                   </div>
                   <div className="event-detail">
                     <span className="scraped-info">
                       <strong>Fuente:</strong> {getSourceText(event.source)}
                     </span>
                   </div>
                 </div>
               </div>
                               <div className="event-actions">
                  <button className="btn btn-sm btn-secondary">
                    Ver Noticia
                  </button>
                  <button className="btn btn-sm btn-primary" onClick={() => addToTeamsCalendar(event)}>
                    Agregar a Teams
                  </button>
                </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
};

export default MapaOportunidades;
