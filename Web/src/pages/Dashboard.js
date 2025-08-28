import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Target, 
  AlertTriangle,
  MapPin,
  DollarSign,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: 'Clientes Activos',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: '#10b981'
    },
    {
      title: 'Oportunidades Identificadas',
      value: '89',
      change: '+23%',
      changeType: 'positive',
      icon: Target,
      color: '#3b82f6'
    },
    {
      title: 'Ventas del Mes',
      value: 'S/ 45,230',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      color: '#f59e0b'
    },
    {
      title: 'Alertas Pendientes',
      value: '5',
      change: '-2',
      changeType: 'negative',
      icon: AlertTriangle,
      color: '#ef4444'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Nueva oportunidad identificada',
      description: 'Bodega "El Ahorro" en Miraflores - Alta densidad comercial',
      time: 'Hace 2 horas',
      icon: MapPin
    },
    {
      id: 2,
      type: 'alert',
      title: 'Alerta de caída de ventas',
      description: 'Restaurante "La Cevichería" - 25% menos transacciones',
      time: 'Hace 4 horas',
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'success',
      title: 'Cliente activado exitosamente',
      description: 'Farmacia "Salud Total" - POS móvil configurado',
      time: 'Hace 6 horas',
      icon: Users
    },
    {
      id: 4,
      type: 'event',
      title: 'Evento comercial programado',
      description: 'Feria Gastronómica en San Isidro - 15 comercios objetivo',
      time: 'Hace 1 día',
      icon: Calendar
    }
  ];

  const quickActions = [
    {
      title: 'Explorar Mapa de Oportunidades',
      description: 'Identifica zonas con alta densidad comercial',
      icon: MapPin,
      path: '/mapa-oportunidades',
      color: '#3b82f6'
    },
    {
      title: 'Generar Oferta Personalizada',
      description: 'Crea ofertas basadas en datos de benchmarking',
      icon: Target,
      path: '/generador-ofertas',
      color: '#10b981'
    },
    {
      title: 'Revisar Alertas',
      description: 'Monitorea el estado de tus clientes',
      icon: AlertTriangle,
      path: '/panel-monitoreo',
      color: '#ef4444'
    },
    {
      title: 'Generar Reporte',
      description: 'Crea reportes de inteligencia de negocio',
      icon: TrendingUp,
      path: '/reportes-inteligencia',
      color: '#f59e0b'
    }
  ];

  const chartData = [
    { name: 'Lun', ventas: 1200, oportunidades: 8 },
    { name: 'Mar', ventas: 1800, oportunidades: 12 },
    { name: 'Mié', ventas: 1400, oportunidades: 6 },
    { name: 'Jue', ventas: 2200, oportunidades: 15 },
    { name: 'Vie', ventas: 1900, oportunidades: 10 },
    { name: 'Sáb', ventas: 1600, oportunidades: 7 },
    { name: 'Dom', ventas: 1100, oportunidades: 4 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'opportunity':
        return '🔍';
      case 'alert':
        return '⚠️';
      case 'success':
        return '✅';
      case 'event':
        return '📅';
      default:
        return '📋';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'opportunity':
        return 'var(--primary-color)';
      case 'alert':
        return 'var(--warning-color)';
      case 'success':
        return 'var(--success-color)';
      case 'event':
        return 'var(--accent-color)';
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Bienvenido de vuelta, Carlos. Aquí tienes un resumen de tu actividad.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <Icon size={24} color={stat.color} />
                <span className={`stat-change ${stat.changeType}`}>
                  {stat.change}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.title}</div>
            </div>
          );
        })}
      </div>

      <div className="content-grid">
        {/* Chart Section */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Rendimiento Semanal</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="ventas" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Ventas (S/)"
                />
                <Line 
                  type="monotone" 
                  dataKey="oportunidades" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Oportunidades"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Acciones Rápidas</h3>
          </div>
          <div className="quick-actions">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.path} className="quick-action-item">
                  <div className="quick-action-icon" style={{ backgroundColor: action.color }}>
                    <Icon size={20} color="white" />
                  </div>
                  <div className="quick-action-content">
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>
                  <ArrowRight size={16} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Actividad Reciente</h3>
          <Link to="/panel-monitoreo" className="btn btn-secondary">
            Ver todas
          </Link>
        </div>
        <div className="activities-list">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="activity-item">
                <div 
                  className="activity-icon"
                  style={{ backgroundColor: getActivityColor(activity.type) }}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
