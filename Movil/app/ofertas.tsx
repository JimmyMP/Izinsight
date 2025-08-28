import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './styles';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Ofertas() {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const params = useLocalSearchParams<{ zone?: string }>();
  const [zoneFilter, setZoneFilter] = useState<'Todas' | 'Zona Financiera' | 'Zona CaminoReal' | 'Zona Begonias' | 'Zona PetitThouars'>('Todas');
  const [typeFilter, setTypeFilter] = useState<'Todos' | 'restaurant' | 'retail' | 'pharmacy' | 'beauty'>('Todos');
  const [selectedBusiness, setSelectedBusiness] = useState<null | {
    id: number;
    name: string;
    type: 'restaurant' | 'retail' | 'pharmacy' | 'beauty';
    category: string;
    location: string;
    image: string;
    status: 'pending' | 'completed';
  }>(null);
  const [clienteInfo, setClienteInfo] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
  });
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [businessFormData, setBusinessFormData] = useState({
    currentRevenue: '',
    avgTicket: '',
    customerCount: '',
    paymentMethods: [] as string[],
    needs: [] as string[],
    description: '',
  });
  const [businessModalVisible, setBusinessModalVisible] = useState(false);
  const [generatedOffer, setGeneratedOffer] = useState<null | {
    pitch: string;
    products: { name: string; description: string; price: string; features: string[]; color: string }[];
    totalValue: number;
    projectedGrowth: number;
    roi: { investment: number; projectedRevenue: number; roi: number; paybackMonths: number };
    businessCurrentRevenue: number;
  }>(null);
  

  // Comercios de referencia (como en Web)
  const baseBusinesses = [
    { id: 1, name: 'Cevichería El Tiburón', type: 'restaurant' as const, category: 'Gastronomía', location: 'Zona Begonias', image: '🦈', status: 'pending' as const },
    { id: 2, name: 'Farmacia Salud Total', type: 'pharmacy' as const, category: 'Salud', location: 'Zona Financiera', image: '💊', status: 'pending' as const },
    { id: 3, name: 'Zapatería Paso Firme', type: 'retail' as const, category: 'Calzado', location: 'Zona CaminoReal', image: '👟', status: 'pending' as const },
    { id: 4, name: 'Salón de Belleza Glamour', type: 'beauty' as const, category: 'Belleza', location: 'Zona PetitThouars', image: '💅', status: 'pending' as const },
    { id: 5, name: 'Café Camino Real', type: 'restaurant' as const, category: 'Cafetería', location: 'Zona CaminoReal', image: '☕', status: 'pending' as const },
    { id: 6, name: 'Librería Begonias', type: 'retail' as const, category: 'Librería', location: 'Zona Begonias', image: '📚', status: 'pending' as const },
    { id: 7, name: 'Tech Financiera', type: 'retail' as const, category: 'Electrónica', location: 'Zona Financiera', image: '💻', status: 'pending' as const },
    { id: 8, name: 'Bistró Petit', type: 'restaurant' as const, category: 'Restaurante', location: 'Zona PetitThouars', image: '🍽️', status: 'pending' as const },
  ];

  const zones = ['Todas', 'Zona Financiera', 'Zona CaminoReal', 'Zona Begonias', 'Zona PetitThouars'] as const;
  const types = ['Todos', 'restaurant', 'retail', 'pharmacy', 'beauty'] as const;

  const filteredBusinesses = baseBusinesses.filter(b =>
    (zoneFilter === 'Todas' ? true : b.location === zoneFilter) && (typeFilter === 'Todos' ? true : b.type === typeFilter)
  );

  const onSelectBusiness = (b: typeof baseBusinesses[number]) => {
    setSelectedBusiness(b);
    setClienteInfo(prev => ({ ...prev, empresa: b.name }));
    setIsEditingBusiness(true);
    setBusinessFormData({
      currentRevenue: '',
      avgTicket: '',
      customerCount: '',
      paymentMethods: [],
      needs: [],
      description: '',
    });
    setBusinessModalVisible(true);
  };

  const handleFormChange = (field: string, value: any) => {
    setBusinessFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: 'paymentMethods' | 'needs', item: string) => {
    setBusinessFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i: string) => i !== item)
        : [...prev[field], item],
    }));
  };

  const isFormComplete = () => {
    return (
      !!businessFormData.currentRevenue &&
      !!businessFormData.avgTicket &&
      !!businessFormData.customerCount &&
      businessFormData.paymentMethods.length > 0 &&
      businessFormData.needs.length > 0
    );
  };

  const saveBusinessData = () => {
    if (!isFormComplete()) {
      Alert.alert(
        'Completa los campos',
        'Ventas, ticket, clientes, métodos de pago y necesidades son requeridos.'
      );
      return;
    }
    setIsEditingBusiness(false);
    Alert.alert('Información guardada', 'Se guardó la información del negocio.');
  };

  const generateOffer = () => {
    if (!isFormComplete()) {
      Alert.alert('Faltan datos', 'Completa la información del negocio para generar la oferta.');
      return;
    }
    const iziPayProducts = {
      pos_mobile: {
        name: 'POS Móvil',
        description: 'Terminal de pago móvil para aceptar tarjetas',
        price: 'S/ 299',
        features: ['Acepta todas las tarjetas', 'Bluetooth', 'Tickets'],
        color: '#3b82f6',
      },
      payment_link: {
        name: 'Link de Pagos',
        description: 'Enlaces de pago personalizados para ventas online',
        price: 'S/ 99',
        features: ['WhatsApp', 'Email', 'Sin comisión'],
        color: '#10b981',
      },
      app_izipay: {
        name: 'App IziPay',
        description: 'Aplicación móvil para gestión de pagos',
        price: 'S/ 149',
        features: ['Ventas', 'Reportes', 'Integración POS'],
        color: '#f59e0b',
      },
      installments: {
        name: 'Pagos en Cuotas',
        description: 'Financiamiento para clientes',
        price: 'S/ 199',
        features: ['Hasta 12 cuotas', 'Sin interés', 'Aprobación automática'],
        color: '#ef4444',
      },
    } as const;

    const needs = businessFormData.needs;
    const recommended: (keyof typeof iziPayProducts)[] = [];
    if (needs.includes('delivery')) recommended.push('payment_link');
    if (needs.includes('digital_payments')) recommended.push('pos_mobile');
    if (needs.includes('installments')) recommended.push('installments');
    if (needs.includes('appointments') || needs.includes('memberships')) recommended.push('app_izipay');
    if (recommended.length === 0) recommended.push('pos_mobile');

    const products = recommended.map((k) => ({
      name: iziPayProducts[k].name,
      price: iziPayProducts[k].price,
      features: [...iziPayProducts[k].features],
      color: iziPayProducts[k].color,
    }));
    const totalValue = products.reduce((sum, p) => sum + parseInt(p.price.replace('S/ ', '')), 0);
    const projectedGrowth = 25;
    const currentRevenue = parseInt(businessFormData.currentRevenue);
    if (isNaN(currentRevenue)) {
      Alert.alert('Dato inválido', 'Ventas mensuales debe ser un número.');
      return;
    }
    const projectedRevenue = Math.round(currentRevenue * (projectedGrowth / 100));
    const investment = totalValue;
    const roiPct = Math.round(((projectedRevenue - investment) / (investment || 1)) * 100);
    const paybackMonths = Math.max(1, Math.ceil(investment / ((projectedRevenue / 12) || 1)));

    const pitch = `Hola, soy de IziPay. Nuestro análisis sugiere implementar ${products.map(p=>p.name).join(' y ')} para impulsar ${selectedBusiness?.name}. Comercios similares han logrado mejoras con estas soluciones.`;

    setGeneratedOffer({
      pitch,
      products,
      totalValue,
      projectedGrowth,
      roi: {
        investment,
        projectedRevenue,
        roi: roiPct,
        paybackMonths,
      },
      businessCurrentRevenue: currentRevenue,
    });
    setBusinessModalVisible(false);
  };

  
  useEffect(() => {
    if (params.zone && zones.includes(params.zone as any)) {
      setZoneFilter(params.zone as any);
    }
  }, [params.zone]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Filtros de Comercios (compacto) */}
      <View style={[styles.container_filtro] }>
        <View style={[styles.card, { paddingVertical: 12 }] }>
          <View style={{ flexDirection:'row', alignItems:'center' }}>
            <View style={[styles.inputWrap, { flex:1 }]}>
              <Ionicons name="search" size={16} color={colors.textSecondary} />
              <TextInput
                style={styles.input_filtro}
                placeholder="Buscar comercio..."
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
            <>
              <View style={styles.filtersRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Zona</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {zones.map((z) => (
                      <TouchableOpacity key={z} style={[styles.filterChip, zoneFilter === z && styles.filterChipActive]} onPress={() => setZoneFilter(z)}>
                        <Text style={[styles.filterChipText, zoneFilter === z && styles.filterChipTextActive]}>{z}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
              <View style={styles.filtersRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Tipo de Negocio</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {types.map((t) => (
                      <TouchableOpacity key={t} style={[styles.filterChip, typeFilter === t && styles.filterChipActive]} onPress={() => setTypeFilter(t as any)}>
                        <Text style={[styles.filterChipText, typeFilter === t && styles.filterChipTextActive]}>{t === 'Todos' ? 'Todos' : t}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
      {/* (Resumen se muestra debajo de la lista) */}


      {/* Modal de Información del Negocio */}
      <Modal visible={businessModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Información del Negocio</Text>
              <TouchableOpacity onPress={() => setBusinessModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Ventas Mensuales (S/)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="15000"
                    value={businessFormData.currentRevenue}
                    onChangeText={(t) => handleFormChange('currentRevenue', t)}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Ticket Promedio (S/)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="45"
                    value={businessFormData.avgTicket}
                    onChangeText={(t) => handleFormChange('avgTicket', t)}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Número de Clientes</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="120"
                  value={businessFormData.customerCount}
                  onChangeText={(t) => handleFormChange('customerCount', t)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Métodos de Pago *</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {['efectivo', 'tarjeta', 'transferencia', 'yape', 'plin'].map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.filterChip, businessFormData.paymentMethods.includes(m) && styles.filterChipActive]}
                      onPress={() => toggleArrayField('paymentMethods', m)}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          businessFormData.paymentMethods.includes(m) && styles.filterChipTextActive,
                        ]}
                      >
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Necesidades *</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {[
                    'delivery',
                    'digital_payments',
                    'installments',
                    'appointments',
                    'memberships',
                    'inventory',
                    'loyalty',
                    'recurring_payments',
                  ].map((n) => (
                    <TouchableOpacity
                      key={n}
                      style={[styles.filterChip, businessFormData.needs.includes(n) && styles.filterChipActive]}
                      onPress={() => toggleArrayField('needs', n)}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          businessFormData.needs.includes(n) && styles.filterChipTextActive,
                        ]}
                      >
                        {n.replace('_', ' ')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity
                  style={[styles.primaryButton, { flex: 1 }]}
                  onPress={generateOffer}
                >
                  <Text style={styles.primaryButtonText}>Generar Oferta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.secondaryButton, { flex: 1 }]}
                  onPress={() => {
                    setIsEditingBusiness(false);
                    setBusinessModalVisible(false);
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Comercios Identificados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comercios Identificados</Text>
        <View>
          {filteredBusinesses.map((b) => (
            <TouchableOpacity key={b.id} style={[styles.businessItem, selectedBusiness?.id === b.id && { borderColor: colors.primary }]} onPress={() => onSelectBusiness(b)}>
              <Text style={styles.businessIcon}>{b.image}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.businessName}>{b.name}</Text>
                <Text style={styles.businessMeta}>{b.category} • {b.location}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.warning }]}> 
                <Text style={styles.statusText}>Pendiente</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* (Se eliminó el resumen; al tocar un comercio se abre el modal) */}

      {/* Oferta Generada */}
      {generatedOffer && (
        <View style={styles.section}>
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Oferta Generada</Text>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ color: colors.textPrimary, marginBottom: 8 }}>{generatedOffer.pitch}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {generatedOffer.products.map((p, idx) => (
                  <View key={idx} style={{ backgroundColor: colors.background, borderRadius: 8, padding: 12, marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: colors.border, minWidth: 140 }}>
                    <View style={{ backgroundColor: p.color, borderRadius: 6, padding: 6, marginBottom: 6 }}>
                      <Text style={{ color: colors.light, fontWeight: '700' }}>{p.name}</Text>
                    </View>
                    <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 6 }}>{p.description}</Text>
                    <Text style={{ color: colors.primary, fontWeight: '700', marginBottom: 6 }}>{p.price}</Text>
                    {p.features.map((f, i) => (
                      <Text key={i} style={{ color: colors.textSecondary, fontSize: 11 }}>• {f}</Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>
            {/* Crecimiento Proyectado */}
            <View style={{ marginTop: 8, marginBottom: 8 }}>
              <Text style={styles.sectionTitle}>Crecimiento Proyectado</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Text style={styles.summaryLabel}>Estado Actual</Text>
                  <Text style={styles.summaryValue}>S/ {Number(generatedOffer.businessCurrentRevenue ?? 0).toLocaleString()}</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Text style={styles.summaryLabel}>Crecimiento</Text>
                  <Text style={[styles.summaryValue, { color: colors.success }]}>+{generatedOffer.projectedGrowth}%</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Text style={styles.summaryLabel}>Proyección</Text>
                  <Text style={styles.summaryValue}>S/ {(Number(generatedOffer.businessCurrentRevenue ?? 0) * (1 + generatedOffer.projectedGrowth / 100)).toLocaleString()}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.cardBackground, borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: colors.dark, shadowOffset:{ width:0, height:2 }, shadowOpacity:0.1, shadowRadius:3.84, elevation:5 },
  container_filtro: { flex: 1, backgroundColor: colors.background, padding: 16 },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderWidth:1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, height: 40 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  filterChipTextActive: {
    color: colors.light,
    fontWeight: '600',
  },
  businessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  businessIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  businessMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: colors.light,
    fontSize: 11,
    fontWeight: '700',
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.light,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.light,
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  templateCardActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  templateName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  templateDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input_filtro: { flex: 1, color: colors.textPrimary, fontSize: 14, marginLeft: 8 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.cardBackground,
    color: colors.textPrimary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.light,
    fontWeight: '600',
    marginLeft: 4,
  },
  productoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  removeButton: {
    padding: 4,
  },
  productoRow: {
    flexDirection: 'row',
  },
  productoSubtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  subtotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  suggestedSection: {
    marginTop: 16,
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  suggestedCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    minWidth: 120,
  },
  suggestedName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  suggestedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  suggestedCategory: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: 16,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '90%',
  },
});
