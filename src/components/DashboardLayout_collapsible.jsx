import React, { useState, useEffect, useRef } from 'react';
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
  ThumbsUp,
  ShieldCheck,
  Pencil,
  Timer,
  ChevronDown
} from 'lucide-react';
import './DashboardLayout.css';
import VideoPlayer from './VideoPlayer';
import { translations } from '../i18n/translations';

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
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM9 10v8l7-4-7-4z"/>
  </svg>
);

const SolidFilmIcon = ({ size = 24, className = "" }) => (
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
    <path d="M22 10V6a2 2 0 00-2-2H4a2 2 0 00-2 2v4a2 2 0 010 4v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 010-4z" />
    <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" stroke="none" />
  </svg>
);

const SolidSeriesIcon = ({ size = 24, className = "" }) => (
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
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M9 17v2a1 1 0 001 1h4a1 1 0 001-1v-2" />
    <path d="M8 20h8" />
    <path d="M10 8.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
  </svg>
);

const SolidSettingsIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
  </svg>
);

const SolidLogoutIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 21H5a2 2 0 01-2-2V5a2 2 0 012-2h5v2H5v14h5v2z" />
    <path d="M16 17l5-5-5-5v3H9v4h7v3z" />
  </svg>
);

// -- DATOS DEL SISTEMA (FIJOS) --
const SYSTEM_CATEGORIES = [
  { id: 'all', name: 'TODOS', icon: Tv },
  { id: 'fav', name: 'FAVORITOS', icon: Star },
  { id: 'hist', name: 'HISTORIAL', icon: History },
];

// -- GRUPOS EXTRAÍDOS SIMULADOS DE M3U (DINÁMICOS) --
const M3U_EXTRACTED_GROUPS = [
  { id: 'es-tv', name: '🇪🇸 ESPAÑA TV', icon: Globe },
  { id: 'latam-vip', name: '🌎 LATAM VIP', icon: Globe },
  { id: 'us-uk', name: '🇺🇸 USA / UK', icon: Globe },
  { id: 'vod-es', name: '🇪🇸 CINE ESPAÑOL', icon: Film },
  { id: 'vod-en', name: '🇺🇸 MOVIES (EN)', icon: Film },
];

// Unión temporal para facilitar recuentos
const STATIC_MOCK_CATEGORIES = [...SYSTEM_CATEGORIES, ...M3U_EXTRACTED_GROUPS];

const STATIC_MOCK_CHANNELS = [];
const STATIC_MOCK_MOVIES = [];
const STATIC_MOCK_SERIES = [];

const MOCK_SPORTS_AGENDA = [];

const cleanTitle = (rawTitle) => {
  if (!rawTitle) return '';
  let clean = rawTitle;
  if (clean.includes('|')) clean = clean.split('|').pop().trim();
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

const translateToSpanish = async (text) => {
  if (!text || text.length < 3 || text === 'N/A') return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const result = await res.json();
    return result[0].map(item => item[0]).join('');
  } catch (error) {
    console.warn("Translation failed", error);
    return text;
  }
};

const DashboardLayout = ({ onLogout, playlistData, appLanguage, setAppLanguage }) => {
  const tr = translations[appLanguage] || translations.es;
  const isWebSvc = typeof window !== 'undefined' && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost';
  const API_BASE_URL = isWebSvc ? window.location.origin : 'http://localhost:3001';

  const MOCK_CHANNELS = playlistData && playlistData.channels?.length > 0 ? playlistData.channels : STATIC_MOCK_CHANNELS;
  const MOCK_MOVIES = playlistData && playlistData.movies?.length > 0 ? playlistData.movies : STATIC_MOCK_MOVIES;
  const MOCK_SERIES = playlistData && playlistData.series?.length > 0 ? playlistData.series : STATIC_MOCK_SERIES;
  const MOCK_CATEGORIES = playlistData && playlistData.categories?.length > 0 
    ? [...SYSTEM_CATEGORIES, ...playlistData.categories] 
    : STATIC_MOCK_CATEGORIES;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeBottomNav, setActiveBottomNav] = useState('home'); // 'home' | 'settings' | 'movies' | 'series' | 'live'
  
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };
  
  const homeMoviesRef = useRef(null);
  const homeSeriesRef = useRef(null);
  const scrollRef = (ref, amount) => { if(ref.current) ref.current.scrollBy({ left: amount, behavior: 'smooth' }); };
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [visibleItemsCount, setVisibleItemsCount] = useState(50);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeGenre, setActiveGenre] = useState('Todos');
  const [playingMedia, setPlayingMedia] = useState(null);
  
  // STATE DEL ROBOT DEPORTIVO
  const [liveSchedule, setLiveSchedule] = useState(null);
  const [scheduleError, setScheduleError] = useState(false);

  // Debounce search query to prevent UI freezes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset progressive rendering count
  useEffect(() => {
    setVisibleItemsCount(50);
  }, [activeCategory, debouncedSearchQuery, activeBottomNav, activeGenre]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/sports/schedule`);
        const data = await res.json();
        if (data.success && data.schedule.length > 0) {
          setLiveSchedule(data.schedule);
        } else {
          setLiveSchedule(MOCK_SPORTS_AGENDA); // Fallback
        }
      } catch (err) {
        console.error("No se pudo conectar al Robot Lector");
        setScheduleError(true);
        setLiveSchedule(MOCK_SPORTS_AGENDA); // Fallback
      }
    };
    fetchSchedule();
  }, []);
  
  // MOTORES DE RESCATE IMDB
  const [activeSearchIMDB, setActiveSearchIMDB] = useState({});
  const [fixedPosters, setFixedPosters] = useState({});
  
  // METADATOS EXTRAÍDOS DE IMDB/OMDB
  const [movieDetails, setMovieDetails] = useState({});
  useEffect(() => {
    if (selectedMovieId && !movieDetails[selectedMovieId]) {
      const m = MOCK_MOVIES.find(x => x.id === selectedMovieId);
      if (m && m.id && m.id.startsWith('vod_')) {
        const streamId = m.id.replace('vod_', '');
        const xtUrl = localStorage.getItem('thriptw_xtUrl');
        const xtUser = localStorage.getItem('thriptw_xtUser');
        const xtPass = localStorage.getItem('thriptw_xtPass');
        
        if (xtUrl && xtUser && xtPass) {
          fetch(`${API_BASE_URL}/api/proxy/xtream`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              url: xtUrl.replace(/\/+$/, ''), 
              username: xtUser, 
              password: xtPass, 
              action: `get_vod_info&vod_id=${streamId}` 
            })
          })
          .then(res => res.json())
          .then(async data => {
            if (data && data.info) {
              const rawPlot = data.info.plot || data.info.description || m.synopsis;
              const translatedPlot = rawPlot ? await translateToSpanish(rawPlot) : rawPlot;
              setMovieDetails(prev => ({
                ...prev,
                [selectedMovieId]: {
                  director: data.info.director || m.director,
                  cast: data.info.cast || data.info.actors || m.cast,
                  synopsis: translatedPlot,
                  imdb: data.info.rating || data.info.rating_5based || m.imdb,
                  year: data.info.year || data.info.released || m.year,
                  genre: data.info.genre || m.genre
                }
              }));
            }
          })
          .catch(e => console.error("Error obteniendo detalles VOD:", e));
        }
      }
    }
  }, [selectedMovieId]);

  useEffect(() => {
    if (selectedSeriesId && !movieDetails[selectedSeriesId]) {
      const s = MOCK_SERIES.find(x => x.id === selectedSeriesId);
      if (s && s.id && s.id.startsWith('series_')) {
        const streamId = s.id.replace('series_', '');
        const xtUrl = localStorage.getItem('thriptw_xtUrl');
        const xtUser = localStorage.getItem('thriptw_xtUser');
        const xtPass = localStorage.getItem('thriptw_xtPass');
        
        if (xtUrl && xtUser && xtPass) {
          fetch(`${API_BASE_URL}/api/proxy/xtream`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              url: xtUrl.replace(/\/+$/, ''), 
              username: xtUser, 
              password: xtPass, 
              action: `get_series_info&series_id=${streamId}` 
            })
          })
          .then(res => res.json())
          .then(async data => {
            if (data) {
              const info = data.info || {};
              const rawPlot = info.plot || info.description || s.synopsis;
              const translatedPlot = rawPlot ? await translateToSpanish(rawPlot) : rawPlot;
              
              let extractedSeasons = [];
              if (data.episodes && typeof data.episodes === 'object') {
                Object.keys(data.episodes).forEach(seasonNum => {
                   let epsList = data.episodes[seasonNum];
                   if (Array.isArray(epsList) && epsList.length > 0) {
                      extractedSeasons.push({
                         seasonNumber: parseInt(seasonNum, 10),
                         episodes: epsList.map((ep, idx) => ({
                            id: ep.id || `ep_${idx}`,
                            epNumber: ep.episode_num || (idx + 1),
                            title: ep.title || `Episodio ${idx + 1}`,
                            duration: ep.info?.duration ? `${ep.info.duration} min` : 'N/A',
                            synopsis: ep.info?.plot || '',
                            image: ep.info?.movie_image || '',
                            url: `${xtUrl.replace(/\/+$/, '')}/series/${xtUser}/${xtPass}/${ep.id}.${ep.container_extension || 'mp4'}`
                         }))
                      });
                   }
                });
              }
              extractedSeasons.sort((a,b) => a.seasonNumber - b.seasonNumber);

              setMovieDetails(prev => ({
                ...prev,
                [selectedSeriesId]: {
                  director: info.director || s.director,
                  cast: info.cast || info.actors || s.cast,
                  synopsis: translatedPlot,
                  imdb: info.rating || info.rating_5based || s.imdb,
                  year: info.year || info.releaseDate || s.year,
                  genre: info.genre || s.genre,
                  seasons: extractedSeasons.length > 0 ? extractedSeasons : s.seasons
                }
              }));
            }
          })
          .catch(e => console.error("Error obteniendo detalles Series:", e));
        }
      }
    }
  }, [selectedSeriesId]);

  // MOTORES DE MEMORIA (FAVORITOS E HISTORIAL COMPARTIDO)
  const [favorites, setFavorites] = useState([]); 
  const [history, setHistory] = useState([]); 

  // PAGO Y LICENCIA PREMIUM
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem('licenseStatus') === 'premium');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [activationCode, setActivationCode] = useState('');

  // Auto-foco al abrir el menú lateral
  useEffect(() => {
    if (isDrawerOpen) {
      setTimeout(() => {
        const activeItem = document.querySelector('.drawer-menu .menu-item.active') || document.querySelector('.drawer-menu .menu-item.focusable');
        if (activeItem) {
          activeItem.focus();
        }
      }, 100);
    }
  }, [isDrawerOpen]);

  // Lógica avanzada de mando TV para el menú lateral
  useEffect(() => {
    // Si el menú se abre, deshabilitamos la navegación del resto de la página
    if (isDrawerOpen) {
    } else {
    }

    const handleNavigateFailed = (e) => {
      if (!isDrawerOpen && e.detail.direction === 'left' && activeBottomNav !== 'home') {
        setIsDrawerOpen(true);
      }
    };

    const handleWillMove = (e) => {
      if (isDrawerOpen) {
        if (e.detail.direction === 'right') {
          e.preventDefault();
          setIsDrawerOpen(false);
          setTimeout(() => {
            const firstItem = document.querySelector('.channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
            if (firstItem) firstItem.focus();
          }, 100);
        } else if (e.detail.direction === 'left') {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('sn:navigatefailed', handleNavigateFailed);
    window.addEventListener('sn:willmove', handleWillMove);

    return () => {
      window.removeEventListener('sn:navigatefailed', handleNavigateFailed);
      window.removeEventListener('sn:willmove', handleWillMove);
    };
  }, [isDrawerOpen, activeBottomNav]);

  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);

  // GESTION DE MULTIPLES LISTAS
  const [savedLists, setSavedLists] = useState([]);
  const [isEditListOpen, setIsEditListOpen] = useState(false);
  const [editingListId, setEditingListId] = useState(null);
  const [newListUrl, setNewListUrl] = useState('');
  const [newListUser, setNewListUser] = useState('');
  const [newListPass, setNewListPass] = useState('');

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
        } else if (currentExp && existing.exp_date !== currentExp) {
           existing.exp_date = currentExp;
           localStorage.setItem('thriptw_saved_lists', JSON.stringify(stored));
        }
      }
      setSavedLists(stored);
    } catch (e) { console.error("Error reading saved lists", e); }
  }, []);

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

  // Sincronizar fecha de caducidad de la lista activa con su entrada en la lista guardada
  useEffect(() => {
    if (playlistData?.account_info?.exp_date && savedLists.length > 0) {
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
  }, [playlistData, savedLists]);

  useEffect(() => {
    if (!isPremium) {
      let startDateStr = localStorage.getItem('thriptw_trial_start');
      if (!startDateStr) {
        startDateStr = Date.now().toString();
        localStorage.setItem('thriptw_trial_start', startDateStr);
      }
      
      const startDate = parseInt(startDateStr, 10);
      const now = Date.now();
      const daysPassed = (now - startDate) / (1000 * 60 * 60 * 24);
      const remaining = 7 - daysPassed;
      
      if (remaining <= 0) {
        setIsTrialExpired(true);
        setTrialDaysLeft(0);
      } else {
        setIsTrialExpired(false);
        setTrialDaysLeft(Math.ceil(remaining));
      }
    }
  }, [isPremium]);

  const handlePayPalPayment = () => {
    setShowQRModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!activationCode || activationCode.trim() === '') return;
    setIsVerifying(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/payments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinCode: activationCode })
      });
      const data = await resp.json();
      if (data.success) {
        localStorage.setItem('licenseStatus', 'premium');
        setIsPremium(true);
        setShowQRModal(false);
      } else {
        alert(tr.payment?.error || 'Pin inválido. Debe contener exactamente 12 caracteres alfanuméricos.');
      }
    } catch (err) {
      console.error(err);
      alert("Error conectando con el Servidor Backend Node.");
    } finally {
      setIsVerifying(false);
    }
  };

  // FUNCIONES DE CONTROL
  const toggleFavorite = (e, itemId) => {
    e.stopPropagation();
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const handleItemClick = (itemId) => {
    const newHistory = history.filter(id => id !== itemId);
    setHistory([itemId, ...newHistory]);
    
    if (activeBottomNav === 'movies') {
      setSelectedMovieId(itemId);
    } else if (activeBottomNav === 'series') {
      setSelectedSeriesId(itemId);
    } else {
      // Live TV u otros: lanzamos directamente el reproductor
      const channelObj = MOCK_CHANNELS.find(c => c.id === itemId);
      if (channelObj) {
        setPlayingMedia(channelObj);
      }
    }
  };

  // CÁLCULO DINÁMICO DE DATOS (A nivel general)
    return { ...cat, count: specificCount };
  });

  // RUTINAS DE FILTRADO
  const getDisplayedChannels = () => {
    let filtered = MOCK_CHANNELS;
    if (activeCategory === 'fav') {
      filtered = MOCK_CHANNELS.filter(c => favorites.includes(c.id));
    } else if (activeCategory === 'hist') {
      filtered = history.map(id => MOCK_CHANNELS.find(c => c.id === id)).filter(Boolean);
    } else if (activeCategory !== 'all') {
      filtered = MOCK_CHANNELS.filter(c => c.groupId === activeCategory);
    }

    if (debouncedSearchQuery.trim() !== '') {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
    }
    return filtered.slice(0, visibleItemsCount);
  };

  const getDisplayedMovies = () => {
    let filtered = MOCK_MOVIES;
    if (activeCategory === 'fav') {
      filtered = MOCK_MOVIES.filter(m => favorites.includes(m.id));
    } else if (activeCategory === 'hist') {
      filtered = history.map(id => MOCK_MOVIES.find(m => m.id === id)).filter(Boolean);
    } else if (activeCategory !== 'all') {
      filtered = MOCK_MOVIES.filter(m => m.groupId === activeCategory);
    }

    if (activeGenre !== 'Todos') {
      filtered = filtered.filter(m => m.genre && m.genre.toLowerCase().includes(activeGenre.toLowerCase()));
    }

    if (debouncedSearchQuery.trim() !== '') {
      filtered = filtered.filter(m => m.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
    }
    return filtered.slice(0, visibleItemsCount);
  };

  const getDisplayedSeries = () => {
    let filtered = MOCK_SERIES;
    if (activeCategory === 'fav') {
      filtered = MOCK_SERIES.filter(s => favorites.includes(s.id));
    } else if (activeCategory === 'hist') {
      filtered = history.map(id => MOCK_SERIES.find(s => s.id === id)).filter(Boolean);
    } else if (activeCategory !== 'all') {
      filtered = MOCK_SERIES.filter(s => s.groupId === activeCategory);
    }

    if (activeGenre !== 'Todos') {
      filtered = filtered.filter(s => s.genre && s.genre.toLowerCase().includes(activeGenre.toLowerCase()));
    }

    if (debouncedSearchQuery.trim() !== '') {
      filtered = filtered.filter(s => s.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
    }
    return filtered.slice(0, visibleItemsCount);
  };

  const displayedChannels = getDisplayedChannels();
  const displayedMovies = getDisplayedMovies();
  const displayedSeries = getDisplayedSeries();

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
      if (idx !== -1 && idx < displayedChannels.length - 1) {
        setPlayingMedia(displayedChannels[idx + 1]);
      }
    }
  };

  const handlePrevChannel = () => {
    if (!playingMedia) return;
    const isChannel = MOCK_CHANNELS.find(c => c.id === playingMedia.id);
    if (isChannel) {
      const idx = displayedChannels.findIndex(c => c.id === playingMedia.id);
      if (idx > 0) {
        setPlayingMedia(displayedChannels[idx - 1]);
      }
    }
  };

  if (isTrialExpired && !isPremium) {
    return (
      <div className="dashboard-container fade-in scroll-area" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-dark)', padding: '20px 0', overflowY: 'auto' }}>
        


        {/* BANNER DE PAGO ESTILO AJUSTES/MODAL */}
        <div className="qr-modal-card telegram-modal fade-in-up" style={{ position: 'relative', transform: 'none', top: 'auto', left: 'auto', margin: '0 20px', maxWidth: '600px', width: 'calc(100% - 40px)', padding: '30px' }}>
          <div className="device-id-badge" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '15px',
            width: 'fit-content',
            margin: '0 auto 15px auto'
          }}>
            <span style={{ fontSize: '16px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MAC:</span>
            <span style={{ fontSize: '20px', color: '#f1c40f', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '1px' }}>
              {localStorage.getItem('thriptw_device_id')?.replace(/;/g, ':') || '00:00:00:00:00:00'}
            </span>
          </div>
        <p className="qr-subtitle" style={{ fontSize: '17px', color: '#ccc', marginBottom: '20px', fontWeight: '500', marginTop: 0, maxWidth: '80%', margin: '0 auto 20px', textAlign: 'center' }}>
          Compra una licencia de 12 meses para continuar disfrutando de la aplicación.
        </p>
          
          <div className="telegram-steps-container" style={{ width: '100%', maxWidth: '600px', marginTop: '10px' }}>
            {/* PASOS 1 & 2 COMBINADOS VERTICALMENTE */}
            <div className="telegram-step" style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', alignItems: 'center' }}>
              {/* PAYPAL */}
              <div className="qr-item-vertical" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '25px' }}>
                  <div className="telegram-step-number">1</div>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '15px' }}>{tr.payment?.step1 || 'Pagar 6,95 €'}</h4>
                </div>
                <div style={{ background: '#fff', padding: '10px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '12px', width: '160px', height: '160px', marginTop: '-10px' }}>
                  <img 
                    src="./QR.png" 
                    alt="PayPal QR" 
                    onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://paypal.me/thriptw/6.95EUR"}
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} 
                  />
                </div>
                <p style={{ color: '#0088cc', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>Paypal: @thriptw</p>
              </div>

              {/* DIVIDER */}
              <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.05)', margin: '5px 0' }}></div>

              {/* TELEGRAM */}
              <div className="qr-item-vertical" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '25px' }}>
                  <div className="telegram-step-number">2</div>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '15px' }}>{tr.payment?.step2 || 'Enviar Recibo'}</h4>
                </div>
                <div style={{ background: '#fff', padding: '10px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '12px', width: '160px', height: '160px', marginTop: '-10px' }}>
                  <img 
                    src="./qr telegram.png" 
                    alt="Telegram QR" 
                    onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/thriptw"}
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} 
                  />
                </div>
                <p style={{ color: '#0088cc', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>Telegram: @thriptw</p>
              </div>
            </div>

            {/* PASO 3: PIN ENTRY */}
            <div className="telegram-step" style={{ width: '100%', marginTop: '10px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid var(--primary-red)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div className="telegram-step-number">3</div>
                <h4 style={{ color: '#fff', fontSize: '16px', margin: 0 }}>{tr.payment?.step3 || 'Ingresa PIN activación'}</h4>
              </div>
              <div className="telegram-input-group" style={{ display: 'flex', gap: '10px' }}>
                <input 
                  id="sn-pin-input-expired-coll"
                  className="focusable"
                  type="text" 
                  placeholder={tr.payment?.codePlaceholder || "Escribe el PIN..."}
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                  maxLength={14}
                  style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '18px', textAlign: 'center', fontFamily: 'monospace', letterSpacing: '2px' }}
                />
                <button 
                  id="sn-confirm-pin-expired-coll"
                  className="btn-redeem focusable"
                  onClick={handleConfirmPayment}
                  disabled={activationCode.length < 12}
                  style={{ background: '#ff0000', color: 'white', border: 'none', borderRadius: '8px', padding: '0 20px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {tr.payment?.confirmPayment || 'Activar'}
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container fade-in">
      
      {/* HEADER / TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-title">
          {activeBottomNav === 'home' && <><Home className="icon-live" size={24} /> {tr.nav.home}</>}
          {activeBottomNav === 'live' && <><Radio className="icon-live" size={24} /> {tr.nav.live}</>}
          {activeBottomNav === 'movies' && <><Film className="icon-live" size={24} /> {tr.nav.movies}</>}
          {activeBottomNav === 'series' && <><Clapperboard className="icon-live" size={24} /> {tr.nav.series}</>}
          {activeBottomNav === 'settings' && <><Settings className="icon-live" size={24} /> {tr.nav.settings}</>}
        </div>
        <div className="top-bar-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            className="focusable" 
            onClick={toggleFullScreen} 
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '8px' }}
          >
            {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      {activeBottomNav !== 'settings' && !(activeBottomNav === 'home' && selectedMatchId) && !(activeBottomNav === 'movies' && selectedMovieId) && !(activeBottomNav === 'series' && selectedSeriesId) && (
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder={tr.common.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
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
            {categoriesWithCounts.filter(cat => SYSTEM_CATEGORIES.some(sys => sys.id === cat.id)).map(cat => {
              const IconComp = cat.icon;
              return (
                <div 
                  key={cat.id} 
                  className={`menu-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setIsDrawerOpen(false);
                    setTimeout(() => {
                      const firstItem = document.querySelector('.channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
                      if (firstItem) firstItem.focus();
                    }, 100);
                  }}
                >
                  <IconComp className="menu-icon" size={20} />
                  <span className="menu-label">{cat.name}</span>
                  <span className="menu-count">{cat.count > 0 ? cat.count : '0'}</span>
                  <span className="menu-arrow">{'>'}</span>
                </div>
              )
            })}

            {/* SEPARADOR VISUAL PARA LISTAS M3U */}
            <div style={{ height: '1px', background: '#1f1f1f', margin: '8px 20px' }}></div>

            {/* RENDERIZADO DE GRUPOS DINÁMICOS M3U (SOLO CATEGORÍAS QUE TIENEN ITEMS EN ESTA VISTA) */}
            {categoriesWithCounts.filter(cat => !SYSTEM_CATEGORIES.some(sys => sys.id === cat.id) && cat.count > 0).map(cat => {
              return (
                <div 
                  key={cat.id} 
                  className={`menu-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setIsDrawerOpen(false);
                    setTimeout(() => {
                      const firstItem = document.querySelector('.channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
                      if (firstItem) firstItem.focus();
                    }, 100);
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
              
              {/* DEPORTES HOY - AGENDA PRIVADA */}
              <div className="home-section" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <h3 className="section-title" style={{ fontSize: '24px', margin: 0, fontWeight: '700', color: 'white' }}>
                    {tr.home.todaysMatches}
                  </h3>
                </div>

                <div className="sports-agenda-board fade-in sports-desktop-scroll scroll-area" style={{ background: 'transparent', border: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
                  {(!liveSchedule || liveSchedule.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', width: '100%' }}>
                      <p>{tr.home.noEvents}</p>
                    </div>
                  ) : (
                    liveSchedule.map((match, idx) => {
                      
                      // Escaneamos inteligentemente el texto en busca de un formato de hora (ej: "21:00" o "9:45")
                      const timeStr = match.time || 'LIVE';
                      const timeMatch = timeStr.match(/\b\d{1,2}:\d{2}\b/);
                      
                      let showHora = '';
                      let showDia = match.day || '';
                      
                      if (timeMatch) {
                          // Extrae la hora exacta para la caja grande y deja lo demas abajo
                          showHora = timeMatch[0];
                          if (!showDia) {
                              showDia = timeStr.replace(timeMatch[0], '').trim();
                          }
                      } else {
                          showHora = timeStr;
                      }
                      
                      if (showDia.toLowerCase() === 'hoy') {
                        showDia = tr.common.today || 'Hoy';
                      } else if (showDia.toLowerCase() === 'mañana') {
                        showDia = tr.common.tomorrow || 'Mañana';
                      }
                      
                      return (
                        <div key={match.id} className="sports-match-row manual-sports-card" onClick={() => setSelectedMatchId(match.id)} style={{ position: 'relative', overflow: 'hidden', minHeight: '65px', width: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', alignItems: 'center', padding: '10px 20px', marginBottom: '8px' }}>
                          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(to right, rgba(20,20,20,0.95), rgba(10,10,10,0.98))`, zIndex: 0 }} className="sports-bg-layer"></div>
                          
                          {/* Flujo Unificado a la Izquierda (Tren Tabular) */}
                          <div className="match-info-fluid" style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 0 }}>
                            
                            <div className="match-time-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '80px', height: '100%' }}>
                              <span className="match-time-main" style={{ color: 'var(--primary-red)', fontSize: '18px', fontWeight: '900', margin: 0, padding: 0, textShadow: '0 2px 8px rgba(217, 30, 24, 0.6)' }}>{showHora}</span>
                            </div>

                            {showDia ? (
                              <div className="match-day-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '130px', height: '100%', paddingLeft: '20px' }}>
                                <span className="match-time-sub" style={{ color: 'white', fontWeight: '800', fontSize: '18px', textTransform: 'uppercase', margin: 0, padding: 0, opacity: 0.9, letterSpacing: '0.5px' }}>{showDia}</span>
                              </div>
                            ) : (
                              <div className="match-day-col" style={{ borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '130px', height: '100%' }}></div>
                            )}
                            
                            <div className="match-tournament-col" style={{ display: 'flex', alignItems: 'center', gap: '10px', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '140px', paddingLeft: '20px', paddingRight: '10px', height: '100%' }}>
                              {match.tournamentLogo && <img loading="lazy" decoding="async" src={match.tournamentLogo} alt="Torneo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />}
                              {match.tournament && <span className="match-time-sub tournament-name" style={{ color: '#f1c40f', fontWeight: '800', fontSize: '18px', textTransform: 'uppercase', margin: 0, padding: 0, letterSpacing: '0.5px' }}>{match.tournament}</span>}
                            </div>

                            <div className="match-teams-col" style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px', flex: 1 }}>
                              <span style={{ color: 'white', fontWeight: '800', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0, padding: 0 }}>{(match.title || '').replace(/\s+vs\s+/gi, ' - ')}</span>
                            </div>
                          </div>

                          <div className="match-action-col" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: '100px' }}>
                            <button className="premium-btn" onClick={(e) => { e.stopPropagation(); setSelectedMatchId(match.id); }} style={{ background: 'var(--primary-red)', padding: '8px 24px', fontSize: '13px', fontWeight: 'bold', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(217, 30, 24, 0.4)', marginTop: '4px' }}>
                                + INFO
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* PELICULAS DESTACADAS */}
              <div className="home-section" style={{ marginTop: '16px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 className="section-title" style={{ fontSize: '22px', margin: 0, fontWeight: '500' }}>{tr.home.featuredMovies}</h3>
                  <button 
                    className="focusable"
                    onClick={() => setActiveBottomNav('movies')} 
                    style={{ background: 'transparent', border: 'none', color: '#f1c40f', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    Ver todo <ChevronRight size={18} />
                  </button>
                </div>
                
                <button className="carousel-nav-btn left fade-in" onClick={() => scrollRef(homeMoviesRef, -600)}>
                  <ChevronLeft size={32} />
                </button>

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
                        className="movie-poster-card" 
                        style={{ flexShrink: 0, width: '220px', height: '330px' }}
                        onClick={() => setSelectedMovieId(movie.id)}
                      >
                        <div className="movie-poster-wrapper" style={{ position: 'relative' }}>
                          <button 
                            className="fav-badge-floating" 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, movie.id); }}
                          >
                            <Star fill={favorites.includes(movie.id) ? '#f1c40f' : 'rgba(0,0,0,0.5)'} color={favorites.includes(movie.id) ? '#f1c40f' : '#fff'} size={16} />
                          </button>
                          
                          <div className="imdb-badge-floating">
                            <Star size={10} fill="#f1c40f" color="#f1c40f"/> {movie.imdb || 'N/A'}
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
                                setActiveSearchIMDB(prev => ({...prev, [movie.id]: true}));
                                setTimeout(() => {
                                  setFixedPosters(prev => ({...prev, [movie.id]: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg'}));
                                  setActiveSearchIMDB(prev => ({...prev, [movie.id]: false}));
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
                  <h3 className="section-title" style={{ fontSize: '22px', margin: 0, fontWeight: '500' }}>{tr.home.featuredSeries}</h3>
                  <button 
                    className="focusable"
                    onClick={() => setActiveBottomNav('series')} 
                    style={{ background: 'transparent', border: 'none', color: '#f1c40f', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    Ver todo <ChevronRight size={18} />
                  </button>
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
                        className="movie-poster-card" 
                        style={{ flexShrink: 0, width: '220px', height: '330px' }}
                        onClick={() => setSelectedSeriesId(series.id)}
                      >
                        <div className="movie-poster-wrapper" style={{ position: 'relative' }}>
                          <button 
                            className="fav-badge-floating" 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, series.id); }}
                          >
                            <Star fill={favorites.includes(series.id) ? '#f1c40f' : 'rgba(0,0,0,0.5)'} color={favorites.includes(series.id) ? '#f1c40f' : '#fff'} size={16} />
                          </button>
                          
                          <div className="imdb-badge-floating">
                            <Star size={10} fill="#f1c40f" color="#f1c40f"/> {series.imdb || 'N/A'}
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
                                setActiveSearchIMDB(prev => ({...prev, [series.id]: true}));
                                fetch('https://api.tvmaze.com/singlesearch/shows?q=' + encodeURIComponent(series.title))
                                  .then(res => res.json())
                                  .then(data => {
                                    if(data && data.image && data.image.original) {
                                      setFixedPosters(prev => ({...prev, [series.id]: data.image.original}));
                                    } else {
                                      setFixedPosters(prev => ({...prev, [series.id]: 'https://placehold.co/500x750/222/FFF.png?text=' + encodeURIComponent(series.title)}));
                                    }
                                  })
                                  .catch(() => {
                                    setFixedPosters(prev => ({...prev, [series.id]: 'https://placehold.co/500x750/222/FFF.png?text=' + encodeURIComponent(series.title)}));
                                  })
                                  .finally(() => {
                                    setActiveSearchIMDB(prev => ({...prev, [series.id]: false}));
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

              {displayedChannels.map(channel => {
                const isFav = favorites.includes(channel.id);
                return (
                  <div key={channel.id} className="channel-card" onClick={() => handleItemClick(channel.id)}>
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
              const isFav = favorites.includes(movie.id);
              
              return (
                <div className="movie-detail-wrapper">
                  <div className="movie-detail-content scroll-area">
                    <button className="btn-back" onClick={() => setSelectedMovieId(null)} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: 'bold', marginBottom: '35px', cursor: 'pointer', outline: 'none' }}>
                      <ArrowLeft size={16} /> Volver
                    </button>

                    <div className="movie-detail-grid layout">
                      <div className="movie-detail-poster-container fade-in-up">
                        <Star 
                          size={28} 
                          className={`star-icon-movie pos-top-left ${isFav ? 'favorited' : ''}`} 
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(e, movie.id); }}
                          fill={isFav ? '#f1c40f' : 'transparent'}
                          color={isFav ? '#f1c40f' : 'rgba(255,255,255,0.6)'}
                          strokeWidth={2}
                          style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))', cursor: 'pointer' }}
                        />

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
                              <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', paddingBottom: '8px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>Director:</td>
                              <td style={{ color: '#d1d1d1', paddingBottom: '8px' }}>{movieDetails[movie.id]?.director || movie.director}</td>
                            </tr>
                            <tr>
                              <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>Reparto:</td>
                              <td style={{ color: '#d1d1d1' }}>{movieDetails[movie.id]?.cast || movie.cast}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="movie-detail-actions">
                          <button className="btn-play-movie" onClick={() => setPlayingMedia(movie)} style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '12px 26px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <Play size={20} fill="currentColor" /> Reproducir
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="movie-similar-section fade-in-up" style={{ marginTop: '50px', width: '100%', paddingBottom: '30px' }}>
                      <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '20px', fontWeight: 'bold' }}>Películas parecidas:</h3>
                      <div className="similar-movies-row scroll-area-x" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
                        {MOCK_MOVIES.filter(m => m.groupId === movie.groupId && m.id !== movie.id).slice(0, 20).map(similar => (
                          <div key={similar.id} className="similar-movie-card" onClick={(e) => { e.stopPropagation(); setSelectedMovieId(similar.id); }} style={{ width: '140px', flexShrink: 0, cursor: 'pointer', transition: 'transform 0.2s' }}>
                            <img loading="lazy" decoding="async" src={fixedPosters[similar.id] || similar.poster} alt={similar.title} style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} onError={(e) => { e.target.src = 'https://placehold.co/300x450/101010/FFF.png?text=Sin+Portada'; }} />
                            <p style={{ color: '#fff', fontSize: '13px', marginTop: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600', textAlign: 'center', margin: 0 }}>
                              {cleanTitle(similar.title)}
                            </p>
                          </div>
                        ))}
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
            <div className="genre-pills-container" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '15px' }}>
              {[tr.common.all, tr.common.action, tr.common.drama, tr.common.comedy, tr.common.crime, tr.common.romance, tr.common.terror].map(genre => (
                <button 
                  key={genre} 
                  className={`genre-pill ${activeGenre === genre ? 'active' : ''}`}
                  onClick={() => setActiveGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="movies-grid">
              
              {displayedMovies.length === 0 && (
                <div style={{ color: 'gray', textAlign: 'center', marginTop: '40px', gridColumn: '1 / -1' }}>
                  {tr.common.notFound || "No se encontraron resultados."}
                </div>
              )}

              {displayedMovies.map(movie => {
                const isFav = favorites.includes(movie.id);
                const currentPoster = fixedPosters[movie.id] || movie.poster;
                const isFetchingIMDB = activeSearchIMDB[movie.id];
                return (
                  <div key={movie.id} className="movie-poster-card" onClick={() => handleItemClick(movie.id)}>
                    
                    <div className="movie-poster-wrapper" style={{ position: 'relative' }}>
                      <button 
                        className="fav-badge-floating" 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(e, movie.id); }}
                      >
                        <Star fill={isFav ? '#f1c40f' : 'rgba(0,0,0,0.5)'} color={isFav ? '#f1c40f' : '#fff'} size={16} />
                      </button>
                      
                      <div className="imdb-badge-floating">
                        <Star size={10} fill="#f1c40f" color="#f1c40f"/> {movie.imdb || 'N/A'}
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
                            setActiveSearchIMDB(prev => ({...prev, [movie.id]: true}));
                            
                            setTimeout(() => {
                              setFixedPosters(prev => ({
                                ...prev, 
                                [movie.id]: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' 
                              }));
                              setActiveSearchIMDB(prev => ({...prev, [movie.id]: false}));
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
              const isFav = favorites.includes(series.id);
              const displaySeasons = activeDetails.seasons || series.seasons;
              const currentSeason = displaySeasons.find(s => s.seasonNumber === activeSeason) || displaySeasons[0] || { seasonNumber: 1, episodes: [] };
              
              return (
                <div className="movie-detail-wrapper">
                  <div className="movie-detail-content scroll-area">
                    <button className="btn-back" onClick={() => setSelectedSeriesId(null)} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: 'bold', marginBottom: '35px', cursor: 'pointer', outline: 'none' }}>
                      <ArrowLeft size={16} /> Volver
                    </button>

                    <div className="series-detail-header fade-in-up">
                        <div className="movie-detail-poster-container">
                          <Star 
                            size={28} 
                            className={`star-icon-movie pos-top-left ${isFav ? 'favorited' : ''}`} 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, series.id); }}
                            fill={isFav ? '#f1c40f' : 'transparent'}
                            color={isFav ? '#f1c40f' : 'rgba(255,255,255,0.6)'}
                            strokeWidth={2}
                            style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))', cursor: 'pointer' }}
                          />

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
                                <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', paddingBottom: '8px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>Director:</td>
                                <td style={{ color: '#d1d1d1', paddingBottom: '8px' }}>{activeDetails.director || series.director}</td>
                              </tr>
                              <tr>
                                <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>Reparto:</td>
                                <td style={{ color: '#d1d1d1' }}>{activeDetails.cast || series.cast}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                    </div>

                    {/* SELECTOR DE TEMPORADAS Y EPISODIOS */}
                    <div className="series-seasons-section">
                      <div className="seasons-selector-container fade-in-up" style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <select 
                          className="season-select"
                          value={activeSeason}
                          onChange={(e) => setActiveSeason(Number(e.target.value))}
                          style={{
                            backgroundColor: '#1a1a1a',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '12px 35px 12px 18px',
                            fontSize: '18px',
                            fontWeight: '600',
                            borderRadius: '6px',
                            outline: 'none',
                            cursor: 'pointer',
                            minWidth: '220px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            fontFamily: 'inherit',
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 15px top 50%',
                            backgroundSize: '12px auto'
                          }}
                        >
                          {displaySeasons.map(season => (
                            <option key={season.seasonNumber} value={season.seasonNumber} style={{ background: '#1a1a1a', color: '#fff', padding: '10px' }}>
                              {tr.seriesDetail.season} {season.seasonNumber}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="episodes-list fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {currentSeason.episodes.map(ep => (
                          <div key={ep.id} className="episode-card-text-only" onClick={() => setPlayingMedia({ ...ep, parentTitle: series.title })}>
                            <div className="episode-text-info">
                              <h4 className="episode-text-title">S{String(currentSeason.seasonNumber).padStart(2, '0')}E{String(ep.epNumber).padStart(2, '0')}</h4>
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
                      <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '20px', fontWeight: 'bold' }}>Series parecidas:</h3>
                      <div className="similar-movies-row scroll-area-x" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
                        {MOCK_SERIES.filter(s => s.groupId === series.groupId && s.id !== series.id).slice(0, 20).map(similar => (
                          <div key={similar.id} className="similar-movie-card" onClick={(e) => { e.stopPropagation(); setSelectedSeriesId(similar.id); }} style={{ width: '140px', flexShrink: 0, cursor: 'pointer', transition: 'transform 0.2s' }}>
                            <img loading="lazy" decoding="async" src={fixedPosters[similar.id] || similar.poster} alt={similar.title} style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} onError={(e) => { e.target.src = 'https://placehold.co/300x450/101010/FFF.png?text=Sin+Portada'; }} />
                            <p style={{ color: '#fff', fontSize: '13px', marginTop: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600', textAlign: 'center', margin: 0 }}>
                              {cleanTitle(similar.title)}
                            </p>
                          </div>
                        ))}
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


            <div className="genre-pills-container" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '15px' }}>
              {[tr.common.all, tr.common.action, tr.common.drama, tr.common.comedy, tr.common.crime, tr.common.romance, tr.common.terror].map(genre => (
                <button 
                  key={genre}
                  className={`genre-pill ${activeGenre === genre ? 'active' : ''}`}
                  onClick={() => setActiveGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="movies-grid">
               {displayedSeries.map(series => {
                const isFav = favorites.includes(series.id);
                return (
                  <div key={series.id} className="movie-poster-card" onClick={() => { setSelectedSeriesId(series.id); setActiveSeason(1); }}>
                    <div className="movie-poster-wrapper" style={{ position: 'relative' }}>
                      <button 
                        className="fav-badge-floating" 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(e, series.id); }}
                      >
                        <Star fill={isFav ? '#f1c40f' : 'rgba(0,0,0,0.5)'} color={isFav ? '#f1c40f' : '#fff'} size={16} />
                      </button>
                      
                      <div className="imdb-badge-floating">
                        <Star size={10} fill="#f1c40f" color="#f1c40f"/> {series.imdb || 'N/A'}
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
            <div className="settings-card payment-banner">
              <div className="settings-card-header">
                <Shield size={24} color="#f1c40f" />
                <div className="settings-card-title-group">
                  <h3 style={{ color: '#f1c40f' }}>{tr.payment?.title || 'Licencia Premium (1 Año)'}:</h3>
                  <p>{tr.payment?.desc || 'Acceso total 1 año y máxima calidad.'}</p>
                  {!isPremium && !isTrialExpired && (
                    <div className="trial-badge" style={{ 
                      background: 'rgba(241, 196, 15, 0.15)', 
                      color: '#f1c40f', 
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      fontSize: '13px', 
                      fontWeight: '800', 
                      marginTop: '10px', 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1px solid rgba(241, 196, 15, 0.2)',
                      textTransform: 'uppercase'
                    }}>
                      <Timer size={14} />
                      {tr.settings.freeTrial}: {trialDaysLeft} {trialDaysLeft === 1 ? 'día' : 'días'}
                    </div>
                  )}
                </div>
              </div>

              {!isPremium ? (
                <div className="payment-action-box fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
                  <button id="sn-license-coll" className="btn-play-movie focusable" onClick={handlePayPalPayment} disabled={isVerifying} style={{ width: '350px', maxWidth: '350px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', padding: '0 16px', letterSpacing: '1px', borderRadius: '12px' }}>
                    <span style={{ fontWeight: '900', fontSize: '26px' }}>4,95 €</span>
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
                  margin: '20px auto 0 auto',
                  boxShadow: '0 4px 15px rgba(39, 174, 96, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  <ThumbsUp size={22} color="#fff" />
                  <span>Licencia activada</span>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: Listas IPTW */}
            <div className="settings-card">
              <div className="settings-card-header">
                <Tv size={24} color="var(--primary-red)" />
                <div className="settings-card-title-group" style={{ flex: 1 }}>
                  <h3>{tr.settings.iptwLists}:</h3>
                  <p>{tr.settings.iptwListsSub}</p>
                </div>
              </div>

              {/* CARD DE LA SUSCRIPCIÓN / LISTA ACTIVA */}
              <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  {(() => {
                    const activeUrl = localStorage.getItem('thriptw_xtUrl');
                    const activeUser = localStorage.getItem('thriptw_xtUser');
                    const saved = savedLists.find(l => l.url === activeUrl && l.user === activeUser);
                    
                    const displayName = saved?.name || activeUser || 'Usuario Activo';
                    const rawExp = playlistData?.account_info?.exp_date || saved?.exp_date;
                    
                    return (
                      <>
                        {rawExp && rawExp !== "null" && rawExp !== "0" && (
                          <span style={{ fontSize: '13px', color: '#f1c40f', background: 'rgba(241, 196, 15, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                            {new Date(parseInt(rawExp) * 1000).toLocaleDateString()}
                          </span>
                        )}
                        <span>{tr.settings.listUser} {displayName}</span>
                      </>
                    );
                  })()}
                </p>
              </div>
              
              {/* BOTON GESTOR MULTI-LISTAS */}
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button className="btn-play-movie focusable" onClick={() => setIsEditListOpen(!isEditListOpen)} style={{ 
                  width: '100%', 
                  maxWidth: '300px', 
                  height: '60px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '18px', 
                  padding: '0 16px', 
                  letterSpacing: '1px', 
                  borderRadius: '12px', 
                  marginTop: '16px',
                  background: 'var(--primary-red, #e50914)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 'bold',
                  transition: 'transform 0.2s, opacity 0.2s'
                }}>
                  {isEditListOpen ? tr.settings.closeManager : "EDITAR LISTAS"}
                </button>
              </div>

              {isEditListOpen && (
                <div style={{ marginTop: '16px', background: '#0a0a0a', border: '1px solid #1f1f1f', borderRadius: '12px', padding: '16px' }} className="fade-in-up">
                   <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#fff' }}>{tr.settings.savedLists}:</h4>
                   {savedLists.length === 0 && <p style={{ color: '#888', fontSize: '13px' }}>{tr.settings.noSavedLists}</p>}
                   {savedLists.map((list, idx) => {
                       const listId = `${list.url}-${list.user}`;
                       const isEditing = editingListId === listId;
                       
                       return (
                        <div key={idx} title={tr.common.action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', padding: '8px 12px', borderRadius: '8px', marginBottom: '8px', border: isEditing ? '1px solid var(--primary-red)' : '1px solid #222', cursor: 'default', transition: 'border 0.2s' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }} onClick={(e) => e.stopPropagation()}>
                              <div className="focusable" id={`sn-edit-coll-${idx}`} data-sn-right={`#sn-add-coll-${idx}`}>
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
                               <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#fff' }}>{list.name}</div>
                             )}
                           </div>
                           {list.exp_date && (
                             <div style={{ fontSize: '12px', color: '#f1c40f', background: 'rgba(241, 196, 15, 0.1)', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                               {new Date(list.exp_date * 1000).toLocaleDateString()}
                             </div>
                           )}
                            <button 
                                id={`sn-add-coll-${idx}`}
                                onClick={(e) => { e.stopPropagation(); handleActivateList(list); }} 
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginRight: '10px', textTransform: 'uppercase' }} 
                                className="focusable"
                                data-sn-left={`#sn-edit-coll-${idx}`}
                                data-sn-right={`#sn-delete-coll-${idx}`}
                              >
                                AGREGAR
                            </button>
                            <button 
                                id={`sn-delete-coll-${idx}`}
                                onClick={(e) => { e.stopPropagation(); handleDeleteList(list); }} 
                                style={{ background: 'transparent', border: 'none', color: '#ff4d4d', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '10px' }} 
                                className="focusable"
                                data-sn-left={`#sn-add-coll-${idx}`}
                              >
                              <Trash2 size={18} />
                           </button>
                        </div>
                       );
                    })}


                </div>
              )}
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
                <label>{tr.settings.bufferSize}</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <button 
                    className="settings-select focusable"
                    onClick={() => setActiveDropdown(activeDropdown === 'buffer' ? null : 'buffer')}
                    style={{ textAlign: 'left', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{bufferSize === 'medio' ? tr.settings.bufferDesc : bufferSize === 'grande' ? tr.settings.bufferBig : bufferSize === 'pequeno' ? tr.settings.bufferSmall : 'Medio'}</span>
                    <ChevronDown size={18} />
                  </button>
                  {activeDropdown === 'buffer' && (
                    <div className="custom-dropdown-list fade-in">
                      {['medio', 'grande', 'pequeno'].map(opt => (
                        <div 
                          key={opt}
                          className="custom-dropdown-item focusable"
                          tabIndex="0"
                          onClick={() => { setBufferSize(opt); setActiveDropdown(null); }}
                        >
                          {opt === 'medio' ? tr.settings.bufferDesc : opt === 'grande' ? tr.settings.bufferBig : tr.settings.bufferSmall}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="settings-form-row">
                <label>{tr.settings.streamQuality}</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <button 
                    className="settings-select focusable"
                    onClick={() => setActiveDropdown(activeDropdown === 'quality' ? null : 'quality')}
                    style={{ textAlign: 'left', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{streamQuality === '1080p' ? tr.settings.qualityFHD : streamQuality === '720p' ? tr.settings.qualityHD : tr.settings.quality4k}</span>
                    <ChevronDown size={18} />
                  </button>
                  {activeDropdown === 'quality' && (
                    <div className="custom-dropdown-list fade-in">
                      {['1080p', '720p', '4k'].map(opt => (
                        <div 
                          key={opt}
                          className="custom-dropdown-item focusable"
                          tabIndex="0"
                          onClick={() => { setStreamQuality(opt); setActiveDropdown(null); }}
                        >
                          {opt === '1080p' ? tr.settings.qualityFHD : opt === '720p' ? tr.settings.qualityHD : tr.settings.quality4k}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>


            </div>

            {/* SECCIÓN NUEVA: Idioma de la App */}
            <div className="settings-card">
              <div className="settings-card-header">
                <Globe size={24} color="var(--primary-red)" />
                <div className="settings-card-title-group">
                  <h3>{tr.settings.appLanguage}:</h3>
                  <p>{tr.settings.appLanguageSub}</p>
                </div>
              </div>

              <div className="settings-form-row" style={{ justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                  <button 
                    className="settings-select focusable"
                    onClick={() => setActiveDropdown(activeDropdown === 'language' ? null : 'language')}
                    style={{ textAlign: 'left', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{appLanguage === 'es' ? tr.settings.langES : appLanguage === 'en' ? tr.settings.langEN : appLanguage === 'fr' ? tr.settings.langFR : tr.settings.langDE}</span>
                    <ChevronDown size={18} />
                  </button>
                  {activeDropdown === 'language' && (
                    <div className="custom-dropdown-list fade-in">
                      {['es', 'en', 'fr', 'de'].map(opt => (
                        <div 
                          key={opt}
                          className="custom-dropdown-item focusable"
                          tabIndex="0"
                          onClick={() => { setAppLanguage(opt); setActiveDropdown(null); }}
                        >
                          {opt === 'es' ? tr.settings.langES : opt === 'en' ? tr.settings.langEN : opt === 'fr' ? tr.settings.langFR : tr.settings.langDE}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SECCIÓN 4: Acciones de Cuenta */}
            <div className="settings-card account-actions-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', background: 'transparent', border: 'none' }}>
              <button className="btn-play-movie" onClick={onLogout} style={{ width: '100%', maxWidth: '300px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', padding: '0 16px', letterSpacing: '1px', borderRadius: '12px' }}>
                <SolidLogoutIcon size={22} style={{ marginRight: '8px' }} /> {tr.nav.logout.toUpperCase()}
              </button>
            </div>

          </div>
        </div>
      )}

      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-nav">
        <div className={`nav-item ${activeBottomNav === 'home' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('home'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <SolidHomeIcon size={28} />
        </div>
        <div id="sn-nav-live" className={`nav-item ${activeBottomNav === 'live' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('live'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <CustomLiveIcon size={28} />
        </div>
        <div id="sn-nav-movies" className={`nav-item ${activeBottomNav === 'movies' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('movies'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <SolidFilmIcon size={28} />
        </div>
        <div id="sn-nav-series" className={`nav-item ${activeBottomNav === 'series' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('series'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <SolidSeriesIcon size={28} />
        </div>
        <div id="sn-nav-settings" className={`nav-item ${activeBottomNav === 'settings' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('settings'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <SolidSettingsIcon size={28} />
        </div>
        <div className="nav-item" onClick={onLogout}>
          <SolidLogoutIcon size={28} />
        </div>
      </div>

      {/* REPRODUCTOR DE VIDEO ROOT */}
      {playingMedia && (
        <VideoPlayer 
          media={playingMedia} 
          onClose={() => setPlayingMedia(null)} 
          onNext={MOCK_CHANNELS.find(c => c.id === playingMedia.id) ? handleNextChannel : undefined}
          onPrev={MOCK_CHANNELS.find(c => c.id === playingMedia.id) ? handlePrevChannel : undefined}
        />
      )}

      {/* MODAL DEL QR DE PAGO (3 PASOS TELEGRAM) */}
      {showQRModal && (
        <div className="qr-overlay fade-in" onClick={() => setShowQRModal(false)}>
          <div className="qr-modal-card bounce-in telegram-modal" onClick={(e) => e.stopPropagation()}>
            <button id="sn-modal-close-coll" className="btn-close-qr focusable" data-sn-down="#sn-pin-input-coll" data-sn-up="#sn-pin-input-coll" onClick={() => setShowQRModal(false)}>✕</button>
            <h2 className="qr-title" style={{ marginBottom: '8px' }}>{tr.payment?.title || 'Adquirir Licencia VIP'}</h2>

            <div className="device-id-badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '5px',
              margin: '0 auto 5px auto'
            }}>
              <span style={{ fontSize: '16px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MAC:</span>
              <span style={{ fontSize: '20px', color: '#f1c40f', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '1px' }}>
                {(() => {
                  let id = localStorage.getItem('thriptw_device_id');
                  if (id && id.includes(';')) {
                    id = id.replace(/;/g, ':');
                    localStorage.setItem('thriptw_device_id', id);
                  }
                  const isMacFormat = /^[0-9A-F]{2}(:[0-9A-F]{2}){5}$/i.test(id);

                  if (!id || !isMacFormat) {
                    const hex = '0123456789ABCDEF';
                    id = Array.from({length: 6}, () => hex[Math.floor(Math.random()*16)] + hex[Math.floor(Math.random()*16)]).join(':');
                    localStorage.setItem('thriptw_device_id', id);
                  }
                  return id;
                })()}
              </span>
            </div>
            
            <div className="telegram-steps-container" style={{ width: '100%', marginTop: '10px' }}>
              {/* PASOS 1 & 2 COMBINADOS VERTICALMENTE */}
              <div className="telegram-step" style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', alignItems: 'center' }}>
                {/* PAYPAL */}
                <div className="qr-item-vertical" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '10px' }}>
                    <div className="telegram-step-number">1</div>
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '15px' }}>{tr.payment?.step1 || 'Pagar 6,95 €'}</h4>
                  </div>
                  <div style={{ background: '#fff', padding: '6px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px', width: '142px', height: '142px' }}>
                    <img 
                      src="./QR.png" 
                      alt="PayPal QR" 
                      onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://paypal.me/thriptw/6.95EUR"}
                      style={{ width: '130px', height: '130px', display: 'block', objectFit: 'contain' }} 
                    />
                  </div>
                  <p style={{ color: '#0088cc', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>Paypal: @thriptw</p>
                </div>

                {/* DIVIDER */}
                <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.05)', margin: '5px 0' }}></div>

                {/* TELEGRAM */}
                <div className="qr-item-vertical" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '10px' }}>
                    <div className="telegram-step-number">2</div>
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '15px' }}>{tr.payment?.step2 || 'Enviar Recibo'}</h4>
                  </div>
                  <div style={{ background: '#fff', padding: '6px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px', width: '142px', height: '142px' }}>
                    <img 
                      src="./qr telegram.png" 
                      alt="Telegram QR" 
                      onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/thriptw"}
                      style={{ width: '130px', height: '130px', display: 'block', objectFit: 'contain' }} 
                    />
                  </div>
                  <p style={{ color: '#0088cc', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>Telegram: @thriptw</p>
                </div>
              </div>

              {/* PASO 3: PIN ENTRY */}
              <div className="telegram-step" style={{ width: '100%', marginTop: '10px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid var(--primary-red)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div className="telegram-step-number" style={{ width: '30px', height: '30px', fontSize: '16px' }}>3</div>
                  <h4 style={{ color: '#fff', fontSize: '16px', margin: 0 }}>Ingresa PIN activación</h4>
                </div>
                <div className="telegram-input-group" style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    id="sn-pin-input-coll"
                    className="focusable"
                    data-sn-up="#sn-modal-close-coll"
                    data-sn-right="#sn-confirm-pin-coll"
                    data-sn-down="#sn-confirm-pin-coll"
                    type="text" 
                    placeholder="Escribe el PIN..."
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                    maxLength={14}
                    style={{ flex: 1, height: '45px', fontSize: '16px', textAlign: 'center' }}
                  />
                  <button 
                    id="sn-confirm-pin-coll"
                    className="btn-paypal btn-redeem focusable" 
                    data-sn-left="#sn-pin-input-coll"
                    data-sn-up="#sn-pin-input-coll"
                    onClick={handleConfirmPayment} 
                    disabled={isVerifying || activationCode.length < 12}
                    style={{ height: '45px', padding: '0 20px' }}
                  >
                    {isVerifying ? '...' : 'ACTIVAR'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardLayout;

