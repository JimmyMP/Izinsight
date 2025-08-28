# Izi Copilot Mobile

Plataforma de Inteligencia 360° para el Vendedor de IziPay – Versión Móvil (Expo)

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

## Prerrequisitos

- Node.js 18 o superior
- Expo CLI (opcional): `npm i -g expo`
- Dispositivo con Expo Go instalado o emulador (Android Studio / Xcode)

## Instalación y ejecución

1) Instala dependencias
```bash
npm install
```

2) Ejecuta en desarrollo (elige tu destino)
```bash
# Abre el servidor de desarrollo
npm run start

# Android (emulador o dispositivo con ADB)
npm run android

# iOS (solo macOS con Xcode)
npm run ios

# Web (React Native Web)
npm run web
```

3) Conectar con Expo Go
- Desde el terminal de Expo, escanea el QR con Expo Go.
- Si tu red bloquea conexiones LAN, usa el modo túnel desde la interfaz de Expo.

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

## Scripts disponibles

- `npm run start`: Inicia el servidor de desarrollo de Expo
- `npm run android`: Abre la app en un dispositivo/emulador Android
- `npm run ios`: Abre la app en iOS (macOS)
- `npm run web`: Ejecuta en navegador (React Native Web)
- `npm run lint`: Ejecuta el linter

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

## Solución de problemas

- El QR no carga en Expo Go:
  - Cambia a modo "tunnel" desde la UI de Expo (conexiones restringidas en LAN).
  - Verifica que el dispositivo y el PC estén en la misma red.
- Error con `react-native-reanimated`: Asegúrate de reiniciar el bundler tras instalar dependencias.
- No abre en Android:
  - Abre Android Studio, instala el SDK y crea/arranca un emulador, o conecta un dispositivo con "Depuración USB".
- Tipos/TSXX: Ejecuta `npm install` y reinicia el servidor si agregaste/actualizaste paquetes.
