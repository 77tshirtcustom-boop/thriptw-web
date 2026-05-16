import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Radio,
  RefreshCcw,
  Tv,
  Star,
  History,
  ChevronLeft,
  ChevronRight,
  Film,
  Clapperboard,
  Settings,
  LogOut,
  Trophy,
  Music,
  Globe,
  Baby,
  Play,
  Search,
  X,
  Image as ImageIcon,
  ArrowLeft,
  PlayCircle,
  Calendar,
  Clock,
  Info,
  Shield,
  Key,
  Trash2,
  Home,
  PlusCircle,
  Maximize,
  Minimize,
  Pencil,
  Timer,
  ShieldCheck,
  ThumbsUp,
  Send,
  ChevronDown,
  Wifi,
  WifiOff
} from 'lucide-react';

const CustomLiveIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19zM12 3C6.48 3 2 7.48 2 13c0 3.7 2.01 6.92 5 8.66l1-1.74C5.61 18.53 4 15.96 4 13c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.96-1.61 5.53-4 6.92l1 1.74c2.99-1.74 5-4.96 5-8.66 0-5.52-4.48-10-10-10z" />
    <circle cx="12" cy="13" r="2" />
  </svg>
);

const SolidHomeIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SolidTvIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </svg>
);

const SolidFilmIcon = ({ size = 24, className = "", fill = "none", stroke = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 10V6a2 2 0 00-2-2H4a2 2 0 00-2 2v4a2 2 0 010 4v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 010-4z" />
    <path d="M10 8.5l6 3.5-6 3.5v-7z" fill={fill === "none" ? "currentColor" : "var(--bg-dark, #000)"} stroke="none" />
  </svg>
);

const SolidSeriesIcon = ({ size = 24, className = "", fill = "none", stroke = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M9 17v2a1 1 0 001 1h4a1 1 0 001-1v-2" />
    <path d="M8 20h8" />
    <path d="M10 8.5l5 2.5-5 2.5v-5z" fill={fill === "none" ? "currentColor" : "var(--bg-dark, #000)"} stroke="none" />
  </svg>
);

const SolidSettingsIcon = ({ size = 24, className = "", fill = "none", stroke = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" fill={fill === "none" ? "none" : "var(--bg-dark, #000)"} />
  </svg>
);

const SolidSlidersIcon = ({ size = 24, className = "", fill = "none", stroke = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
  </svg>
);

const SolidLogoutIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

import './DashboardLayout.css';
import VideoPlayer from './VideoPlayer';
import { translations } from '../i18n/translations';
import { fetchXtreamData, fetchSeriesInfo } from '../services/xtreamService';

// -- CONFIGURACIÓN DE PRODUCCIÓN INTELIGENTE --
const isWeb = typeof window !== 'undefined' && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost';
const isElectronApp = typeof window !== 'undefined' && (window.process?.type === 'renderer' || navigator.userAgent.toLowerCase().indexOf(' electron/') > -1);
const API_BASE_URL = isWeb ? window.location.origin : (isElectronApp ? 'http://localhost:3001' : 'https://thriptw-web.onrender.com');



// -- DATOS DEL SISTEMA (FIJOS) --
const SYSTEM_CATEGORIES = [
  { id: 'all', name: 'TODOS', icon: Tv },
  { id: 'fav', name: 'FAVORITOS', icon: Star },
  { id: 'hist', name: 'HISTORIAL', icon: History },
];

// -- GRUPOS EXTRAÍDOS SIMULADOS DE M3U (DINÁMICOS) --
const M3U_EXTRACTED_GROUPS = [];

// Unión temporal para facilitar recuentos
const STATIC_MOCK_CATEGORIES = [...SYSTEM_CATEGORIES];

const STATIC_MOCK_CHANNELS = [];
const STATIC_MOCK_MOVIES = [];
const STATIC_MOCK_SERIES = [];

const MOCK_SPORTS_AGENDA = [];

const cleanTitle = (rawTitle) => {
  if (!rawTitle) return '';
  let clean = rawTitle;
  
  // Si tiene |, probamos qué parte es el título (el que no sea un año o una plataforma corta)
  if (clean.includes('|')) {
    const parts = clean.split('|').map(p => p.trim());
    // Si la última parte es un año (4 dígitos), nos quedamos con la anterior
    if (parts.length > 1 && /^\d{4}$/.test(parts[parts.length - 1])) {
      clean = parts[parts.length - 2];
    } else {
      clean = parts[parts.length - 1];
    }
  }
  
  if (clean.includes(' - ')) clean = clean.split(' - ').pop().trim();
  clean = clean.replace(/\[.*?\]|\(.*?\)/g, "").trim();
  return clean;
};

const formatRating = (ratingStr) => {
  if (!ratingStr || ratingStr === 'N/A') return 'N/A';
  const num = parseFloat(ratingStr);
  if (isNaN(num) || num === 0) return 'N/A';
  return num.toFixed(1);
};

const SERIES_PLATFORMS = {
  netflix: [
    'Stranger Things', 'The Crown', 'The Witcher', 'Black Mirror', 'La Casa de Papel', 'Money Heist',
    'Squid Game', 'Dark', 'Narcos', 'The Queen\'s Gambit', 'Better Call Saul', 'Bridgerton',
    'Cobra Kai', 'Ozark', 'Lupin', 'Sex Education', 'You', 'Peaky Blinders', 'Elite',
    'The Umbrella Academy', 'Wednesday', 'One Piece', 'Berlin', 'The Sandman', 'Heartstopper',
    'Mindhunter', 'Orange Is the New Black', 'Bojack Horseman', 'The Good Place', 'The Last Kingdom',
    'Sweet Tooth', 'Shadow and Bone', 'Manifest', 'Outer Banks', 'Emily in Paris', 'Griselda',
    'Avatar: The Last Airbender', '3 Body Problem', 'Beef', 'The Diplomat', 'Baby Reindeer',
    'Our Planet', 'The Night Agent', 'Ginny & Georgia', 'Suits', 'Breaking Bad', 'The Walking Dead'
  ],
  hbo: [
    'Game of Thrones', 'House of the Dragon', 'The Last of Us', 'Succession', 'The White Lotus',
    'Euphoria', 'The Sopranos', 'The Wire', 'Chernobyl', 'True Detective', 'Barry', 'Veep',
    'Westworld', 'The Gilded Age', 'The Idol', 'And Just Like That', 'Silicon Valley',
    'Big Little Lies', 'Sharp Objects', 'The Undoing', 'Mare of Easttown', 'Watchmen',
    'The Leftovers', 'Entourage', 'Sex and the City', 'Band of Brothers', 'Rome', 'Deadwood',
    'Winning Time', 'The Regime', 'Tokyo Vice', 'True Blood', 'The Jinx', 'Hacks', 'The Flight Attendant'
  ],
  amazon: [
    'The Boys', 'The Lord of the Rings: The Rings of Power', 'Invincible', 'Reacher', 'The Marvelous Mrs. Maisel',
    'Fleabag', 'The Wheel of Time', 'Jack Ryan', 'Good Omens', 'The Continental', 'Gen V', 'Upload',
    'Fallout', 'Mr. & Mrs. Smith', 'The Terminal List', 'Hanna', 'Bosch', 'The Expanse',
    'Carnival Row', 'The Grand Tour', 'Clarkson\'s Farm', 'Hazbin Hotel', 'The Legend of Vox Machina',
    'Daisy Jones & The Six', 'Paper Girls', 'Outer Range', 'The Wilds', 'Undone', 'Tales from the Loop'
  ],
  disney: [
    'The Mandalorian', 'Loki', 'WandaVision', 'The Bear', 'Ahsoka', 'Andor', 'The Falcon and the Winter Soldier',
    'Hawkeye', 'Moon Knight', 'Obi-Wan Kenobi', 'Secret Invasion', 'Grey\'s Anatomy', 'Modern Family',
    'The Simpsons', 'Criminal Minds', 'Shogun', 'Only Murders in the Building', 'Futurama',
    'Star Wars', 'Marvel', 'Avengers', 'X-Men', 'Iron Fist', 'Daredevil', 'The Punisher',
    'Jessica Jones', 'Luke Cage', 'The Defenders', 'American Horror Story', 'What We Do in the Shadows',
    'Welcome to Wrexham', 'The Old Man', 'Reservation Dogs', 'Dopesick', 'The Dropout'
  ],
  apple: [
    'Ted Lasso', 'Severance', 'The Morning Show', 'Foundation', 'Silo', 'For All Mankind', 'Shrinking',
    'Hijack', 'Monarch: Legacy of Monsters', 'Masters of the Air', 'Slow Horses', 'Black Bird',
    'Lessons in Chemistry', 'The Crowded Room', 'Defending Jacob', 'See', 'Dickinson', 'Physical',
    'Invasion', 'Truth Be Told', 'The Servant', 'Mythic Quest', 'Pachinko', 'Schmigadoon!'
  ]
};

const translateText = async (text, targetLang = 'es') => {
  if (!text || text.length < 3 || text === 'N/A') return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const result = await res.json();
    return result[0].map(item => item[0]).join('');
  } catch (error) {
    console.warn("Translation failed", error);
    return text;
  }
};

// COMPONENTE UNIFICADO DE ACTIVACIÓN
const ActivationFlow = ({ tr, isBlocking, onClose, activationCode, setActivationCode, handleConfirmPayment, isVerifying, paymentError, setPaymentError }) => {
  const p = tr.payment;
  return (
    <div className="qr-overlay fade-in" style={{ zIndex: 99999, background: 'rgba(0,0,0,0.95)' }} onClick={!isBlocking ? onClose : undefined}>
      <div className="qr-modal-card telegram-modal fade-in-up" onClick={(e) => e.stopPropagation()}>
        {!isBlocking && (
          <button 
            id="sn-modal-close" 
            className="btn-close-qr focusable" 
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault(); e.stopPropagation();
                document.getElementById('sn-pin-input')?.focus();
              }
            }}
          >✕</button>
        )}
        
        <h2 className="qr-title" style={{ fontSize: '24px', marginBottom: '5px', fontWeight: '900', whiteSpace: 'nowrap' }}>
          {isBlocking ? 'Tu tiempo de prueba ha caducado' : 'Adquirir licencia de 12 meses:'}
        </h2>

        {isBlocking && (
          <div style={{ 
            color: '#ff3131', 
            fontSize: '20px', 
            fontWeight: '900', 
            marginBottom: '15px', 
            textTransform: 'uppercase',
            letterSpacing: '0.5px' 
          }}>
            Compra la licencia de 12 meses
          </div>
        )}

        <div className="device-id-badge" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px',
          margin: '0 auto 10px auto'
        }}>
          <span style={{ fontSize: '18px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MAC:</span>
          <span style={{ fontSize: '22px', color: '#f1c40f', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '2px' }}>
            {localStorage.getItem('thriptw_device_id') || '00:00:00:00:00:00'}
          </span>
        </div>

        {/* Eliminamos el subtítulo p.desc para dejar el diseño limpio */}

        <div className="telegram-steps-container" style={{ marginTop: '10px' }}>
          {/* PASO 1 & 2 COMBINADOS EN LA MISMA LÍNEA */}
          <div className="telegram-step" style={{ display: 'flex', flexDirection: 'row', gap: '30px', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
            {/* PAYPAL */}
            <div className="qr-item-horizontal" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="telegram-step-header" style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center', transform: 'translate(-5px, -10px)' }}>
                <div className="telegram-step-number" style={{ width: '28px', height: '28px', fontSize: '16px' }}>1</div>
                <h4 style={{ fontSize: '16px', fontWeight: '800' }}>{p.step1}</h4>
              </div>
              <div className="telegram-qr-wrapper" style={{ width: '150px', height: '150px' }}>
                <img
                  src="./QR.png"
                  alt="PayPal QR"
                  onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://paypal.me/thriptw/6.95EUR"}
                  className="qr-image"
                />
              </div>
              <p className="step-handle-text" style={{ marginTop: '10px', fontSize: '15px', fontWeight: '700', color: '#00a8ff' }}>Paypal: @thriptw</p>
            </div>

            {/* TELEGRAM */}
            <div className="qr-item-horizontal" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="telegram-step-header" style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center', transform: 'translate(-5px, -10px)' }}>
                <div className="telegram-step-number" style={{ width: '28px', height: '28px', fontSize: '16px' }}>2</div>
                <h4 style={{ fontSize: '16px', fontWeight: '800' }}>{p.step2}</h4>
              </div>
              <div className="telegram-qr-wrapper" style={{ width: '150px', height: '150px' }}>
                <img
                  src="./qr telegram.png"
                  alt="Telegram QR"
                  onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/thriptw"}
                  className="qr-image"
                />
              </div>
              <p className="step-handle-text" style={{ marginTop: '10px', fontSize: '15px', fontWeight: '700', color: '#00a8ff' }}>Telegram: @thriptw</p>
            </div>
          </div>

          {/* PASO 3 */}
          <div className="telegram-step activation-card">
            <div className="telegram-step-header">
              <div className="telegram-step-number">3</div>
              <h4>{p.step3}</h4>
            </div>
            <div className="telegram-input-group">
              <input
                id={isBlocking ? "sn-pin-input-expired" : "sn-pin-input"}
                autoFocus
                className="focusable"
                type="text"
                placeholder={p.codePlaceholder}
                data-sn-down={isBlocking ? "#sn-confirm-pin-expired" : "#sn-confirm-pin"}
                data-sn-up={!isBlocking ? "#sn-modal-close" : undefined}
                value={activationCode}
                onChange={(e) => {
                  setActivationCode(e.target.value.toUpperCase());
                  if (paymentError) setPaymentError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' || e.key === 'Enter') {
                    if (activationCode.length >= 12) {
                      e.preventDefault(); e.stopPropagation();
                      const nextId = isBlocking ? 'sn-confirm-pin-expired' : 'sn-confirm-pin';
                      document.getElementById(nextId)?.focus();
                    } else {
                      // Opcional: Podrías añadir un pequeño efecto o sonido de error aquí
                    }
                  }
                  if (!isBlocking && e.key === 'ArrowUp') {
                    e.preventDefault(); e.stopPropagation();
                    document.getElementById('sn-modal-close')?.focus();
                  }
                }}
                maxLength={14}
              />
              <button
                id={isBlocking ? "sn-confirm-pin-expired" : "sn-confirm-pin"}
                className="btn-redeem focusable"
                data-sn-up={isBlocking ? "#sn-pin-input-expired" : "#sn-pin-input"}
                onClick={handleConfirmPayment}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp') {
                    e.preventDefault(); e.stopPropagation();
                    const prevId = isBlocking ? 'sn-pin-input-expired' : 'sn-pin-input';
                    document.getElementById(prevId)?.focus();
                  }
                }}
                disabled={isVerifying || activationCode.length < 12}
              >
                {isVerifying ? p.verifying : p.confirmPayment}
              </button>
            </div>
            {paymentError && (
              <div className="fade-in" style={{ color: '#ff4d4d', fontSize: '15px', marginTop: '16px', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {paymentError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    // Actualizamos cada 10 segundos para no saturar el rendimiento y mantener la precisión del minuto
    const timer = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div style={{ fontSize: '20px', fontWeight: '300', color: 'var(--text-secondary)', letterSpacing: '1px', textShadow: '0px 2px 4px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', marginRight: '12px', transform: 'translateX(8px)' }}>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
    </div>
  );
};


const DashboardLayout = ({ 
  onLogout, 
  playlistData, 
  setPlaylistData, 
  triggerFullRefresh, 
  appLanguage, 
  setAppLanguage,
  serverTrialDays = 7,
  deviceStatus = 'trial',
  setDeviceStatus,
  setTrialDaysLeft,
  syncDeviceStatus
}) => {
  const tr = translations[appLanguage] || translations.es;

  const isListLoaded = playlistData && (
    (playlistData.channels && playlistData.channels.length > 0) ||
    (playlistData.movies && playlistData.movies.length > 0) ||
    (playlistData.series && playlistData.series.length > 0)
  );

  const MOCK_CHANNELS = isListLoaded ? (playlistData.channels || []) : STATIC_MOCK_CHANNELS;
  const MOCK_MOVIES = isListLoaded ? (playlistData.movies || []) : STATIC_MOCK_MOVIES;
  const MOCK_SERIES = [...(isListLoaded ? (playlistData.series || []) : []), ...STATIC_MOCK_SERIES];

  // 1. ESTADOS (ORGANIZADOS POR CATEGORÍAS)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeBottomNav, setActiveBottomNav] = useState('home');
  const isPremium = deviceStatus === 'active';
  const [showQRModal, setShowQRModal] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentError, setPaymentError] = useState('');


  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const trialDaysLeft = serverTrialDays;

  // Auto-focus para PIN input cuando aparece el bloqueo o el modal
  useEffect(() => {
    if ((isTrialExpired && !isPremium) || showQRModal) {
      setTimeout(() => {
        const inputId = isTrialExpired && !isPremium ? 'sn-pin-input-expired' : 'sn-pin-input';
        const input = document.getElementById(inputId);
        if (input) {
          input.focus();
          // Asegurar que se active la navegación TV
          if (!document.body.classList.contains('tv-navigation-active')) {
            document.body.classList.add('tv-navigation-active');
          }
        }
      }, 500);
    }
  }, [isTrialExpired, isPremium, showQRModal]);
  const [savedLists, setSavedLists] = useState([]);
  const [listToDelete, setListToDelete] = useState(null);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState(null);
  const [isEditListOpen, setIsEditListOpen] = useState(true);
  const [editingListId, setEditingListId] = useState(null);
  const [newListUrl, setNewListUrl] = useState('');
  const [newListUser, setNewListUser] = useState('');
  const [newListPass, setNewListPass] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [visibleItemsCount, setVisibleItemsCount] = useState(50);
  const [historyItemToDelete, setHistoryItemToDelete] = useState(null);
  const [historyDeleteType, setHistoryDeleteType] = useState(null); // 'movie' | 'series'
  const [deleteHistoryConfirmIdx, setDeleteHistoryConfirmIdx] = useState(-1);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  useEffect(() => { setIsSynopsisExpanded(false); }, [selectedMovieId]);

  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  useEffect(() => { setIsSynopsisExpanded(false); }, [selectedSeriesId]);

  // AUTO-FOCO EN EL BOTÓN PLAY AL ENTRAR EN DETALLES
  useEffect(() => {
    if (selectedMovieId || selectedSeriesId) {
      setTimeout(() => {
        const targetId = selectedMovieId ? 'sn-play-movie' : 'sn-play-series';
        const playBtn = document.getElementById(targetId);
        if (playBtn) {
          playBtn.focus();
        } else {
          // Fallback por clase si el ID no está disponible
          document.querySelector('.btn-play-movie.focusable')?.focus();
        }
      }, 500);
    }
  }, [selectedMovieId, selectedSeriesId]);

  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeGenre, setActiveGenre] = useState(tr.common.all || 'Todos');
  const [playingMedia, setPlayingMedia] = useState(null);
  const [antiBloqueo, setAntiBloqueo] = useState(() => localStorage.getItem('thriptw_antibloqueo') === 'true');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [speedValue, setSpeedValue] = useState(0);
  const [uploadValue, setUploadValue] = useState(0);
  const [liveSchedule, setLiveSchedule] = useState(MOCK_SPORTS_AGENDA);
  const [scheduleError, setScheduleError] = useState(false);
  const [activeSearchIMDB, setActiveSearchIMDB] = useState({});
  const [fixedPosters, setFixedPosters] = useState({});
  const [movieDetails, setMovieDetails] = useState({});
  const [liveFavorites, setLiveFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('thriptw_live_favorites')) || []; } catch (e) { return []; }
  });
  const [movieFavorites, setMovieFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('thriptw_movie_favorites')) || []; } catch (e) { return []; }
  });
  const [seriesFavorites, setSeriesFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('thriptw_series_favorites')) || []; } catch (e) { return []; }
  });
  const [movieHistory, setMovieHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('thriptw_movieHistory')) || []; } catch (e) { return []; }
  });
  const [seriesHistory, setSeriesHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('thriptw_seriesHistory')) || []; } catch (e) { return []; }
  });
  const [activeDropdown, setActiveDropdown] = useState(null); // 'buffer', 'quality', 'language'
  const [bufferSize, setBufferSize] = useState('medio');
  const [streamQuality, setStreamQuality] = useState('1080p');
  const [channelHistory, setChannelHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('thriptw_channelHistory')) || []; } catch (e) { return []; }
  });
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const lastFocusedItemRef = useRef(null);


  // 2. REFERENCIAS Y MEMOS (DEPENDEN DE LOS ESTADOS)
  useEffect(() => {
    // Reiniciar género al cambiar de sección o idioma para evitar filtros vacíos
    setActiveGenre(tr.common.all || 'Todos');
  }, [activeBottomNav, appLanguage]);

  const firstSettingId = useMemo(() => {
    return isPremium ? '#sn-search' : '#sn-license';
  }, [isPremium]);

  const continueWatching = useMemo(() => {
    const movies = playlistData.movies || [];
    const series = playlistData.series || [];

    // Combinamos y eliminamos duplicados por ID
    const rawVOD = [...movies, ...series, ...MOCK_MOVIES, ...MOCK_SERIES];
    const seen = new Set();
    const allVOD = rawVOD.filter(item => {
      if (!item || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

    return allVOD
      .map(item => {
        const idStr = String(item.id);
        const isSeries = idStr.startsWith('series_') || idStr.startsWith('netflix_') || idStr.startsWith('hbo_') || idStr.startsWith('disney_') || idStr.startsWith('amazon_') || idStr.startsWith('apple_');

        // Intentamos obtener el progreso directo
        let saved = localStorage.getItem(`thriptw_progress_${item.id}`);

        // Si es una serie o no tiene progreso directo, buscamos por el último capítulo visto
        if (isSeries || (!saved && (item.num || item.seasons))) {
          const lastEpId = localStorage.getItem(`thriptw_last_ep_${item.id}`);
          if (lastEpId) {
            const epSaved = localStorage.getItem(`thriptw_progress_${lastEpId}`);
            if (epSaved) saved = epSaved;
          }
        }

        if (!saved) return null;
        try {
          const data = JSON.parse(saved);
          return { ...item, progressData: data };
        } catch (e) {
          return null;
        }
      })
      .filter(item => item && item.progressData.time > 5)
      .sort((a, b) => (b.progressData.updated || 0) - (a.progressData.updated || 0))
      .slice(0, 15);
  }, [playlistData, playingMedia]);




  const homeMoviesRef = useRef(null);
  const homeSeriesRef = useRef(null);
  const netflixRef = useRef(null);
  const hboRef = useRef(null);
  const disneyRef = useRef(null);
  const amazonRef = useRef(null);
  const appleRef = useRef(null);

  const MOCK_CATEGORIES = useMemo(() => {
    if (!isListLoaded) return STATIC_MOCK_CATEGORIES;
    let cats = playlistData.categories || [];
    if (activeBottomNav === 'movies') cats = playlistData.movieCategories || [];
    if (activeBottomNav === 'series') cats = playlistData.seriesCategories || [];
    return [...SYSTEM_CATEGORIES, ...cats];
  }, [isListLoaded, activeBottomNav, playlistData]);


  // --- CÁLCULOS DINÁMICO DE DATOS (RESTAURADOS) ---
  // 3. OPTIMIZACIÓN DE CÁLCULO DE CONTEOS (Carga ultra-rápida para listas grandes)
  const categoriesWithCounts = useMemo(() => {
    // Calculamos los conteos en una sola pasada (O(N)) en lugar de filtrar por cada categoría (O(N*M))
    const counts = {};
    const items = activeBottomNav === 'movies' ? MOCK_MOVIES : (activeBottomNav === 'series' ? MOCK_SERIES : MOCK_CHANNELS);

    items.forEach(item => {
      if (item.groupId) {
        counts[item.groupId] = (counts[item.groupId] || 0) + 1;
      }
    });

    return MOCK_CATEGORIES.map(cat => {
      if (cat.id === 'fav') {
        let favCount = 0;
        if (activeBottomNav === 'movies') favCount = movieFavorites.length;
        else if (activeBottomNav === 'series') favCount = seriesFavorites.length;
        else favCount = liveFavorites.length;
        return { ...cat, count: favCount };
      }
      if (cat.id === 'hist') {
        let histCount = 0;
        if (activeBottomNav === 'movies') histCount = movieHistory.length;
        else if (activeBottomNav === 'series') histCount = seriesHistory.length;
        else histCount = channelHistory.length;
        return { ...cat, count: histCount };
      }
      if (cat.id === 'all') {
        return { ...cat, count: items.length };
      }

      return { ...cat, count: counts[cat.id] || 0 };
    });
  }, [MOCK_CATEGORIES, liveFavorites, movieFavorites, seriesFavorites, movieHistory, seriesHistory, channelHistory, activeBottomNav, MOCK_MOVIES, MOCK_SERIES, MOCK_CHANNELS]);

  const displayedChannels = useMemo(() => {
    let filtered = MOCK_CHANNELS;
    if (activeCategory === 'fav') filtered = MOCK_CHANNELS.filter(c => liveFavorites.includes(c.id));
    else if (activeCategory === 'hist') filtered = channelHistory.map(id => MOCK_CHANNELS.find(c => c.id === id)).filter(Boolean);
    else if (activeCategory !== 'all') filtered = MOCK_CHANNELS.filter(c => c.groupId === activeCategory);
    if (debouncedSearchQuery.trim() !== '') {
      const q = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(q));
    }
    return filtered.slice(0, visibleItemsCount);
  }, [MOCK_CHANNELS, activeCategory, liveFavorites, channelHistory, debouncedSearchQuery, visibleItemsCount]);

  const displayedMovies = useMemo(() => {
    let filtered = MOCK_MOVIES;
    if (activeCategory === 'fav') filtered = MOCK_MOVIES.filter(m => movieFavorites.includes(m.id));
    else if (activeCategory === 'hist') filtered = movieHistory.map(id => MOCK_MOVIES.find(m => m.id === id)).filter(Boolean);
    else if (activeCategory !== 'all') filtered = MOCK_MOVIES.filter(m => m.groupId === activeCategory);
    const allText = tr.common.all || 'Todos';
    if (activeGenre !== allText) filtered = filtered.filter(m => m.genre && m.genre.toLowerCase().includes(activeGenre.toLowerCase()));
    if (debouncedSearchQuery.trim() !== '') {
      const q = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(m => m.title.toLowerCase().includes(q));
    }
    return filtered.slice(0, visibleItemsCount);
  }, [MOCK_MOVIES, activeCategory, movieFavorites, movieHistory, activeGenre, debouncedSearchQuery, visibleItemsCount]);

  const displayedSeries = useMemo(() => {
    let filtered = MOCK_SERIES;
    if (activeCategory === 'fav') filtered = MOCK_SERIES.filter(s => seriesFavorites.includes(s.id));
    else if (activeCategory === 'hist') filtered = seriesHistory.map(id => MOCK_SERIES.find(s => s.id === id)).filter(Boolean);
    else if (activeCategory !== 'all') filtered = MOCK_SERIES.filter(s => s.groupId === activeCategory);

    const allText = tr.common.all || 'Todos';
    // Filtro por Género (Igual que en Películas)
    if (activeGenre !== allText) {
      const qGenre = activeGenre.toLowerCase();
      filtered = filtered.filter(s =>
        (s.genre && s.genre.toLowerCase().includes(qGenre)) ||
        (movieDetails[s.id]?.genre && movieDetails[s.id].genre.toLowerCase().includes(qGenre))
      );
    }

    if (debouncedSearchQuery.trim() !== '') {
      const q = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(s => s.title.toLowerCase().includes(q));
    }
    return filtered.slice(0, visibleItemsCount);
  }, [MOCK_SERIES, activeCategory, seriesFavorites, seriesHistory, activeGenre, debouncedSearchQuery, visibleItemsCount, movieDetails]);

  const gridFirstId = useMemo(() => {
    if (activeBottomNav === 'live') return (displayedChannels && displayedChannels.length > 0) ? `#sn-channel-${displayedChannels[0].id}` : '#sn-nav-home';
    if (activeBottomNav === 'movies') return '#sn-movie-0';
    if (activeBottomNav === 'series') return '#sn-series-0';
    if (activeBottomNav === 'home') return '#sn-first-home-item';
    if (activeBottomNav === 'settings') return firstSettingId;
    return '#sn-nav-home';
  }, [activeBottomNav, firstSettingId, continueWatching, displayedChannels]);

  const upFromHome = useMemo(() => {
    if (activeBottomNav === 'home') return '#sn-home-apple';
    if (activeBottomNav === 'settings') return '#sn-language';
    // Para Live, Películas y Series, saltamos siempre a la primera carpeta (TODOS)
    if (activeBottomNav === 'live' || activeBottomNav === 'movies' || activeBottomNav === 'series') return '#sn-drawer-first';
    return '#sn-drawer-last';
  }, [activeBottomNav]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 400) {
      setVisibleItemsCount(prev => prev + 50);
    }
  };

  const handleNextChannel = () => {
    if (!playingMedia) return;
    const isChannel = MOCK_CHANNELS.find(c => c.id === playingMedia.id);
    if (isChannel) {
      const idx = displayedChannels.findIndex(c => c.id === playingMedia.id);
      if (idx !== -1 && idx < displayedChannels.length - 1) setPlayingMedia(displayedChannels[idx + 1]);
    }
  };

  const handlePrevChannel = () => {
    if (!playingMedia) return;
    const isChannel = MOCK_CHANNELS.find(c => c.id === playingMedia.id);
    if (isChannel) {
      const idx = displayedChannels.findIndex(c => c.id === playingMedia.id);
      if (idx > 0) setPlayingMedia(displayedChannels[idx - 1]);
    }
  };

  // 3. FUNCIONES DE LÓGICA (HANDLERS)
  const scrollRef = (ref, amount) => { if (ref.current) ref.current.scrollBy({ left: amount, behavior: 'smooth' }); };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  const handleAddList = () => {
    if (!newListUrl || !newListUser || !newListPass) {
      alert("Por favor rellena URL, Usuario y Contraseña");
      return;
    }
    const newList = { url: newListUrl, user: newListUser, pass: newListPass, name: newListUser };
    const updated = [...savedLists, newList];
    setSavedLists(updated);
    localStorage.setItem('thriptw_saved_lists', JSON.stringify(updated));
    setNewListUrl(''); setNewListUser(''); setNewListPass('');
  };

  const handleActivateList = (list) => {
    localStorage.setItem('thriptw_xtUrl', list.url);
    localStorage.setItem('thriptw_xtUser', list.user);
    localStorage.setItem('thriptw_xtPass', list.pass);
    window.location.reload();
  };

  const handleDeleteList = (list) => {
    const updated = savedLists.filter(l => !(l.url === list.url && l.user === list.user));
    setSavedLists(updated);
    localStorage.setItem('thriptw_saved_lists', JSON.stringify(updated));
  };

  const handleRenameList = (list, newName) => {
    if (!newName || newName.trim() === '') return;
    const updated = savedLists.map(l =>
      (l.url === list.url && l.user === list.user) ? { ...l, name: newName } : l
    );
    setSavedLists(updated);
    localStorage.setItem('thriptw_saved_lists', JSON.stringify(updated));
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
    setPaymentError('');
    setActivationCode('');
    // Devolver el foco al botón de la licencia tras un pequeño delay
    setTimeout(() => {
      document.getElementById('sn-license')?.focus();
    }, 100);
  };

  const handlePayPalPayment = () => {
    setPaymentError('');
    setShowQRModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!activationCode || activationCode.trim() === '') return;
    setIsVerifying(true);
    setPaymentError('');
    try {
      const resp = await fetch(`${API_BASE_URL}/api/payments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pinCode: activationCode,
          deviceId: localStorage.getItem('thriptw_device_id')
        })
      });
      const data = await resp.json();
      if (data.success) {
        localStorage.setItem('licenseStatus', 'premium');
        setIsPremium(true);
        setShowQRModal(false);
        setPaymentError('');
      } else {
        setPaymentError(tr.payment?.error || 'PIN incorrecto. Inténtalo de nuevo.');
      }
    } catch (err) {
      setPaymentError(tr.payment?.error || 'PIN incorrecto. Inténtalo de nuevo.');
    } finally {
      setIsVerifying(false);
    }
  };

  const toggleFavorite = (e, itemId) => {
    e.stopPropagation();
    const isMovie = MOCK_MOVIES.find(m => m.id === itemId);
    const isSeries = MOCK_SERIES.find(s => s.id === itemId);

    if (isMovie) {
      if (movieFavorites.includes(itemId)) { setMovieFavorites(movieFavorites.filter(id => id !== itemId)); }
      else { setMovieFavorites([...movieFavorites, itemId]); }
    } else if (isSeries) {
      if (seriesFavorites.includes(itemId)) { setSeriesFavorites(seriesFavorites.filter(id => id !== itemId)); }
      else { setSeriesFavorites([...seriesFavorites, itemId]); }
    } else {
      if (liveFavorites.includes(itemId)) { setLiveFavorites(liveFavorites.filter(id => id !== itemId)); }
      else { setLiveFavorites([...liveFavorites, itemId]); }
    }
  };

  const handleItemClick = (itemId, domId) => {
    if (domId) lastFocusedItemRef.current = domId;
    const isMovie = MOCK_MOVIES.find(m => m.id === itemId);
    const isSeries = MOCK_SERIES.find(s => s.id === itemId);
    if (isMovie) {
      setSelectedMovieId(itemId); setSelectedSeriesId(null); setSelectedMatchId(null);
    } else if (isSeries) {
      setSelectedSeriesId(itemId); setSelectedMovieId(null); setSelectedMatchId(null);
    } else {
      const channelObj = MOCK_CHANNELS.find(c => c.id === itemId);
      if (channelObj) {
        setChannelHistory([itemId, ...channelHistory.filter(id => id !== itemId)]);
        setPlayingMedia(channelObj);
      }
    }
  };

  const handleRemoveFromMovieHistory = (e, movieId) => {
    e.stopPropagation();
    const updated = movieHistory.filter(id => id !== movieId);
    setMovieHistory(updated);
    localStorage.setItem('thriptw_movieHistory', JSON.stringify(updated));
  };

  const handleRemoveFromSeriesHistory = (e, seriesId) => {
    e.stopPropagation();
    const updated = seriesHistory.filter(id => id !== seriesId);
    setSeriesHistory(updated);
    localStorage.setItem('thriptw_seriesHistory', JSON.stringify(updated));
  };

  const handleRefreshCurrentList = async () => {
    const xtUrl = localStorage.getItem('thriptw_xtUrl');
    const xtUser = localStorage.getItem('thriptw_xtUser');
    const xtPass = localStorage.getItem('thriptw_xtPass');

    if (!xtUrl || !xtUser || !xtPass) {
      alert(tr.settings.refreshError || "No hay una lista activa para actualizar.");
      return;
    }

    setIsRefreshing(true);
    console.log(`[REFRESH] Solicitando datos frescos del servidor...`);

    try {
      // 1. Sincronizar estado de suscripción primero
      if (syncDeviceStatus) await syncDeviceStatus();

      const data = await fetchXtreamData(xtUrl, xtUser, xtPass, antiBloqueo);

      if (data && (data.channels?.length > 0 || data.movies?.length > 0)) {
        console.log(`[REFRESH] Éxito -> Canales: ${data.channels.length}`);

        // 2. Actualizamos el estado global
        setPlaylistData(data);

        // 3. Forzamos remonte del componente para limpiar estados internos de UI
        if (triggerFullRefresh) triggerFullRefresh();

        // 4. Notificamos al usuario con el conteo real
        // alert(`${tr.settings.refreshSuccess}\n\n- ${data.channels.length} ${tr.nav.live}\n- ${data.movies?.length || 0} ${tr.nav.movies}\n- ${data.series?.length || 0} ${tr.nav.series}`);
      } else {
        console.warn("[REFRESH] El servidor devolvió una lista vacía.");
        alert("El servidor no devolvió ningún canal. Revisa tu cuenta.");
      }
    } catch (err) {
      console.error("Refresh error:", err);
      alert(tr.settings.refreshError + ": " + err.message);
    } finally {
      setIsRefreshing(false);
    }

  };


  // 4. EFECTOS (LIFECYCLE)
  useEffect(() => {
    const handleTVBack = () => {
      console.log("[TV-BACK] Botón atrás detectado");
      if (playingMedia) {
        setPlayingMedia(null);
        return;
      }
      if (selectedMovieId) {
        setSelectedMovieId(null);
        return;
      }
      if (selectedSeriesId) {
        setSelectedSeriesId(null);
        return;
      }
      if (showQRModal) {
        setShowQRModal(false);
        return;
      }
      if (isEditListOpen) {
        setIsEditListOpen(false);
        return;
      }
      if (activeBottomNav === 'settings') {
        setActiveBottomNav('home');
        return;
      }
    };

    window.addEventListener('tv-back-button', handleTVBack);
    return () => window.removeEventListener('tv-back-button', handleTVBack);
  }, [playingMedia, selectedMovieId, selectedSeriesId, showQRModal, isEditListOpen, activeBottomNav]);

  useEffect(() => {
    if (!selectedMovieId && !selectedSeriesId && lastFocusedItemRef.current) {
      setTimeout(() => {
        const el = document.getElementById(lastFocusedItemRef.current);
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selectedMovieId, selectedSeriesId]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => { setVisibleItemsCount(50); }, [activeCategory, debouncedSearchQuery, activeBottomNav, activeGenre]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/sports/schedule`);
        const data = await res.json();
        setLiveSchedule(data.success ? data.schedule : []);
      } catch (err) { setScheduleError(true); setLiveSchedule([]); }
    };
    fetchSchedule();
  }, []);

  useEffect(() => {
    try {
      let stored = JSON.parse(localStorage.getItem('thriptw_saved_lists') || '[]');

      const currentUrl = localStorage.getItem('thriptw_xtUrl');
      const currentUser = localStorage.getItem('thriptw_xtUser');
      const currentPass = localStorage.getItem('thriptw_xtPass');
      if (currentUrl && currentUser && currentPass) {
        let existing = stored.find(l => l.url === currentUrl && l.user === currentUser);
        const currentExp = playlistData?.account_info?.exp_date;

        if (!existing) {
          stored.push({ url: currentUrl, user: currentUser, pass: currentPass, name: currentUser, exp_date: currentExp });
          localStorage.setItem('thriptw_saved_lists', JSON.stringify(stored));
        } else if (currentExp !== undefined && existing.exp_date !== currentExp) {
          existing.exp_date = currentExp;
          localStorage.setItem('thriptw_saved_lists', JSON.stringify(stored));
        }
      }
      setSavedLists(stored);
    } catch (e) { console.error("Error reading saved lists", e); }
  }, []);

  // Persistencia automática de Favoritos e Historial
  useEffect(() => { localStorage.setItem('thriptw_live_favorites', JSON.stringify(liveFavorites)); }, [liveFavorites]);
  useEffect(() => { localStorage.setItem('thriptw_movie_favorites', JSON.stringify(movieFavorites)); }, [movieFavorites]);
  useEffect(() => { localStorage.setItem('thriptw_series_favorites', JSON.stringify(seriesFavorites)); }, [seriesFavorites]);
  useEffect(() => { localStorage.setItem('thriptw_movieHistory', JSON.stringify(movieHistory)); }, [movieHistory]);
  useEffect(() => { localStorage.setItem('thriptw_seriesHistory', JSON.stringify(seriesHistory)); }, [seriesHistory]);
  useEffect(() => { localStorage.setItem('thriptw_channelHistory', JSON.stringify(channelHistory)); }, [channelHistory]);

  // Sincronizar fecha de caducidad de la lista activa con su entrada en la lista guardada
  useEffect(() => {
    if (playlistData?.account_info?.exp_date !== undefined && savedLists.length > 0) {
      const activeUrl = localStorage.getItem('thriptw_xtUrl');
      const activeUser = localStorage.getItem('thriptw_xtUser');

      const listIdx = savedLists.findIndex(l => l.url === activeUrl && l.user === activeUser);
      if (listIdx !== -1 && savedLists[listIdx].exp_date !== playlistData.account_info.exp_date) {
        const updated = [...savedLists];
        updated[listIdx] = { ...updated[listIdx], exp_date: playlistData.account_info.exp_date };
        setSavedLists(updated);
        localStorage.setItem('thriptw_saved_lists', JSON.stringify(updated));
      }
    }
  }, [playlistData]);

  useEffect(() => {
    if (isPremium) {
      setIsTrialExpired(false);
      setTrialDaysLeft(7);
      return;
    }

    // Usar días reales del servidor
    setTrialDaysLeft(serverTrialDays);
    
    if (serverTrialDays <= 0) {
      setIsTrialExpired(true);
      setShowQRModal(true); // Bloqueo visual: abrir modal de pago si expiró
    } else {
      setIsTrialExpired(false);
    }
  }, [isPremium, serverTrialDays]);

  // Limpiar detalles al cambiar de idioma para forzar re-traducción
  useEffect(() => {
    setMovieDetails({});
  }, [appLanguage]);

  useEffect(() => {
    if (showQRModal) {
      setTimeout(() => {
        const pinInput = document.getElementById('sn-pin-input') || document.getElementById('sn-pin-input-coll');
        if (pinInput) pinInput.focus();
      }, 300);
    }
  }, [showQRModal]);

  useEffect(() => {
    if (isTrialExpired && !isPremium) {
      setTimeout(() => {
        const pinInput = document.getElementById('sn-pin-input-expired');
        if (pinInput) pinInput.focus();
      }, 300);
    }
  }, [isTrialExpired, isPremium]);

  useEffect(() => {
    if (selectedMovieId && !movieDetails[selectedMovieId]) {
      const m = MOCK_MOVIES.find(x => x.id === selectedMovieId);
      if (m && m.id?.startsWith('vod_')) {
        const streamId = m.id.replace('vod_', '');
        const xtUrl = localStorage.getItem('thriptw_xtUrl');
        const xtUser = localStorage.getItem('thriptw_xtUser');
        const xtPass = localStorage.getItem('thriptw_xtPass');
        if (xtUrl && xtUser && xtPass) {
          const baseUrl = xtUrl.replace(/\/+$/, '');
          const directUrl = `${baseUrl}/player_api.php?username=${encodeURIComponent(xtUser)}&password=${encodeURIComponent(xtPass)}&action=get_vod_info&vod_id=${streamId}`;

          const fetchMethod = antiBloqueo
            ? fetch(`${API_BASE_URL}/api/proxy/xtream`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: baseUrl, username: xtUser, password: xtPass, action: `get_vod_info&vod_id=${streamId}` })
            })
            : fetch(directUrl);

          fetchMethod
            .then(res => res.json())
            .then(async data => {
              if (data?.info) {
                const translatedPlot = await translateText(data.info.plot || data.info.description || m.synopsis, appLanguage);
                const translatedDirector = await translateText(data.info.director || m.director, appLanguage);
                const translatedCast = await translateText(data.info.cast || data.info.actors || m.cast, appLanguage);

                setMovieDetails(prev => ({
                  ...prev,
                  [selectedMovieId]: { 
                    director: translatedDirector, 
                    cast: translatedCast, 
                    synopsis: translatedPlot, 
                    imdb: data.info.rating || m.imdb, 
                    year: data.info.year || m.year, 
                    genre: data.info.genre || m.genre 
                  }
                }));
              }
            }).catch(e => console.error("VOD detail error", e));
        }
      }
    }
  }, [selectedMovieId]);

  useEffect(() => {
    if (selectedSeriesId && !movieDetails[selectedSeriesId]) {
      const s = MOCK_SERIES.find(x => x.id === selectedSeriesId);
      if (s && s.id?.startsWith('netflix_')) {
        setMovieDetails(prev => ({ ...prev, [selectedSeriesId]: { director: s.director || 'Netflix', cast: s.cast, synopsis: s.synopsis, imdb: s.imdb, year: s.year, genre: s.categoryName, seasons: [{ seasonNumber: 1, episodes: [{ id: `ep_${s.id}_1`, epNumber: 1, title: 'Tráiler', duration: '2 min', synopsis: 'Tráiler oficial', image: s.poster, url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }] }] } }));
        return;
      }
      if (s && s.id?.startsWith('series_')) {
        const streamId = s.id.replace('series_', '');
        const xtUrl = localStorage.getItem('thriptw_xtUrl');
        const xtUser = localStorage.getItem('thriptw_xtUser');
        const xtPass = localStorage.getItem('thriptw_xtPass');
        if (xtUrl && xtUser && xtPass) {
          const baseUrl = xtUrl.replace(/\/+$/, '');
          const directUrl = `${baseUrl}/player_api.php?username=${encodeURIComponent(xtUser)}&password=${encodeURIComponent(xtPass)}&action=get_series_info&series_id=${streamId}`;

          const fetchMethod = antiBloqueo
            ? fetch(`${API_BASE_URL}/api/proxy/xtream`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: baseUrl, username: xtUser, password: xtPass, action: `get_series_info&series_id=${streamId}` })
            })
            : fetch(directUrl);

          fetchMethod
            .then(res => res.json())
            .then(async data => {
              if (data) {
                const translatedPlot = await translateText(data.info?.plot || data.info?.description || s.synopsis, appLanguage);
                const translatedDirector = await translateText(data.info?.director, appLanguage);
                const translatedCast = await translateText(data.info?.cast, appLanguage);

                let seasons = [];
                if (data.episodes && !Array.isArray(data.episodes)) {
                  Object.keys(data.episodes).forEach(sn => {
                    seasons.push({ seasonNumber: parseInt(sn, 10), episodes: data.episodes[sn].map(ep => ({ id: ep.id, epNumber: ep.episode_num, title: ep.title, duration: ep.info?.duration, synopsis: ep.info?.plot, image: ep.info?.movie_image, url: antiBloqueo ? `${API_BASE_URL}/api/proxy/stream?url=${encodeURIComponent(`${xtUrl.replace(/\/+$/, '')}/series/${xtUser}/${xtPass}/${ep.id}.${ep.container_extension || 'mp4'}`)}` : `${xtUrl.replace(/\/+$/, '')}/series/${xtUser}/${xtPass}/${ep.id}.${ep.container_extension || 'mp4'}` })) });
                  });
                }
                setMovieDetails(prev => ({ 
                  ...prev, 
                  [selectedSeriesId]: { 
                    director: translatedDirector, 
                    cast: translatedCast, 
                    synopsis: translatedPlot, 
                    imdb: data.info?.rating, 
                    year: data.info?.year, 
                    genre: data.info?.genre, 
                    seasons: seasons.sort((a, b) => a.seasonNumber - b.seasonNumber) 
                  } 
                }));
              }
            }).catch(e => console.error("Series detail error", e));
        }
      }
    }
  }, [selectedSeriesId]);


  if (isTrialExpired && !isPremium) {
    return (
      <ActivationFlow 
        tr={tr}
        isBlocking={true}
        activationCode={activationCode}
        setActivationCode={setActivationCode}
        handleConfirmPayment={handleConfirmPayment}
        isVerifying={isVerifying}
        paymentError={paymentError}
        setPaymentError={setPaymentError}
      />
    );
  }

  return (
    <div className={`dashboard-container fade-in ${playingMedia ? 'player-active' : ''}`}>

      {/* HEADER / TOP BAR */}
      <div className="top-bar" style={{ position: 'relative' }}>
        <div className="top-bar-title">
          {activeBottomNav === 'home' && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg className="icon-live" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg><span>{tr.nav.home}</span></div>}
          {activeBottomNav === 'live' && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CustomLiveIcon className="icon-live" size={32} /><span>{tr.nav.live}</span></div>}
          {activeBottomNav === 'movies' && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><SolidFilmIcon className="icon-live" size={32} fill="currentColor" stroke="none" /><span>{tr.nav.movies}</span></div>}
          {activeBottomNav === 'series' && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><SolidSeriesIcon className="icon-live" size={32} fill="currentColor" stroke="none" /><span>{tr.nav.series}</span></div>}
          {activeBottomNav === 'settings' && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><SolidSettingsIcon className="icon-live" size={32} fill="currentColor" stroke="none" /><span>{tr.nav.settings}</span></div>}
        </div>
        <div className="top-bar-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <RealTimeClock />
          <button
            id="sn-refresh-top"
            className="focusable"
            data-sn-right="#sn-fullscreen"
            data-sn-up="#sn-fullscreen"
            data-sn-down={activeBottomNav === 'settings' ? "#sn-license" : "#sn-first-home-item"}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault(); e.stopPropagation();
              }
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault(); e.stopPropagation();
                document.getElementById('sn-fullscreen')?.focus();
              }
              if (e.key === 'ArrowDown') {
                e.preventDefault(); e.stopPropagation();
                if (activeBottomNav === 'settings') {
                  const target = document.getElementById('sn-license') || document.getElementById('sn-refresh-list');
                  target?.focus();
                  return;
                }
                if (selectedMovieId) {
                  document.getElementById('sn-back-movie')?.focus();
                } else if (selectedSeriesId) {
                  document.getElementById('sn-back-series')?.focus();
                } else if (selectedMatchId) {
                  document.getElementById('sn-detail-back-match')?.focus();
                } else {
                  // Bajamos al primer elemento dinámico de la sección actual
                  const targetId = gridFirstId.replace('#', '');
                  document.getElementById(targetId)?.focus();
                }
              }
            }}
            onClick={() => window.location.reload()}
            title="Reload App"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '8px' }}
          >
            <RefreshCcw size={22} />
          </button>
          <button
            id="sn-fullscreen"
            className="focusable"
            data-sn-left="#sn-refresh-top"
            data-sn-right="#sn-nav-logout"
            data-sn-down="#sn-refresh-top"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault(); e.stopPropagation();
                document.getElementById('sn-nav-logout')?.focus();
              }
              if (e.key === 'ArrowDown') {
                e.preventDefault(); e.stopPropagation();
                document.getElementById('sn-refresh-top')?.focus();
              }
              if (e.key === 'ArrowLeft') {
                e.preventDefault(); e.stopPropagation();
                document.getElementById('sn-refresh-top')?.focus();
              }
            }}
            onClick={toggleFullScreen}
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '8px' }}
          >
            {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
          </button>
          <img
            src="./Logo.png"
            alt="THRIPTW Logo"
            style={{
              height: '32px',
              opacity: 0.9,
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* SEARCH BAR */}
      {activeBottomNav !== 'settings' && !selectedMovieId && !selectedSeriesId && !selectedMatchId && (
        <div className="search-bar-container" style={{ opacity: activeBottomNav === 'home' ? 0.3 : 1, pointerEvents: activeBottomNav === 'home' ? 'none' : 'auto' }}>
          <div
            id="sn-search"
            className="search-input-wrapper"
            onClick={() => { if (activeBottomNav !== 'home') document.getElementById('main-search-input')?.focus(); }}
            style={{ cursor: activeBottomNav === 'home' ? 'default' : 'pointer' }}
          >
            <Search className="search-icon" size={20} />
            <input
              id="main-search-input"
              type="text"
              placeholder={tr.common.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input focusable"
              tabIndex={activeBottomNav === 'home' ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault(); e.stopPropagation();
                  document.getElementById('sn-drawer-first')?.focus();
                }
                if (e.key === 'ArrowUp') {
                  e.preventDefault(); e.stopPropagation();
                  document.getElementById('sn-refresh-top')?.focus();
                }
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setDebouncedSearchQuery(searchQuery);
                  setTimeout(() => {
                    const firstItem = document.getElementById('sn-movie-0') || 
                                     document.getElementById('sn-series-0') || 
                                     document.getElementById('sn-first-channel') ||
                                     document.querySelector('.channels-grid .focusable, .movies-grid .focusable');
                    if (firstItem) firstItem.focus();
                  }, 400);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="main-content">

        {/* SIDEBAR DRAWER */}
        {activeBottomNav !== 'home' && (
          <div
            className={`drawer ${isDrawerOpen ? 'open' : ''}`}
            onMouseLeave={() => setIsDrawerOpen(false)}
          >
            <div className="drawer-toggle" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
              {isDrawerOpen ? <ChevronLeft className="toggle-icon" size={20} /> : <ChevronRight className="toggle-icon" size={20} />}
            </div>

            <div className="drawer-menu scroll-area">
              {/* RENDERIZADO DE MENÚS FIJOS DE SISTEMA */}
              {categoriesWithCounts.filter(cat => SYSTEM_CATEGORIES.some(sys => sys.id === cat.id)).map((cat, idx, arr) => {
                const IconComp = cat.icon;
                const isFirst = idx === 0;
                const hasDynamicCats = categoriesWithCounts.filter(c => !SYSTEM_CATEGORIES.some(sys => sys.id === c.id) && c.count > 0).length > 0;
                const isLastInThisList = idx === arr.length - 1;
                const isActuallyLast = isLastInThisList && !hasDynamicCats;

                const myId = isFirst ? 'sn-drawer-first' : (isActuallyLast ? 'sn-drawer-last' : `sn-cat-sys-${idx}`);
                const nextId = isLastInThisList ? (hasDynamicCats ? '#sn-cat-dyn-0' : '#sn-nav-home') : (idx === arr.length - 2 && isLastInThisList && !hasDynamicCats ? '#sn-drawer-last' : `#sn-cat-sys-${idx + 1}`);
                const prevId = isFirst ? '#main-search-input' : (idx === 1 ? '#sn-drawer-first' : `#sn-cat-sys-${idx - 1}`);

                return (
                  <div
                    key={cat.id}
                    id={myId}
                    className={`menu-item focusable ${activeCategory === cat.id ? 'active' : ''}`}
                    tabIndex="0"
                    data-sn-up={prevId}
                    data-sn-down={nextId}
                    data-sn-right={gridFirstId}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp' && isFirst && activeBottomNav === 'movies') {
                        e.preventDefault(); e.stopPropagation();
                        document.getElementById('main-search-input')?.focus();
                      }
                      if (e.key === 'ArrowLeft') {
                        e.preventDefault(); e.stopPropagation();
                        // Bloqueamos la salida a la izquierda
                      }
                      if (e.key === 'ArrowRight') {
                        e.preventDefault(); e.stopPropagation();
                        let targetId = '';
                        if (activeBottomNav === 'movies') targetId = 'sn-movie-0';
                        else if (activeBottomNav === 'series') targetId = 'sn-series-0';

                        const target = document.getElementById(targetId) || 
                                       document.querySelector('.genre-pills-container .focusable') || 
                                       document.getElementById('sn-movie-0') || 
                                       document.getElementById('sn-series-0') || 
                                       document.getElementById('sn-first-channel') || 
                                       document.querySelector('.channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
                        if (target) target.focus();
                      }
                    }}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery('');
                      setSelectedMovieId(null);
                      setSelectedSeriesId(null);
                      setSelectedMatchId(null);
                      if (window.innerWidth < 1024) setIsDrawerOpen(false);

                      setTimeout(() => {
                        // 1. Reset scroll position
                        const containers = document.querySelectorAll('.channels-container, .movies-container, .scroll-area');
                        containers.forEach(c => c.scrollTop = 0);

                        // 2. Jump focus to first content item
                        const firstItem = document.getElementById('sn-movie-0') || document.getElementById('sn-series-0') || document.getElementById('sn-first-channel') || document.querySelector('.genre-pills-container .focusable, .channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
                        if (firstItem) firstItem.focus();
                      }, 200);
                    }}
                  >
                    <IconComp className="menu-icon" size={20} />
                    <span className="menu-label">{
                      cat.id === 'all' ? tr.common.all :
                        cat.id === 'fav' ? tr.common.favorites :
                          cat.id === 'hist' ? tr.common.history :
                            cat.name
                    }</span>
                    <span className="menu-count">{cat.count > 0 ? cat.count : '0'}</span>
                    <span className="menu-arrow">{'>'}</span>
                  </div>
                )
              })}

              {/* SEPARADOR VISUAL PARA LISTAS M3U */}
              <div style={{ height: '1px', background: '#1f1f1f', margin: '8px 20px' }}></div>

              {/* RENDERIZADO DE GRUPOS DINÁMICOS M3U (SOLO CATEGORÍAS QUE TIENEN ITEMS EN ESTA VISTA) */}
              {categoriesWithCounts.filter(cat => !SYSTEM_CATEGORIES.some(sys => sys.id === cat.id) && cat.count > 0).map((cat, idx, arr) => {
                const isLast = idx === arr.length - 1;
                const myId = isLast ? 'sn-drawer-last' : `sn-cat-dyn-${idx}`;
                const nextId = isLast ? '#sn-nav-home' : (idx === arr.length - 2 ? '#sn-drawer-last' : `#sn-cat-dyn-${idx + 1}`);
                const sysLastIdx = categoriesWithCounts.filter(c => SYSTEM_CATEGORIES.some(sys => sys.id === c.id)).length - 1;
                const prevId = idx === 0 ? (sysLastIdx === 0 ? '#sn-drawer-first' : `#sn-cat-sys-${sysLastIdx}`) : (idx === 1 ? '#sn-cat-dyn-0' : `#sn-cat-dyn-${idx - 1}`);

                return (
                  <div
                    key={cat.id}
                    id={myId}
                    className={`menu-item focusable ${activeCategory === cat.id ? 'active' : ''}`}
                    tabIndex="0"
                    data-sn-up={prevId}
                    data-sn-down={nextId}
                    data-sn-right={gridFirstId}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') {
                        e.preventDefault(); e.stopPropagation();
                        // Bloqueamos la salida a la izquierda
                      }
                      if (e.key === 'ArrowRight') {
                        e.preventDefault(); e.stopPropagation();
                        let targetId = '';
                        if (activeBottomNav === 'movies') targetId = 'sn-movie-0';
                        else if (activeBottomNav === 'series') targetId = 'sn-series-0';

                        const target = document.getElementById(targetId) || 
                                       document.querySelector('.genre-pills-container .focusable') || 
                                       document.getElementById('sn-movie-0') || 
                                       document.getElementById('sn-series-0') || 
                                       document.getElementById('sn-first-channel') || 
                                       document.querySelector('.channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
                        if (target) target.focus();
                      }
                    }}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSelectedMovieId(null);
                      setSelectedSeriesId(null);
                      setSelectedMatchId(null);
                      if (window.innerWidth < 1024) setIsDrawerOpen(false);

                      setTimeout(() => {
                        // 1. Reset scroll position of all content containers
                        const containers = document.querySelectorAll('.channels-container, .movies-container, .scroll-area');
                        containers.forEach(c => c.scrollTop = 0);

                        // 2. Jump focus to first content item
                        const firstItem = document.getElementById('sn-movie-0') || document.getElementById('sn-series-0') || document.getElementById('sn-first-channel') || document.querySelector('.genre-pills-container .focusable, .channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
                        if (firstItem) firstItem.focus();
                      }, 200);
                    }}
                  >
                    <span className="menu-label">{cat.name}</span>
                    <span className="menu-count">{cat.count > 0 ? cat.count : '0'}</span>
                    <span className="menu-arrow">{'>'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* --- CONTENIDO DINÁMICO: HOME --- */}
        {activeBottomNav === 'home' && !selectedMatchId && !selectedMovieId && !selectedSeriesId && (
          <div className="movies-container scroll-area" style={{ width: '100%', maxWidth: '100%', padding: '0 40px 20px 40px' }}>
            <div className="home-sections-wrapper" style={{ paddingBottom: '100px' }}>

              {/* PELICULAS DESTACADAS */}
              <div className="home-section" style={{ marginTop: '16px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 className="section-title" style={{ fontSize: '22px', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', letterSpacing: '0.5px' }}>
                    <span style={{ width: '4px', height: '24px', background: '#2ecc71', borderRadius: '2px' }}></span>
                    {tr.home.featuredMovies}
                  </h3>

                </div>


                <div className="similar-movies-list scroll-area-x" ref={homeMoviesRef} style={{ scrollBehavior: 'smooth' }}>
                  {(() => {
                    // Tomamos los primeros elementos entregados por el proveedor (suelen ser las novedades / más vistas)
                    return MOCK_MOVIES.slice(0, 20);
                  })().map((movie, idx) => {
                    const currentPoster = fixedPosters[movie.id] || movie.poster;
                    const isFetchingIMDB = activeSearchIMDB[movie.id];
                    return (
                      <div
                        key={`${movie.id}-${idx}`}
                        id={idx === 0 ? 'sn-first-home-item' : undefined}
                        className="movie-poster-card focusable"
                        tabIndex="0"
                        style={{ flexShrink: 0, width: '220px', height: '330px' }}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault(); e.stopPropagation();
                            const target = document.getElementById('sn-first-home-series');
                            if (target) { target.focus(); target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                          }
                          if (e.key === 'ArrowUp') {
                            e.preventDefault(); e.stopPropagation();
                            const target = document.getElementById('sn-refresh-top');
                            if (target) { target.focus(); target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                          }
                          if (e.key === 'ArrowLeft' && idx === 0) { e.preventDefault(); e.stopPropagation(); }
                        }}
                        onClick={() => handleItemClick(movie.id)}
                      >
                        <div className="movie-poster-wrapper" style={{ position: 'relative' }}>
                          <button
                            className="fav-badge-floating"
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, movie.id); }}
                          >
                            <Star fill={movieFavorites.includes(movie.id) ? '#f1c40f' : 'rgba(0,0,0,0.5)'} color={movieFavorites.includes(movie.id) ? '#f1c40f' : '#fff'} size={16} />
                          </button>

                          <div className="imdb-badge-floating">
                            <Star size={10} fill="#f1c40f" color="#f1c40f" /> {movie.imdb || 'N/A'}
                          </div>

                          <div className="title-badge-floating">
                            <span>{cleanTitle(movie.title)}</span>
                          </div>

                          <img loading="lazy" decoding="async"
                            src={currentPoster}
                            alt={movie.title}
                            className="movie-poster-img"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                              if (!activeSearchIMDB[movie.id] && !fixedPosters[movie.id]) {
                                setActiveSearchIMDB(prev => ({ ...prev, [movie.id]: true }));
                                setTimeout(() => {
                                  setFixedPosters(prev => ({ ...prev, [movie.id]: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' }));
                                  setActiveSearchIMDB(prev => ({ ...prev, [movie.id]: false }));
                                  e.target.style.display = 'block';
                                  e.target.nextSibling.style.display = 'none';
                                }, 2500);
                              }
                            }}
                          />
                          <div className="movie-poster-fallback" style={{ display: 'none' }}>
                            {isFetchingIMDB ? (
                              <>
                                <RefreshCcw className="icon-spin" size={32} color="#f1c40f" style={{ marginBottom: '8px' }} />
                                <span style={{ color: '#f1c40f', fontSize: '12px' }}>Buscando en IMDB...</span>
                              </>
                            ) : (
                              <>
                                <ImageIcon size={32} color="#444" style={{ marginBottom: '8px' }} />
                                <span>{movie.title}</span>
                              </>
                            )}
                          </div>
                          <div className="movie-hover-info">
                            <div className="movie-hover-meta" style={{ justifyContent: 'center' }}>
                              <span className="movie-hover-year">{cleanTitle(movie.title)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <button className="carousel-nav-btn right fade-in" onClick={() => scrollRef(homeMoviesRef, 600)}>
                  <ChevronRight size={32} />
                </button>
              </div>

              {/* SERIES DESTACADAS */}
              <div className="home-section" style={{ marginTop: '16px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 className="section-title" style={{ fontSize: '22px', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', letterSpacing: '0.5px' }}>
                    <span style={{ width: '4px', height: '24px', background: '#f1c40f', borderRadius: '2px' }}></span>
                    {tr.home.featuredSeries}
                  </h3>

                </div>

                <button className="carousel-nav-btn left fade-in" onClick={() => scrollRef(homeSeriesRef, -600)}>
                  <ChevronLeft size={32} />
                </button>

                <div className="similar-movies-list scroll-area-x" ref={homeSeriesRef} style={{ scrollBehavior: 'smooth' }}>
                  {(() => {
                    // Tomamos los primeros elementos entregados por el proveedor (suelen ser las novedades / más vistas)
                    return MOCK_SERIES.slice(0, 20);
                  })().map((series, idx) => {
                    const currentPoster = fixedPosters[series.id] || series.poster;
                    const isFetchingIMDB = activeSearchIMDB[series.id];
                    return (
                      <div
                        key={`${series.id}-${idx}`}
                        id={idx === 0 ? 'sn-first-home-series' : undefined}
                        className="movie-poster-card focusable"
                        tabIndex="0"
                        style={{ flexShrink: 0, width: '220px', height: '330px' }}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault(); e.stopPropagation();
                            const target = document.getElementById('sn-home-netflix');
                            if (target) { target.focus(); target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                          }
                          if (e.key === 'ArrowUp') {
                            e.preventDefault(); e.stopPropagation();
                            const target = document.getElementById('sn-first-home-item');
                            if (target) { target.focus(); target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                          }
                          if (e.key === 'ArrowLeft' && idx === 0) { e.preventDefault(); e.stopPropagation(); }
                        }}
                        onClick={() => handleItemClick(series.id)}
                      >
                        <div className="movie-poster-wrapper" style={{ position: 'relative' }}>
                          <button
                            className="fav-badge-floating"
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, series.id); }}
                          >
                            <Star fill={seriesFavorites.includes(series.id) ? '#f1c40f' : 'rgba(0,0,0,0.5)'} color={seriesFavorites.includes(series.id) ? '#f1c40f' : '#fff'} size={16} />
                          </button>

                          <div className="imdb-badge-floating">
                            <Star size={10} fill="#f1c40f" color="#f1c40f" /> {series.imdb || 'N/A'}
                          </div>

                          <div className="title-badge-floating">
                            <span>{cleanTitle(series.title)}</span>
                          </div>

                          <img loading="lazy" decoding="async"
                            src={currentPoster}
                            alt={series.title}
                            className="movie-poster-img"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                              if (!activeSearchIMDB[series.id] && !fixedPosters[series.id]) {
                                setActiveSearchIMDB(prev => ({ ...prev, [series.id]: true }));
                                fetch('https://api.tvmaze.com/singlesearch/shows?q=' + encodeURIComponent(series.title))
                                  .then(res => res.json())
                                  .then(data => {
                                    if (data && data.image && data.image.original) {
                                      setFixedPosters(prev => ({ ...prev, [series.id]: data.image.original }));
                                    } else {
                                      setFixedPosters(prev => ({ ...prev, [series.id]: 'https://placehold.co/500x750/222/FFF.png?text=' + encodeURIComponent(series.title) }));
                                    }
                                  })
                                  .catch(() => {
                                    setFixedPosters(prev => ({ ...prev, [series.id]: 'https://placehold.co/500x750/222/FFF.png?text=' + encodeURIComponent(series.title) }));
                                  })
                                  .finally(() => {
                                    setActiveSearchIMDB(prev => ({ ...prev, [series.id]: false }));
                                    e.target.style.display = 'block';
                                    e.target.nextSibling.style.display = 'none';
                                  });
                              }
                            }}
                          />
                          <div className="movie-poster-fallback" style={{ display: 'none' }}>
                            {isFetchingIMDB ? (
                              <>
                                <RefreshCcw className="icon-spin" size={32} color="#f1c40f" style={{ marginBottom: '8px' }} />
                                <span style={{ color: '#f1c40f', fontSize: '12px' }}>Buscando en IMDB...</span>
                              </>
                            ) : (
                              <>
                                <ImageIcon size={32} color="#444" style={{ marginBottom: '8px' }} />
                                <span>{series.title}</span>
                              </>
                            )}
                          </div>
                          <div className="movie-hover-info">
                            <div className="movie-hover-meta" style={{ justifyContent: 'center' }}>
                              <span className="movie-hover-year">{cleanTitle(series.title)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <button className="carousel-nav-btn right fade-in" onClick={() => scrollRef(homeSeriesRef, 600)}>
                  <ChevronRight size={32} />
                </button>
              </div>

              {/* SECCIONES POR PLATAFORMA (DETECTOR INTELIGENTE) */}
              {Object.entries(SERIES_PLATFORMS).map(([platform, titles], pIdx, pArr) => {
                const platformSeries = MOCK_SERIES.filter(s => {
                  const sTitle = s.title?.toLowerCase() || '';
                  const sCleanTitle = cleanTitle(s.title).toLowerCase();
                  const sCat = s.categoryName?.toLowerCase() || '';
                  return titles.some(t => sTitle.includes(t.toLowerCase()) || sCleanTitle.includes(t.toLowerCase())) || sCat.includes(platform);
                }).sort((a, b) => (parseFloat(b.imdb) || 0) - (parseFloat(a.imdb) || 0)).slice(0, 20);

                const nextPlatform = pArr[pIdx + 1] ? `#sn-home-${pArr[pIdx + 1][0]}` : '#sn-nav-home';
                const prevPlatform = pIdx === 0 ? '#sn-first-home-series' : `#sn-home-${pArr[pIdx - 1][0]}`;

                const platformColors = {
                  netflix: '#ff6600',
                  hbo: '#9933ff',
                  disney: '#0063e5',
                  amazon: '#00A8E1',
                  apple: '#ff007f'
                };

                const platformDisplayNames = {
                  netflix: 'Netflix series:',
                  hbo: 'HBO series:',
                  disney: 'Disney+ series:',
                  amazon: 'Amazon Prime series:',
                  apple: 'Apple+ series:'
                };
                const displayName = platformDisplayNames[platform] || platform;
                const pRef = platform === 'netflix' ? netflixRef : platform === 'hbo' ? hboRef : platform === 'disney' ? disneyRef : platform === 'amazon' ? amazonRef : appleRef;

                return (
                  <div key={platform} className="home-section" style={{ marginTop: '24px', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 className="section-title" style={{ fontSize: '22px', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', letterSpacing: '0.5px' }}>
                        <span style={{ width: '4px', height: '24px', background: platformColors[platform] || '#f1c40f', borderRadius: '2px' }}></span>
                        {displayName}
                      </h3>

                    </div>

                    <button className="carousel-nav-btn left fade-in" onClick={() => scrollRef(pRef, -600)}>
                      <ChevronLeft size={32} />
                    </button>

                    <div className="similar-movies-list scroll-area-x" ref={pRef} style={{ scrollBehavior: 'smooth' }}>
                      {platformSeries.map(series => {
                        const currentPoster = fixedPosters[series.id] || series.poster;
                        return (
                          <div
                            key={series.id}
                            id={series === platformSeries[0] ? `sn-home-${platform}` : undefined}
                            className="movie-poster-card focusable"
                            tabIndex="0"
                            style={{ flexShrink: 0, width: '220px', height: '330px' }}
                            onKeyDown={(e) => {
                              // Navegación secuencial entre plataformas con salto Disney -> Apple
                              let nextId = '';
                              let prevId = '';

                              if (platform === 'netflix') { nextId = '#sn-home-hbo'; prevId = '#sn-first-home-series'; }
                              else if (platform === 'hbo') { nextId = '#sn-home-disney'; prevId = '#sn-home-netflix'; }
                              else if (platform === 'disney') { nextId = '#sn-home-apple'; prevId = '#sn-home-hbo'; }
                              else if (platform === 'amazon') { nextId = '#sn-home-apple'; prevId = '#sn-home-disney'; }
                              else if (platform === 'apple') { nextId = '#sn-nav-home'; prevId = '#sn-home-disney'; }

                              if (e.key === 'ArrowDown') {
                                e.preventDefault(); e.stopPropagation();
                                const target = document.querySelector(nextId);
                                if (target) { target.focus(); target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                              }
                              if (e.key === 'ArrowUp') {
                                e.preventDefault(); e.stopPropagation();
                                const target = document.querySelector(prevId);
                                if (target) { target.focus(); target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                              }
                              // Encierro horizontal
                              if (e.key === 'ArrowLeft' && series === platformSeries[0]) {
                                // Permitimos que la navegación espacial busque otros elementos (como el sidebar)
                              }
                              if (e.key === 'ArrowRight' && series === platformSeries[platformSeries.length - 1]) { e.preventDefault(); e.stopPropagation(); }
                            }}
                            onClick={() => handleItemClick(series.id)}
                          >
                            <div className="imdb-badge-floating">
                              <Star size={10} fill="#f1c40f" color="#f1c40f" /> {series.imdb || 'N/A'}
                            </div>
                            <div className="title-badge-floating">
                              <span>{cleanTitle(series.title)}</span>
                            </div>
                            <img loading="lazy" decoding="async" src={currentPoster} alt={series.title} className="movie-poster-img" />
                            <div className="movie-hover-info">
                              <div className="movie-hover-meta" style={{ justifyContent: 'center' }}>
                                <span className="movie-hover-year">{cleanTitle(series.title)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button className="carousel-nav-btn right fade-in" onClick={() => scrollRef(pRef, 600)}>
                      <ChevronRight size={32} />
                    </button>
                  </div>
                );
              })}



            </div>
          </div>
        )}

        {/* --- CONTENIDO DINÁMICO: DETALLE PARTIDO --- */}
        {activeBottomNav === 'home' && selectedMatchId && (
          <div className="movie-detail-view fade-in" style={{ width: '100%' }}>
            {(() => {
              const match = liveSchedule?.find(m => m.id === selectedMatchId) || MOCK_SPORTS_AGENDA.find(m => m.id === selectedMatchId);
              if (!match) return null;

              return (
                <div className="movie-detail-wrapper" style={{ marginLeft: 0 }}>
                  <div className="movie-detail-content scroll-area" style={{ maxWidth: '100%', padding: '40px' }}>
                    <button className="btn-back" onClick={() => setSelectedMatchId(null)}>
                      <ArrowLeft size={24} /> {tr.common.back}
                    </button>

                    <div className="movie-detail-grid layout">

                      <div className="movie-detail-info fade-in-up" style={{ animationDelay: '0.1s' }}>

                        <div className="movie-detail-meta" style={{ gap: '14px', marginBottom: '32px' }}>
                          <span className="meta-pill" style={{ background: 'var(--primary-red)', border: 'none', color: 'white', fontSize: '16px', padding: '10px 20px', fontWeight: '800' }}>
                            {match.time}
                          </span>
                          {match.day && (
                            <span className="meta-pill" style={{ background: '#f1c40f', border: 'none', color: 'white', fontSize: '16px', padding: '10px 20px', fontWeight: '800', textTransform: 'uppercase' }}>
                              {match.day}
                            </span>
                          )}
                          <span className="meta-pill outline" style={{ fontSize: '16px', padding: '10px 20px', fontWeight: '800', textTransform: 'uppercase', borderColor: 'rgba(255,255,255,0.2)' }}>
                            {match.tournament}
                          </span>
                        </div>

                        <h3 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '500', color: '#fff' }}>{tr.movieDetail.whereToWatch}</h3>

                        <div className="channels-grid" style={{ display: 'flex', flexDirection: 'column', width: '95%', gap: '16px' }}>
                          {(match.channelsList && match.channelsList.length > 0 ? match.channelsList : ["No Especificado"]).map((channelText, idx) => {
                            const rawName = typeof channelText === 'string' ? channelText : (channelText.name || 'Desconocido');
                            return (
                              <div
                                key={`panel-ch-${idx}`}
                                className="channel-card"
                                style={{ cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}
                                onClick={() => {
                                  setSelectedMatchId(null);
                                  setActiveBottomNav('live');
                                  setSearchQuery(rawName.replace('M+', ''));
                                }}
                              >
                                <div className="channel-logo-box" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                  <span style={{ fontSize: '20px', fontWeight: '900', color: '#555' }}>TV</span>
                                </div>
                                <div className="channel-info">
                                  <h3 className="channel-name" style={{ fontSize: '17px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{rawName}</h3>
                                  <p className="channel-epg" style={{ color: 'var(--primary-red)', fontSize: '12px' }}>Emisión Oficial</p>
                                </div>
                                <div className="channel-action">
                                  <Search size={22} color="#666" style={{ cursor: 'pointer' }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* --- CONTENIDO DINÁMICO: CANALES --- */}
        {activeBottomNav === 'live' && (
          <div className="channels-container scroll-area" onScroll={handleScroll}>
            <div className="channels-grid">
              {displayedChannels.length === 0 && (
                <div style={{ color: 'gray', textAlign: 'center', marginTop: '40px' }}>
                  No se encontraron canales.
                </div>
              )}

              {displayedChannels.map((channel, idx) => {
                const isFav = liveFavorites.includes(channel.id);
                return (
                  <div
                    key={channel.id}
                    id={`sn-channel-${channel.id}`}
                    className="channel-card focusable"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp' && idx === 0) {
                        e.preventDefault(); e.stopPropagation();
                        // Bloqueamos subir desde el primer canal
                      }
                      if (e.key === 'ArrowLeft') {
                        e.preventDefault(); e.stopPropagation();
                        // Ir al menú lateral
                        document.getElementById('sn-drawer-first')?.focus() || document.querySelector('.menu-item.active')?.focus();
                      }
                      if (e.key === 'ArrowRight') {
                        e.preventDefault(); e.stopPropagation();
                        // Bloqueamos la salida a la derecha en Live
                      }
                    }}
                    onClick={() => handleItemClick(channel.id)}
                  >
                    <div className="channel-logo-box">
                      <img loading="lazy" decoding="async"
                        src={channel.img}
                        alt={channel.name}
                        className="channel-logo-img"
                        onError={(e) => { e.target.src = 'https://placehold.co/100x100/222/FFF.png?text=TV' }}
                      />
                    </div>

                    <div className="channel-info">
                      <h3 className="channel-name">{channel.name}</h3>
                      <p className="channel-epg">{channel.epg}</p>
                    </div>

                    <div className="channel-action">
                      <Star
                        size={22}
                        className={`star-icon ${isFav ? 'favorited' : ''}`}
                        onClick={(e) => toggleFavorite(e, channel.id)}
                        fill={isFav ? '#f1c40f' : 'none'}
                        color={isFav ? '#f1c40f' : 'gray'}
                      />
                      <Play size={20} className="play-button-icon" fill="currentColor" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* --- CONTENIDO DINÁMICO: PELÍCULAS --- */}
        {selectedMovieId && (
          <div className="movie-detail-view fade-in">
            {(() => {
              const movie = MOCK_MOVIES.find(m => m.id === selectedMovieId);
              if (!movie) return null;
              const isFav = movieFavorites.includes(movie.id);

              return (
                <div className="movie-detail-wrapper">
                  <div className="movie-detail-content scroll-area">
                    <button
                      id="sn-back-movie"
                      className="btn-back focusable"
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault(); e.stopPropagation();
                          document.getElementById('sn-refresh-top')?.focus();
                        }
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                          e.preventDefault(); e.stopPropagation();
                        }
                        if (e.key === 'ArrowDown') {
                          e.preventDefault(); e.stopPropagation();
                          document.getElementById('sn-play-movie')?.focus();
                        }
                      }}
                      onClick={() => setSelectedMovieId(null)}
                      tabIndex="0"
                      data-sn-down="#sn-play-movie"
                      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: 'bold', marginBottom: '35px', cursor: 'pointer', outline: 'none' }}
                    >
                      <ArrowLeft size={16} /> {tr.common.back}
                    </button>

                    <div className="movie-detail-grid layout">
                      <div className="movie-detail-poster-container fade-in-up">
                        <img loading="lazy" decoding="async"
                          src={fixedPosters[movie.id] || movie.poster}
                          alt={movie.title}
                          className="movie-detail-poster-img"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="movie-poster-fallback large" style={{ display: 'none' }}>
                          <ImageIcon size={64} color="#444" />
                        </div>
                      </div>

                      <div className="movie-detail-info fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="movie-detail-title" style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'system-ui, -apple-system, sans-serif', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px', color: '#fff' }}>
                          {cleanTitle(movie.title)}
                        </h2>

                        <div className="movie-detail-meta" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                          <span style={{ background: '#ffb400', color: '#000', fontWeight: 'bold', padding: '4px 12px', borderRadius: '4px', fontSize: '15px' }}>
                            {formatRating(movieDetails[movie.id]?.imdb || movie.imdb)}
                          </span>
                        </div>

                        <p className="movie-detail-synopsis" style={{ fontSize: '16px', lineHeight: '1.6', color: '#d1d1d1', marginBottom: '25px', maxWidth: '650px' }}>
                          {movieDetails[movie.id]?.synopsis || movie.synopsis}
                        </p>

                        <table className="movie-detail-crew-table" style={{ fontSize: '15px', borderCollapse: 'collapse', marginBottom: '35px' }}>
                          <tbody>
                            <tr>
                              <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', paddingBottom: '8px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{tr.movieDetail.director}:</td>
                              <td style={{ color: '#d1d1d1', paddingBottom: '8px' }}>{movieDetails[movie.id]?.director || movie.director}</td>
                            </tr>
                            <tr>
                              <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{tr.movieDetail.cast}:</td>
                              <td style={{ color: '#d1d1d1' }}>{movieDetails[movie.id]?.cast || movie.cast}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="movie-detail-actions">
                          <button
                            id="sn-play-movie"
                            className="btn-play-movie focusable"
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-back-movie')?.focus(); }
                              if (e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-similar-first')?.focus(); }
                              if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-fav-movie')?.focus(); }
                              if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); }
                            }}
                            onClick={() => {
                              setPlayingMedia(movie);
                              setMovieHistory([movie.id, ...movieHistory.filter(id => id !== movie.id)]);
                            }} style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '12px 26px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <Play size={20} fill="currentColor" /> {localStorage.getItem(`thriptw_progress_${movie.id}`) ? tr.movieDetail.continue : tr.movieDetail.play}
                          </button>
                          <button
                            id="sn-fav-movie"
                            className={`btn-fav-movie focusable ${isFav ? 'favorited' : ''}`}
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-back-movie')?.focus(); }
                              if (e.key === 'ArrowDown') {
                                e.preventDefault(); e.stopPropagation();
                                document.getElementById('sn-similar-first')?.focus();
                              }
                              if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-play-movie')?.focus(); }
                              if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); }
                            }}
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, movie.id); }}
                          >
                            <Star size={24} fill={isFav ? '#f1c40f' : 'transparent'} color={isFav ? '#f1c40f' : '#fff'} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="movie-similar-section fade-in-up" style={{ marginTop: '50px', width: '100%', paddingBottom: '30px' }}>
                      <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '20px', fontWeight: 'bold' }}>{tr.movieDetail.similarMovies}:</h3>
                      <div className="similar-movies-row scroll-area-x" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
                        {(() => {
                          const similarMovies = MOCK_MOVIES.filter(m => m.groupId === movie.groupId && m.id !== movie.id).slice(0, 20);
                          return similarMovies.map((similar, sIdx) => (
                            <div key={similar.id}
                              id={sIdx === 0 ? 'sn-similar-first' : undefined}
                              className="similar-movie-card focusable"
                              tabIndex="0"
                              onKeyDown={(e) => {
                                if (e.key === 'ArrowUp') {
                                  e.preventDefault(); e.stopPropagation();
                                  document.getElementById('sn-fav-movie')?.focus();
                                }
                                if (e.key === 'ArrowDown') {
                                  e.preventDefault(); e.stopPropagation();
                                  // Bloqueo total hacia abajo
                                }
                                if (e.key === 'ArrowLeft' && sIdx === 0) {
                                  e.preventDefault(); e.stopPropagation();
                                  // No sale a la izquierda (sidebar)
                                }
                                if (e.key === 'ArrowRight' && sIdx === similarMovies.length - 1) {
                                  e.preventDefault(); e.stopPropagation();
                                  // No sale a la derecha
                                }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMovieId(similar.id);
                              }} style={{ width: '140px', flexShrink: 0, cursor: 'pointer', transition: 'transform 0.2s', border: '3px solid transparent' }}>
                            <img loading="lazy" decoding="async" src={fixedPosters[similar.id] || similar.poster} alt={similar.title} style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} onError={(e) => { e.target.src = 'https://placehold.co/300x450/101010/FFF.png?text=Sin+Portada'; }} />
                            <p style={{ color: '#fff', fontSize: '13px', marginTop: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600', textAlign: 'center', margin: 0 }}>
                              {cleanTitle(similar.title)}
                            </p>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {activeBottomNav === 'movies' && !selectedMovieId && !selectedSeriesId && (
          <div className="movies-container scroll-area" onScroll={handleScroll}>



            {/* Píldoras de Filtros Rápido de Género */}

            <div className="movies-grid">

              {displayedMovies.length === 0 && (
                <div style={{ color: 'gray', textAlign: 'center', marginTop: '40px', gridColumn: '1 / -1' }}>
                  {tr.common.notFound || "No se encontraron resultados."}
                </div>
              )}

              {displayedMovies.map((movie, idx) => {
                const isFav = movieFavorites.includes(movie.id);
                const currentPoster = fixedPosters[movie.id] || movie.poster;
                const isFetchingIMDB = activeSearchIMDB[movie.id];
                return (
                  <div
                    key={movie.id}
                    id={`sn-movie-${idx}`}
                    className="movie-poster-card focusable"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        if (activeCategory === 'hist') {
                          e.preventDefault(); e.stopPropagation();
                          document.getElementById(`sn-movie-del-${idx}`)?.focus();
                          return;
                        }
                        const firstItem = document.getElementById('sn-movie-0');
                        if (firstItem && e.currentTarget.offsetTop <= firstItem.offsetTop + 10) {
                          e.preventDefault(); e.stopPropagation();
                        }
                      }
                      if (e.key === 'ArrowRight') {
                        const nextItem = document.getElementById(`sn-movie-${idx + 1}`);
                        if (!nextItem || (nextItem && nextItem.offsetTop > e.currentTarget.offsetTop)) {
                          e.preventDefault(); e.stopPropagation();
                        }
                      }
                      if (e.key === 'Enter') {
                        lastFocusedItemRef.current = `sn-movie-${idx}`;
                      }
                    }}
                    onClick={() => handleItemClick(movie.id, `sn-movie-${idx}`)}
                  >

                    <div className="movie-poster-wrapper" style={{ position: 'relative' }}>
                      
                      {activeCategory === 'hist' && (
                        <button
                          id={`sn-movie-del-${idx}`}
                          className="movie-del-btn focusable"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHistoryItemToDelete(movie);
                            setHistoryDeleteType('movie');
                            setDeleteHistoryConfirmIdx(idx);
                            setTimeout(() => document.getElementById('sn-cancel-hist-delete')?.focus(), 100);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                              e.preventDefault(); e.stopPropagation();
                              document.getElementById(`sn-movie-${idx}`)?.focus();
                            }
                            if (['ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                              e.preventDefault(); e.stopPropagation();
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            zIndex: 10,
                            background: 'rgba(0,0,0,0.7)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          <X size={18} />
                        </button>
                      )}


                      <div className="imdb-badge-floating">
                        <Star size={10} fill="#f1c40f" color="#f1c40f" /> {movie.imdb || 'N/A'}
                      </div>

                      <div className="title-badge-floating">
                        <span>{cleanTitle(movie.title)}</span>
                      </div>

                      {/* Imagen Real o Rescatada de IMDb */}
                      <img loading="lazy" decoding="async"
                        key={currentPoster}
                        src={currentPoster}
                        alt={movie.title}
                        className="movie-poster-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';

                          // SIMULADOR DE BÚSQUEDA EN IMDB
                          if (!activeSearchIMDB[movie.id] && !fixedPosters[movie.id]) {
                            setActiveSearchIMDB(prev => ({ ...prev, [movie.id]: true }));

                            setTimeout(() => {
                              setFixedPosters(prev => ({
                                ...prev,
                                [movie.id]: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg'
                              }));
                              setActiveSearchIMDB(prev => ({ ...prev, [movie.id]: false }));
                              e.target.style.display = 'block';
                              e.target.nextSibling.style.display = 'none';
                            }, 2500);
                          }
                        }}
                      />
                      {/* Fallback de Carátula / Loader IMDb */}
                      <div className="movie-poster-fallback" style={{ display: 'none' }}>
                        {isFetchingIMDB ? (
                          <>
                            <RefreshCcw className="icon-spin" size={32} color="#f1c40f" style={{ marginBottom: '8px' }} />
                            <span style={{ color: '#f1c40f', fontSize: '12px' }}>Buscando en IMDB...</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon size={32} color="#444" style={{ marginBottom: '8px' }} />
                            <span>{movie.title}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="movie-hover-info">
                      <div className="movie-hover-meta" style={{ justifyContent: 'center' }}>
                        <span className="movie-hover-year">{cleanTitle(movie.title)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        )}

        {/* --- CONTENIDO DINÁMICO: SERIES --- */}
        {selectedSeriesId && (
          <div className="movie-detail-view fade-in">
            {(() => {
              const series = MOCK_SERIES.find(s => s.id === selectedSeriesId);
              if (!series) return null;
              const activeDetails = movieDetails[series.id] || {};
              const isFav = seriesFavorites.includes(series.id);
              const displaySeasons = activeDetails.seasons || series.seasons || [];
              const currentSeason = (displaySeasons && displaySeasons.length > 0)
                ? (displaySeasons.find(s => s.seasonNumber === activeSeason) || displaySeasons[0])
                : { seasonNumber: 1, episodes: [] };

              return (
                <div className="movie-detail-wrapper">
                  <div className="movie-detail-content scroll-area">
                    <button
                      id="sn-back-series"
                      className="btn-back focusable"
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault(); e.stopPropagation();
                          document.getElementById('sn-refresh-top')?.focus();
                        }
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                          e.preventDefault(); e.stopPropagation();
                        }
                        if (e.key === 'ArrowDown') {
                          e.preventDefault(); e.stopPropagation();
                          document.getElementById('sn-play-series')?.focus();
                        }
                      }}
                      onClick={() => setSelectedSeriesId(null)}
                      tabIndex="0"
                      data-sn-down="#sn-play-series"
                      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: 'bold', marginBottom: '35px', cursor: 'pointer', outline: 'none' }}
                    >
                      <ArrowLeft size={16} /> {tr.common.back}
                    </button>

                    <div className="series-detail-header fade-in-up">
                      <div className="movie-detail-poster-container">
                        <img loading="lazy" decoding="async"
                          src={fixedPosters[series.id] || series.poster}
                          alt={series.title}
                          className="movie-detail-poster-img"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      </div>

                      <div className="movie-detail-info">
                        <h2 className="movie-detail-title" style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'system-ui, -apple-system, sans-serif', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px', color: '#fff' }}>
                          {cleanTitle(series.title)}
                        </h2>

                        <div className="movie-detail-meta" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                          <span style={{ background: '#ffb400', color: '#000', fontWeight: 'bold', padding: '4px 12px', borderRadius: '4px', fontSize: '15px' }}>
                            {formatRating(activeDetails.imdb || series.imdb)}
                          </span>
                        </div>

                        <p className="movie-detail-synopsis" style={{ fontSize: '16px', lineHeight: '1.6', color: '#d1d1d1', marginBottom: '25px', maxWidth: '650px' }}>
                          {activeDetails.synopsis || series.synopsis}
                        </p>

                        <table className="movie-detail-crew-table" style={{ fontSize: '15px', borderCollapse: 'collapse', marginBottom: '35px' }}>
                          <tbody>
                            <tr>
                              <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', paddingBottom: '8px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{tr.movieDetail.director}:</td>
                              <td style={{ color: '#d1d1d1', paddingBottom: '8px' }}>{activeDetails.director || series.director}</td>
                            </tr>
                            <tr>
                              <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{tr.movieDetail.cast}:</td>
                              <td style={{ color: '#d1d1d1' }}>{activeDetails.cast || series.cast}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="movie-detail-actions">
                          {(() => {
                            const lastEpId = localStorage.getItem(`thriptw_last_ep_${series.id}`);
                            const progress = lastEpId ? localStorage.getItem(`thriptw_progress_${lastEpId}`) : null;

                            // Recopilamos todos los episodios de todas las temporadas disponibles
                            const allEpisodes = [];
                            const sortedSeasons = [...displaySeasons].sort((a, b) => a.seasonNumber - b.seasonNumber);
                            sortedSeasons.forEach(s => {
                              if (s.episodes) {
                                const sortedEps = [...s.episodes].sort((a, b) => (a.epNumber || 0) - (b.epNumber || 0));
                                allEpisodes.push(...sortedEps);
                              }
                            });

                            const hasEpisodes = allEpisodes.length > 0;

                            return (
                              <button
                                id="sn-play-series"
                                className="btn-play-movie focusable"
                                onKeyDown={(e) => {
                                  if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-back-series')?.focus(); }
                                  if (e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); document.getElementById(`sn-season-pill-${displaySeasons[0].seasonNumber}`)?.focus(); }
                                  if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-fav-series')?.focus(); }
                                  if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); }
                                }}
                                disabled={!hasEpisodes}
                                onClick={() => {
                                  if (!hasEpisodes) return;

                                  const xtUrl = localStorage.getItem('thriptw_xtUrl');
                                  const xtUser = localStorage.getItem('thriptw_xtUser');
                                  const xtPass = localStorage.getItem('thriptw_xtPass');

                                  // Si hay progreso, usamos el último capítulo. Si no, el primero absoluto (S01E01)
                                  let targetEpId = lastEpId;
                                  if (!targetEpId) {
                                    targetEpId = allEpisodes[0].id;
                                  }

                                  const epObj = allEpisodes.find(e => String(e.id) === String(targetEpId)) || allEpisodes[0];
                                  let finalMedia = { ...epObj };

                                  // Si el objeto ya tiene URL (construida con su extensión correcta mkv, ts, etc.), la respetamos.
                                  // Si no, la construimos de forma segura.
                                  if (!finalMedia.url && xtUrl && xtUser && xtPass) {
                                    const baseUrl = xtUrl.replace(/\/+$/, '');
                                    const ext = finalMedia.container_extension || 'mp4';
                                    const streamUrl = `${baseUrl}/series/${xtUser}/${xtPass}/${finalMedia.id}.${ext}`;

                                    finalMedia.url = antiBloqueo
                                      ? `${API_BASE_URL}/api/proxy/stream?url=${encodeURIComponent(streamUrl)}`
                                      : streamUrl;
                                  }

                                  setPlayingMedia({
                                    ...finalMedia,
                                    parentTitle: series.title,
                                    seasons: displaySeasons,
                                    isSeries: true,
                                    seriesId: series.id
                                  });
                                  const newHistory = seriesHistory.filter(id => id !== series.id);
                                  setSeriesHistory([series.id, ...newHistory]);
                                }}
                                style={{
                                  background: hasEpisodes ? '#cc0000' : '#444',
                                  color: '#fff',
                                  border: 'none',
                                  padding: '12px 26px',
                                  borderRadius: '30px',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  cursor: hasEpisodes ? 'pointer' : 'wait',
                                  marginRight: '10px',
                                  opacity: hasEpisodes ? 1 : 0.6
                                }}
                              >
                                {hasEpisodes ? (
                                  <>
                                    <Play size={20} fill="currentColor" /> {progress ? tr.movieDetail.continue : tr.movieDetail.play}
                                  </>
                                ) : (
                                  <>
                                    <RefreshCcw size={20} className="icon-spin" /> {tr.movieDetail.loading}
                                  </>
                                )}
                          </button>
                            );
                          })()}
                          <button
                            id="sn-fav-series"
                            className={`btn-fav-movie focusable ${isFav ? 'favorited' : ''}`}
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-back-series')?.focus(); }
                              if (e.key === 'ArrowDown') {
                                e.preventDefault(); e.stopPropagation();
                                document.getElementById(`sn-season-pill-${displaySeasons[0].seasonNumber}`)?.focus();
                              }
                              if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-play-series')?.focus(); }
                              if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); }
                            }}
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, series.id); }}
                          >
                            <Star size={24} fill={isFav ? '#f1c40f' : 'transparent'} color={isFav ? '#f1c40f' : '#fff'} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SELECTOR DE TEMPORADAS Y EPISODIOS */}
                    <div className="series-seasons-section">
                      <div className="seasons-selector-container fade-in-up" style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {displaySeasons.map((season, sIdx) => (
                          <button
                            key={season.seasonNumber}
                            id={`sn-season-pill-${season.seasonNumber}`}
                            className={`season-tab focusable ${activeSeason === season.seasonNumber ? 'active' : ''}`}
                            onClick={() => setActiveSeason(season.seasonNumber)}
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowUp') {
                                e.preventDefault(); e.stopPropagation();
                                document.getElementById('sn-play-series')?.focus();
                              }
                              if (e.key === 'ArrowDown') {
                                e.preventDefault(); e.stopPropagation();
                                document.getElementById('sn-episode-0')?.focus();
                              }
                              if (e.key === 'ArrowLeft') {
                                e.preventDefault(); e.stopPropagation();
                                if (sIdx > 0) {
                                  document.getElementById(`sn-season-pill-${displaySeasons[sIdx-1].seasonNumber}`)?.focus();
                                }
                              }
                              if (e.key === 'ArrowRight') {
                                e.preventDefault(); e.stopPropagation();
                                if (sIdx < displaySeasons.length - 1) {
                                  document.getElementById(`sn-season-pill-${displaySeasons[sIdx+1].seasonNumber}`)?.focus();
                                }
                              }
                            }}
                            style={{
                              backgroundColor: activeSeason === season.seasonNumber ? 'var(--primary-red)' : 'rgba(255,255,255,0.05)',
                              color: '#fff',
                              border: activeSeason === season.seasonNumber ? '2px solid var(--primary-red)' : '2px solid rgba(255,255,255,0.1)',
                              padding: '12px 24px',
                              borderRadius: '6px',
                              fontSize: '15px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              cursor: 'pointer',
                              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              minWidth: '140px'
                            }}
                          >
                            {tr.seriesDetail.season} {season.seasonNumber}
                          </button>
                        ))}
                      </div>

                      <div className="episodes-list fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {currentSeason.episodes.map((ep, eIdx) => (
                          <div
                            key={ep.id}
                            id={`sn-episode-${eIdx}`}
                            className="episode-card-text-only focusable"
                            tabIndex="0"
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowUp') {
                                e.preventDefault(); e.stopPropagation();
                                if (eIdx === 0) {
                                  document.getElementById(`sn-season-pill-${activeSeason}`)?.focus();
                                } else {
                                  document.getElementById(`sn-episode-${eIdx - 1}`)?.focus();
                                }
                              }
                              if (e.key === 'ArrowDown') {
                                e.preventDefault(); e.stopPropagation();
                                if (eIdx === currentSeason.episodes.length - 1) {
                                  document.getElementById('sn-similar-series-first')?.focus();
                                } else {
                                  document.getElementById(`sn-episode-${eIdx + 1}`)?.focus();
                                }
                              }
                              if (e.key === 'Enter') {
                                e.preventDefault(); e.stopPropagation();
                                setPlayingMedia({ ...ep, parentTitle: series.title, seasons: displaySeasons, isSeries: true, seriesId: series.id });
                                setSeriesHistory([series.id, ...seriesHistory.filter(id => id !== series.id)]);
                              }
                            }}
                            onClick={() => {
                              setPlayingMedia({ ...ep, parentTitle: series.title, seasons: displaySeasons, isSeries: true, seriesId: series.id });
                              setSeriesHistory([series.id, ...seriesHistory.filter(id => id !== series.id)]);
                            }}
                          >
                            <div className="episode-text-info">
                              <h4 className="episode-text-title">S{String(currentSeason.seasonNumber).padStart(2, '0')}E{String(ep.epNumber).padStart(2, '0')} - {series.title}</h4>
                              <span className="episode-text-duration">{ep.duration || ''}</span>
                            </div>
                            <div className="episode-text-action">
                              <Play fill="white" size={16} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="movie-similar-section fade-in-up" style={{ marginTop: '50px', width: '100%', paddingBottom: '30px' }}>
                      <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '20px', fontWeight: 'bold' }}>{tr.movieDetail.similarMovies}:</h3>
                      <div className="similar-movies-row scroll-area-x" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
                        {(() => {
                          const similarSeries = MOCK_SERIES.filter(s => s.groupId === series.groupId && s.id !== series.id).slice(0, 20);
                          return similarSeries.map((similar, sIdx) => (
                            <div
                              key={similar.id}
                              id={sIdx === 0 ? 'sn-similar-series-first' : undefined}
                              className="similar-movie-card focusable"
                              tabIndex="0"
                              onKeyDown={(e) => {
                                if (e.key === 'ArrowUp') {
                                  e.preventDefault(); e.stopPropagation();
                                  const lastEpIdx = currentSeason.episodes.length - 1;
                                  const lastEp = document.getElementById(`sn-episode-${lastEpIdx}`);
                                  if (lastEp) lastEp.focus();
                                  else document.getElementById('sn-season-select')?.focus();
                                }
                                if (e.key === 'ArrowDown') {
                                  e.preventDefault(); e.stopPropagation();
                                }
                                if (e.key === 'ArrowLeft' && sIdx === 0) {
                                  e.preventDefault(); e.stopPropagation();
                                }
                                if (e.key === 'ArrowRight' && sIdx === similarSeries.length - 1) {
                                  e.preventDefault(); e.stopPropagation();
                                }
                              }}
                              onClick={(e) => {
                                setSelectedSeriesId(similar.id);
                              }} style={{ width: '140px', flexShrink: 0, cursor: 'pointer', transition: 'transform 0.2s', border: '3px solid transparent' }}>
                              <img loading="lazy" decoding="async" src={fixedPosters[similar.id] || similar.poster} alt={similar.title} style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} onError={(e) => { e.target.src = 'https://placehold.co/300x450/101010/FFF.png?text=Sin+Portada'; }} />
                              <p style={{ color: '#fff', fontSize: '13px', marginTop: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600', textAlign: 'center', margin: 0 }}>
                                {cleanTitle(similar.title)}
                              </p>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* GRILLA DE SERIES */}
        {activeBottomNav === 'series' && !selectedSeriesId && !selectedMovieId && (
          <div className="movies-container scroll-area" onScroll={handleScroll}>



            <div className="movies-grid">
              {displayedSeries.length === 0 && (
                <div style={{ color: 'gray', textAlign: 'center', marginTop: '40px', gridColumn: '1 / -1' }}>
                  {tr.common.notFound || "No se encontraron resultados."}
                </div>
              )}
              {displayedSeries.filter(Boolean).map((series, idx) => {
                const isFav = seriesFavorites.includes(series.id);
                return (
                  <div
                    key={series.id}
                    id={`sn-series-${idx}`}
                    className="movie-poster-card focusable"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        if (activeCategory === 'hist') {
                          e.preventDefault(); e.stopPropagation();
                          document.getElementById(`sn-series-del-${idx}`)?.focus();
                          return;
                        }
                        const firstItem = document.getElementById('sn-series-0');
                        if (firstItem && e.currentTarget.offsetTop <= firstItem.offsetTop + 10) {
                          e.preventDefault(); e.stopPropagation();
                        }
                      }
                      if (e.key === 'ArrowRight') {
                        const nextItem = document.getElementById(`sn-series-${idx + 1}`);
                        if (!nextItem || (nextItem && nextItem.offsetTop > e.currentTarget.offsetTop)) {
                          e.preventDefault(); e.stopPropagation();
                        }
                      }
                      if (e.key === 'Enter') {
                        lastFocusedItemRef.current = `sn-series-${idx}`;
                      }
                    }}
                    onClick={() => {
                      handleItemClick(series.id, `sn-series-${idx}`);
                      setActiveSeason(1);
                    }}>
                    <div className="movie-poster-wrapper" style={{ position: 'relative' }}>
                      
                      {activeCategory === 'hist' && (
                        <button
                          id={`sn-series-del-${idx}`}
                          className="movie-del-btn focusable"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHistoryItemToDelete(series);
                            setHistoryDeleteType('series');
                            setDeleteHistoryConfirmIdx(idx);
                            setTimeout(() => document.getElementById('sn-cancel-hist-delete')?.focus(), 100);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                              e.preventDefault(); e.stopPropagation();
                              document.getElementById(`sn-series-${idx}`)?.focus();
                            }
                            if (['ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                              e.preventDefault(); e.stopPropagation();
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            zIndex: 10,
                            background: 'rgba(0,0,0,0.7)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          <X size={18} />
                        </button>
                      )}


                      <div className="imdb-badge-floating">
                        <Star size={10} fill="#f1c40f" color="#f1c40f" /> {series.imdb || 'N/A'}
                      </div>

                      <div className="title-badge-floating">
                        <span>{cleanTitle(series.title)}</span>
                      </div>

                      <img loading="lazy" decoding="async"
                        src={series.poster}
                        alt={series.title}
                        className="movie-poster-img"
                      />
                      <div className="movie-hover-info">
                        <div className="movie-hover-meta" style={{ justifyContent: 'center' }}>
                          <span className="movie-hover-year">{cleanTitle(series.title)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* --- CONTENIDO DINÁMICO: AJUSTES --- */}
        {activeBottomNav === 'settings' && (
          <div className="settings-view-container scroll-area fade-in">
            <div className="settings-content-wrapper">
              {/* SECCIÓN 1: Suscripción VIP */}
              <div className="settings-card license-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '24px' }}>
                <div className="license-flex-container" style={{ marginBottom: '15px', opacity: 0.9, display: 'flex', alignItems: 'flex-start', gap: '15px', width: '100%', justifyContent: 'flex-start', textAlign: 'left' }}>
                  <Key size={32} color="var(--primary-red)" className="license-key-icon" style={{ marginTop: '4px' }} />
                  <div className="settings-card-title-group" style={{ textAlign: 'left' }}>
                    <h3 className="license-title" style={{ margin: 0 }}>{tr.payment.title}</h3>
                    <p className="license-subtitle">{tr.payment.desc}</p>
                  </div>
                </div>

                {isPremium && (
                  <div className="trial-badge" style={{ 
                    color: '#2ecc71', 
                    fontSize: '15px', 
                    fontWeight: '800', 
                    marginTop: '5px', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    width: '100%',
                    textAlign: 'center'
                  }}>
                    <Timer size={18} />
                    Licencia Premium
                  </div>
                )}


                {!isPremium ? (
                  <div className="license-button-container fade-in" style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <button
                      id="sn-license"
                      className="btn-premium-buy focusable"
                      data-sn-down="#sn-refresh-list"
                      data-sn-up="#sn-refresh-top"
                      onClick={(e) => { e.preventDefault(); handlePayPalPayment(); }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          e.stopPropagation();
                          document.getElementById('sn-refresh-list')?.focus();
                        }
                      }}
                      disabled={isVerifying}
                    >
                      {tr.payment.priceFull}
                    </button>
                  </div>
                ) : (
                  <div className="payment-success-box bounce-in" style={{
                    width: '350px',
                    maxWidth: '350px',
                    height: '60px',
                    background: '#27ae60',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: '900',
                    margin: '0 auto 10px auto',
                    boxShadow: '0 4px 15px rgba(39, 174, 96, 0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    <ThumbsUp size={22} color="#fff" />
                    <span>{tr.payment.licenseActive || "Licencia activada"}</span>
                  </div>
                )}
              </div>
              <div className="settings-card">
                <div className="settings-card-header">
                  <Tv size={24} color="var(--primary-red)" />
                  <div className="settings-card-title-group" style={{ flex: 1 }}>
                    <h3>{tr.settings.iptwLists}:</h3>
                    <p>{tr.settings.iptwListsSub}</p>
                  </div>
                </div>

                {/* CARD DE LA SUSCRIPCIÓN / LISTA ACTIVA */}
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <button
                    id="sn-refresh-list"
                    className="focusable"
                    data-sn-up="#sn-license"
                    data-sn-down="#sn-edit-0"
                    onClick={handleRefreshCurrentList}
                    disabled={isRefreshing}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault(); e.stopPropagation();
                        const target = document.getElementById('sn-edit-0') || document.getElementById('sn-speed');
                        target?.focus();
                      }
                      if (e.key === 'ArrowUp') {
                        e.preventDefault(); e.stopPropagation();
                        const target = document.getElementById('sn-license') || document.getElementById('sn-refresh-top');
                        target?.focus();
                      }
                    }}
                    style={{
                      marginTop: '20px',
                      width: '240px',
                      background: 'var(--primary-red)',
                      border: 'none',
                      color: '#fff',
                      padding: '14px 24px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      margin: '0 auto 0'
                    }}
                  >
                    <RefreshCcw size={18} className={isRefreshing ? 'icon-spin' : ''} />
                    {isRefreshing ? tr.settings.refreshing : tr.settings.refreshList}
                  </button>

                </div>







                {true && (
                  <div style={{ marginTop: '16px', background: '#0a0a0a', border: '1px solid #1f1f1f', borderRadius: '12px', padding: '16px' }} className="fade-in-up">
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#fff' }}>{tr.settings.savedLists}:</h4>
                    {savedLists.length === 0 && <p style={{ color: '#888', fontSize: '13px' }}>{tr.settings.noSavedLists}</p>}
                    {savedLists.map((list, idx) => {
                      const listId = `${list.url}-${list.user}`;
                      const isEditing = editingListId === listId;

                      return (
                        <div key={idx} title={tr.common.action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', padding: '8px 12px', borderRadius: '8px', marginBottom: '8px', border: isEditing ? '1px solid var(--primary-red)' : '1px solid #222', cursor: 'default', transition: 'border 0.2s' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '35px', flex: 1 }} onClick={(e) => e.stopPropagation()}>
                            <div
                              className="focusable"
                              id={`sn-edit-${idx}`}
                              tabIndex="0"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault(); e.stopPropagation();
                                  setEditingListId(isEditing ? null : listId);
                                }
                                if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById(`sn-add-${idx}`)?.focus(); }
                                if (e.key === 'ArrowDown') {
                                  e.preventDefault(); e.stopPropagation();
                                  const next = document.getElementById(`sn-edit-${idx + 1}`) || document.getElementById('sn-speed');
                                  next?.focus();
                                }
                                if (e.key === 'ArrowUp') {
                                  e.preventDefault(); e.stopPropagation();
                                  const prev = idx === 0 ? document.getElementById('sn-refresh-list') : document.getElementById(`sn-edit-${idx - 1}`);
                                  prev?.focus();
                                }
                              }}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', cursor: 'pointer' }}
                            >
                              <Pencil
                                size={16}
                                style={{ color: isEditing ? 'var(--primary-red)' : '#888', cursor: 'pointer' }}
                                onClick={() => setEditingListId(isEditing ? null : listId)}
                              />
                            </div>
                            {isEditing ? (
                              <input
                                autoFocus
                                type="text"
                                defaultValue={list.name}
                                onBlur={(e) => {
                                  handleRenameList(list, e.target.value);
                                  setEditingListId(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleRenameList(list, e.target.value);
                                    setEditingListId(null);
                                  }
                                }}
                                style={{ background: '#000', border: '1px solid #333', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', width: '100%' }}
                              />
                            ) : (
                              <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>{list.name}</div>
                            )}
                          </div>

                          {list.exp_date !== undefined && (
                            <div style={{ fontSize: '18px', color: '#f1c40f', whiteSpace: 'nowrap', fontWeight: 'bold', marginRight: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              <span>
                                {(!list.exp_date || list.exp_date === "0" || list.exp_date === 0 || list.exp_date === "null") 
                                  ? "ILIMITADA" 
                                  : new Date(parseInt(list.exp_date) * 1000).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          <button
                            id={`sn-add-${idx}`}
                            onClick={(e) => { e.stopPropagation(); handleActivateList(list); }}
                            style={{ background: 'var(--primary-red)', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginRight: '20px', textTransform: 'uppercase' }}
                            className="focusable"
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById(`sn-edit-${idx}`)?.focus(); }
                              if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById(`sn-delete-${idx}`)?.focus(); }
                              if (e.key === 'ArrowDown') {
                                e.preventDefault(); e.stopPropagation();
                                const next = document.getElementById(`sn-add-${idx + 1}`) || document.getElementById('sn-speed');
                                next?.focus();
                              }
                              if (e.key === 'ArrowUp') {
                                e.preventDefault(); e.stopPropagation();
                                const prev = idx === 0 ? document.getElementById('sn-refresh-list') : document.getElementById(`sn-add-${idx - 1}`);
                                prev?.focus();
                              }
                            }}
                          >
                            {tr.settings.activateList}
                          </button>
                          <button
                            id={`sn-delete-${idx}`}
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setListToDelete(list); 
                              setDeleteConfirmIdx(idx); 
                              setTimeout(() => document.getElementById('sn-cancel-delete')?.focus(), 100);
                            }}
                            style={{ background: 'transparent', border: 'none', color: '#ff4d4d', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '10px' }}
                            className="focusable"
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById(`sn-add-${idx}`)?.focus(); }
                              if (e.key === 'ArrowDown') {
                                e.preventDefault(); e.stopPropagation();
                                const next = document.getElementById(`sn-delete-${idx + 1}`) || document.getElementById('sn-speed');
                                next?.focus();
                              }
                              if (e.key === 'ArrowUp') {
                                e.preventDefault(); e.stopPropagation();
                                const prev = idx === 0 ? document.getElementById('sn-refresh-list') : document.getElementById(`sn-delete-${idx - 1}`);
                                prev?.focus();
                              }
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      );
                    })}


                  </div>
                )}

              </div>

              {/* SECCIÓN: Test de Velocidad */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <Timer size={24} color="var(--primary-red)" />
                  <div className="settings-card-title-group">
                    <h3>{tr.settings.speedTest}:</h3>
                    <p>{tr.settings.speedTestSub}</p>
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {!isTestingSpeed ? (
                    <button
                      id="sn-speed"
                      className="focusable"
                      data-sn-up="#sn-refresh-list"
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault(); e.stopPropagation();
                          document.getElementById('sn-refresh-list')?.focus();
                        }
                        if (e.key === 'ArrowDown') {
                          e.preventDefault(); e.stopPropagation();
                          document.getElementById('sn-antibloqueo')?.focus();
                        }
                      }}
                      onClick={async () => {
                        setIsTestingSpeed(true);
                        setSpeedValue(0);
                        setUploadValue(0);

                        // Enfocar botón de cerrar para Smart TV
                        setTimeout(() => {
                          document.getElementById('sn-close-speedtest')?.focus();
                        }, 100);

                        const testUrl = "https://speed.cloudflare.com/__down?bytes=5000000"; // 5MB real
                        const startTime = Date.now();

                        try {
                          const response = await fetch(testUrl + "&cachebg=" + startTime);
                          const reader = response.body.getReader();
                          let loaded = 0;
                          const total = 5000000;

                          while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            loaded += value.length;
                            const elapsed = (Date.now() - startTime) / 1000;
                            if (elapsed > 0) {
                              const bps = (loaded * 8) / elapsed;
                              const mbps = bps / 1000000;
                              setSpeedValue(mbps / 8); // Mostrar en MB/s
                            }
                          }

                          const duration = (Date.now() - startTime) / 1000;
                          const finalBps = (total * 8) / duration;
                          const finalMBs = (finalBps / 8000000);
                          setSpeedValue(finalMBs);

                          // Simular subida realista basada en la descarga real
                          let ul = 0;
                          const ulTarget = finalMBs * (0.2 + Math.random() * 0.1);
                          const ulInterval = setInterval(() => {
                            ul += ulTarget / 20;
                            if (ul >= ulTarget) {
                              clearInterval(ulInterval);
                              setUploadValue(ulTarget);
                            } else {
                              setUploadValue(ul);
                            }
                          }, 100);

                        } catch (err) {
                          console.error("Speed test failed", err);
                          setIsTestingSpeed(false);
                          alert("No se pudo realizar el test real. Comprueba tu conexión.");
                        }
                      }} style={{ width: '240px', background: 'var(--primary-red)', border: 'none', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                      {tr.settings.runTest}
                    </button>
                  ) : (
                    <>
                      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '10px', padding: '10px 0' }}>

                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary-red)', lineHeight: '1' }}>{speedValue.toFixed(2)}</div>
                          <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>{tr.settings.download}</div>
                        </div>

                        <div style={{ width: '1px', height: '40px', background: '#333' }}></div>

                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', lineHeight: '1' }}>{uploadValue.toFixed(2)}</div>
                          <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>{tr.settings.upload}</div>
                        </div>

                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <button
                          id="sn-close-speedtest"
                          className="focusable"
                          onClick={() => {
                            setIsTestingSpeed(false);
                            // Retornar foco al botón principal tras cerrar
                            setTimeout(() => {
                              document.getElementById('sn-speed')?.focus();
                            }, 100);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                              e.preventDefault(); e.stopPropagation();
                              document.getElementById('sn-antibloqueo')?.focus();
                            }
                            if (e.key === 'ArrowUp') {
                              e.preventDefault(); e.stopPropagation();
                              document.getElementById('sn-refresh-list')?.focus();
                            }
                          }}
                          style={{ background: '#333', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', marginTop: '10px' }}
                        >
                          {tr.settings.closeTest}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* SECCIÓN: Anti-Bloqueo Cloudflare */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <ShieldCheck size={24} color={antiBloqueo ? "#2ecc71" : "var(--primary-red)"} />
                  <div className="settings-card-title-group" style={{ flex: 1 }}>
                    <h3>{tr.settings.antiBloqueo}:</h3>
                    <p>{tr.settings.antiBloqueoSub}</p>
                  </div>
                  <div
                    id="sn-antibloqueo"
                    className="focusable"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        e.preventDefault(); e.stopPropagation();
                        const speedBtn = document.getElementById('sn-close-speedtest') || document.getElementById('sn-speed');
                        speedBtn?.focus();
                      }
                      if (e.key === 'ArrowDown') {
                        e.preventDefault(); e.stopPropagation();
                        document.getElementById('sn-config-buffer')?.focus();
                      }
                    }}
                    data-sn-up="#sn-speed"
                    data-sn-down="#sn-config-buffer"
                    onClick={() => {
                      const newVal = !antiBloqueo;
                      setAntiBloqueo(newVal);
                      localStorage.setItem('thriptw_antibloqueo', newVal);
                    }}
                    style={{
                      width: '50px',
                      height: '26px',
                      background: antiBloqueo ? '#2ecc71' : '#333',
                      borderRadius: '13px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      background: '#fff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '3px',
                      left: antiBloqueo ? '27px' : '3px',
                      transition: 'left 0.3s'
                    }}></div>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 3: Configuración IPTW */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <Settings size={24} color="var(--primary-red)" />
                  <div className="settings-card-title-group">
                    <h3>{tr.settings.iptwConfig}:</h3>
                    <p>{tr.settings.iptwConfigSub}</p>
                  </div>
                </div>

                <div className="settings-form-row">
                  <label>{tr.settings.bufferSize}:</label>
                  <div className="settings-pills-container">
                    {[
                      { id: 'pequeno', label: tr.settings.bufferSmall },
                      { id: 'medio', label: tr.settings.bufferDesc },
                      { id: 'grande', label: tr.settings.bufferBig }
                    ].map((opt, idx) => (
                      <button
                        key={opt.id}
                        id={idx === 0 ? "sn-config-buffer" : `sn-buffer-${opt.id}`}
                        className={`settings-pill focusable ${bufferSize === opt.id ? 'active' : ''}`}
                        onClick={() => setBufferSize(opt.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowUp') {
                            e.preventDefault(); e.stopPropagation();
                            document.getElementById('sn-antibloqueo')?.focus();
                          }
                          if (e.key === 'ArrowDown') {
                            e.preventDefault(); e.stopPropagation();
                            document.getElementById('sn-config-quality')?.focus();
                          }
                        }}
                        data-sn-up="#sn-antibloqueo"
                        data-sn-down="#sn-config-quality"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settings-form-row">
                  <label>{tr.settings.streamQuality}:</label>
                  <div className="settings-pills-container">
                    {[
                      { id: '720p', label: tr.settings.qualityHD },
                      { id: '1080p', label: tr.settings.qualityFHD },
                      { id: '4k', label: tr.settings.quality4k }
                    ].map((opt, idx) => (
                      <button
                        key={opt.id}
                        id={idx === 0 ? "sn-config-quality" : `sn-quality-${opt.id}`}
                        className={`settings-pill focusable ${streamQuality === opt.id ? 'active' : ''}`}
                        onClick={() => setStreamQuality(opt.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault(); e.stopPropagation();
                            document.getElementById('sn-language')?.focus();
                          }
                          if (e.key === 'ArrowUp') {
                            e.preventDefault(); e.stopPropagation();
                            document.getElementById('sn-config-buffer')?.focus();
                          }
                        }}
                        data-sn-up="#sn-config-buffer"
                        data-sn-down="#sn-language"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECCIÓN: Idioma de la App */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <Globe size={24} color="var(--primary-red)" />
                  <div className="settings-card-title-group">
                    <h3>{tr.settings.appLanguage}:</h3>
                    <p>{tr.settings.appLanguageSub}</p>
                  </div>
                </div>

                <div className="settings-form-row">
                  <div className="settings-pills-container">
                    {[
                      { id: 'es', label: tr.settings.langES },
                      { id: 'en', label: tr.settings.langEN },
                      { id: 'fr', label: tr.settings.langFR },
                      { id: 'de', label: tr.settings.langDE }
                    ].map((lang, idx) => (
                      <button
                        key={lang.id}
                        id={idx === 0 ? "sn-language" : `sn-lang-${lang.id}`}
                        className={`settings-pill focusable ${appLanguage === lang.id ? 'active' : ''}`}
                        onClick={() => {
                          setAppLanguage(lang.id);
                          const myId = idx === 0 ? "sn-language" : `sn-lang-${lang.id}`;
                          setTimeout(() => {
                            document.getElementById(myId)?.focus();
                          }, 100);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault(); e.stopPropagation();
                            document.getElementById('sn-nav-settings')?.focus();
                          }
                          if (e.key === 'ArrowUp') {
                            e.preventDefault(); e.stopPropagation();
                            document.getElementById('sn-config-quality')?.focus();
                          }
                        }}
                        data-sn-up="#sn-config-quality"
                        data-sn-down="#sn-nav-settings"
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECCIÓN: Soporte Técnico Telegram */}
              <div id="sn-telegram" className="settings-card telegram-card" style={{ padding: '16px 24px' }}>
                <div className="settings-card-header" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '12px', marginBottom: 0 }}>
                  <Send size={24} color="#0088cc" />
                  <div className="settings-card-title-group">
                    <h3 style={{ color: '#fff' }}>{tr.settings.telegramSupport}: <span style={{ color: '#0088cc' }}>@thriptw</span></h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-nav">
        <div
          id="sn-nav-home"
          className={`nav-item focusable ${activeBottomNav === 'home' ? 'active' : ''}`}
          tabIndex="0"
          data-sn-up={upFromHome}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault(); e.stopPropagation();
              if (activeBottomNav === 'live') setIsDrawerOpen(true);
              const target = document.getElementById(upFromHome.replace('#', ''));
              if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault(); e.stopPropagation();
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault(); e.stopPropagation();
              // Bloqueamos explícitamente ir a la izquierda
            }
          }}
          data-sn-right="#sn-nav-live"
          onClick={() => { setActiveBottomNav('home'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}
        >
          <SolidHomeIcon size={32} />
        </div>
        <div
          id="sn-nav-live"
          className={`nav-item focusable ${activeBottomNav === 'live' ? 'active' : ''}`}
          tabIndex="0"
          data-sn-up={upFromHome}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault(); e.stopPropagation();
              if (activeBottomNav === 'live') setIsDrawerOpen(true);
              const target = document.getElementById(upFromHome.replace('#', ''));
              if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault(); e.stopPropagation();
            }
          }}
          data-sn-left="#sn-nav-home"
          data-sn-right="#sn-nav-movies"
          onClick={() => { setActiveBottomNav('live'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}
        >
          <CustomLiveIcon size={32} />
        </div>
        <div
          id="sn-nav-movies"
          className={`nav-item focusable ${activeBottomNav === 'movies' ? 'active' : ''}`}
          tabIndex="0"
          data-sn-up="#sn-drawer-first"
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault(); e.stopPropagation();
              setIsDrawerOpen(true);
              setTimeout(() => {
                const target = document.getElementById('sn-drawer-first');
                if (target) {
                  target.focus();
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 100);
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault(); e.stopPropagation();
            }
            if (e.key === 'ArrowRight') {
              e.preventDefault(); e.stopPropagation();
              document.getElementById('sn-nav-series')?.focus();
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault(); e.stopPropagation();
              document.getElementById('sn-nav-live')?.focus();
            }
          }}
          data-sn-left="#sn-nav-live"
          data-sn-right="#sn-nav-series"
          onClick={() => { setActiveBottomNav('movies'); setActiveCategory('all'); setSearchQuery(''); setActiveGenre('Todos'); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}
        >
          <SolidFilmIcon size={32} />
        </div>
        <div
          id="sn-nav-series"
          className={`nav-item focusable ${activeBottomNav === 'series' ? 'active' : ''}`}
          tabIndex="0"
          data-sn-up="#sn-drawer-first"
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault(); e.stopPropagation();
              setIsDrawerOpen(true);
              setTimeout(() => {
                const target = document.getElementById('sn-drawer-first');
                if (target) {
                  target.focus();
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 100);
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault(); e.stopPropagation();
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault(); e.stopPropagation();
              document.getElementById('sn-nav-movies')?.focus();
            }
            if (e.key === 'ArrowRight') {
              e.preventDefault(); e.stopPropagation();
              document.getElementById('sn-nav-settings')?.focus();
            }
          }}
          data-sn-left="#sn-nav-movies"
          data-sn-right="#sn-nav-settings"
          onClick={() => { setActiveBottomNav('series'); setActiveCategory('all'); setSearchQuery(''); setActiveGenre('Todos'); setIsDrawerOpen(true); setTimeout(() => document.getElementById('sn-drawer-first')?.focus(), 100); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}
        >
          <SolidSeriesIcon size={32} />
        </div>
        <div
          id="sn-nav-settings"
          className={`nav-item focusable ${activeBottomNav === 'settings' ? 'active' : ''}`}
          tabIndex="0"
          data-sn-up={upFromHome}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault(); e.stopPropagation();
              if (activeBottomNav === 'live') setIsDrawerOpen(true);
              const target = document.getElementById(upFromHome.replace('#', ''));
              if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault(); e.stopPropagation();
              document.getElementById('sn-nav-series')?.focus();
            }
          }}
          data-sn-left="#sn-nav-series"
          data-sn-right="#sn-nav-logout"
          onClick={() => {
            setActiveBottomNav('settings'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null);
            // Auto-foco en la tarjeta de licencia o actualizar lista para Smart TV
            setTimeout(() => {
              const target = document.getElementById('sn-license') || document.getElementById('sn-refresh-list');
              if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
          }}
        >
          <SolidSlidersIcon size={32} fill="currentColor" stroke="none" />
        </div>
        <div
          id="sn-nav-logout"
          className="nav-item focusable"
          tabIndex="0"
          data-sn-up={upFromHome}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault(); e.stopPropagation();
              const target = document.getElementById(upFromHome.replace('#', ''));
              if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
            if (e.key === 'ArrowRight') {
              e.preventDefault(); e.stopPropagation();
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault(); e.stopPropagation();
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault(); e.stopPropagation();
              document.getElementById('sn-nav-settings')?.focus();
            }
          }}
          data-sn-left="#sn-nav-settings"
          onClick={onLogout}
        >
          <SolidLogoutIcon size={32} />
        </div>
      </div>

      {/* REPRODUCTOR DE VIDEO ROOT */}
      {playingMedia && (
        <VideoPlayer
          key={playingMedia.id}
          media={playingMedia}
          onClose={() => {
            const isSeries = playingMedia?.isSeries;
            const lastId = playingMedia?.id;
            setPlayingMedia(null);
            setTimeout(() => {
              if (isSeries) {
                document.getElementById('sn-play-series')?.focus();
              } else if (selectedMovieId) {
                document.getElementById('sn-play-movie')?.focus();
              } else if (activeBottomNav === 'live' && lastId) {
                const card = document.getElementById(`sn-channel-${lastId}`);
                if (card) {
                  card.focus();
                  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }
            }, 100);
          }}
          onNext={playingMedia.category === 'TV' ? handleNextChannel : undefined}
          onPrev={playingMedia.category === 'TV' ? handlePrevChannel : undefined}
          useAntiBloqueo={antiBloqueo}
          isLive={playingMedia.category === 'TV'}
          channels={
            playingMedia.category === 'TV'
              ? (playlistData.channels || [])
              : (playlistData.movies || []).filter(m => m.groupId === playingMedia.groupId)
          }
          onSelectChannel={(ch) => setPlayingMedia(ch)}
          isSeries={playingMedia.isSeries}
          seasons={playingMedia.seasons}
          onRefresh={() => window.location.reload()}
        />
      )}

      {/* MODAL DEL QR DE PAGO (3 PASOS TELEGRAM) */}
      {showQRModal && (
        <ActivationFlow 
          tr={tr}
          isBlocking={false}
          onClose={handleCloseQRModal}
          activationCode={activationCode}
          setActivationCode={setActivationCode}
          handleConfirmPayment={handleConfirmPayment}
          isVerifying={isVerifying}
          paymentError={paymentError}
          setPaymentError={setPaymentError}
        />
      )}

      {/* MODAL DE CONFIRMACIÓN DE BORRADO */}
      {listToDelete && (
        <div className="qr-overlay fade-in" style={{ zIndex: 99999, background: 'rgba(0,0,0,0.9)' }} onClick={() => { setListToDelete(null); setTimeout(() => document.getElementById(`sn-delete-${deleteConfirmIdx}`)?.focus(), 100); }}>
          <div className="qr-modal-card bounce-in" style={{ padding: '30px', textAlign: 'center', width: '600px', maxWidth: '90vw' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '22px', marginBottom: '30px', color: '#fff' }}>{tr.settings.confirmDeleteTitle || "¿Seguro que quieres borrar esta lista?"}</h2>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button
                id="sn-cancel-delete"
                className="focusable"
                style={{ 
                  width: '200px', 
                  padding: '12px 24px', 
                  background: '#333', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#fff', 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                data-sn-right="#sn-confirm-delete"
                onClick={() => {
                  setListToDelete(null);
                  setTimeout(() => document.getElementById(`sn-delete-${deleteConfirmIdx}`)?.focus(), 100);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-confirm-delete')?.focus(); }
                  if (['ArrowUp', 'ArrowDown', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); e.stopPropagation(); }
                }}
              >
                {tr.settings.cancelDelete || "Cancelar"}
              </button>
              <button
                id="sn-confirm-delete"
                className="focusable"
                style={{ 
                  width: '200px', 
                  padding: '12px 24px', 
                  background: 'var(--primary-red)', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#fff', 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                data-sn-left="#sn-cancel-delete"
                onClick={() => {
                  handleDeleteList(listToDelete);
                  setListToDelete(null);
                  setTimeout(() => document.getElementById('sn-refresh-list')?.focus(), 100);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-cancel-delete')?.focus(); }
                  if (['ArrowUp', 'ArrowDown', 'ArrowRight'].includes(e.key)) { e.preventDefault(); e.stopPropagation(); }
                }}
              >
                {tr.settings.confirmDelete || "Borrar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE BORRADO DE HISTORIAL */}
      {historyItemToDelete && (
        <div className="qr-overlay fade-in" style={{ zIndex: 99999, background: 'rgba(0,0,0,0.9)' }} onClick={() => { setHistoryItemToDelete(null); setTimeout(() => document.getElementById(`sn-${historyDeleteType}-del-${deleteHistoryConfirmIdx}`)?.focus(), 100); }}>
          <div className="qr-modal-card bounce-in" style={{ padding: '30px', textAlign: 'center', width: '600px', maxWidth: '90vw' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '22px', marginBottom: '30px', color: '#fff' }}>{"¿Seguro que quieres quitar esto del historial?"}</h2>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button
                id="sn-cancel-hist-delete"
                className="focusable"
                style={{ 
                  width: '200px', 
                  padding: '12px 24px', 
                  background: '#333', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#fff', 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                data-sn-right="#sn-confirm-hist-delete"
                onClick={() => {
                  setHistoryItemToDelete(null);
                  setTimeout(() => document.getElementById(`sn-${historyDeleteType}-del-${deleteHistoryConfirmIdx}`)?.focus(), 100);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-confirm-hist-delete')?.focus(); }
                  if (['ArrowUp', 'ArrowDown', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); e.stopPropagation(); }
                }}
              >
                {tr.settings.cancelDelete || "Cancelar"}
              </button>
              <button
                id="sn-confirm-hist-delete"
                className="focusable"
                style={{ 
                  width: '200px', 
                  padding: '12px 24px', 
                  background: 'var(--primary-red)', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#fff', 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                data-sn-left="#sn-cancel-hist-delete"
                onClick={(e) => {
                  if (historyDeleteType === 'movie') handleRemoveFromMovieHistory(e, historyItemToDelete.id);
                  else handleRemoveFromSeriesHistory(e, historyItemToDelete.id);
                  
                  setHistoryItemToDelete(null);
                  setTimeout(() => {
                    const firstId = historyDeleteType === 'movie' ? 'sn-movie-0' : 'sn-series-0';
                    document.getElementById(firstId)?.focus();
                  }, 100);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-cancel-hist-delete')?.focus(); }
                  if (['ArrowUp', 'ArrowDown', 'ArrowRight'].includes(e.key)) { e.preventDefault(); e.stopPropagation(); }
                }}
              >
                {tr.settings.confirmDelete || "Borrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;