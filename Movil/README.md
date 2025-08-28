# Izi Copilot Mobile

Plataforma de Inteligencia 360° para el Vendedor de IziPay - Versión Móvil

## Descripción

Esta es la versión móvil de la plataforma Izi Copilot, desarrollada con React Native y Expo. La aplicación proporciona todas las funcionalidades de la versión web adaptadas para dispositivos móviles, con una interfaz optimizada para pantallas táctiles.

## Características

- **Dashboard Interactivo**: Métricas en tiempo real y gráficos interactivos
- **Gestión de Oportunidades**: Visualización en cuadros con filtros avanzados
- **Generador de Ofertas**: Creación rápida de ofertas profesionales
- **Asistente de Onboarding**: Proceso guiado para nuevos clientes
- **Panel de Monitoreo**: Seguimiento en tiempo real de métricas
- **Reportes de Inteligencia**: Análisis detallado y insights

## Tecnologías

- React Native
- Expo
- TypeScript
- React Native Chart Kit
- Ionicons
- Expo Router

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npx expo start --tunnel
   ```

4. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil

## Estructura del Proyecto

```
Movil/
├── app/
│   ├── _layout.tsx          # Layout principal con navegación
│   ├── index.tsx            # Dashboard principal
│   ├── oportunidades.tsx    # Gestión de oportunidades
│   ├── ofertas.tsx          # Generador de ofertas
│   ├── onboarding.tsx       # Asistente de onboarding
│   ├── monitoreo.tsx        # Panel de monitoreo
│   └── reportes.tsx         # Reportes de inteligencia
├── package.json
├── app.json
└── README.md
```

## Funcionalidades Principales

### Dashboard
- Métricas en tiempo real
- Gráficos interactivos
- Acciones rápidas
- Actividad reciente

### Oportunidades
- Lista de oportunidades en cuadros
- Filtros por potencial y estado
- Búsqueda avanzada
- Acciones rápidas (llamar, email, dirección)

### Generador de Ofertas
- Plantillas predefinidas
- Información del cliente
- Productos y servicios
- Cálculo automático de totales
- Condiciones comerciales

### Onboarding
- Proceso de 4 pasos
- Información personal y empresarial
- Necesidades y objetivos
- Resumen final

### Monitoreo
- KPIs en tiempo real
- Gráficos de rendimiento
- Alertas y notificaciones
- Actividad reciente

### Reportes
- Múltiples tipos de reportes
- Gráficos interactivos
- Insights automáticos
- Top performers
- Acciones recomendadas

## Diseño

La aplicación utiliza un diseño moderno y accesible con:
- Paleta de colores consistente
- Iconografía clara
- Navegación intuitiva
- Componentes reutilizables
- Responsive design

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT.
