import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { BarChart } from 'react-native-chart-kit';
import { colors } from './styles';

const { width } = Dimensions.get('window');

type AlertItem = {
  id: number;
  type: 'system' | 'customer_service' | 'sales_drop' | 'opportunity';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  client: string;
  timestamp: number;
  status: 'active' | 'resolved';
  action: 'send_whatsapp' | 'contact_client' | 'schedule_visit' | 'view_details' | 'none';
  actionText: string;
  impact: 'high' | 'medium' | 'low';
  color: string;
  dropPercentage?: number;
  benchmark?: string;
};

export default function Monitoreo() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const [filters, setFilters] = useState<{ priority: 'all' | AlertItem['priority']; type: 'all' | AlertItem['type']; status: 'all' | AlertItem['status'] }>({ priority: 'all', type: 'all', status: 'all' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');

  const metricsData = useMemo(() => ({
    totalClients: 247,
    activeAlerts: 4,
    resolvedToday: 12,
    avgResponseTime: '15 min',
  }), []);

  useEffect(() => {
    const now = Date.now();
    const mock: AlertItem[] = [
      { id: 1, type: 'system', priority: 'critical', title: 'Alerta de Incidencia Sistémica', description: 'Caída masiva en la red. Tus clientes podrían tener problemas para cobrar.', client: 'Todos los clientes', timestamp: now - 30*60*1000, status: 'active', action: 'send_whatsapp', actionText: 'Enviar mensaje', impact: 'high', color: '#ef4444' },
      { id: 2, type: 'customer_service', priority: 'high', title: 'Cliente con Caso Pendiente', description: '"Librería El Saber" escribió a soporte hace 3 horas y no se resuelve.', client: 'Librería El Saber', timestamp: now - 3*60*60*1000, status: 'active', action: 'contact_client', actionText: 'Contactar cliente', impact: 'medium', color: '#f59e0b' },
      { id: 3, type: 'sales_drop', priority: 'medium', title: 'Caída de Ventas Detectada', description: 'Transacciones de "Zapatería Paso Firme" cayeron 25% esta semana.', client: 'Zapatería Paso Firme', timestamp: now - 2*60*60*1000, status: 'active', action: 'schedule_visit', actionText: 'Programar visita', impact: 'medium', dropPercentage: 25, benchmark: '+5%', color: '#3b82f6' },
      { id: 4, type: 'opportunity', priority: 'low', title: 'Nueva Oportunidad Identificada', description: 'Comercio potencial con alta densidad y baja penetración IziPay.', client: 'Bodega El Ahorro', timestamp: now - 60*60*1000, status: 'active', action: 'view_details', actionText: 'Ver detalles', impact: 'low', color: '#10b981' },
      { id: 5, type: 'system', priority: 'medium', title: 'Mantenimiento Programado', description: 'Mantenimiento mañana 2:00-4:00 AM. Servicios intermitentes.', client: 'Todos los clientes', timestamp: now - 6*60*60*1000, status: 'resolved', action: 'none', actionText: 'Información', impact: 'low', color: '#6b7280' },
    ];
    setAlerts(mock);
  }, []);

  const refreshAlerts = async () => {
    setIsRefreshing(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsRefreshing(false);
  };

  const markAlertAsResolved = (alertId: number) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'resolved' } : a));
  };

  const filteredAlerts = alerts.filter(a => {
    if (search && !(`${a.title} ${a.client} ${a.description}`.toLowerCase().includes(search.toLowerCase()))) return false;
    if (filters.priority !== 'all' && a.priority !== filters.priority) return false;
    if (filters.type !== 'all' && a.type !== filters.type) return false;
    if (filters.status !== 'all' && a.status !== filters.status) return false;
    return true;
  });

  const getPriorityText = (p: AlertItem['priority']) => p === 'critical' ? 'Crítica' : p === 'high' ? 'Alta' : p === 'medium' ? 'Media' : 'Baja';
  const getTypeText = (t: AlertItem['type']) => t === 'system' ? 'Sistema' : t === 'customer_service' ? 'Servicio al Cliente' : t === 'sales_drop' ? 'Caída de Ventas' : 'Oportunidad';
  const timeAgo = (ts: number) => {
    const diff = Date.now() - ts;
    const m = Math.floor(diff/60000); const h = Math.floor(diff/3600000); const d = Math.floor(diff/86400000);
    if (m < 60) return `Hace ${m} min`;
    if (h < 24) return `Hace ${h} h`;
    return `Hace ${d} días`;
  };

  // Tendencias removidas

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Alertas Activas</Text>
          <TouchableOpacity style={styles.refreshBtn} onPress={refreshAlerts} disabled={isRefreshing}>
            <Ionicons name="refresh" size={16} color={colors.light} />
            <Text style={styles.refreshText}>{isRefreshing ? 'Actualizando...' : 'Actualizar'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}><Ionicons name="alert" size={18} color={colors.danger} /><Text style={styles.metricChangeNegative}>+2</Text></View>
          <Text style={styles.metricValue}>{metricsData.activeAlerts}</Text>
          <Text style={styles.metricLabel}>Alertas Activas</Text>
        </View>
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}><Ionicons name="checkmark-circle" size={18} color={colors.success} /><Text style={styles.metricChangePositive}>+3</Text></View>
          <Text style={styles.metricValue}>{metricsData.resolvedToday}</Text>
          <Text style={styles.metricLabel}>Resueltas Hoy</Text>
        </View>
      </View>
        {/* Filtro compacto: búsqueda + toggle */}
        <View style={{ flexDirection:'row', alignItems:'center', marginBottom: 8 }}>
          <View style={[styles.inputWrap, { flex:1 } ]}>
            <Ionicons name="search" size={16} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Buscar alerta o cliente..."
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['all','critical','high','medium','low'].map((p) => (
              <TouchableOpacity key={p} style={[styles.filterChip, filters.priority===p && styles.filterChipActive]} onPress={()=>setFilters(prev=>({ ...prev, priority: p as any }))}>
                <Text style={[styles.filterChipText, filters.priority===p && styles.filterChipTextActive]}>Prioridad: {p==='all'?'Todas':getPriorityText(p as any)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['all','system','customer_service','sales_drop','opportunity'].map((t) => (
              <TouchableOpacity key={t} style={[styles.filterChip, filters.type===t && styles.filterChipActive]} onPress={()=>setFilters(prev=>({ ...prev, type: t as any }))}>
                <Text style={[styles.filterChipText, filters.type===t && styles.filterChipTextActive]}>Tipo: {t==='all'?'Todos':getTypeText(t as any)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['all','active','resolved'].map((s) => (
              <TouchableOpacity key={s} style={[styles.filterChip, filters.status===s && styles.filterChipActive]} onPress={()=>setFilters(prev=>({ ...prev, status: s as any }))}>
                <Text style={[styles.filterChipText, filters.status===s && styles.filterChipTextActive]}>Estado: {s==='all'?'Todos': s==='active'?'Activas':'Resueltas'}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        )}

        <View>
          {filteredAlerts.map((a) => (
            <TouchableOpacity key={a.id} style={styles.alertItem} onPress={()=>setSelectedAlert(a)}>
              <View style={[styles.alertIcon,{ backgroundColor: a.color }]}>
                <Ionicons name={a.type==='system'?'cloud-offline': a.type==='customer_service'?'chatbubbles': a.type==='sales_drop'?'trending-down':'trending-up'} size={16} color={colors.light} />
              </View>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.alertTitle}>{a.title}</Text>
                <Text style={styles.alertDesc}>{a.description}</Text>
                <View style={styles.alertMetaRow}>
                  <Text style={styles.alertClient}>{a.client}</Text>
                  <Text style={styles.alertTime}>{timeAgo(a.timestamp)}</Text>
                </View>
              </View>
              <View style={styles.alertRightCol}>
                <View style={[styles.badge, a.priority==='critical'?{backgroundColor:'#ef4444'}: a.priority==='high'?{backgroundColor:'#f59e0b'}: a.priority==='medium'?{backgroundColor:'#3b82f6'}:{backgroundColor:'#10b981'}]}>
                  <Text style={styles.badgeText}>{getPriorityText(a.priority)}</Text>
                </View>
                <TouchableOpacity style={styles.alertActionBtn} onPress={()=>setSelectedAlert(a)}>
                  <Text style={styles.alertActionText}>{a.actionText}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section_detalles}>
        <Text style={styles.sectionTitle}>Detalles de Alerta</Text>
        {selectedAlert ? (
          <View style={styles.detailCard}>
            <View style={{ flexDirection:'row', alignItems:'flex-start', marginBottom: 8 }}>
              <View style={[styles.alertIcon,{ backgroundColor: selectedAlert.color }]}>
                <Ionicons name={selectedAlert.type==='system'?'cloud-offline': selectedAlert.type==='customer_service'?'chatbubbles': selectedAlert.type==='sales_drop'?'trending-down':'trending-up'} size={16} color={colors.light} />
              </View>
              <View style={{ marginLeft: 8, flex: 1, minWidth: 0 }}>
                <Text style={styles.alertTitle}>{selectedAlert.title}</Text>
                <Text style={[styles.alertDesc, { flexWrap: 'wrap', flexShrink: 1, width: '100%', paddingRight: 8, textAlign: 'left' }]}>{selectedAlert.description}</Text>
              </View>
            </View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Cliente:</Text><Text style={styles.infoValue}>{selectedAlert.client}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Prioridad:</Text><Text style={styles.infoValue}>{getPriorityText(selectedAlert.priority)}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Tipo:</Text><Text style={styles.infoValue}>{getTypeText(selectedAlert.type)}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Impacto:</Text><Text style={styles.infoValue}>{selectedAlert.impact}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Tiempo:</Text><Text style={styles.infoValue}>{timeAgo(selectedAlert.timestamp)}</Text></View>
            {selectedAlert.type==='sales_drop' && (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.subTitle}>Análisis de Caída</Text>
                <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                  <View><Text style={styles.infoLabel}>Caída detectada</Text><Text style={[styles.infoValue,{ color: colors.primary }]}>-{selectedAlert.dropPercentage}%</Text></View>
                  <View><Text style={styles.infoLabel}>Benchmark</Text><Text style={[styles.infoValue,{ color: colors.success }]}>{selectedAlert.benchmark}</Text></View>
                </View>
              </View>
            )}
            <View style={{ flexDirection:'row', marginTop: 12, gap: 10 }}>
              <TouchableOpacity style={styles.primaryBtn} onPress={()=>console.log('Action:', selectedAlert.action)}>
                <Text style={styles.primaryBtnText}>{selectedAlert.actionText}</Text>
              </TouchableOpacity>
              {selectedAlert.status==='active' && (
                <TouchableOpacity style={styles.secondaryBtn} onPress={()=>markAlertAsResolved(selectedAlert.id)}>
                  <Text style={styles.secondaryBtnText}>Marcar como Resuelta</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.noSelection}><Ionicons name="alert" size={36} color={colors.textSecondary} /><Text style={styles.noSelectionText}>Selecciona una alerta para ver detalles</Text></View>
        )}
      </View>

      {/* Secciones de Tendencia y Rendimiento eliminadas */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 8 },
  title: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  metricsRow: { flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between' },
  metricCard: { width: (width-16*2-12)/2, backgroundColor: colors.cardBackground, borderRadius:12, padding:12, marginBottom:12, borderWidth:1, borderColor: colors.border },
  metricHeader: { flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  metricChangePositive: { fontSize: 12, color: colors.success, fontWeight:'700' },
  metricChangeNegative: { fontSize: 12, color: colors.danger, fontWeight:'700' },
  metricValue: { fontSize: 20, fontWeight:'800', color: colors.textPrimary, marginTop: 6 },
  metricLabel: { fontSize: 12, color: colors.textSecondary },

  section: { marginTop: 8 },
  section_detalles: { marginTop: 8, marginBottom: 20},
  sectionHeader: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:8 },
  sectionTitle: { fontSize:16, fontWeight:'800', color: colors.textPrimary },
  refreshBtn: { flexDirection:'row', alignItems:'center', backgroundColor: colors.primary, paddingHorizontal:10, paddingVertical:6, borderRadius:8 },
  refreshText: { color: colors.light, fontSize: 12, marginLeft:6 },

  filtersRow: { marginBottom: 8 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderWidth:1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, height: 40 },
  input: { flex: 1, color: colors.textPrimary, fontSize: 14, marginLeft: 8 },
  filterChip: { paddingHorizontal: 10, paddingVertical: 8, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterChipText: { color: colors.textSecondary, fontSize: 12 },
  filterChipTextActive: { color: colors.light, fontWeight: '700' },

  alertItem: { flexDirection:'row', alignItems:'flex-start', backgroundColor: colors.cardBackground, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border, marginBottom: 10 },
  alertIcon: { width: 28, height: 28, borderRadius: 14, alignItems:'center', justifyContent:'center', marginRight: 10 },
  alertHeaderRow: { flexDirection:'row', alignItems:'center' },
  alertTitle: { fontSize: 14, fontWeight:'700', color: colors.textPrimary, flex: 1, paddingRight: 8, flexShrink: 1 },
  alertDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2, flexShrink: 1, flexWrap: 'wrap', maxWidth: '100%' },
  // asegurar que textos largos no se desborden
  alertTitleWrap: { flexWrap: 'wrap' },
  alertMetaRow: { flexDirection:'row', justifyContent:'space-between', marginTop: 6 },
  alertClient: { fontSize: 12, color: colors.textSecondary },
  alertTime: { fontSize: 12, color: colors.textSecondary },
  badge: { paddingHorizontal:8, paddingVertical:4, borderRadius:10 },
  badgeRight: { marginLeft: 'auto' },
  badgeText: { color: colors.light, fontSize: 10, fontWeight:'700' },
  alertRightCol: { alignItems:'flex-end', justifyContent:'space-between' },
  alertActionBtn: { backgroundColor: colors.background, borderWidth:1, borderColor: colors.border, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, marginTop: 8 },
  alertActionText: { color: colors.textPrimary, fontSize: 12, fontWeight:'600' },

  detailCard: { backgroundColor: colors.cardBackground, marginBottom: 20, borderRadius: 12, padding: 12, borderWidth:1, borderColor: colors.border, overflow: 'hidden' },
  infoRow: { flexDirection:'row', justifyContent:'space-between', marginTop: 6 },
  infoLabel: { fontSize: 12, color: colors.textSecondary },
  infoValue: { fontSize: 12, color: colors.textPrimary, fontWeight:'600' },
  subTitle: { fontSize: 14, fontWeight:'700', color: colors.textPrimary, marginBottom: 6 },
  noSelection: { alignItems:'center', padding: 20, backgroundColor: colors.cardBackground, borderRadius: 12, borderWidth:1, borderColor: colors.border },
  noSelectionText: { color: colors.textSecondary, marginTop: 6 },
  primaryBtn: { flex:1, alignItems:'center', justifyContent:'center', backgroundColor: colors.primary, paddingVertical: 10, borderRadius:10 },
  primaryBtnText: { color: colors.light, fontWeight:'700' },
  secondaryBtn: { flex:1, alignItems:'center', justifyContent:'center', backgroundColor: colors.background, borderWidth:1, borderColor: colors.border, paddingVertical: 10, borderRadius:10 },
  secondaryBtnText: { color: colors.textSecondary, fontWeight:'700' },

  clientRow: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor: colors.cardBackground, borderRadius:12, padding:12, borderWidth:1, borderColor: colors.border, marginBottom:8 },
  clientName: { fontSize:14, fontWeight:'700', color: colors.textPrimary },
  clientMeta: { fontSize:12, color: colors.textSecondary },
  clientChange: { fontSize:14, fontWeight:'800' },
  positive: { color: colors.success },
  negative: { color: colors.primary },
});
  