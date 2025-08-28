import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, commonStyles, componentStyles } from './styles';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const router = useRouter();

  const metricCards = [
    {
      title: 'Clientes Activos',
      value: '247',
      change: '+12%',
      icon: 'people',
      color: colors.success,
    },
    {
      title: 'Oportunidades Identificadas',
      value: '89',
      change: '+23%',
      icon: 'disc',
      color: colors.primary,
    },
    {
      title: 'Ventas del Mes',
      value: 'S/ 45,230',
      change: '+8%',
      icon: 'cash',
      color: colors.warning,
    },
    {
      title: 'Alertas Pendientes',
      value: '5',
      change: '-2',
      icon: 'alert',
      color: colors.danger,
    },
  ];

  const quickActions = [
    {
      title: 'Explorar Mapa de Oportunidades',
      description: 'Identifica zonas con alta densidad comercial',
      icon: 'location',
      color: colors.primary,
      to: '/oportunidades',
    },
    {
      title: 'Generar Oferta Personalizada',
      description: 'Crea ofertas basadas en datos de benchmarking',
      icon: 'radio-button-on',
      color: colors.success,
      to: '/ofertas',
    },
    {
      title: 'Revisar Alertas',
      description: 'Monitorea el estado de tus clientes',
      icon: 'warning',
      color: colors.primary,
      to: '/monitoreo',
    },
    {
      title: 'Generar Reporte',
      description: 'Crea reportes de inteligencia de negocio',
      icon: 'trending-up',
      color: colors.warning,
      to: '/reportes',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola, Carlos!</Text>
        <Text style={styles.subtitle}>Aquí tienes tu resumen del día</Text>
      </View>

      {/* Métricas */}
      <View style={styles.metricsContainer}>
        {metricCards.map((card, index) => (
          <View key={index} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name={card.icon as any} size={24} color={card.color} />
              <Text style={[styles.changeText, { color: card.color }]}>
                {card.change}
              </Text>
            </View>
            <Text style={styles.metricValue}>{card.value}</Text>
            <Text style={styles.metricTitle}>{card.title}</Text>
          </View>
        ))}
      </View>

      {/* Acciones Rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionItem}
            onPress={() => router.push(action.to as any)}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
              <Ionicons name={action.icon as any} size={24} color={colors.light} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDesc}>{action.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Se removieron gráficos según solicitud */}

      {/* Actividad Reciente */}
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          <TouchableOpacity onPress={() => router.push('/monitoreo' as any)}>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: colors.primary }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Nueva oportunidad identificada</Text>
              <Text style={styles.activitySubtitle}>Bodega "El Ahorro" en Miraflores - Alta densidad comercial</Text>
              <Text style={styles.activityTime}>Hace 2 horas</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: colors.warning }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Alerta de caída de ventas</Text>
              <Text style={styles.activitySubtitle}>Restaurante "La Cevichería" - 25% menos transacciones</Text>
              <Text style={styles.activityTime}>Hace 4 horas</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: colors.success }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Cliente activado exitosamente</Text>
              <Text style={styles.activitySubtitle}>Farmacia "Salud Total" - POS móvil configurado</Text>
              <Text style={styles.activityTime}>Hace 6 horas</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: colors.accent }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Evento comercial programado</Text>
              <Text style={styles.activitySubtitle}>Feria Gastronómica en San Isidro - 15 comercios objetivo</Text>
              <Text style={styles.activityTime}>Hace 1 día</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.light,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.light,
    opacity: 0.9,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  metricCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: (width - 40) / 2 - 5,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  actionDesc: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  quickActionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: (width - 52) / 2,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  activityList: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: colors.textSecondary,
    opacity: 0.7,
  },
});
