import React, { useState, useEffect } from 'react';
import { Globe, User, Lock, Eye, EyeOff, Link, LogIn, Tv, FileText } from 'lucide-react';
import { parseM3UString } from '../services/iptwParser';
import { fetchXtreamData } from '../services/xtreamService';
import { translations } from '../i18n/translations';
import './LoginScreen.css';

const isWebLogin = typeof window !== 'undefined' && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost';
const API_BASE_URL = isWebLogin ? window.location.origin : 'https://thriptw-web.onrender.com';

const LoginScreen = ({ onLogin, appLanguage }) => {
  const t = translations[appLanguage].login;
  const [activeTab, setActiveTab] = useState('xtream'); // 'xtream' | 'm3u'
  const [showPassword, setShowPassword] = useState(false);
  
  const [xtUrl, setXtUrl] = useState('');
  const [xtUser, setXtUser] = useState('');
  const [xtPass, setXtPass] = useState('');
  
  const [m3uUrl, setM3uUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // 1. Detección de parámetros en la URL (para enlaces inteligentes)
    const params = new URLSearchParams(window.location.search);
    const urlUser = params.get('user') || params.get('u');
    const urlPass = params.get('pass') || params.get('p');
    const urlServer = params.get('url') || params.get('s');

    if (urlUser) setXtUser(urlUser);
    if (urlPass) setXtPass(urlPass);
    if (urlServer) setXtUrl(urlServer);

    // 2. Auto-login si hay datos (priorizando URL o localStorage)
    const finalUrl = urlServer || localStorage.getItem('thriptw_xtUrl');
    const finalUser = urlUser || localStorage.getItem('thriptw_xtUser');
    const finalPass = urlPass || localStorage.getItem('thriptw_xtPass');

    if (finalUrl && finalUser && finalPass) {
      if (!urlUser) { // Solo rellenamos si no viene de la URL
        setXtUrl(finalUrl);
        setXtUser(finalUser);
        setXtPass(finalPass);
      }
      
      const autoConnect = async () => {
        setIsLoading(true);
        try {
          const xtreamData = await fetchXtreamData(finalUrl, finalUser, finalPass);
          if (xtreamData.channels.length === 0 && xtreamData.movies.length === 0 && xtreamData.series.length === 0) {
            setErrorMsg(t.errorNoChannels);
            setIsLoading(false);
            return;
          }
          // Guardar en local para futuras visitas sin parámetros
          localStorage.setItem('thriptw_xtUrl', finalUrl);
          localStorage.setItem('thriptw_xtUser', finalUser);
          localStorage.setItem('thriptw_xtPass', finalPass);
          
          onLogin({ type: 'xtream', data: xtreamData });
        } catch (err) {
          setErrorMsg("Error de conexión: " + err.message);
          setIsLoading(false);
        }
      };
      autoConnect();
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setErrorMsg('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const fileContent = event.target.result;
        const parsedData = parseM3UString(fileContent);
        
        if (parsedData.channels.length === 0 && parsedData.movies.length === 0 && parsedData.series.length === 0) {
          throw new Error('El archivo M3U parece estar vacío o no tiene un formato soportado.');
        }

        // Simula mini carga
        setTimeout(() => {
          onLogin({ type: 'm3u', data: parsedData });
        }, 800);
      } catch (err) {
        console.error(err);
        setErrorMsg('Error al leer el archivo M3U: ' + err.message);
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Error al intentar leer el archivo desde el disco.');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  const handleUrlLogin = async () => {
    if (activeTab === 'xtream') {
       if (!xtUrl || !xtUser || !xtPass) {
          setErrorMsg(t.errorFillXtream);
          return;
       }
       
       setIsLoading(true);
       setErrorMsg('');
       try {
         const xtreamData = await fetchXtreamData(xtUrl, xtUser, xtPass);
         if (xtreamData.channels.length === 0 && xtreamData.movies.length === 0 && xtreamData.series.length === 0) {
           setErrorMsg(t.errorNoChannels);
           setIsLoading(false);
           return;
         }
         localStorage.setItem('thriptw_xtUrl', xtUrl);
         localStorage.setItem('thriptw_xtUser', xtUser);
         localStorage.setItem('thriptw_xtPass', xtPass);
         onLogin({ type: 'xtream', data: xtreamData });
       } catch (err) {
         setErrorMsg(err.message);
         setIsLoading(false);
       }
       return;
    }

    if (activeTab === 'm3u' && !m3uUrl) {
       setErrorMsg(t.errorFillM3U);
       return;
    }

    if (activeTab === 'm3u') {
      setIsLoading(true);
      setErrorMsg('');
      try {
        const isEXE = window.location.protocol === 'file:';
        let response;
        
        if (isEXE) {
          // En el EXE forzamos el proxy para saltar el bloqueo del ISP
          response = await fetch(`${API_BASE_URL}/api/proxy/m3u`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: m3uUrl })
          });
        } else {
          try {
            response = await fetch(m3uUrl);
          } catch (e) {
            response = await fetch(`${API_BASE_URL}/api/proxy/m3u`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: m3uUrl })
            });
          }
        }
        
        if (!response.ok) throw new Error('No se pudo descargar la lista M3U');
        const text = await response.text();
        const parsedData = parseM3UString(text);
        
        if (parsedData.channels.length === 0 && parsedData.movies.length === 0 && parsedData.series.length === 0) {
          throw new Error('La lista M3U está vacía o tiene un formato no válido.');
        }

        localStorage.setItem('thriptw_m3uUrl', m3uUrl);
        onLogin({ type: 'm3u', data: parsedData });
      } catch (err) {
        setErrorMsg('Error al cargar la lista M3U: ' + err.message);
        setIsLoading(false);
      }
      return;
    }

    setErrorMsg(t.warningM3U);
  };

  return (
    <div className="login-container fade-in">
      {/* SECCIÓN DEL LOGO Y MARCA */}
      <div className="logo-section">
        <div className="img-logo-circle">
          <img src="./Logo.png" alt="THRIPTW Logo" className="logo-image" style={{ objectFit: 'contain' }} />
        </div>
        <h1 className="brand-text">
          THR<span>IPTW</span>
        </h1>
      </div>

      {/* TARJETA DEL FORMULARIO */}
      <div className="login-card">


        {/* FORMULARIO DINÁMICO */}
        <div className="fade-in">

          <div className="form-group">
            <label>{t.username}</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input 
                type="text" 
                className="input-field focusable" 
                placeholder={t.usernamePlaceholder} 
                value={xtUser}
                onChange={(e) => setXtUser(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t.password}</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                className="input-field focusable" 
                placeholder={t.passwordPlaceholder} 
                value={xtPass}
                onChange={(e) => setXtPass(e.target.value)}
              />
              <button 
                className="password-toggle focusable"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>{t.serverUrl}</label>
            <div className="input-wrapper">
              <Globe className="input-icon" size={20} />
              <input 
                type="text" 
                className="input-field focusable" 
                placeholder={t.serverUrlPlaceholder} 
                value={xtUrl}
                onChange={(e) => setXtUrl(e.target.value)}
              />
            </div>
          </div>

        </div>

        {errorMsg && <div style={{ color: '#ff4d4d', marginTop: '12px', fontSize: '14px', textAlign: 'center' }}>{errorMsg}</div>}

        {/* BOTÓN CONECTAR */}
        <button className="submit-btn focusable" type="button" onClick={handleUrlLogin} disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1 }}>
          <LogIn className="submit-icon" size={20} />
          {isLoading ? t.btnDecoding : t.btnConnect}
        </button>



        {/* Espaciador inferior */}
        <div style={{ marginTop: '20px' }}></div>


      </div>
    </div>
  );
};

export default LoginScreen;

