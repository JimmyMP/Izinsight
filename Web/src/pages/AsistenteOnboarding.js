import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  MessageCircle, 
  FileText, 
  Video, 
  HelpCircle,
  Search,
  BookOpen,
  Settings,
  Download,
  Play
} from 'lucide-react';

const AsistenteOnboarding = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '¡Hola! Soy tu asistente virtual de Izi-Copilot. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const messagesEndRef = useRef(null);
  const isInitialLoad = useRef(true);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  useEffect(() => {
    // Solo hacer scroll si hay mensajes y no es el mensaje inicial
    if (messages.length > 1 && !isInitialLoad.current) {
      scrollToBottom();
    }
    // Marcar que ya no es la carga inicial después del primer render
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  }, [messages]);

  // Base de conocimiento del chatbot
  const knowledgeBase = {
    general: {
      'hola': '¡Hola! ¿Cómo puedo ayudarte hoy?',
      'ayuda': 'Puedo ayudarte con:\n• Activación de productos\n• Capacitación de clientes\n• Resolución de dudas técnicas\n• Reportes y métricas\n\n¿Qué necesitas?',
      'gracias': '¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?'
    },
    activation: {
      'activar pos': 'Para activar el POS móvil:\n1. Conecta el dispositivo por Bluetooth\n2. Abre la app IziPay\n3. Selecciona "Activar POS"\n4. Sigue las instrucciones en pantalla\n\n¿Necesitas ayuda con algún paso específico?',
      'activar link': 'Para activar el Link de Pagos:\n1. Ve a la sección "Links" en la app\n2. Crea un nuevo link\n3. Personaliza el monto y descripción\n4. Comparte el link con tu cliente\n\n¿Te gustaría ver el video tutorial?',
      'activar app': 'Para activar la App IziPay:\n1. Descarga la app desde App Store/Play Store\n2. Registra tu cuenta con tu número de ejecutivo\n3. Completa la verificación\n4. ¡Listo para usar!\n\n¿Tienes problemas con el registro?',
      'pago cuotas': 'Para activar pagos en cuotas:\n1. Ve a Configuración > Productos\n2. Selecciona "Pagos en Cuotas"\n3. Configura los plazos disponibles\n4. Activa la función\n\n¿Necesitas ayuda con la configuración?'
    },
    training: {
      'capacitar cliente': 'Para capacitar a tu cliente:\n1. Agenda una sesión de 30 minutos\n2. Usa los videos de capacitación\n3. Haz una demostración práctica\n4. Resuelve dudas específicas\n\n¿Quieres que te envíe los materiales de capacitación?',
      'video capacitacion': 'Videos de capacitación disponibles:\n• Configuración inicial del POS\n• Uso del Link de Pagos\n• Gestión de reportes\n• Resolución de problemas\n\n¿Cuál te interesa ver?',
      'manual usuario': 'Manuales disponibles:\n• Guía rápida del POS móvil\n• Manual completo de la app\n• Guía de Link de Pagos\n• FAQ de problemas comunes\n\n¿Qué manual necesitas?'
    },
    technical: {
      'error conexion': 'Si hay error de conexión:\n1. Verifica que el dispositivo tenga internet\n2. Reinicia la app\n3. Verifica la configuración Bluetooth\n4. Contacta soporte si persiste\n\n¿En qué paso específico tienes problemas?',
      'no funciona': 'Para diagnosticar el problema:\n1. ¿Qué producto específico no funciona?\n2. ¿Qué error aparece?\n3. ¿En qué dispositivo?\n\nProporciona estos detalles para ayudarte mejor.',
      'soporte tecnico': 'Para contacto con soporte técnico:\n• Teléfono: 0800-IZIPAY\n• Email: soporte@izipay.com\n• Chat en vivo: Disponible 24/7\n\n¿Prefieres algún método específico?'
    },
    reports: {
      'reporte ventas': 'Para generar reportes de ventas:\n1. Ve a la sección "Reportes"\n2. Selecciona el período\n3. Elige el tipo de reporte\n4. Descarga en PDF/Excel\n\n¿Qué tipo de reporte necesitas?',
      'metricas cliente': 'Para ver métricas del cliente:\n1. Busca el cliente en tu lista\n2. Ve a la pestaña "Métricas"\n3. Revisa transacciones, crecimiento, etc.\n4. Compara con benchmarks\n\n¿De qué cliente necesitas información?'
    }
  };

  // Categorías de ayuda rápida
  const quickHelpCategories = [
    {
      id: 'activation',
      title: 'Activación de Productos',
      icon: Settings,
      color: '#3b82f6',
      topics: [
        '¿Cómo activar el POS móvil?',
        '¿Cómo configurar Link de Pagos?',
        '¿Cómo activar la App IziPay?',
        '¿Cómo activar pagos en cuotas?'
      ]
    },
    {
      id: 'training',
      title: 'Capacitación',
      icon: BookOpen,
      color: '#10b981',
      topics: [
        '¿Cómo capacitar a mi cliente?',
        '¿Dónde están los videos de capacitación?',
        '¿Hay manuales disponibles?',
        '¿Cómo hacer una demostración?'
      ]
    },
    {
      id: 'technical',
      title: 'Soporte Técnico',
      icon: HelpCircle,
      color: '#ef4444',
      topics: [
        'Error de conexión',
        'El producto no funciona',
        'Contactar soporte técnico',
        'Problemas con la app'
      ]
    },
    {
      id: 'reports',
      title: 'Reportes y Métricas',
      icon: FileText,
      color: '#f59e0b',
      topics: [
        '¿Cómo generar reportes?',
        '¿Cómo ver métricas del cliente?',
        '¿Cómo exportar datos?',
        '¿Cómo interpretar los datos?'
      ]
    }
  ];

  // Recursos disponibles
  const resources = [
    {
      id: 1,
      title: 'Guía de Activación POS Móvil',
      type: 'video',
      duration: '5:30',
      description: 'Tutorial paso a paso para activar el POS móvil',
      icon: Video,
      url: '#'
    },
    {
      id: 2,
      title: 'Manual Completo de la App',
      type: 'pdf',
      size: '2.3 MB',
      description: 'Documentación completa de todas las funciones',
      icon: FileText,
      url: '#'
    },
    {
      id: 3,
      title: 'Video: Capacitación de Clientes',
      type: 'video',
      duration: '12:45',
      description: 'Cómo capacitar efectivamente a tus clientes',
      icon: Video,
      url: '#'
    },
    {
      id: 4,
      title: 'FAQ - Preguntas Frecuentes',
      type: 'pdf',
      size: '1.1 MB',
      description: 'Respuestas a las preguntas más comunes',
      icon: FileText,
      url: '#'
    }
  ];

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Buscar en la base de conocimiento
    for (const category in knowledgeBase) {
      for (const key in knowledgeBase[category]) {
        if (lowerMessage.includes(key)) {
          return knowledgeBase[category][key];
        }
      }
    }

    // Respuesta por defecto
    return 'Entiendo tu consulta. Te sugiero revisar las categorías de ayuda rápida o contactar directamente con soporte técnico si es algo específico. ¿En qué puedo ayudarte más?';
  };

  const handleQuickHelp = (topic) => {
    sendMessage(topic);
  };

  const handleResourceClick = (resource) => {
    // Aquí podrías abrir el recurso en una nueva pestaña o modal
    console.log('Abriendo recurso:', resource.title);
  };

  return (
    <div className="asistente-onboarding">
      <div className="page-header">
        <h1 className="page-title">🤖 Asistente de Onboarding</h1>
        <p className="page-subtitle">
          Tu chatbot interno para resolver dudas y capacitar mejor a tus clientes
        </p>
      </div>

      <div className="content-grid">
        {/* Chat Principal */}
        <div className="card chat-container">
          <div className="chat-header">
            <div className="chat-title">
              <Bot size={24} />
              <h3>Asistente Virtual Izi-Copilot</h3>
            </div>
            <div className="chat-status">
              <span className="status-dot online"></span>
              <span>En línea</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.type}`}
              >
                <div className="message-content">
                  {message.type === 'bot' && (
                    <div className="message-avatar">
                      <Bot size={20} />
                    </div>
                  )}
                  <div className="message-bubble">
                    <p>{message.content}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content">
                  <div className="message-avatar">
                    <Bot size={20} />
                  </div>
                  <div className="message-bubble typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              placeholder="Escribe tu pregunta..."
              disabled={isTyping}
            />
            <button 
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Panel de Ayuda Rápida */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Ayuda Rápida</h3>
          </div>
          
          <div className="quick-help-categories">
            {quickHelpCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div 
                  key={category.id}
                  className={`help-category ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="category-header">
                    <div className="category-icon" style={{ backgroundColor: category.color }}>
                      <Icon size={20} color="white" />
                    </div>
                    <h4>{category.title}</h4>
                  </div>
                  
                  {selectedCategory === category.id && (
                    <div className="category-topics">
                      {category.topics.map((topic, index) => (
                        <button
                          key={index}
                          className="topic-button"
                          onClick={() => handleQuickHelp(topic)}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recursos de Capacitación */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recursos de Capacitación</h3>
          <button className="btn btn-secondary">
            <Search size={16} />
            Buscar más recursos
          </button>
        </div>
        
        <div className="resources-grid">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div 
                key={resource.id}
                className="resource-card"
                onClick={() => handleResourceClick(resource)}
              >
                <div className="resource-icon">
                  <Icon size={24} />
                </div>
                <div className="resource-info">
                  <h4>{resource.title}</h4>
                  <p>{resource.description}</p>
                  <div className="resource-meta">
                    {resource.type === 'video' ? (
                      <span className="resource-duration">
                        <Play size={14} />
                        {resource.duration}
                      </span>
                    ) : (
                      <span className="resource-size">
                        <FileText size={14} />
                        {resource.size}
                      </span>
                    )}
                  </div>
                </div>
                <button className="resource-action">
                  {resource.type === 'video' ? <Play size={16} /> : <Download size={16} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
};

export default AsistenteOnboarding;
