import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Target, 
  Bot, 
  Activity, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    {
      path: '/',
      icon: Home,
      label: 'Dashboard',
      description: 'Vista general del sistema'
    },
    {
      path: '/mapa-oportunidades',
      icon: Map,
      label: 'Mapa de Oportunidades',
      description: '🗺️ Mapa de calor de oportunidades'
    },
    {
      path: '/generador-ofertas',
      icon: Target,
      label: 'Generador de Ofertas',
      description: '🎯 Ofertas personalizadas inteligentes'
    },
    {
      path: '/asistente-onboarding',
      icon: Bot,
      label: 'Asistente Onboarding',
      description: '🤖 Chatbot de soporte interno'
    },
    {
      path: '/panel-monitoreo',
      icon: Activity,
      label: 'Panel de Monitoreo',
      description: '🚨 Sistema de alertas tempranas'
    },
    {
      path: '/reportes-inteligencia',
      icon: BarChart3,
      label: 'Reportes Inteligencia',
      description: '🚀 Inteligencia de negocio'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">🚀</div>
            <div className="logo-text">
              <h2 className="logo-title-inline">
                <span style={{ color: '#FFFFFF', fontSize: '2.25rem', fontWeight: '800', margin: 0, lineHeight: '1.05' }}>izi</span>
                <span style={{ color: '#38B2AC', fontSize: '2.25rem', fontWeight: '800', margin: 0, lineHeight: '1.05' }}>nsight</span>
              </h2>
              <span>Inteligencia 360°</span>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={20} />
                <div className="nav-content">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-description">{item.description}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">Carlos Mendoza</span>
              <span className="user-role">Ejecutivo IziPay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="logo">
                <div className="logo-icon">🚀</div>
                <div className="logo-text">
                  <h2>Izi-Copilot</h2>
                </div>
              </div>
              <button className="mobile-menu-close" onClick={toggleMobileMenu}>
                <X size={24} />
              </button>
            </div>
            <nav className="mobile-nav">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => 
                      `mobile-nav-item ${isActive ? 'active' : ''}`
                    }
                    onClick={toggleMobileMenu}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
