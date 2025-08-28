import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Target, 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  CreditCard,
  Smartphone,
  Globe,
  CheckCircle,
  AlertCircle,
  Download,
  Copy,
  Edit3,
  Save,
  X
} from 'lucide-react';

const GeneradorOfertas = () => {
  const location = useLocation();
  const preselectedZone = location.state?.zone || null;
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [generatedOffer, setGeneratedOffer] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [businessFormData, setBusinessFormData] = useState({
    name: '',
    type: '',
    category: '',
    location: '',
    currentRevenue: '',
    avgTicket: '',
    customerCount: '',
    paymentMethods: [],
    needs: [],
    description: ''
  });

  // Datos simulados de comercios (solo información básica)
  const businesses = [
    {
      id: 1,
      name: 'Cevichería El Tiburón',
      type: 'restaurant',
      category: 'Gastronomía',
      location: 'Zona Begonias',
      image: '🦈',
      status: 'pending' // pending, completed
    },
    {
      id: 2,
      name: 'Farmacia Salud Total',
      type: 'pharmacy',
      category: 'Salud',
      location: 'Zona Financiera',
      image: '💊',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Zapatería Paso Firme',
      type: 'retail',
      category: 'Calzado',
      location: 'Zona CaminoReal',
      image: '👟',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Salón de Belleza Glamour',
      type: 'beauty',
      category: 'Belleza',
      location: 'Zona PetitThouars',
      image: '💅',
      status: 'pending'
    }
  ];

  // Nuevos negocios por zona
  const zoneBusinesses = [
    { id: 5, name: 'Café Camino Real', type: 'restaurant', category: 'Cafetería', location: 'Zona CaminoReal', image: '☕', status: 'pending' },
    { id: 6, name: 'Librería Begonias', type: 'retail', category: 'Librería', location: 'Zona Begonias', image: '📚', status: 'pending' },
    { id: 7, name: 'Tech Financiera', type: 'retail', category: 'Electrónica', location: 'Zona Financiera', image: '💻', status: 'pending' },
    { id: 8, name: 'Bistró Petit', type: 'restaurant', category: 'Restaurante', location: 'Zona PetitThouars', image: '🍽️', status: 'pending' },
  ];

  const allBusinesses = useMemo(() => [...businesses, ...zoneBusinesses], []);

  const zones = ['Todas','Zona Financiera','Zona CaminoReal','Zona Begonias','Zona PetitThouars'];
  const [zoneFilter, setZoneFilter] = useState(preselectedZone?.name || 'Todas');
  const typeOptions = useMemo(() => ['Todos', ...Array.from(new Set(allBusinesses.map(b => b.type)))], [allBusinesses]);
  const [typeFilter, setTypeFilter] = useState('Todos');

  // Productos IziPay disponibles
  const iziPayProducts = {
    pos_mobile: {
      name: 'POS Móvil',
      description: 'Terminal de pago móvil para aceptar tarjetas',
      price: 'S/ 299',
      features: ['Acepta todas las tarjetas', 'Conexión Bluetooth', 'Impresión de tickets'],
      icon: CreditCard,
      color: '#3b82f6'
    },
    payment_link: {
      name: 'Link de Pagos',
      description: 'Enlaces de pago personalizados para ventas online',
      price: 'S/ 99',
      features: ['Pagos por WhatsApp', 'Pagos por email', 'Sin comisión'],
      icon: Globe,
      color: '#10b981'
    },
    app_izipay: {
      name: 'App IziPay',
      description: 'Aplicación móvil para gestión de pagos',
      price: 'S/ 149',
      features: ['Gestión de ventas', 'Reportes en tiempo real', 'Integración con POS'],
      icon: Smartphone,
      color: '#f59e0b'
    },
    installments: {
      name: 'Pagos en Cuotas',
      description: 'Sistema de financiamiento para clientes',
      price: 'S/ 199',
      features: ['Hasta 12 cuotas', 'Sin interés', 'Aprobación automática'],
      icon: ShoppingCart,
      color: '#ef4444'
    }
  };

  // Datos de benchmarking
  const benchmarkingData = {
    restaurant: {
      avgGrowth: 30,
      topPerformer: 'Restaurante La Mar',
      successMetrics: {
        deliveryIncrease: 45,
        avgTicketIncrease: 25,
        customerRetention: 80
      }
    },
    pharmacy: {
      avgGrowth: 22,
      topPerformer: 'Farmacia InkaFarma',
      successMetrics: {
        recurringPayments: 60,
        inventoryEfficiency: 35,
        customerSatisfaction: 90
      }
    },
    retail: {
      avgGrowth: 28,
      topPerformer: 'Tienda Deportiva Nike',
      successMetrics: {
        installmentsUsage: 40,
        loyaltyProgram: 70,
        crossSelling: 55
      }
    },
    beauty: {
      avgGrowth: 35,
      topPerformer: 'Salón Beauty Pro',
      successMetrics: {
        appointmentBookings: 85,
        membershipRetention: 75,
        upsellRate: 45
      }
    }
  };

  const handleBusinessSelect = (business) => {
    setSelectedBusiness(business);
    setGeneratedOffer(null);
    
    // Si el negocio ya tiene datos completos, cargarlos en el formulario
    if (business.currentRevenue) {
      setBusinessFormData({
        name: business.name,
        type: business.type,
        category: business.category,
        location: business.location,
        currentRevenue: business.currentRevenue.toString(),
        avgTicket: business.avgTicket.toString(),
        customerCount: business.customerCount.toString(),
        paymentMethods: business.paymentMethods || [],
        needs: business.needs || [],
        description: business.description || ''
      });
    } else {
      // Si no tiene datos, inicializar con información básica
      setBusinessFormData({
        name: business.name,
        type: business.type,
        category: business.category,
        location: business.location,
        currentRevenue: '',
        avgTicket: '',
        customerCount: '',
        paymentMethods: [],
        needs: [],
        description: ''
      });
    }
  };

  const handleFormChange = (field, value) => {
    setBusinessFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentMethodToggle = (method) => {
    setBusinessFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }));
  };

  const handleNeedToggle = (need) => {
    setBusinessFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
  };

  const saveBusinessData = () => {
    // Validar que todos los campos requeridos estén llenos
    if (!businessFormData.currentRevenue || !businessFormData.avgTicket || !businessFormData.customerCount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Actualizar el negocio seleccionado con los datos del formulario
    const updatedBusiness = {
      ...selectedBusiness,
      ...businessFormData,
      currentRevenue: parseInt(businessFormData.currentRevenue),
      avgTicket: parseInt(businessFormData.avgTicket),
      customerCount: parseInt(businessFormData.customerCount),
      status: 'completed'
    };

    setSelectedBusiness(updatedBusiness);
    setIsEditingBusiness(false);
  };

  const isFormComplete = () => {
    return businessFormData.currentRevenue && 
           businessFormData.avgTicket && 
           businessFormData.customerCount &&
           businessFormData.paymentMethods.length > 0 &&
           businessFormData.needs.length > 0;
  };

  const generateOffer = async () => {
    if (!isFormComplete()) {
      alert('Por favor completa toda la información del negocio antes de generar la oferta');
      return;
    }

    setIsGenerating(true);
    
    // Simular proceso de generación
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const business = selectedBusiness;
    const benchmark = benchmarkingData[business.type] || benchmarkingData.retail;
    
    // Lógica de recomendación basada en necesidades del negocio
    const recommendedProducts = [];
    
    if (business.needs.includes('delivery')) {
      recommendedProducts.push('payment_link');
    }
    if (business.needs.includes('digital_payments')) {
      recommendedProducts.push('pos_mobile');
    }
    if (business.needs.includes('installments')) {
      recommendedProducts.push('installments');
    }
    if (business.needs.includes('appointments') || business.needs.includes('memberships')) {
      recommendedProducts.push('app_izipay');
    }
    
    // Si no hay productos específicos, recomendar POS móvil
    if (recommendedProducts.length === 0) {
      recommendedProducts.push('pos_mobile');
    }

    const offer = {
      business: business,
      products: recommendedProducts.map(id => iziPayProducts[id]),
      totalValue: recommendedProducts.reduce((sum, id) => {
        const price = parseInt(iziPayProducts[id].price.replace('S/ ', ''));
        return sum + price;
      }, 0),
      projectedGrowth: benchmark.avgGrowth,
      successStory: {
        business: benchmark.topPerformer,
        metrics: benchmark.successMetrics
      },
      pitch: generatePitch(business, recommendedProducts, benchmark),
      roi: calculateROI(business, recommendedProducts, benchmark)
    };

    setGeneratedOffer(offer);
    setIsGenerating(false);
  };

  const generatePitch = (business, products, benchmark) => {
    const productNames = products.map(id => iziPayProducts[id].name).join(' y ');
    
    return `Hola, soy de IziPay. Nuestro análisis muestra que ${business.name} tiene un potencial de crecimiento significativo implementando ${productNames}. Comercios similares en el sector han logrado resultados muy positivos con nuestra solución. ¿Te gustaría conocer más detalles sobre cómo podemos ayudarte a optimizar tus ventas?`;
  };

  const calculateROI = (business, products, benchmark) => {
    const investment = products.reduce((sum, id) => {
      const price = parseInt(iziPayProducts[id].price.replace('S/ ', ''));
      return sum + price;
    }, 0);
    
    const projectedRevenue = business.currentRevenue * (benchmark.avgGrowth / 100);
    const roi = ((projectedRevenue - investment) / investment) * 100;
    
    return {
      investment,
      projectedRevenue,
      roi: Math.round(roi),
      paybackMonths: Math.ceil(investment / (projectedRevenue / 12))
    };
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Aquí podrías mostrar una notificación de éxito
  };

  const downloadOffer = () => {
    if (!generatedOffer) return;
    
    const offerData = {
      negocio: generatedOffer.business.name,
      productos: generatedOffer.products.map(p => p.name),
      valor_total: `S/ ${generatedOffer.totalValue}`,
      crecimiento_proyectado: `${generatedOffer.projectedGrowth}%`,
      roi: `${generatedOffer.roi.roi}%`,
      pitch: generatedOffer.pitch
    };
    
    const blob = new Blob([JSON.stringify(offerData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oferta_${generatedOffer.business.name.replace(/\s+/g, '_')}.json`;
    a.click();
  };

  return (
    <div className="generador-ofertas">
      <div className="page-header">
        <h1 className="page-title">🎯 Generador de Ofertas Inteligentes</h1>
        <p className="page-subtitle">
          Ingresa la información del negocio durante tu visita y genera ofertas personalizadas
        </p>
      </div>

      <div className="content-grid">
        {/* Filtros superiores */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <h3 className="card-title">Filtros de Comercios</h3>
          </div>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Zona</label>
              <select value={zoneFilter} onChange={(e)=> setZoneFilter(e.target.value)}>
                {zones.map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Tipo de Negocio</label>
              <select value={typeFilter} onChange={(e)=> setTypeFilter(e.target.value)}>
                {typeOptions.map(t => (
                  <option key={t} value={t}>{t.replace(/^./, s => s.toUpperCase())}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Comercios */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Comercios Identificados</h3>
          </div>
          <div className="businesses-list">
            {allBusinesses
              .filter(b => (zoneFilter === 'Todas' ? true : b.location === zoneFilter) && (typeFilter === 'Todos' ? true : b.type === typeFilter))
              .map((business) => (
              <div 
                key={business.id}
                className={`business-item ${selectedBusiness?.id === business.id ? 'selected' : ''}`}
                onClick={() => handleBusinessSelect(business)}
              >
                <div className="business-header">
                  <div className="business-icon">{business.image}</div>
                  <div className="business-info">
                    <h4>{business.name}</h4>
                    <p>{business.category} • {business.location}</p>
                  </div>
                  <div className="business-status">
                    {business.status === 'completed' ? (
                      <span className="badge badge-success">Completado</span>
                    ) : (
                      <span className="badge badge-warning">Pendiente</span>
                    )}
                  </div>
                </div>
                {business.status === 'completed' && (
                  <div className="business-details">
                    <div className="business-metrics">
                      <span>Ticket: S/ {business.avgTicket}</span>
                      <span>•</span>
                      <span>{business.customerCount} clientes</span>
                    </div>
                    <div className="business-needs">
                      {business.needs.map((need, index) => (
                        <span key={index} className="badge badge-info">
                          {need.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de Información del Negocio */}
        {selectedBusiness && (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {isEditingBusiness ? 'Editando Información' : 'Información del Negocio'}
              </h3>
              {!isEditingBusiness && selectedBusiness.status === 'pending' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setIsEditingBusiness(true)}
                >
                  <Edit3 size={16} />
                  Completar Información
                </button>
              )}
              {!isEditingBusiness && selectedBusiness.status === 'completed' && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => setIsEditingBusiness(true)}
                >
                  <Edit3 size={16} />
                  Editar
                </button>
              )}
            </div>
            
            <div className="business-form">
              {isEditingBusiness ? (
                <div className="form-content">
                  <div className="form-section">
                    <h4>Información Básica</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nombre del Negocio</label>
                        <input
                          type="text"
                          value={businessFormData.name}
                          onChange={(e) => handleFormChange('name', e.target.value)}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Tipo de Negocio</label>
                        <input
                          type="text"
                          value={businessFormData.type}
                          onChange={(e) => handleFormChange('type', e.target.value)}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Categoría</label>
                        <input
                          type="text"
                          value={businessFormData.category}
                          onChange={(e) => handleFormChange('category', e.target.value)}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Ubicación</label>
                        <input
                          type="text"
                          value={businessFormData.location}
                          onChange={(e) => handleFormChange('location', e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Métricas Financieras *</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Ventas Mensuales (S/)</label>
                        <input
                          type="number"
                          value={businessFormData.currentRevenue}
                          onChange={(e) => handleFormChange('currentRevenue', e.target.value)}
                          placeholder="Ej: 15000"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Ticket Promedio (S/)</label>
                        <input
                          type="number"
                          value={businessFormData.avgTicket}
                          onChange={(e) => handleFormChange('avgTicket', e.target.value)}
                          placeholder="Ej: 45"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Número de Clientes</label>
                        <input
                          type="number"
                          value={businessFormData.customerCount}
                          onChange={(e) => handleFormChange('customerCount', e.target.value)}
                          placeholder="Ej: 120"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Métodos de Pago Actuales *</h4>
                    <div className="checkbox-grid">
                      {['efectivo', 'tarjeta', 'transferencia', 'yape', 'plin'].map(method => (
                        <label key={method} className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={businessFormData.paymentMethods.includes(method)}
                            onChange={() => handlePaymentMethodToggle(method)}
                          />
                          <span>{method.charAt(0).toUpperCase() + method.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Necesidades Identificadas *</h4>
                    <div className="checkbox-grid">
                      {[
                        'delivery',
                        'digital_payments',
                        'installments',
                        'appointments',
                        'memberships',
                        'inventory',
                        'loyalty',
                        'recurring_payments'
                      ].map(need => (
                        <label key={need} className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={businessFormData.needs.includes(need)}
                            onChange={() => handleNeedToggle(need)}
                          />
                          <span>{need.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={saveBusinessData}
                      disabled={!isFormComplete()}
                    >
                      <Save size={16} />
                      Guardar Información
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setIsEditingBusiness(false)}
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="business-info-display">
                  {selectedBusiness.status === 'completed' ? (
                    <>
                      <div className="business-stats">
                        <div className="stat">
                          <DollarSign size={16} />
                          <span>S/ {selectedBusiness.currentRevenue.toLocaleString()}</span>
                          <small>Ventas mensuales</small>
                        </div>
                        <div className="stat">
                          <Users size={16} />
                          <span>{selectedBusiness.customerCount}</span>
                          <small>Clientes</small>
                        </div>
                        <div className="stat">
                          <TrendingUp size={16} />
                          <span>S/ {selectedBusiness.avgTicket}</span>
                          <small>Ticket promedio</small>
                        </div>
                      </div>
                      
                      <div className="business-details-display">
                        <div className="detail-section">
                          <h5>Métodos de Pago</h5>
                          <div className="tags">
                            {selectedBusiness.paymentMethods.map(method => (
                              <span key={method} className="badge badge-info">
                                {method.charAt(0).toUpperCase() + method.slice(1)}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="detail-section">
                          <h5>Necesidades</h5>
                          <div className="tags">
                            {selectedBusiness.needs.map(need => (
                              <span key={need} className="badge badge-warning">
                                {need.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            ))}
                          </div>
                        </div>

                        {selectedBusiness.description && (
                          <div className="detail-section">
                            <h5>Descripción</h5>
                            <p>{selectedBusiness.description}</p>
                          </div>
                        )}
                      </div>

                      <button 
                        className="btn btn-primary"
                        onClick={generateOffer}
                        disabled={isGenerating}
                      >
                        {isGenerating ? 'Generando...' : 'Generar Oferta Personalizada'}
                      </button>
                    </>
                  ) : (
                    <div className="no-data">
                      <AlertCircle size={48} />
                      <p>No hay información del negocio</p>
                      <p className="text-muted">Completa la información durante tu visita para generar una oferta personalizada</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Oferta Generada */}
      {generatedOffer && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Oferta Generada</h3>
            <div className="offer-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => copyToClipboard(generatedOffer.pitch)}
              >
                <Copy size={16} />
                Copiar Pitch
              </button>
              <button 
                className="btn btn-secondary"
                onClick={downloadOffer}
              >
                <Download size={16} />
                Descargar
              </button>
            </div>
          </div>
          
          <div className="generated-offer">
            {/* Pitch */}
            <div className="offer-pitch">
              <h4>Pitch de Ventas</h4>
              <div className="pitch-content">
                <p>{generatedOffer.pitch}</p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => copyToClipboard(generatedOffer.pitch)}
                >
                  <Copy size={16} />
                  Copiar
                </button>
              </div>
            </div>

            {/* Productos Recomendados */}
            <div className="recommended-products">
              <h4>Productos Recomendados</h4>
              <div className="products-grid">
                {generatedOffer.products.map((product, index) => {
                  const Icon = product.icon;
                  return (
                    <div key={index} className="product-card">
                      <div className="product-icon" style={{ backgroundColor: product.color }}>
                        <Icon size={24} color="white" />
                      </div>
                      <div className="product-info">
                        <h5>{product.name}</h5>
                        <p>{product.description}</p>
                        <span className="product-price">{product.price}</span>
                      </div>
                      <div className="product-features">
                        {product.features.map((feature, idx) => (
                          <span key={idx} className="feature-item">
                            <CheckCircle size={14} />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Crecimiento Proyectado */}
            <div className="projected-growth">
              <h4>Crecimiento Proyectado</h4>
              <div className="growth-indicator">
                <div className="current-state">
                  <span>Estado Actual</span>
                  <strong>S/ {generatedOffer.business.currentRevenue.toLocaleString()}</strong>
                </div>
                <div className="growth-arrow">
                  <TrendingUp size={24} />
                  <span>+{generatedOffer.projectedGrowth}%</span>
                </div>
                <div className="projected-state">
                  <span>Proyección</span>
                  <strong>S/ {(generatedOffer.business.currentRevenue * (1 + generatedOffer.projectedGrowth / 100)).toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneradorOfertas;
