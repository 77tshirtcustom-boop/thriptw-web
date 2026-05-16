import React, { useState, useEffect } from 'react';
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
  const [appLanguage, setAppLanguage] = useState(() => {
    const saved = localStorage.getItem('thriptw_lang');
    return (saved && ['es', 'en', 'fr', 'de'].includes(saved)) ? saved : 'es';
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [deviceStatus, setDeviceStatus] = useState('trial'); // 'trial', 'active', 'blocked'
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const [isSyncing, setIsSyncing] = useState(true);

  // 1. Función de sincronización con el servidor
  async function syncDeviceStatus() {
    try {
      const id = localStorage.getItem('thriptw_device_id');
      if (!id) return;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const PROD_URL = 'https://thriptw-web.onrender.com';

      const resp = await fetch(`${PROD_URL}/api/devices/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: id }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await resp.json();
      
      if (data.success && data.device) {
        setDeviceStatus(data.device.status);
        if (data.device.expiresAt) {
          const now = new Date();
          const exp = new Date(data.device.expiresAt);
          const diffTime = exp - now;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setTrialDaysLeft(diffDays > 0 ? diffDays : 0);
        }
        if (data.device.status === 'active') {
          localStorage.setItem('licenseStatus', 'premium');
        } else {
          localStorage.removeItem('licenseStatus');
        }
      }
    } catch (err) {
      console.error("Error syncing device:", err);
    } finally {
      setIsSyncing(false);
    }
  }

  // 2. Lógica de inicio y hardware ID
  useEffect(() => {
    const getHardwareId = () => {
      try {
        if (window.tizen && window.webapis && window.webapis.network) {
          return window.webapis.network.getActiveMaxSpeed() ? window.webapis.network.getMac() : null;
        }
        if (window.PalmSystem && window.webOS && window.webOS.deviceInfo) {
          let mac = null;
          window.webOS.deviceInfo((device) => { mac = device.wiredAddr || device.wifiAddr; });
          if (mac) return mac.toUpperCase();
        }
        if (window.device && (window.device.mac || window.device.uuid)) {
          return window.device.mac || window.device.uuid;
        }
      } catch (e) { console.log("No se pudo obtener MAC real:", e); }
      return null;
    };

    const initializeApp = async () => {
      setIsSyncing(true);
      let id = localStorage.getItem('thriptw_device_id');
      
      if (!id) {
        const hardwareId = getHardwareId();
        if (hardwareId) {
          if (!hardwareId.includes(':')) {
            id = hardwareId.substring(0,12).match(/.{1,2}/g).join(':').toUpperCase();
          } else {
            id = hardwareId.toUpperCase();
          }
        } else {
          id = Array.from({length: 6}, () => ('0' + Math.floor(Math.random()*256).toString(16)).slice(-2)).join(':').toUpperCase();
        }
        localStorage.setItem('thriptw_device_id', id);
      }
      await syncDeviceStatus();
    };

    initializeApp();

    const syncInterval = setInterval(() => {
      syncDeviceStatus();
    }, 5 * 60 * 1000);

    return () => clearInterval(syncInterval);
  }, []);

  const triggerFullRefresh = () => setRefreshKey(prev => prev + 1);

  useEffect(() => {
    localStorage.setItem('thriptw_lang', appLanguage);
  }, [appLanguage]);

  useEffect(() => {
    const isTV = /Tizen|Web0S|WebOS|SMART-TV|SmartTV/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
    const isIOS = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    const isWindows = /windows/i.test(navigator.userAgent.toLowerCase());
    const isMac = /mac/i.test(navigator.userAgent.toLowerCase());
    const isDesktopPC = isWindows || isMac || (!isTV && !isAndroid && !isIOS);

    const getFocusableElements = () => {
      const playerContainer = document.querySelector('.video-player-container');
      const scope = playerContainer || document;
      return Array.from(scope.querySelectorAll('.focusable, [tabindex="0"], button, input, select, textarea')).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden' && window.getComputedStyle(el).display !== 'none';
      });
    };

    const getCenter = (rect) => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

    const calculateDistance = (rect1, rect2, dir) => {
      const c1 = getCenter(rect1);
      const c2 = getCenter(rect2);
      let dx = Math.abs(c1.x - c2.x);
      let dy = Math.abs(c1.y - c2.y);
      if (dir === 'Left' || dir === 'Right') dy = dy * 6; 
      else if (dir === 'Up' || dir === 'Down') dx = dx * 6; 
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleKeyDown = (e) => {
      if (e.defaultPrevented) return;
      if (e.keyCode === 10009 || e.keyCode === 461 || e.keyCode === 4 || e.key === 'Escape' || e.key === 'Backspace') {
        if (e.key === 'Backspace' && document.activeElement && document.activeElement.tagName === 'INPUT') return;
        window.dispatchEvent(new CustomEvent('tv-back-button'));
        return;
      }
      if (e.key === 'Enter' || e.keyCode === 13) {
        if (document.activeElement && document.activeElement.tagName !== 'BUTTON') {
          e.preventDefault();
          document.activeElement.click();
        }
        return;
      }

      const dirMap = { ArrowUp: 'Up', ArrowDown: 'Down', ArrowLeft: 'Left', ArrowRight: 'Right' };
      const dir = dirMap[e.key];
      if (dir) {
        e.preventDefault();
        if (!document.body.classList.contains('tv-navigation-active')) document.body.classList.add('tv-navigation-active');
        const focusables = getFocusableElements();
        if (focusables.length === 0) return;
        let activeEl = document.activeElement;
        if (!activeEl || activeEl === document.body || !focusables.includes(activeEl)) {
           const initialTarget = document.getElementById('main-search-input') || document.getElementById('sn-nav-home') || focusables[0];
           if (initialTarget) {
             initialTarget.focus();
             initialTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
           }
           return;
        }
        const activeRect = activeEl.getBoundingClientRect();
        let bestDistance = Infinity;
        let bestElement = null;
        focusables.forEach(el => {
          if (el === activeEl) return;
          const rect = el.getBoundingClientRect();
          const c1 = getCenter(activeRect);
          const c2 = getCenter(rect);
          let isValidCandidate = false;
          if (dir === 'Right' && c2.x > c1.x + 5) isValidCandidate = true;
          if (dir === 'Left' && c2.x < c1.x - 5) isValidCandidate = true;
          if (dir === 'Down' && c2.y > c1.y + 5) isValidCandidate = true;
          if (dir === 'Up' && c2.y < c1.y - 5) isValidCandidate = true;
          if (isValidCandidate) {
            const distance = calculateDistance(activeRect, rect, dir);
            if (distance < bestDistance) {
              bestDistance = distance;
              bestElement = el;
            }
          }
        });
        if (bestElement) {
          bestElement.focus({ preventScroll: true }); 
          bestElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (window.location.pathname === '/admin') return <AdminPanel />;

  if (deviceStatus === 'blocked') {
    const isExpired = trialDaysLeft <= 0;
    return (
      <div style={{ background: 'linear-gradient(135deg, #050505 0%, #1a0505 100%)', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: '#ff3131', filter: 'blur(150px)', opacity: 0.1 }}></div>
        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#ff3131', padding: '25px', borderRadius: '50%', marginBottom: '30px', boxShadow: '0 0 60px rgba(255,49,49,0.5)' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '10px' }}>{isExpired ? 'SUSCRIPCIÓN CADUCADA' : 'ACCESO DENEGADO'}</h1>
          <p style={{ fontSize: '22px', opacity: 0.8, maxWidth: '600px', marginBottom: '40px' }}>{isExpired ? 'Tu licencia de 12 meses ha llegado a su fin. Contacta con tu proveedor para renovar.' : 'Este dispositivo ha sido restringido por el administrador.'}</p>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px 40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '13px', opacity: 0.5, display: 'block', marginBottom: '10px' }}>ID DE TU DISPOSITIVO:</span>
            <span style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'monospace', color: '#ff3131' }}>{localStorage.getItem('thriptw_device_id')}</span>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = (loginPayload) => {
    if (loginPayload && loginPayload.data) setPlaylistData(loginPayload.data);
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
    <ErrorBoundary>
      {isLoggedIn ? (
        <DashboardLayout 
          key={refreshKey}
          onLogout={handleLogout} 
          playlistData={playlistData} 
          setPlaylistData={setPlaylistData}
          triggerFullRefresh={triggerFullRefresh}
          appLanguage={appLanguage} 
          setAppLanguage={setAppLanguage} 
          serverTrialDays={trialDaysLeft}
          deviceStatus={deviceStatus}
          setDeviceStatus={setDeviceStatus}
          setTrialDaysLeft={setTrialDaysLeft}
          syncDeviceStatus={syncDeviceStatus}
        />
      ) : (
        <LoginScreen 
          onLogin={handleLogin} 
          appLanguage={appLanguage} 
          setAppLanguage={setAppLanguage} 
        />
      )}
    </ErrorBoundary>
  );
}

export default App;