# izinsight – Monorepo (Web + Móvil)

Plataforma de Inteligencia 360° para el Vendedor de IziPay.

Este repositorio contiene dos aplicaciones:
- `Web/` (React 18 con Create React App)
- `Movil/` (React Native + Expo)

## Estructura

```
Izinsight/
├── Web/                    # App web (CRA)
│   ├── src/
│   └── README.md
├── Movil/                  # App móvil (Expo)
│   ├── app/
│   └── README.md
└── README.md               # Este archivo
```

## Prerrequisitos

- Node.js 18 o superior
- npm
- Para móvil: Expo Go (dispositivo) o emulador (Android Studio / Xcode)

## Instalación

Instala dependencias por subproyecto:
```bash
# Web
cd Web
npm install

# Móvil
cd ../Movil
npm install
```

## Desarrollo – Web

```bash
cd Web
npm start
# Abre http://localhost:3000
```

Scripts (Web):
- `npm start`: Dev server
- `npm run build`: Build de producción
- `npm test`: Pruebas
- `npm run eject`: Eject (irreversible)

## Desarrollo – Móvil (Expo)

```bash
cd Movil
npm run start        # Inicia el bundler de Expo
npm run android      # Emulador/dispositivo Android
npm run ios          # iOS (solo macOS con Xcode)
npm run web          # Ejecutar en navegador
```

Scripts (Móvil):
- `npm run start`: Servidor de desarrollo de Expo
- `npm run android`: Abrir en Android
- `npm run ios`: Abrir en iOS
- `npm run web`: React Native Web
- `npm run lint`: Linter

## Ejecutar ambos a la vez (opcional)

En dos terminales:
```bash
# Terminal 1 (Web)
cd Web && npm start

# Terminal 2 (Móvil)
cd Movil && npm run start
```

## Variables de entorno

Actualmente los proyectos usan datos locales. Si se agregan APIs, define variables por entorno dentro de cada subproyecto.

## Solución de problemas

- Expo QR no conecta:
  - Usa modo "tunnel" desde la UI de Expo.
  - Verifica que PC y móvil estén en la misma red.
- Android no abre:
  - Instala Android Studio, SDK y arranca un emulador; o conecta un dispositivo con Depuración USB.
- Error con `react-native-reanimated`:
  - Reinicia el bundler tras instalar dependencias.
- CRA no arranca en `Web/`:
  - Borra `node_modules` y `package-lock.json`, luego `npm install` y reintenta.

## Licencia

MIT.
