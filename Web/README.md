# 🚀 izinsight - Plataforma de Inteligencia 360° para el Vendedor

Una plataforma integral que centraliza la información y la transforma en acciones concretas y proactivas para los ejecutivos de IziPay.

## 📋 Descripción

izinsight es una herramienta de inteligencia de negocio diseñada específicamente para los vendedores de IziPay. La plataforma integra datos de múltiples fuentes para proporcionar insights accionables y automatizar procesos de venta y seguimiento de clientes.

## 🎯 Características Principales

### 1. 🗺️ Mapa de Oportunidades
- **Mapa de Calor de Oportunidades**: Visualiza zonas con alta densidad comercial pero baja penetración de IziPay
- **Análisis de Datos**: Cruza información de IziPay con datos públicos (INEI, Google Maps)
- **Identificación de Eventos**: Detecta ferias, convenciones y eventos comerciales
- **Filtros Avanzados**: Por densidad comercial, penetración y tipo de negocio

### 2. 🎯 Generador de Ofertas Inteligentes
- **Ofertas Personalizadas**: Basadas en el perfil específico del comercio
- **Benchmarking Automático**: Compara con casos de éxito similares
- **Pitch de Ventas**: Genera argumentos de venta personalizados
- **Análisis de ROI**: Calcula retorno de inversión proyectado

### 3. 🤖 Asistente de Onboarding
- **Chatbot Interno**: Resuelve dudas de vendedores en tiempo real
- **Base de Conocimiento**: Acceso a manuales, videos y recursos de capacitación
- **Ayuda Contextual**: Respuestas específicas por categoría de consulta
- **Recursos Descargables**: Manuales, guías y materiales de capacitación

### 4. 🚨 Panel de Monitoreo Proactivo
- **Alertas en Tiempo Real**: Notificaciones de incidencias sistémicas
- **Seguimiento de Clientes**: Monitoreo de casos de soporte pendientes
- **Detección de Caídas**: Identifica disminuciones en ventas de clientes
- **Acciones Automatizadas**: Envío de mensajes pre-aprobados

### 5. 📊 Reportes de Inteligencia de Negocio
- **Análisis Comparativo**: Compara métricas con benchmarks del sector
- **Insights Accionables**: Recomendaciones específicas por cliente
- **Top Performers**: Identifica los mejores casos de éxito
- **Exportación de Datos**: Reportes descargables en múltiples formatos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18
- **Routing**: React Router DOM
- **Iconos**: Lucide React
- **Gráficos**: Recharts
- **Mapas**: Leaflet + React Leaflet
- **Estilos**: CSS3 con variables CSS personalizadas
- **Responsive**: Diseño mobile-first

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18 o superior
- npm

### Pasos de Instalación

1) Instalar dependencias
```bash
npm install
```

2) Ejecutar en modo desarrollo
```bash
npm start
```

3) Abrir en el navegador: `http://localhost:3000`

### Scripts Disponibles

- `npm start`: Ejecuta la aplicación en modo desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm run eject`: Expone la configuración de webpack (irreversible)

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Sidebar.js      # Barra lateral de navegación
│   └── Sidebar.css     # Estilos del sidebar
├── pages/              # Páginas principales
│   ├── Dashboard.js    # Dashboard principal
│   ├── MapaOportunidades.js
│   ├── GeneradorOfertas.js
│   ├── AsistenteOnboarding.js
│   ├── PanelMonitoreo.js
│   └── ReportesInteligencia.js
├── App.js              # Componente principal
├── App.css             # Estilos de la aplicación
├── index.js            # Punto de entrada
├── index.css           # Estilos globales
└── components.css      # Estilos específicos de componentes
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Primario**: #2563eb (Azul)
- **Secundario**: #1e40af (Azul oscuro)
- **Éxito**: #10b981 (Verde)
- **Advertencia**: #f59e0b (Amarillo)
- **Peligro**: #ef4444 (Rojo)

### Responsive Design
- **Desktop**: Layout de 2 columnas con sidebar fijo
- **Tablet**: Layout adaptativo con navegación móvil
- **Mobile**: Layout de 1 columna con menú hamburguesa

## 🔧 Configuración de APIs

### Mapas (Leaflet)
```javascript
// Configuración de tiles de OpenStreetMap
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
/>
```

### Datos Simulados
El proyecto incluye datos simulados para demostración. En producción, estos deberían ser reemplazados por llamadas a APIs reales.

## 📱 Funcionalidades por Módulo

### Dashboard
- Resumen de métricas clave
- Gráficos de rendimiento semanal
- Actividad reciente
- Acciones rápidas

### Mapa de Oportunidades
- Visualización de zonas de oportunidad
- Filtros por densidad y penetración
- Información detallada de zonas
- Exportación de datos

### Generador de Ofertas
- Selección de comercios
- Generación automática de ofertas
- Análisis de benchmarking
- Pitch de ventas personalizado

### Asistente Onboarding
- Chat interactivo
- Base de conocimiento categorizada
- Recursos de capacitación
- Estadísticas de uso

### Panel de Monitoreo
- Alertas en tiempo real
- Filtros por prioridad y tipo
- Detalles de alertas
- Gráficos de tendencias

### Reportes de Inteligencia
- Selección de clientes
- Generación de reportes
- Análisis comparativo
- Recomendaciones estratégicas

## 🔒 Seguridad

- Validación de entrada en formularios
- Sanitización de datos
- Manejo seguro de archivos de descarga
- Protección contra XSS

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Servir build estático
```bash
npm install -g serve
serve -s build
```

### Hosting sugerido
- Cualquier hosting estático (Netlify, Vercel, GitHub Pages, Nginx)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- Email: soporte@izipay.com
- Teléfono: 0800-IZIPAY

## 🔮 Roadmap

### Versión 2.0
- [ ] Integración con APIs reales de IziPay
- [ ] Machine Learning para predicciones
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Integración con CRM

### Versión 2.1
- [ ] Dashboard personalizable
- [ ] Reportes automáticos por email
- [ ] Integración con WhatsApp Business
- [ ] Análisis de sentimientos
- [ ] Gamificación para vendedores

---

**Desarrollado con ❤️ para IziPay**
