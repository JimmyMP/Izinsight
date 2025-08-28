import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './styles';

const { width } = Dimensions.get('window');

type Client = {
  id: number;
  name: string;
  category: 'Retail' | 'Calzado' | 'Gastronomía' | 'Salud';
  location: string;
  currentRevenue: number;
  avgTicket: number;
  customerCount: number;
  growthRate: number; // %
  status: 'growing' | 'declining' | 'stable';
  image: string;
};

type Benchmark = {
  avgRevenue: number;
  avgTicket: number;
  avgCustomers: number;
  avgGrowth: number;
  topPerformers: { name: string; growth: number }[];
};

type Report = {
  client: Client;
  benchmark: Benchmark;
  generatedAt: Date;
  insights: string[];
  recommendations: string[];
  performance: {
    revenue: { current: number; benchmark: number; difference: number };
    ticket: { current: number; benchmark: number; difference: number };
    customers: { current: number; benchmark: number; difference: number };
    growth: { current: number; benchmark: number; difference: number };
  };
};

export default function Reportes() {
  const clients: Client[] = useMemo(() => ([
    { id: 1, name: 'Librería El Saber', category: 'Retail', location: 'Miraflores', currentRevenue: 25000, avgTicket: 45, customerCount: 180, growthRate: 12, status: 'growing', image: '📚' },
    { id: 2, name: 'Zapatería Paso Firme', category: 'Calzado', location: 'Surco', currentRevenue: 18000, avgTicket: 120, customerCount: 80, growthRate: -8, status: 'declining', image: '👟' },
    { id: 3, name: 'Restaurante La Mar', category: 'Gastronomía', location: 'San Isidro', currentRevenue: 35000, avgTicket: 85, customerCount: 220, growthRate: 25, status: 'growing', image: '🍽️' },
    { id: 4, name: 'Farmacia Salud Total', category: 'Salud', location: 'Barranco', currentRevenue: 28000, avgTicket: 35, customerCount: 300, growthRate: 18, status: 'growing', image: '💊' },
  ]), []);

  const benchmarkingData: Record<string, Benchmark> = useMemo(() => ({
    Retail: { avgRevenue: 22000, avgTicket: 42, avgCustomers: 150, avgGrowth: 8, topPerformers: [ { name: 'Tienda Deportiva Nike', growth: 35 }, { name: 'Boutique Fashion', growth: 28 }, { name: 'Electrónica Digital', growth: 22 } ] },
    Calzado: { avgRevenue: 20000, avgTicket: 110, avgCustomers: 90, avgGrowth: 5, topPerformers: [ { name: 'Zapatería Premium', growth: 20 }, { name: 'Calzado Express', growth: 15 }, { name: 'Shoes & More', growth: 12 } ] },
    Gastronomía: { avgRevenue: 32000, avgTicket: 78, avgCustomers: 200, avgGrowth: 15, topPerformers: [ { name: 'Restaurante Gourmet', growth: 40 }, { name: 'Café Central', growth: 32 }, { name: 'Pizzería Bella', growth: 25 } ] },
    Salud: { avgRevenue: 25000, avgTicket: 38, avgCustomers: 250, avgGrowth: 12, topPerformers: [ { name: 'Farmacia InkaFarma', growth: 30 }, { name: 'Botica Popular', growth: 25 }, { name: 'Farmacia Express', growth: 18 } ] },
  }), []);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedReport, setSelectedReport] = useState<'performance' | 'growth' | 'benchmarking' | 'recommendations'>('performance');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  // Filtros compactos (como oportunidades)
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | Client['category']>('all');
  const [status, setStatus] = useState<'all' | Client['status']>('all');

  const getBenchmark = (client: Client): Benchmark => benchmarkingData[client.category] ?? {
    avgRevenue: 25000,
    avgTicket: 50,
    avgCustomers: 150,
    avgGrowth: 10,
    topPerformers: [],
  };

  const generateReport = (client: Client, reportType: typeof selectedReport): Report => {
    const benchmark = getBenchmark(client);
    return {
      client,
      benchmark,
      generatedAt: new Date(),
      insights: generateInsights(client, benchmark),
      recommendations: generateRecommendations(client, benchmark),
      performance: {
        revenue: { current: client.currentRevenue, benchmark: benchmark.avgRevenue, difference: ((client.currentRevenue - benchmark.avgRevenue) / benchmark.avgRevenue) * 100 },
        ticket: { current: client.avgTicket, benchmark: benchmark.avgTicket, difference: ((client.avgTicket - benchmark.avgTicket) / benchmark.avgTicket) * 100 },
        customers: { current: client.customerCount, benchmark: benchmark.avgCustomers, difference: ((client.customerCount - benchmark.avgCustomers) / benchmark.avgCustomers) * 100 },
        growth: { current: client.growthRate, benchmark: benchmark.avgGrowth, difference: client.growthRate - benchmark.avgGrowth },
      },
    };
  };

  const generateInsights = (client: Client, benchmark: Benchmark): string[] => {
    const list: string[] = [];
    if (client.currentRevenue > benchmark.avgRevenue) list.push(`Ingresos +${Math.round(((client.currentRevenue - benchmark.avgRevenue)/benchmark.avgRevenue)*100)}% vs sector.`);
    else list.push(`Ingresos -${Math.round(((benchmark.avgRevenue - client.currentRevenue)/benchmark.avgRevenue)*100)}% vs sector.`);
    if (client.avgTicket > benchmark.avgTicket) list.push(`Ticket promedio +${Math.round(((client.avgTicket - benchmark.avgTicket)/benchmark.avgTicket)*100)}% vs sector.`);
    else list.push(`Ticket promedio -${Math.round(((benchmark.avgTicket - client.avgTicket)/benchmark.avgTicket)*100)}% vs sector.`);
    if (client.growthRate > benchmark.avgGrowth) list.push(`Crecimiento +${client.growthRate - benchmark.avgGrowth} pp vs sector.`);
    else list.push(`Crecimiento -${benchmark.avgGrowth - client.growthRate} pp vs sector.`);
    return list;
  };

  const generateRecommendations = (client: Client, benchmark: Benchmark): string[] => {
    const recs: string[] = [];
    const revenueBelow = client.currentRevenue < benchmark.avgRevenue;
    const ticketBelow = client.avgTicket < benchmark.avgTicket;
    const customersBelow = client.customerCount < benchmark.avgCustomers;
    const growthBelow = client.growthRate < benchmark.avgGrowth;

    if (revenueBelow) recs.push('Optimiza el mix: campañas en horas pico y combos para elevar ingresos.');
    if (ticketBelow) recs.push('Implementa upselling/cross‑selling y precios por paquetes para subir el ticket.');
    if (customersBelow) recs.push('Activa referidos, pauta geolocalizada y presencia en redes para atraer más visitas.');
    if (growthBelow) recs.push('Enfócate en adquisición y retención con promociones de primera compra y cashback.');

    if (recs.length === 0) recs.push('Mantén la estrategia actual y prueba pilotos de bundles y fidelización.');
    return recs;
  };

  const selectedClientData = selectedClient ? generateReport(selectedClient, selectedReport) : null;

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      if (search && !(`${c.name} ${c.location}`.toLowerCase().includes(search.toLowerCase()))) return false;
      if (category !== 'all' && c.category !== category) return false;
      if (status !== 'all' && c.status !== status) return false;
      return true;
    });
  }, [clients, search, category, status]);

  const renderClientRow = (c: Client) => (
    <TouchableOpacity key={c.id} style={[styles.clientItem, selectedClient?.id === c.id && styles.clientItemSelected]} onPress={() => setSelectedClient(c)}>
      <View style={styles.clientEmoji}><Text style={{ fontSize: 18 }}>{c.image}</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.clientName}>{c.name}</Text>
        <Text style={styles.clientMeta}>{c.category} • {c.location}</Text>
      </View>
      <View style={[styles.statusPill, c.status==='growing'?{ backgroundColor: colors.success } : c.status==='declining'? { backgroundColor: colors.primary } : { backgroundColor: colors.warning } ]}>
        <Text style={styles.statusText}>{c.growthRate>0?'+':''}{c.growthRate}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Filtros compactos */}
      <View style={styles.card}>
        <View style={{ flexDirection:'row', alignItems:'center' }}>
          <View style={[styles.inputWrap, { flex:1 } ]}>
            <Ionicons name="search" size={16} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Buscar cliente o ubicación..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={{ marginLeft: 12 }}>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>{showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}</Text>
          </TouchableOpacity>
        </View>
        {showFilters && (
          <View style={styles.filtersRow}> 
            <View style={styles.filterField}>
              <Text style={styles.filterLabel}>Categoría</Text>
              <View style={styles.chipsRow}>
                {(['all','Retail','Calzado','Gastronomía','Salud'] as const).map((opt)=> (
                  <TouchableOpacity key={opt} style={[styles.chip, category===opt && styles.chipActive]} onPress={()=>setCategory(opt as any)}>
                    <Text style={[styles.chipText, category===opt && styles.chipTextActive]}>{opt==='all'?'Todas':opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.filterField}>
              <Text style={styles.filterLabel}>Estado</Text>
              <View style={styles.chipsRow}>
                {(['all','growing','declining','stable'] as const).map((opt)=> (
                  <TouchableOpacity key={opt} style={[styles.chip, status===opt && styles.chipActive]} onPress={()=>setStatus(opt as any)}>
                    <Text style={[styles.chipText, status===opt && styles.chipTextActive]}>
                      {opt==='all'?'Todos': opt==='growing'?'En crecimiento': opt==='declining'?'En caída':'Estable'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Selección de cliente */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seleccionar Cliente</Text>
        <View style={{ height: 8 }} />
        {filteredClients.map(renderClientRow)}
      </View>

      {/* Reporte generado */}
      {selectedClientData && (
        <View style={styles.card}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <Text style={styles.cardTitle}>Reporte de {selectedClientData.client.name}</Text>
          </View>

          {/* Métricas */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricBox}>
              <View style={styles.metricHeader}><Ionicons name="cash" size={16} color={colors.accent} /><Text style={styles.metricLabelSm}>Ingresos</Text></View>
              <Text style={styles.metricValue}>S/ {selectedClientData.performance.revenue.current.toLocaleString()}</Text>
              <Text style={[styles.metricDelta, selectedClientData.performance.revenue.difference>=0? styles.deltaUp : styles.deltaDown]}>{selectedClientData.performance.revenue.difference>0?'+':''}{Math.round(selectedClientData.performance.revenue.difference)}% vs sector</Text>
            </View>
            <View style={styles.metricBox}>
              <View style={styles.metricHeader}><Ionicons name="pricetag" size={16} color={colors.warning} /><Text style={styles.metricLabelSm}>Ticket</Text></View>
              <Text style={styles.metricValue}>S/ {selectedClientData.performance.ticket.current}</Text>
              <Text style={[styles.metricDelta, selectedClientData.performance.ticket.difference>=0? styles.deltaUp : styles.deltaDown]}>{selectedClientData.performance.ticket.difference>0?'+':''}{Math.round(selectedClientData.performance.ticket.difference)}% vs sector</Text>
            </View>
            <View style={styles.metricBox}>
              <View style={styles.metricHeader}><Ionicons name="people" size={16} color={colors.success} /><Text style={styles.metricLabelSm}>Clientes</Text></View>
              <Text style={styles.metricValue}>{selectedClientData.performance.customers.current}</Text>
              <Text style={[styles.metricDelta, selectedClientData.performance.customers.difference>=0? styles.deltaUp : styles.deltaDown]}>{selectedClientData.performance.customers.difference>0?'+':''}{Math.round(selectedClientData.performance.customers.difference)}% vs sector</Text>
            </View>
            <View style={styles.metricBox}>
              <View style={styles.metricHeader}><Ionicons name="trending-up" size={16} color={colors.primary} /><Text style={styles.metricLabelSm}>Crecimiento</Text></View>
              <Text style={styles.metricValue}>{selectedClientData.performance.growth.current}%</Text>
              <Text style={[styles.metricDelta, selectedClientData.performance.growth.difference>=0? styles.deltaUp : styles.deltaDown]}>{selectedClientData.performance.growth.difference>0?'+':''}{Math.round(selectedClientData.performance.growth.difference)} pp vs sector</Text>
            </View>
          </View>

          {/* Insights */}
          <Text style={styles.sectionSubtitle}>Insights</Text>
          {selectedClientData.insights.map((ins, i)=>(
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{ins}</Text>
            </View>
          ))}

          {/* Referencias del sector (anónimo) */}
          {selectedClientData.benchmark.topPerformers.length>0 && (
            <>
              <Text style={[styles.sectionSubtitle,{ marginTop: 8 }]}>Referencias del sector (anónimo)</Text>
              {selectedClientData.benchmark.topPerformers.map((tp, idx)=>{
                const labels = ['Top 10% del sector', 'Top 25% del sector', 'Media del sector'];
                const label = labels[idx] ?? 'Referencia del sector';
                return (
                <View key={idx} style={styles.performerRow}>
                  <View style={styles.performerBadge}><Text style={styles.performerBadgeText}>{idx+1}</Text></View>
                  <Text style={styles.performerName}>{label}</Text>
                  <Text style={styles.performerGrowth}>+{tp.growth}%</Text>
                </View>
              );})}
            </>
          )}
          {/* Recomendaciones */}
          <Text style={[styles.sectionSubtitle,{ marginTop: 8 }]}>Recomendaciones</Text>
          {selectedClientData.recommendations.map((rec, i)=>(
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{rec}</Text>
            </View>
          ))}
          <Text style={[styles.metaText,{marginTop: 10}]}>Generado: {selectedClientData.generatedAt.toLocaleDateString()}</Text>
        </View>
      )}
      {/* Generador */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Generar Reporte</Text>
        {selectedClient ? (
          <>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Tipo de Reporte</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
                {(['performance','growth','benchmarking','recommendations'] as const).map((opt) => (
                  <TouchableOpacity key={opt} style={[styles.chipLg, selectedReport===opt && styles.chipLgActive]} onPress={()=>setSelectedReport(opt)}>
                    <Text style={[styles.chipLgText, selectedReport===opt && styles.chipLgTextActive]}>
                      {opt==='performance'?'Rendimiento': opt==='growth'?'Crecimiento': opt==='benchmarking'?'Benchmarking':'Recomendaciones'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Período</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {(['week','month','quarter','year'] as const).map((opt) => (
                  <TouchableOpacity key={opt} style={[styles.chip, dateRange===opt && styles.chipActive]} onPress={()=>setDateRange(opt)}>
                    <Text style={[styles.chipText, dateRange===opt && styles.chipTextActive]}>
                      {opt==='week'?'Semana': opt==='month'?'Mes': opt==='quarter'?'Trimestre':'Año'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.actionsBar}>
              <TouchableOpacity style={styles.primaryBtn} onPress={()=>console.log('Descargar reporte') }>
                <Ionicons name="download" size={16} color={colors.light} />
                <Text style={styles.primaryBtnText}>Descargar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={()=>console.log('Compartir reporte')}>
                <Ionicons name="share-social" size={16} color={colors.textSecondary} />
                <Text style={styles.secondaryBtnText}>Compartir</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.helperText}>Selecciona un cliente para generar un reporte</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 16 },
  title: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },

  card: { backgroundColor: colors.cardBackground, marginHorizontal: 16, marginTop: 12,marginBottom: 12, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 10 },

  clientItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  clientItemSelected: { backgroundColor: colors.background, borderRadius: 8, paddingHorizontal: 8 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderWidth:1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, height: 40 },
  input: { flex: 1, color: colors.textPrimary, fontSize: 14, marginLeft: 8 },
  clientEmoji: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  clientName: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  clientMeta: { fontSize: 12, color: colors.textSecondary },
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  statusText: { color: colors.light, fontSize: 11, fontWeight: '700' },
  filtersRow: {},
  filterField: { marginTop: 10 },
  filterLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 6 },

  optionRow: { marginBottom: 8 },
  optionLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 6 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  actionsBar: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 8, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipLg: { paddingHorizontal: 12, paddingVertical: 10, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 20, marginRight: 8 },
  chipLgActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipLgText: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
  chipLgTextActive: { color: colors.light, fontSize: 13, fontWeight: '800' },
  chipText: { color: colors.textSecondary, fontSize: 12 },
  chipTextActive: { color: colors.light, fontWeight: '700' },

  primaryBtn: { flexDirection:'row', alignItems:'center', backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  primaryBtnText: { color: colors.light, fontWeight: '700', marginLeft: 6 },
  secondaryBtn: { flexDirection:'row', alignItems:'center', backgroundColor: colors.background, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  secondaryBtnText: { color: colors.textSecondary, fontWeight: '700', marginLeft: 6 },
  helperText: { color: colors.textSecondary },
  metaText: { color: colors.textSecondary, fontSize: 12 },

  metricsGrid: { flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', alignContent: 'flex-start', marginTop: 6 },
  metricBox: { width: '48%', backgroundColor: colors.background, borderRadius: 10, padding: 10, borderWidth: 1, borderColor: colors.border, marginBottom: 10 },
  metricHeader: { flexDirection:'row', alignItems:'center', gap: 6 },
  metricLabelSm: { color: colors.textSecondary, fontSize: 12 },
  metricValue: { color: colors.textPrimary, fontWeight:'800', fontSize: 16, marginTop: 4 },
  metricDelta: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  deltaUp: { color: colors.success },
  deltaDown: { color: colors.primary },

  sectionSubtitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary, marginTop: 4 },
  bulletRow: { flexDirection:'row', alignItems:'flex-start', marginTop: 4 },
  bullet: { color: colors.textSecondary, marginRight: 6 },
  bulletText: { color: colors.textPrimary, flex: 1, flexWrap: 'wrap' },

  performerRow: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor: colors.background, borderRadius: 10, padding: 10, borderWidth: 1, borderColor: colors.border, marginTop: 6 },
  performerBadge: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, alignItems:'center', justifyContent:'center' },
  performerBadgeText: { color: colors.light, fontWeight:'800', fontSize: 12 },
  performerName: { color: colors.textPrimary, fontWeight:'700', flex: 1, marginLeft: 8 },
  performerGrowth: { color: colors.success, fontWeight:'700' },
});
  