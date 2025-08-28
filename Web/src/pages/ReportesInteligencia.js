import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Share2,
  Filter,
  Eye,
  EyeOff,
  Target,
  Award,
  Clock,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const ReportesInteligencia = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedReport, setSelectedReport] = useState('performance');
  const [dateRange, setDateRange] = useState('month');
  const [showBenchmarks, setShowBenchmarks] = useState(true);

  // Datos simulados de clientes
  const clients = [
    {
      id: 1,
      name: 'Librería El Saber',
      category: 'Retail',
      location: 'Miraflores',
      joinDate: '2023-03-15',
      currentRevenue: 25000,
      avgTicket: 45,
      customerCount: 180,
      growthRate: 12,
      status: 'growing',
      image: '📚'
    },
    {
      id: 2,
      name: 'Zapatería Paso Firme',
      category: 'Calzado',
      location: 'Surco',
      joinDate: '2023-01-20',
      currentRevenue: 18000,
      avgTicket: 120,
      customerCount: 80,
      growthRate: -8,
      status: 'declining',
      image: '👟'
    },
    {
      id: 3,
      name: 'Restaurante La Mar',
      category: 'Gastronomía',
      location: 'San Isidro',
      joinDate: '2023-05-10',
      currentRevenue: 35000,
      avgTicket: 85,
      customerCount: 220,
      growthRate: 25,
      status: 'growing',
      image: '🍽️'
    },
    {
      id: 4,
      name: 'Farmacia Salud Total',
      category: 'Salud',
      location: 'Barranco',
      joinDate: '2023-02-08',
      currentRevenue: 28000,
      avgTicket: 35,
      customerCount: 300,
      growthRate: 18,
      status: 'growing',
      image: '💊'
    }
  ];

  // Datos de benchmarking por categoría
  const benchmarkingData = {
    retail: {
      avgRevenue: 22000,
      avgTicket: 42,
      avgCustomers: 150,
      avgGrowth: 8,
      topPerformers: [
        { name: 'Tienda Deportiva Nike', growth: 35 },
        { name: 'Boutique Fashion', growth: 28 },
        { name: 'Electrónica Digital', growth: 22 }
      ]
    },
    calzado: {
      avgRevenue: 20000,
      avgTicket: 110,
      avgCustomers: 90,
      avgGrowth: 5,
      topPerformers: [
        { name: 'Zapatería Premium', growth: 20 },
        { name: 'Calzado Express', growth: 15 },
        { name: 'Shoes & More', growth: 12 }
      ]
    },
    gastronomia: {
      avgRevenue: 32000,
      avgTicket: 78,
      avgCustomers: 200,
      avgGrowth: 15,
      topPerformers: [
        { name: 'Restaurante Gourmet', growth: 40 },
        { name: 'Café Central', growth: 32 },
        { name: 'Pizzería Bella', growth: 25 }
      ]
    },
    salud: {
      avgRevenue: 25000,
      avgTicket: 38,
      avgCustomers: 250,
      avgGrowth: 12,
      topPerformers: [
        { name: 'Farmacia InkaFarma', growth: 30 },
        { name: 'Botica Popular', growth: 25 },
        { name: 'Farmacia Express', growth: 18 }
      ]
    }
  };

  // Datos de transacciones por día de la semana
  const weeklyData = [
    { day: 'Lunes', transactions: 45, revenue: 3200, avgTicket: 71 },
    { day: 'Martes', transactions: 38, revenue: 2800, avgTicket: 74 },
    { day: 'Miércoles', transactions: 52, revenue: 4100, avgTicket: 79 },
    { day: 'Jueves', transactions: 61, revenue: 4800, avgTicket: 79 },
    { day: 'Viernes', transactions: 78, revenue: 6200, avgTicket: 79 },
    { day: 'Sábado', transactions: 85, revenue: 6800, avgTicket: 80 },
    { day: 'Domingo', transactions: 42, revenue: 3400, avgTicket: 81 }
  ];

  // Datos de productos más vendidos
  const topProducts = [
    { name: 'Producto A', sales: 45, revenue: 2250, percentage: 25 },
    { name: 'Producto B', sales: 38, revenue: 1900, percentage: 21 },
    { name: 'Producto C', sales: 32, revenue: 1600, percentage: 18 },
    { name: 'Producto D', sales: 28, revenue: 1400, percentage: 16 },
    { name: 'Producto E', sales: 22, revenue: 1100, percentage: 12 }
  ];

  // Datos de métodos de pago
  const paymentMethods = [
    { name: 'Tarjeta de Crédito', value: 45, color: '#3b82f6' },
    { name: 'Tarjeta de Débito', value: 30, color: '#10b981' },
    { name: 'Efectivo', value: 15, color: '#f59e0b' },
    { name: 'Transferencia', value: 10, color: '#ef4444' }
  ];

  const generateReport = (client, reportType) => {
    const benchmark = benchmarkingData[client.category];
    
    // Si no hay datos de benchmarking para esta categoría, usar valores por defecto
    if (!benchmark) {
      const defaultBenchmark = {
        avgRevenue: 25000,
        avgTicket: 50,
        avgCustomers: 150,
        avgGrowth: 10,
        topPerformers: []
      };
      
      return {
        client: client,
        benchmark: defaultBenchmark,
        generatedAt: new Date(),
        insights: ['No hay datos de benchmarking disponibles para esta categoría.'],
        recommendations: ['Considerar expandir el análisis con datos del sector.'],
        performance: {
          revenue: {
            current: client.currentRevenue,
            benchmark: defaultBenchmark.avgRevenue,
            difference: 0
          },
          ticket: {
            current: client.avgTicket,
            benchmark: defaultBenchmark.avgTicket,
            difference: 0
          },
          customers: {
            current: client.customerCount,
            benchmark: defaultBenchmark.avgCustomers,
            difference: 0
          },
          growth: {
            current: client.growthRate,
            benchmark: defaultBenchmark.avgGrowth,
            difference: 0
          }
        }
      };
    }
    
    const report = {
      client: client,
      benchmark: benchmark,
      generatedAt: new Date(),
      insights: generateInsights(client, benchmark),
      recommendations: generateRecommendations(client, benchmark),
      performance: {
        revenue: {
          current: client.currentRevenue,
          benchmark: benchmark.avgRevenue,
          difference: ((client.currentRevenue - benchmark.avgRevenue) / benchmark.avgRevenue) * 100
        },
        ticket: {
          current: client.avgTicket,
          benchmark: benchmark.avgTicket,
          difference: ((client.avgTicket - benchmark.avgTicket) / benchmark.avgTicket) * 100
        },
        customers: {
          current: client.customerCount,
          benchmark: benchmark.avgCustomers,
          difference: ((client.customerCount - benchmark.avgCustomers) / benchmark.avgCustomers) * 100
        },
        growth: {
          current: client.growthRate,
          benchmark: benchmark.avgGrowth,
          difference: client.growthRate - benchmark.avgGrowth
        }
      }
    };

    return report;
  };

  const generateInsights = (client, benchmark) => {
    const insights = [];
    
    if (!benchmark || !benchmark.avgRevenue || !benchmark.avgTicket || !benchmark.avgGrowth) {
      insights.push('No hay datos de benchmarking disponibles para generar insights comparativos.');
      return insights;
    }
    
    if (client.currentRevenue > benchmark.avgRevenue) {
      insights.push(`Tu negocio genera ${Math.round(((client.currentRevenue - benchmark.avgRevenue) / benchmark.avgRevenue) * 100)}% más ingresos que el promedio del sector.`);
    } else {
      insights.push(`Tu negocio genera ${Math.round(((benchmark.avgRevenue - client.currentRevenue) / benchmark.avgRevenue) * 100)}% menos ingresos que el promedio del sector.`);
    }

    if (client.avgTicket > benchmark.avgTicket) {
      insights.push(`Tu ticket promedio es ${Math.round(((client.avgTicket - benchmark.avgTicket) / benchmark.avgTicket) * 100)}% mayor que el promedio del sector.`);
    } else {
      insights.push(`Tu ticket promedio es ${Math.round(((benchmark.avgTicket - client.avgTicket) / benchmark.avgTicket) * 100)}% menor que el promedio del sector.`);
    }

    if (client.growthRate > benchmark.avgGrowth) {
      insights.push(`Tu crecimiento es ${client.growthRate - benchmark.avgGrowth} puntos porcentuales superior al promedio del sector.`);
    } else {
      insights.push(`Tu crecimiento es ${benchmark.avgGrowth - client.growthRate} puntos porcentuales inferior al promedio del sector.`);
    }

    return insights;
  };

  const generateRecommendations = (client, benchmark) => {
    const recommendations = [];
    
    if (!benchmark || !benchmark.avgGrowth || !benchmark.avgTicket || !benchmark.avgCustomers) {
      recommendations.push('Implementar estrategias generales de crecimiento basadas en mejores prácticas del sector.');
      recommendations.push('Considerar realizar un análisis más profundo de la competencia local.');
      return recommendations;
    }
    
    if (client.growthRate < benchmark.avgGrowth) {
      recommendations.push('Implementar estrategias de marketing digital para aumentar la visibilidad del negocio.');
      recommendations.push('Considerar ofertas especiales en días de baja afluencia (martes y miércoles).');
    }

    if (client.avgTicket < benchmark.avgTicket) {
      recommendations.push('Desarrollar estrategias de upselling para aumentar el ticket promedio.');
      recommendations.push('Implementar programas de fidelización para clientes recurrentes.');
    }

    if (client.customerCount < benchmark.avgCustomers) {
      recommendations.push('Expandir la presencia en redes sociales para atraer nuevos clientes.');
      recommendations.push('Implementar un programa de referidos para aumentar la base de clientes.');
    }

    return recommendations;
  };

  const downloadReport = (client, reportType) => {
    const report = generateReport(client, reportType);
    
    const reportData = {
      cliente: client.name,
      categoria: client.category,
      fecha_generacion: report.generatedAt.toISOString(),
      metricas: report.performance,
      insights: report.insights,
      recomendaciones: report.recommendations
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_${client.name.replace(/\s+/g, '_')}_${reportType}.json`;
    a.click();
  };

  const shareReport = (client, reportType) => {
    // Aquí podrías implementar la funcionalidad de compartir
    console.log('Compartiendo reporte:', client.name, reportType);
  };

  const selectedClientData = selectedClient ? generateReport(selectedClient, selectedReport) : null;

  return (
    <div className="reportes-inteligencia">
      <div className="page-header">
        <h1 className="page-title">🚀 Reportes de Inteligencia de Negocio</h1>
        <p className="page-subtitle">
          Convierte datos en insights accionables y conviértete en un asesor estratégico
        </p>
      </div>

      <div className="content-grid">
        {/* Lista de Clientes */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Seleccionar Cliente</h3>
            <div className="header-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowBenchmarks(!showBenchmarks)}
              >
                {showBenchmarks ? <EyeOff size={16} /> : <Eye size={16} />}
                {showBenchmarks ? 'Ocultar' : 'Mostrar'} Benchmarks
              </button>
            </div>
          </div>
          
          <div className="clients-list">
            {clients.map((client) => {
              const benchmark = benchmarkingData[client.category];
              return (
                <div 
                  key={client.id}
                  className={`client-item ${selectedClient?.id === client.id ? 'selected' : ''}`}
                  onClick={() => setSelectedClient(client)}
                  style={selectedClient?.id === client.id ? { backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' } : undefined}
                >
                  <div className="client-header">
                    <div className="client-icon">{client.image}</div>
                    <div className="client-info">
                      <h4>{client.name}</h4>
                      <p>{client.category} • {client.location}</p>
                    </div>
                    <div className={`client-status ${client.status}`}>
                      {client.status === 'growing' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {client.growthRate > 0 ? '+' : ''}{client.growthRate}%
                    </div>
                  </div>
                  
                  <div className="client-metrics">
                    <div className="metric">
                      <span>S/ {client.currentRevenue.toLocaleString()}</span>
                      <small>Ventas mensuales</small>
                    </div>
                    <div className="metric">
                      <span>S/ {client.avgTicket}</span>
                      <small>Ticket promedio</small>
                    </div>
                    <div className="metric">
                      <span>{client.customerCount}</span>
                      <small>Clientes</small>
                    </div>
                  </div>

                  {showBenchmarks && benchmark && (
                    <div className="benchmark-comparison">
                      <div className="benchmark-item">
                        <span>vs Promedio Sector:</span>
                        <div className="benchmark-values">
                          <span className={client.currentRevenue > benchmark.avgRevenue ? 'positive' : 'negative'}>
                            {client.currentRevenue > benchmark.avgRevenue ? '↑' : '↓'} {Math.abs(Math.round(((client.currentRevenue - benchmark.avgRevenue) / benchmark.avgRevenue) * 100))}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Generador de Reportes */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Generar Reporte</h3>
          </div>
          
          {selectedClient ? (
            <div className="report-generator">
              <div className="selected-client">
                <h4>{selectedClient.name}</h4>
                <p>{selectedClient.category} • {selectedClient.location}</p>
                
                <div className="report-options">
                  <div className="option-group">
                    <label>Tipo de Reporte</label>
                    <select 
                      value={selectedReport} 
                      onChange={(e) => setSelectedReport(e.target.value)}
                    >
                      <option value="performance">Rendimiento General</option>
                      <option value="growth">Análisis de Crecimiento</option>
                      <option value="benchmarking">Comparación Sectorial</option>
                      <option value="recommendations">Recomendaciones Estratégicas</option>
                    </select>
                  </div>
                  
                  <div className="option-group">
                    <label>Período</label>
                    <select 
                      value={dateRange} 
                      onChange={(e) => setDateRange(e.target.value)}
                    >
                      <option value="week">Última Semana</option>
                      <option value="month">Último Mes</option>
                      <option value="quarter">Último Trimestre</option>
                      <option value="year">Último Año</option>
                    </select>
                  </div>
                </div>

                <div className="report-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => downloadReport(selectedClient, selectedReport)}
                  >
                    <Download size={16} />
                    Descargar Reporte
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => shareReport(selectedClient, selectedReport)}
                  >
                    <Share2 size={16} />
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <BarChart3 size={48} />
              <p>Selecciona un cliente para generar un reporte de inteligencia</p>
            </div>
          )}
        </div>
      </div>

      {/* Reporte Generado */}
      {selectedClientData && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              Reporte de {selectedClientData.client.name} - {selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)}
            </h3>
            <div className="report-meta">
              <span>Generado: {selectedClientData.generatedAt.toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="generated-report">
            {/* Métricas de Rendimiento */}
            <div className="performance-metrics">
              <h4>Métricas de Rendimiento</h4>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-header">
                    <DollarSign size={20} />
                    <span>Ingresos Mensuales</span>
                  </div>
                  <div className="metric-value">
                    S/ {selectedClientData.performance.revenue.current.toLocaleString()}
                  </div>
                  <div className={`metric-comparison ${selectedClientData.performance.revenue.difference > 0 ? 'positive' : 'negative'}`}>
                    {selectedClientData.performance.revenue.difference > 0 ? '↑' : '↓'} {Math.abs(Math.round(selectedClientData.performance.revenue.difference))}% vs sector
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-header">
                    <Target size={20} />
                    <span>Ticket Promedio</span>
                  </div>
                  <div className="metric-value">
                    S/ {selectedClientData.performance.ticket.current}
                  </div>
                  <div className={`metric-comparison ${selectedClientData.performance.ticket.difference > 0 ? 'positive' : 'negative'}`}>
                    {selectedClientData.performance.ticket.difference > 0 ? '↑' : '↓'} {Math.abs(Math.round(selectedClientData.performance.ticket.difference))}% vs sector
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-header">
                    <Users size={20} />
                    <span>Base de Clientes</span>
                  </div>
                  <div className="metric-value">
                    {selectedClientData.performance.customers.current}
                  </div>
                  <div className={`metric-comparison ${selectedClientData.performance.customers.difference > 0 ? 'positive' : 'negative'}`}>
                    {selectedClientData.performance.customers.difference > 0 ? '↑' : '↓'} {Math.abs(Math.round(selectedClientData.performance.customers.difference))}% vs sector
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-header">
                    <TrendingUp size={20} />
                    <span>Tasa de Crecimiento</span>
                  </div>
                  <div className="metric-value">
                    {selectedClientData.performance.growth.current}%
                  </div>
                  <div className={`metric-comparison ${selectedClientData.performance.growth.difference > 0 ? 'positive' : 'negative'}`}>
                    {selectedClientData.performance.growth.difference > 0 ? '↑' : '↓'} {Math.abs(selectedClientData.performance.growth.difference)} pp vs sector
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="insights-section">
              <h4>Insights Clave</h4>
              <div className="insights-list">
                {selectedClientData.insights.map((insight, index) => (
                  <div key={index} className="insight-item">
                    <div className="insight-icon">💡</div>
                    <p>{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="recommendations-section">
              <h4>Recomendaciones Estratégicas</h4>
              <div className="recommendations-list">
                {selectedClientData.recommendations.map((recommendation, index) => (
                  <div key={index} className="recommendation-item">
                    <div className="recommendation-icon">🎯</div>
                    <p>{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers del Sector */}
            <div className="top-performers">
              <h4>Top Performers del Sector</h4>
              <div className="performers-list">
                {selectedClientData.benchmark.topPerformers.map((performer, index) => (
                  <div key={index} className="performer-item">
                    <div className="performer-rank">{index + 1}</div>
                    <div className="performer-info">
                      <h5>{performer.name}</h5>
                      <span className="performer-growth">+{performer.growth}% crecimiento</span>
                    </div>
                    <div className="performer-award">
                      <Award size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gráficos Adicionales */}
      {selectedClient && (
        <div className="content-grid">
          {/* Gráfico de Transacciones por Día */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Transacciones por Día de la Semana</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="transactions" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Métodos de Pago */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Distribución de Métodos de Pago</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportesInteligencia;
