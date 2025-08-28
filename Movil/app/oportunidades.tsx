import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './styles';
import { useRouter } from 'expo-router';

type Zone = {
  id: number;
  name: string;
  density: 'high' | 'medium' | 'low';
  penetration: 'very_low' | 'low' | 'medium' | 'high';
  businessCount: number;
  iziPayClients: number;
  avgTicket: number;
  opportunityScore: number;
};

export default function Oportunidades() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [density, setDensity] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [penetration, setPenetration] = useState<'all' | 'very_low' | 'low' | 'medium' | 'high'>('all');
  const [businessType, setBusinessType] = useState<'all' | 'restaurants' | 'retail' | 'services' | 'financial' | 'entertainment'>('all');
  const [expandedZoneId, setExpandedZoneId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Zonas (sin mapa) tomadas del Web como referencia
  const zones: (Zone & { businessTypes: string[] })[] = [
    { id: 1, name: 'Zona Financiera', density: 'high', penetration: 'medium', businessCount: 156, iziPayClients: 34, avgTicket: 78, opportunityScore: 92, businessTypes: ['financial','services','restaurants'] },
    { id: 2, name: 'Zona CaminoReal', density: 'medium', penetration: 'low', businessCount: 89, iziPayClients: 23, avgTicket: 65, opportunityScore: 75, businessTypes: ['financial','services','restaurants'] },
    { id: 3, name: 'Zona Begonias', density: 'high', penetration: 'very_low', businessCount: 203, iziPayClients: 12, avgTicket: 45, opportunityScore: 95, businessTypes: ['restaurants','retail','services'] },
    { id: 4, name: 'Zona PetitThouars', density: 'medium', penetration: 'low', businessCount: 134, iziPayClients: 28, avgTicket: 38, opportunityScore: 81, businessTypes: ['retail','restaurants','services'] },
  ];

  const events = [
    { name: 'Tech Summit San Isidro', description: 'Conferencia tecnológica para empresas del distrito con ponentes internacionales', location: 'Centro Empresarial Real', sector: 'Tecnología', source: 'instagram' },
    { name: 'Expo Financiera 2024', description: 'Exposición de servicios financieros y fintech para el sector empresarial', location: 'Hotel Country Club', sector: 'Financiero', source: 'facebook' },
    { name: 'Business Forum El Golf', description: 'Foro de networking empresarial con líderes del sector', location: 'Club El Golf', sector: 'Empresarial', source: 'instagram' },
    { name: 'Feria Gastronómica San Isidro', description: 'Feria gastronómica con restaurantes del distrito y degustaciones', location: 'Parque Kennedy', sector: 'Gastronomía', source: 'facebook' },
  ];

  const getSourceColor = (src: string) => {
    switch (src) {
      case 'instagram':
        return '#e4405f';
      case 'facebook':
        return '#1877f2';
      case 'twitter':
        return '#1da1f2';
      default:
        return colors.primary;
    }
  };

  const getSourceText = (src: string) => {
    switch (src) {
      case 'instagram':
        return 'INSTAGRAM';
      case 'facebook':
        return 'FACEBOOK';
      case 'twitter':
        return 'TWITTER';
      default:
        return 'OTRO';
    }
  };

  const getZoneColor = (z: Zone) => {
    if (z.penetration === 'very_low' && z.density === 'high') return colors.danger;
    if (z.penetration === 'low' && z.density === 'high') return colors.warning;
    if (z.penetration === 'low' && z.density === 'medium') return colors.primary;
    return colors.success;
  };

  const getDensityText = (d: Zone['density']) => d === 'high' ? 'Alta' : d === 'medium' ? 'Media' : 'Baja';
  const getPenetrationText = (p: Zone['penetration']) => p === 'very_low' ? 'Muy Baja' : p === 'low' ? 'Baja' : p === 'medium' ? 'Media' : 'Alta';

  const filteredZones = useMemo(() => {
    return zones.filter((z) => {
      if (search && !z.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (density !== 'all' && z.density !== density) return false;
      if (penetration !== 'all' && z.penetration !== penetration) return false;
      if (businessType !== 'all' && !(z as any).businessTypes?.includes(businessType)) return false;
      return true;
    });
  }, [zones, search, density, penetration, businessType]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Encabezado compacto con búsqueda y toggle filtros */}
      <View style={[styles.card, { paddingVertical: 12 }] }>
        <View style={{ flexDirection:'row', alignItems:'center' }}>
          <View style={[styles.inputWrap, { flex:1 }] }>
            <Ionicons name="search" size={16} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Buscar zona..."
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
            <Text style={styles.filterLabel}>Densidad Comercial</Text>
            <View style={styles.chipsRow}>
              {['all','high','medium','low'].map((opt) => (
                <TouchableOpacity key={opt} style={[styles.chip, density===opt && styles.chipActive]} onPress={() => setDensity(opt as any)}>
                  <Text style={[styles.chipText, density===opt && styles.chipTextActive]}>{opt==='all'?'Todas':getDensityText(opt as any)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.filterField}>
            <Text style={styles.filterLabel}>Penetración IziPay</Text>
            <View style={styles.chipsRow}>
              {['all','very_low','low','medium','high'].map((opt) => (
                <TouchableOpacity key={opt} style={[styles.chip, penetration===opt && styles.chipActive]} onPress={() => setPenetration(opt as any)}>
                  <Text style={[styles.chipText, penetration===opt && styles.chipTextActive]}>{opt==='all'?'Todas':getPenetrationText(opt as any)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.filterField}>
            <Text style={styles.filterLabel}>Tipo de Negocio</Text>
            <View style={styles.chipsRow}>
              {[
                {id:'all',label:'Todos'},
                {id:'restaurants',label:'Restaurantes'},
                {id:'retail',label:'Retail'},
                {id:'services',label:'Servicios'},
                {id:'financial',label:'Financiero'},
                {id:'entertainment',label:'Entretenimiento'},
              ].map((opt:any) => (
                <TouchableOpacity key={opt.id} style={[styles.chip, businessType===opt.id && styles.chipActive]} onPress={() => setBusinessType(opt.id)}>
                  <Text style={[styles.chipText, businessType===opt.id && styles.chipTextActive]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        )}
      </View>

      {/* Panel de Información de Zona se movió dentro de cada item (desplegable) */}

      {/* Lista de Zonas - (equivalente a la sección oculta en Web) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Zonas de Oportunidad</Text>
        {filteredZones.map((z) => (
          <TouchableOpacity key={z.id} style={styles.zoneItem} onPress={() => setExpandedZoneId(expandedZoneId === z.id ? null : z.id)}>
            <View style={[styles.zoneDot,{ backgroundColor: getZoneColor(z) }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.zoneTitle}>{z.name}</Text>
              <View style={styles.zoneChipsRow}>
                <View style={[styles.smallBadge,{ backgroundColor: z.density==='high'?colors.success: z.density==='medium'?colors.warning:colors.primary }]}>
                  <Text style={styles.badgeText}>Densidad: {getDensityText(z.density)}</Text>
                </View>
                <View style={[styles.smallBadge,{ backgroundColor: z.penetration==='very_low'||z.penetration==='low'?colors.danger: z.penetration==='medium'?colors.warning:colors.success }]}>
                  <Text style={styles.badgeText}>Penetración: {getPenetrationText(z.penetration)}</Text>
                </View>
              </View>
              {expandedZoneId === z.id && (
                <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border }}>
                  <View style={styles.zoneStatsRow}>
                    <View style={styles.zoneStat}><Ionicons name="people" size={18} color={colors.textSecondary} /><Text style={styles.zoneStatValue}>{z.iziPayClients}</Text><Text style={styles.zoneStatLabel}>Clientes IziPay</Text></View>
                    <View style={styles.zoneStat}><Ionicons name="storefront" size={18} color={colors.textSecondary} /><Text style={styles.zoneStatValue}>{z.businessCount}</Text><Text style={styles.zoneStatLabel}>Comercios</Text></View>
                    <View style={styles.zoneStat}><Ionicons name="cash" size={18} color={colors.textSecondary} /><Text style={styles.zoneStatValue}>S/ {z.avgTicket}</Text><Text style={styles.zoneStatLabel}>Ticket Prom.</Text></View>
                  </View>
                  <View style={styles.zoneBadgesRow}>
                    <Text style={styles.badgeLabel}>Densidad:</Text>
                    <View style={[styles.badge, { backgroundColor: z.density==='high'?colors.success: z.density==='medium'?colors.warning:colors.primary }]}><Text style={styles.badgeText}>{getDensityText(z.density)}</Text></View>
                    <Text style={[styles.badgeLabel,{ marginLeft:8 }]}>Penetración:</Text>
                    <View style={[styles.badge, { backgroundColor: z.penetration==='very_low'||z.penetration==='low'? colors.danger : z.penetration==='medium'? colors.warning : colors.success }]}>
                      <Text style={styles.badgeText}>{getPenetrationText(z.penetration)}</Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 12 }}>
                    <TouchableOpacity
                      style={{ backgroundColor: colors.primary, paddingVertical: 10, borderRadius: 10, alignItems: 'center' }}
                      onPress={() => router.push({ pathname: '/ofertas', params: { zone: z.name } })}
                    >
                      <Text style={{ color: colors.light, fontWeight: '700' }}>Comercios</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreValue}>{z.opportunityScore}</Text>
              <Text style={styles.scoreLabel}>/100</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Eventos en San Isidro (tarjetas compactas) */}
      <View style={styles.card}>
        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
          <Text style={styles.cardTitle}>Eventos en San Isidro</Text>
          <View style={[styles.smallBadge,{ backgroundColor: colors.accent }]}>
            <Text style={styles.badgeText}>{events.length} eventos</Text>
          </View>
        </View>
        {events.map((ev, idx) => (
          <View key={idx} style={styles.eventCard}>
            <View style={{ flexDirection:'row', alignItems:'center', marginBottom: 8 }}>
              <View style={[styles.eventSource,{ backgroundColor: getSourceColor(ev.source) }]}>
                <Text style={styles.eventSourceText}>{getSourceText(ev.source)}</Text>
              </View>
              <Text style={styles.eventSector}>{ev.sector}</Text>
            </View>
            <Text style={styles.eventTitle}>{ev.name}</Text>
            <Text style={styles.eventDesc}>{ev.description}</Text>
            <View style={{ flexDirection:'row', alignItems:'center', marginTop: 6 }}>
              <Ionicons name="location" size={14} color={colors.textSecondary} />
              <Text style={styles.eventMeta}>{ev.location}</Text>
            </View>
            <View style={{ flexDirection:'row', marginTop: 10 }}>
              <TouchableOpacity style={[styles.btn, { backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1 }]}>
                <Text style={[styles.btnText,{ color: colors.textPrimary }]}>Ver Noticia</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary, marginLeft: 10 }]}>
                <Text style={[styles.btnText,{ color: colors.light }]}>Agregar a Teams</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  card: { backgroundColor: colors.cardBackground, borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: colors.dark, shadowOffset:{ width:0, height:2 }, shadowOpacity:0.1, shadowRadius:3.84, elevation:5 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 12 },
  filtersRow: {},
  filterField: { marginBottom: 12 },
  filterLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderWidth:1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, height: 40 },
  input: { flex: 1, color: colors.textPrimary, fontSize: 14, marginLeft: 8 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.background, borderWidth:1, borderColor: colors.border, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textSecondary, fontSize: 12 },
  chipTextActive: { color: colors.light, fontWeight: '600' },

  zoneName: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 },
  zoneStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  zoneStat: { alignItems: 'center' },
  zoneStatValue: { fontSize: 14, fontWeight: 'bold', color: colors.textPrimary },
  zoneStatLabel: { fontSize: 12, color: colors.textSecondary },
  zoneBadgesRow: { flexDirection: 'row', alignItems: 'center' },
  badgeLabel: { fontSize: 12, color: colors.textSecondary },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginLeft: 6 },
  badgeText: { color: colors.light, fontSize: 11, fontWeight: '600' },

  zoneItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, position: 'relative', paddingRight: 56 },
  zoneDot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  zoneTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  zoneSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  zoneChipsRow: { flexDirection:'row', marginTop: 6 },
  smallBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginRight: 6 },
  scoreBox: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, position: 'absolute', right: 0, top: 12 },
  scoreValue: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary },
  scoreLabel: { fontSize: 12, color: colors.textSecondary },

  eventItem: { flexDirection:'row', alignItems:'flex-start', paddingVertical: 10, borderBottomWidth:1, borderBottomColor: colors.border },
  eventIcon: { width: 28, height: 28, borderRadius: 14, alignItems:'center', justifyContent:'center', marginRight: 10 },
  eventTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  eventDesc: { fontSize: 12, color: colors.textSecondary, marginVertical: 2 },
  eventMeta: { fontSize: 12, color: colors.textSecondary, marginLeft: 4 },
  eventCard: { backgroundColor: colors.cardBackground, borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  eventSource: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 8 },
  eventSourceText: { color: colors.light, fontSize: 11, fontWeight: '700' },
  eventSector: { color: colors.textSecondary, fontSize: 12 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  btnText: { fontSize: 12, fontWeight: '600' },
});
