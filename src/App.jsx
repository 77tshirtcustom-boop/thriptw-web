import React, { useState, useEffect } from 'react';
import SpatialNavigation from 'spatial-navigation-js';
import LoginScreen from './components/LoginScreen';
import DashboardLayout from './components/DashboardLayout';
import AdminPanel from './components/AdminPanel';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    this.setState({ error, info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#ff4d4d', background: '#111', height: '100vh', fontFamily: 'monospace' }}>
          <h2>🚨 CRASH EN REACT 🚨</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error && this.state.error.toString()}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: '20px', color: '#888' }}>{this.state.info && this.state.info.componentStack}</pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px', marginTop: '20px' }}>Recargar Aplicación</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlistData, setPlaylistData] = useState({ channels: [], movies: [], series: [], categories: [] });
  const [appLanguage, setAppLanguage] = useState('es');

  // RUTA SECRETA DEL PANEL DE ADMINISTRACIÓN
  if (window.location.pathname === '/admin') {
    return <AdminPanel />;
  }

  useEffect(() => {
    // Detectar dispositivo y capacidades táctiles
    const isTV = /Tizen|Web0S|WebOS|SMART-TV|SmartTV/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
    const isIOS = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    
    // Si es Windows o Mac, es definitivamente un PC
    const isWindows = /windows/i.test(navigator.userAgent.toLowerCase());
    const isMac = /mac/i.test(navigator.userAgent.toLowerCase());
    
    // Comprobar si tiene pantalla táctil (los TV Box devuelven 0, los móviles > 0)
    const hasTouch = (navigator.maxTouchPoints || 0) > 0 || (navigator.msMaxTouchPoints || 0) > 0;
    const isDesktopPC = isWindows || isMac || (!isTV && !isAndroid && !isIOS);
    
    // Es un Android TV si es Android y NO tiene pantalla táctil
    const isAndroidTV = isAndroid && !hasTouch;

    // Habilitar navegación espacial (Smart TV / Remoto) solo para TVs o Android TV (o PC sin táctil para tests)
    if (isTV || isAndroidTV || (!hasTouch && isDesktopPC)) {
      document.body.classList.add('tv-navigation-active');
      
      // FORZAR ESCALADO CORRECTO PARA TV:
      // Muchos TV Box o Smart TVs mienten sobre su resolución y hacen un zoom gigante.
      // Forzamos el viewport a 1920px para que encaje como un escritorio a 1080p.
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport && (isTV || isAndroidTV)) {
        viewport.setAttribute('content', 'width=1920, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
      }
    } else {
      document.body.classList.remove('tv-navigation-active');
    }
    SpatialNavigation.init();
    SpatialNavigation.add({
      selector: '.focusable'
    });
    SpatialNavigation.makeFocusable();
    SpatialNavigation.focus();

    const handleKeyDown = (e) => {
      // Tizen Return (10009), WebOS Back (461), PC Escape (27)
      if (e.keyCode === 10009 || e.keyCode === 461 || e.key === 'Escape' || e.key === 'Backspace') {
        window.dispatchEvent(new CustomEvent('tv-back-button'));
      }
      
      // Simular click con Enter/OK en elementos que no son botones nativos (divs, imágenes)
      if (e.key === 'Enter' || e.keyCode === 13) {
        if (document.activeElement && document.activeElement.tagName !== 'BUTTON') {
          e.preventDefault();
          document.activeElement.click();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Atajo inteligente: Si intentas subir más allá del techo, saltas a la barra inferior, y viceversa.
    const handleSnNavigateFailed = (e) => {
      if (e.detail.direction === 'up') {
        const bottomNavFirst = document.querySelector('.bottom-nav .focusable.active') || document.querySelector('.bottom-nav .focusable');
        if (bottomNavFirst) bottomNavFirst.focus();
      } else if (e.detail.direction === 'down') {
        const topElement = document.querySelector('.drawer-menu .focusable.active') || document.querySelector('.drawer-menu .focusable') || document.querySelector('.search-input-wrapper input');
        if (topElement) topElement.focus();
      }
    };

    let observer;
    window.addEventListener('sn:navigatefailed', handleSnNavigateFailed);

    // Observador para elementos dinámicos de React
    observer = new MutationObserver(() => {
      SpatialNavigation.makeFocusable();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('sn:navigatefailed', handleSnNavigateFailed);
      if (observer) observer.disconnect();
      SpatialNavigation.uninit();
    };
  }, []);

  // Esta función captura un login exitoso.
  const handleLogin = (loginPayload) => {
    if (loginPayload && loginPayload.data) {
      setPlaylistData(loginPayload.data);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('thriptw_xtUrl');
    localStorage.removeItem('thriptw_xtUser');
    localStorage.removeItem('thriptw_xtPass');
    setIsLoggedIn(false);
    setPlaylistData({ channels: [], movies: [], series: [], categories: [] });
  };

  return (
    <>
      {isLoggedIn ? (
        <ErrorBoundary>
          <DashboardLayout 
            onLogout={handleLogout} 
            playlistData={playlistData} 
            setPlaylistData={setPlaylistData}
            appLanguage={appLanguage} 
            setAppLanguage={setAppLanguage} 
          />
        </ErrorBoundary>
      ) : (
        <LoginScreen 
          onLogin={handleLogin} 
          appLanguage={appLanguage} 
          setAppLanguage={setAppLanguage} 
        />
      )}
    </>
  )
}

export default App;

