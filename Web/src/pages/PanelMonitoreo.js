import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
  Wifi,
  WifiOff,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  Filter,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PanelMonitoreo = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filters, setFilters] = useState({
    priority: 'all',
    type: 'all',
    status: 'all'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Datos simulados de alertas
  const mockAlerts = [
    {
      id: 1,
      type: 'system',
      priority: 'critical',
      title: 'Alerta de Incidencia Sistémica',
      description: 'Se reporta una caída masiva en la red de Interbank. Tus clientes podrían tener problemas para cobrar.',
      client: 'Todos los clientes',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
      status: 'active',
      action: 'send_whatsapp',
      actionText: 'Enviar mensaje pre-aprobado',
      impact: 'high',
      affectedClients: 45,
      icon: WifiOff,
      color: '#ef4444'
    },
    {
      id: 2,
      type: 'customer_service',
      priority: 'high',
      title: 'Cliente con Caso Pendiente',
      description: 'Tu cliente "Librería El Saber" escribió a soporte hace 3 horas y su caso no ha sido resuelto.',
      client: 'Librería El Saber',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 horas atrás
      status: 'active',
      action: 'contact_client',
      actionText: 'Contactar al cliente',
      impact: 'medium',
      caseId: 'CS-2024-001',
      icon: MessageCircle,
      color: '#f59e0b'
    },
    {
      id: 3,
      type: 'sales_drop',
      priority: 'medium',
      title: 'Caída de Ventas Detectada',
      description: 'Las transacciones de "Zapatería Paso Firme" han caído un 25% esta semana comparado con su histórico.',
      client: 'Zapatería Paso Firme',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      status: 'active',
      action: 'schedule_visit',
      actionText: 'Programar visita',
      impact: 'medium',
      dropPercentage: 25,
      benchmark: '+5%',
      icon: TrendingDown,
      color: '#3b82f6'
    },
    {
      id: 4,
      type: 'opportunity',
      priority: 'low',
      title: 'Nueva Oportunidad Identificada',
      description: 'Se detectó un comercio potencial en tu zona con alta densidad comercial y baja penetración IziPay.',
      client: 'Bodega El Ahorro',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
      status: 'active',
      action: 'view_details',
      actionText: 'Ver detalles',
      impact: 'low',
      opportunityScore: 92,
      icon: TrendingUp,
      color: '#10b981'
    },
    {
      id: 5,
      type: 'system',
      priority: 'medium',
      title: 'Mantenimiento Programado',
      description: 'Se realizará mantenimiento del sistema mañana de 2:00 AM a 4:00 AM. Los servicios podrían estar intermitentes.',
      client: 'Todos los clientes',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
      status: 'resolved',
      action: 'none',
      actionText: 'Información',
      impact: 'low',
      maintenanceTime: '2:00 AM - 4:00 AM',
      icon: Clock,
      color: '#6b7280'
    }
  ];

  // Datos de métricas
  const metricsData = {
    totalClients: 247,
    activeAlerts: 4,
    resolvedToday: 12,
    avgResponseTime: '15 min',
    satisfactionScore: 4.8
  };

  // Datos de gráfico de alertas
  const alertsChartData = [
    { day: 'Lun', critical: 2, high: 5, medium: 8, low: 3 },
    { day: 'Mar', critical: 1, high: 3, medium: 6, low: 4 },
    { day: 'Mié', critical: 0, high: 4, medium: 7, low: 2 },
    { day: 'Jue', critical: 3, high: 6, medium: 5, low: 1 },
    { day: 'Vie', critical: 1, high: 2, medium: 9, low: 5 },
    { day: 'Sáb', critical: 0, high: 1, medium: 4, low: 2 },
    { day: 'Dom', critical: 0, high: 0, medium: 2, low: 1 }
  ];

  // Datos de rendimiento de clientes
  const clientPerformanceData = [
    { name: 'Librería El Saber', transactions: 45, change: -25, status: 'declining' },
    { name: 'Zapatería Paso Firme', transactions: 78, change: -15, status: 'declining' },
    { name: 'Restaurante La Mar', transactions: 120, change: +12, status: 'growing' },
    { name: 'Farmacia Salud Total', transactions: 89, change: +8, status: 'growing' },
    { name: 'Salón de Belleza Glamour', transactions: 34, change: -5, status: 'stable' }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
  }, []);

  const refreshAlerts = async () => {
    setIsRefreshing(true);
    // Simular actualización
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleAlertAction = (alert) => {
    setSelectedAlert(alert);
    
    switch (alert.action) {
      case 'send_whatsapp':
        // Simular envío de WhatsApp
        console.log('Enviando mensaje WhatsApp pre-aprobado');
        break;
      case 'contact_client':
        // Simular contacto con cliente
        console.log('Contactando al cliente:', alert.client);
        break;
      case 'schedule_visit':
        // Simular programación de visita
        console.log('Programando visita a:', alert.client);
        break;
      case 'view_details':
        // Simular ver detalles
        console.log('Mostrando detalles de:', alert.client);
        break;
      default:
        break;
    }
  };

  const markAlertAsResolved = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' }
        : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filters.priority !== 'all' && alert.priority !== filters.priority) return false;
    if (filters.type !== 'all' && alert.type !== filters.type) return false;
    if (filters.status !== 'all' && alert.status !== filters.status) return false;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'critical': return 'Crítica';
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Desconocida';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'system': return 'Sistema';
      case 'customer_service': return 'Servicio al Cliente';
      case 'sales_drop': return 'Caída de Ventas';
      case 'opportunity': return 'Oportunidad';
      default: return 'Otro';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} h`;
    return `Hace ${days} días`;
  };

  return (
    <div className="panel-monitoreo">
      <div className="page-header">
        <h1 className="page-title">🚨 Panel de Monitoreo Proactivo</h1>
        <p className="page-subtitle">
          Sistema de alertas tempranas y monitoreo en tiempo real de tus clientes
        </p>
      </div>

      {/* Métricas Principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <Users size={24} color="#3b82f6" />
            <span className="stat-change positive">+12%</span>
          </div>
          <div className="stat-value">{metricsData.totalClients}</div>
          <div className="stat-label">Total Clientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <AlertTriangle size={24} color="#ef4444" />
            <span className="stat-change negative">+2</span>
          </div>
          <div className="stat-value">{metricsData.activeAlerts}</div>
          <div className="stat-label">Alertas Activas</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <CheckCircle size={24} color="#10b981" />
            <span className="stat-change positive">+3</span>
          </div>
          <div className="stat-value">{metricsData.resolvedToday}</div>
          <div className="stat-label">Resueltas Hoy</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <Clock size={24} color="#f59e0b" />
            <span className="stat-change positive">-2 min</span>
          </div>
          <div className="stat-value">{metricsData.avgResponseTime}</div>
          <div className="stat-label">Tiempo Respuesta</div>
        </div>
      </div>

      <div className="content-grid">
        {/* Lista de Alertas */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Alertas Activas</h3>
            <div className="header-actions">
              <button 
                className="btn btn-secondary"
                onClick={refreshAlerts}
                disabled={isRefreshing}
              >
                <RefreshCw size={16} className={isRefreshing ? 'spinning' : ''} />
                Actualizar
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="filters-section">
            <div className="filter-group">
              <label>Prioridad</label>
              <select 
                value={filters.priority} 
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
              >
                <option value="all">Todas</option>
                <option value="critical">Crítica</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Tipo</label>
              <select 
                value={filters.type} 
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="all">Todos</option>
                <option value="system">Sistema</option>
                <option value="customer_service">Servicio al Cliente</option>
                <option value="sales_drop">Caída de Ventas</option>
                <option value="opportunity">Oportunidad</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Estado</label>
              <select 
                value={filters.status} 
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">Todos</option>
                <option value="active">Activas</option>
                <option value="resolved">Resueltas</option>
              </select>
            </div>
          </div>

          <div className="alerts-list">
            {filteredAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div 
                  key={alert.id}
                  className={`alert-item ${alert.status} ${alert.priority}`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="alert-icon" style={{ backgroundColor: alert.color }}>
                    <Icon size={20} color="white" />
                  </div>
                  <div className="alert-content">
                    <div className="alert-header">
                      <h4>{alert.title}</h4>
                      <div className="alert-meta">
                        <span className={`badge badge-${alert.priority}`}>
                          {getPriorityText(alert.priority)}
                        </span>
                        <span className="alert-time">{formatTimeAgo(alert.timestamp)}</span>
                      </div>
                    </div>
                    <p>{alert.description}</p>
                    <div className="alert-footer">
                      <span className="alert-client">{alert.client}</span>
                      <button 
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAlertAction(alert);
                        }}
                      >
                        {alert.actionText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel de Detalles */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Detalles de Alerta</h3>
          </div>
          {selectedAlert ? (
            <div className="alert-details">
              <div className="alert-detail-header">
                <div className="alert-detail-icon" style={{ backgroundColor: selectedAlert.color }}>
                  {React.createElement(selectedAlert.icon, { size: 24, color: 'white' })}
                </div>
                <div>
                  <h4>{selectedAlert.title}</h4>
                  <p>{selectedAlert.description}</p>
                </div>
              </div>

              <div className="alert-detail-info">
                <div className="info-row">
                  <label>Cliente:</label>
                  <span>{selectedAlert.client}</span>
                </div>
                <div className="info-row">
                  <label>Prioridad:</label>
                  <span className={`badge badge-${selectedAlert.priority}`}>
                    {getPriorityText(selectedAlert.priority)}
                  </span>
                </div>
                <div className="info-row">
                  <label>Tipo:</label>
                  <span>{getTypeText(selectedAlert.type)}</span>
                </div>
                <div className="info-row">
                  <label>Impacto:</label>
                  <span>{selectedAlert.impact}</span>
                </div>
                <div className="info-row">
                  <label>Tiempo:</label>
                  <span>{formatTimeAgo(selectedAlert.timestamp)}</span>
                </div>
              </div>

              {selectedAlert.type === 'sales_drop' && (
                <div className="sales-drop-details">
                  <h5>Análisis de Caída</h5>
                  <div className="drop-analysis">
                    <div className="drop-metric">
                      <span>Caída detectada</span>
                      <strong className="negative">-{selectedAlert.dropPercentage}%</strong>
                    </div>
                    <div className="drop-metric">
                      <span>Benchmark del sector</span>
                      <strong className="positive">{selectedAlert.benchmark}</strong>
                    </div>
                  </div>
                  <p className="analysis-note">
                    Las transacciones de tu cliente cayeron {selectedAlert.dropPercentage}%, mientras que otras empresas similares crecieron {selectedAlert.benchmark}. Esto indica un problema específico de tu cliente, no del mercado.
                  </p>
                </div>
              )}

              <div className="alert-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAlertAction(selectedAlert)}
                >
                  {selectedAlert.actionText}
                </button>
                {selectedAlert.status === 'active' && (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => markAlertAsResolved(selectedAlert.id)}
                  >
                    Marcar como Resuelta
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <AlertTriangle size={48} />
              <p>Selecciona una alerta para ver los detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Gráficos y Métricas */}
      <div className="content-grid">
        {/* Gráfico de Alertas */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Tendencia de Alertas</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="critical" stackId="a" fill="#ef4444" />
                <Bar dataKey="high" stackId="a" fill="#f59e0b" />
                <Bar dataKey="medium" stackId="a" fill="#3b82f6" />
                <Bar dataKey="low" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rendimiento de Clientes */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Rendimiento de Clientes</h3>
          </div>
          <div className="client-performance">
            {clientPerformanceData.map((client, index) => (
              <div key={index} className="client-performance-item">
                <div className="client-info">
                  <h4>{client.name}</h4>
                  <span>{client.transactions} transacciones</span>
                </div>
                <div className={`performance-change ${client.status}`}>
                  {client.change > 0 ? '+' : ''}{client.change}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelMonitoreo;
