import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './styles';

type Message = {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: number;
};

export default function Onboarding() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', content: '¡Hola! Soy tu asistente virtual de Izinsight. ¿En qué puedo ayudarte hoy?', timestamp: Date.now() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'activation' | 'training' | 'technical' | 'reports'>('activation');
  const chatScrollRef = useRef<ScrollView>(null);

  const knowledgeBase: Record<string, Record<string, string>> = {
    general: {
      hola: '¡Hola! ¿Cómo puedo ayudarte hoy?',
      ayuda: 'Puedo ayudarte con: activación de productos, capacitación, dudas técnicas y reportes. ¿Qué necesitas?',
      gracias: '¡De nada! ¿Algo más en lo que pueda asistirte?'
    },
    activation: {
      'activar pos': 'Para activar el POS móvil: 1) Conecta por Bluetooth 2) Abre la app IziPay 3) Selecciona "Activar POS" 4) Sigue las instrucciones. ¿Necesitas ayuda en algún paso?',
      'activar link': 'Para activar Link de Pagos: 1) Ve a "Links" 2) Crea un link 3) Personaliza monto y descripción 4) Compártelo. ¿Te muestro un ejemplo?',
      'activar app': 'Para activar la App IziPay: 1) Descarga la app 2) Registra tu cuenta 3) Completa verificación 4) Lista para usar. ¿Problemas con el registro?',
      'pago cuotas': 'Pagos en cuotas: Configuración en Ajustes > Productos > Cuotas. Define plazos y activa. ¿Quieres buenas prácticas?'
    },
    training: {
      'capacitar cliente': 'Capacita a tu cliente: agenda 30 minutos, usa videos, demo práctica y resuelve dudas. ¿Te envío materiales?',
      'video capacitacion': 'Videos: POS inicial, Link de pagos, Reportes, Troubleshooting. ¿Cuál quieres?',
      'manual usuario': 'Manuales: Guía rápida POS, Manual app, Guía Link de Pagos, FAQ. ¿Cuál necesitas?'
    },
    technical: {
      'error conexion': 'Verifica internet, reinicia app, revisa Bluetooth. Si persiste, contacta soporte. ¿Qué error exacto ves?',
      'no funciona': 'Ayúdame con: producto, error, dispositivo. Con eso te oriento mejor.',
      'soporte tecnico': 'Soporte: Tel 0800-IZIPAY, Email soporte@izipay.com, Chat 24/7. ¿Cuál prefieres?'
    },
    reports: {
      'reporte ventas': 'Reportes: sección Reportes > periodo > tipo > descargar. ¿Qué periodo?',
      'metricas cliente': 'Métricas: busca cliente > pestaña Métricas > transacciones, crecimiento, etc. ¿Qué cliente?'
    }
  };

  // Respuestas predeterminadas por pregunta exacta (normalizada)
  const predefinedQAs: Record<string, string> = {
    '¿como activar el pos movil?': 'Para activar el POS móvil: 1) Conecta por Bluetooth 2) Abre la app IziPay 3) Selecciona "Activar POS" 4) Sigue las instrucciones. Puedo guiarte paso a paso.',
    '¿como configurar link de pagos?': 'Link de Pagos: 1) Ve a la sección "Links" 2) Crea un nuevo link 3) Define monto y descripción 4) Compártelo por WhatsApp o email.',
    '¿como activar la app izipay?': 'App IziPay: 1) Descarga la app 2) Registra tu cuenta con tu número de ejecutivo 3) Completa verificación 4) ¡Lista para usar! ',
    '¿como activar pagos en cuotas?': 'Pagos en cuotas: Ajustes > Productos > Cuotas. Configura plazos (3, 6, 12) y activa. Revisa los costos antes de habilitarlo.',
    '¿como capacitar a mi cliente?': 'Sugerencia: agenda 30 min, comparte videos básicos, haz una demo práctica y resuelve dudas. Te puedo enviar un guion de capacitación.',
    '¿donde estan los videos de capacitacion?': 'Videos: configuración POS, Link de Pagos, Reportes, resolución de problemas. Dime cuál necesitas y te envío el enlace.',
    '¿hay manuales disponibles?': 'Sí. Manual completo de la app, guía rápida del POS, guía de Link de Pagos y FAQ. ¿Cuál te interesa?',
    '¿como hacer una demostracion?': 'Demo recomendada: simula una venta con tarjeta y otra con Link de Pagos, muestra reportes y responde preguntas frecuentes.',
    '¿error de conexion?': 'Verifica internet, reinicia la app y Bluetooth. Si continúa, reinstala o contacta soporte. Puedo guiarte en diagnóstico.',
    '¿el producto no funciona?': 'Detállame: producto, error y dispositivo. Con eso te doy pasos concretos para resolver.',
    '¿contactar soporte tecnico?': 'Soporte: Tel 0800-IZIPAY · Email soporte@izipay.com · Chat 24/7. ¿Cuál prefieres?',
    '¿problemas con la app?': 'Prueba: cerrar sesión y reingresar, actualizar app, revisar permisos y conexión. Si sigue, te ayudo a escalar a soporte.',
    '¿como generar reportes?': 'Reportes: entra a Reportes, elige periodo y tipo (ventas, clientes), luego descarga. ¿Qué periodo necesitas?',
    '¿como ver metricas del cliente?': 'Busca el cliente, pestaña Métricas: transacciones, crecimiento y comparativos. ¿Nombre del cliente?',
    '¿como exportar datos?': 'En Reportes, selecciona el tipo y periodo, y luego Exportar (PDF/Excel). Puedo sugerir plantillas.',
    '¿como interpretar los datos?': 'Te explico: revisa tendencia de ventas, ticket promedio y recurrencia. Compara con benchmark del sector para decisiones.',
  };

  const normalize = (s: string) => s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s?¡!¿.,]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const quickHelpCategories = [
    { id: 'activation', title: 'Activación de Productos', icon: 'settings', color: '#3b82f6', topics: [
      '¿Cómo activar el POS móvil?',
      '¿Cómo configurar Link de Pagos?',
      '¿Cómo activar la App IziPay?',
      '¿Cómo activar pagos en cuotas?'
    ]},
    { id: 'training', title: 'Capacitación', icon: 'book', color: '#10b981', topics: [
      '¿Cómo capacitar a mi cliente?',
      '¿Dónde están los videos de capacitación?',
      '¿Hay manuales disponibles?',
      '¿Cómo hacer una demostración?'
    ]},
    { id: 'technical', title: 'Soporte Técnico', icon: 'help', color: '#ef4444', topics: [
      'Error de conexión',
      'El producto no funciona',
      'Contactar soporte técnico',
      'Problemas con la app'
    ]},
    { id: 'reports', title: 'Reportes y Métricas', icon: 'document', color: '#f59e0b', topics: [
      '¿Cómo generar reportes?',
      '¿Cómo ver métricas del cliente?',
      '¿Cómo exportar datos?',
      '¿Cómo interpretar los datos?'
    ]},
  ] as const;

  const resources = [
    { id: 1, title: 'Guía de Activación POS Móvil', type: 'video', meta: '5:30', description: 'Tutorial paso a paso para activar el POS móvil' },
    { id: 2, title: 'Manual Completo de la App', type: 'pdf', meta: '2.3 MB', description: 'Documentación completa de todas las funciones' },
    { id: 3, title: 'Video: Capacitación de Clientes', type: 'video', meta: '12:45', description: 'Cómo capacitar efectivamente a tus clientes' },
    { id: 4, title: 'FAQ - Preguntas Frecuentes', type: 'pdf', meta: '1.1 MB', description: 'Respuestas a preguntas comunes' },
  ];

  const scrollChatToBottom = () => {
    requestAnimationFrame(() => {
      chatScrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (text: string) => {
    const norm = normalize(text);
    // 1) Coincidencia exacta en preguntas predeterminadas
    if (predefinedQAs[norm]) return predefinedQAs[norm];
    // 2) Búsqueda flexible en base de conocimiento
    for (const cat of Object.keys(knowledgeBase)) {
      const entries = knowledgeBase[cat];
      for (const key of Object.keys(entries)) {
        if (norm.includes(normalize(key))) return entries[key];
      }
    }
    // 3) Fallback
    return 'Aun me falta entrenar, contratame para entrenar';
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: Date.now(), type: 'user', content: trimmed, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    setTimeout(() => {
      const botText = generateBotResponse(trimmed);
      const botMsg: Message = { id: Date.now() + 1, type: 'bot', content: botText, timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickTopic = (topic: string) => {
    sendMessage(topic);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🤖 Asistente de Onboarding</Text>
          <Text style={styles.subtitle}>Resuelve dudas y capacita mejor a tus clientes</Text>
        </View>

        {/* Chat */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Chat</Text>
          <ScrollView ref={chatScrollRef} style={styles.chatScroll} contentContainerStyle={styles.chatContent} nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {messages.map((m) => (
              <View key={m.id} style={[styles.messageRow, m.type === 'user' ? styles.messageRowUser : styles.messageRowBot]}>
                {m.type === 'bot' && (
                  <View style={styles.avatar}><Ionicons name="chatbubble-ellipses" size={16} color={colors.light} /></View>
                )}
                <View style={[styles.bubble, m.type === 'user' ? styles.bubbleUser : styles.bubbleBot]}>
                  <Text style={[styles.messageText, m.type === 'user' ? { color: colors.light } : { color: colors.textPrimary }]}>{m.content}</Text>
                  <Text style={styles.timeText}>{new Date(m.timestamp).toLocaleTimeString()}</Text>
                </View>
              </View>
            ))}
            {isTyping && (
              <View style={[styles.messageRow, styles.messageRowBot]}>
                <View style={styles.avatar}><Ionicons name="chatbubble-ellipses" size={16} color={colors.light} /></View>
                <View style={[styles.bubble, styles.bubbleBot]}>
                  <View style={styles.typingDots}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input dentro del chat */}
          <View style={[styles.inputBar, { marginTop: 8 }] }>
            <TextInput
              style={styles.input}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Escribe tu pregunta..."
              placeholderTextColor={colors.textSecondary}
              onSubmitEditing={() => sendMessage(inputMessage)}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage(inputMessage)} disabled={!inputMessage.trim() || isTyping}>
              <Ionicons name="send" size={18} color={colors.light} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Help */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.cardTitle}>Ayuda Rápida</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            {quickHelpCategories.map((cat) => (
              <TouchableOpacity key={cat.id} style={[styles.catChip, selectedCategory === cat.id && styles.catChipActive]} onPress={() => setSelectedCategory(cat.id as any)}>
                <Text style={[styles.catChipText, selectedCategory === cat.id && styles.catChipTextActive]}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.topicsWrap}>
            {quickHelpCategories.find(c => c.id === selectedCategory)?.topics.map((t, idx) => (
              <TouchableOpacity key={idx} style={styles.topicBtn} onPress={() => handleQuickTopic(t)}>
                <Text style={styles.topicBtnText}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Resources */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.cardTitle}>Recursos de Capacitación</Text>
          </View>
          <View style={styles.resourcesGrid}>
            {resources.map((r) => (
              <View key={r.id} style={styles.resourceItem}>
                <View style={styles.resourceIcon}><Ionicons name={r.type === 'video' ? 'play' : 'document-text'} size={16} color={colors.textPrimary} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resourceTitle}>{r.title}</Text>
                  <Text style={styles.resourceDesc}>{r.description}</Text>
                  <Text style={styles.resourceMeta}>{r.meta}</Text>
                </View>
                <TouchableOpacity style={styles.resourceAction}>
                  <Ionicons name={r.type === 'video' ? 'play' : 'download'} size={18} color={colors.light} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  header: { padding: 16 },
  title: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  card: { backgroundColor: colors.cardBackground, marginHorizontal: 16, marginBottom: 12, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 10 },
  chatScroll: { maxHeight: 360, minHeight: 180 },
  chatContent: { paddingBottom: 4 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 },
  messageRowBot: { },
  messageRowUser: { justifyContent: 'flex-end' },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  bubble: { maxWidth: '80%', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  bubbleBot: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  bubbleUser: { backgroundColor: colors.primary },
  messageText: { fontSize: 14 },
  timeText: { fontSize: 10, color: colors.textSecondary, marginTop: 4 },
  typingDots: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.textSecondary },
  catChip: { paddingHorizontal: 10, paddingVertical: 8, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 16, marginRight: 8 },
  catChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  catChipText: { color: colors.textSecondary, fontSize: 12 },
  catChipTextActive: { color: colors.light, fontWeight: '700' },
  topicsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  topicBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, marginRight: 8, marginBottom: 8 },
  topicBtnText: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  resourcesGrid: { },
  resourceItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  resourceIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  resourceTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  resourceDesc: { fontSize: 12, color: colors.textSecondary },
  resourceMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  resourceAction: { backgroundColor: colors.secondary, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, marginLeft: 8 },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.cardBackground },
  input: { flex: 1, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: colors.textPrimary, marginRight: 8 },
  sendBtn: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
});
