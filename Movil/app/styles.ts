import { StyleSheet } from 'react-native';

// Colores principales de IziPay
export const colors = {
  // Colores principales
  primary: '#E53E3E', // Rojo IziPay
  secondary: '#38B2AC', // Teal IziPay
  accent: '#63B3ED', // Azul claro
  
  // Colores de estado
  success: '#38B2AC', // Teal para éxito
  warning: '#ECC94B', // Amarillo para advertencias
  danger: '#E53E3E', // Rojo para errores
  
  // Colores neutros
  dark: '#000000', // Negro
  light: '#FFFFFF', // Blanco
  border: '#E2E8F0', // Gris claro
  
  // Colores de texto
  textPrimary: '#000000', // Negro para texto principal
  textSecondary: '#4A5568', // Gris para texto secundario
  
  // Colores adicionales para móvil
  background: '#F7FAFC', // Fondo principal
  cardBackground: '#FFFFFF', // Fondo de tarjetas
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay para modales
};

// Estilos comunes
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  
  text: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: '600',
  },
  
  input: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  
  chip: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  
  chipText: {
    color: colors.light,
    fontSize: 14,
    fontWeight: '500',
  },
  
  metricCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Estilos específicos para componentes
export const componentStyles = StyleSheet.create({
  // Estilos para el Dashboard
  dashboardMetric: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 100,
  },
  
  // Estilos para las oportunidades
  opportunityCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Estilos para las ofertas
  offerSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Estilos para el onboarding
  onboardingStep: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Estilos para el monitoreo
  kpiCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
  },
  
  // Estilos para reportes
  reportCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
