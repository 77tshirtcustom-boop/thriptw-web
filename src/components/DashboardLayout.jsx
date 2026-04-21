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
  Minimize
} from 'lucide-react';
import './DashboardLayout.css';
import VideoPlayer from './VideoPlayer';
import { translations } from '../i18n/translations';
// -- CONFIGURACIÓN DE PRODUCCIÓN INTELIGENTE --
const isWeb = typeof window !== 'undefined' && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost';
const API_BASE_URL = isWeb ? window.location.origin : 'https://thriptw-web.onrender.com';

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

  const isListLoaded = playlistData && (
    (playlistData.channels && playlistData.channels.length > 0) || 
    (playlistData.movies && playlistData.movies.length > 0) || 
    (playlistData.series && playlistData.series.length > 0)
  );
  
  const MOCK_CHANNELS = isListLoaded ? (playlistData.channels || []) : STATIC_MOCK_CHANNELS;
  const MOCK_MOVIES = isListLoaded ? (playlistData.movies || []) : STATIC_MOCK_MOVIES;
  const MOCK_SERIES = isListLoaded ? (playlistData.series || []) : STATIC_MOCK_SERIES;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeBottomNav, setActiveBottomNav] = useState('home'); // 'home' | 'settings' | 'movies' | 'series' | 'live'
  
  const MOCK_CATEGORIES = useMemo(() => {
    if (!isListLoaded) return STATIC_MOCK_CATEGORIES;
    let cats = playlistData.categories || [];
    if (activeBottomNav === 'movies') cats = playlistData.movieCategories || [];
    if (activeBottomNav === 'series') cats = playlistData.seriesCategories || [];
    return [...SYSTEM_CATEGORIES, ...cats];
  }, [isListLoaded, activeBottomNav, playlistData]);

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
  const [liveSchedule, setLiveSchedule] = useState(MOCK_SPORTS_AGENDA);
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
        if (data.success) {
          setLiveSchedule(data.schedule); // Si está vacío, pondrá [], lo cual es correcto
        } else {
          setLiveSchedule([]); 
        }
      } catch (err) {
        console.error("No se pudo conectar al Robot Lector");
        setScheduleError(true);
        setLiveSchedule([]); 
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
              if (data.episodes && typeof data.episodes === 'object' && !Array.isArray(data.episodes)) {
                Object.keys(data.episodes).forEach(seasonNum => {
                   let epsList = data.episodes[seasonNum];
                   if (Array.isArray(epsList) && epsList.length > 0) {
                      extractedSeasons.push({
                         seasonNumber: parseInt(seasonNum, 10) || 1,
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
              } else if (Array.isArray(data.episodes)) {
                 // Algunos paneles devuelven episodios como array plano
                 extractedSeasons.push({
                    seasonNumber: 1,
                    episodes: data.episodes.map((ep, idx) => ({
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

              if (extractedSeasons.length > 0) {
                extractedSeasons.sort((a,b) => (a.seasonNumber || 0) - (b.seasonNumber || 0));
              }

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

  // MOTORES DE MEMORIA (FAVORITOS E HISTORIAL COMPARTIDO/SEPARADO)
  const [favorites, setFavorites] = useState([]); 
  const [movieHistory, setMovieHistory] = useState([]); 
  const [seriesHistory, setSeriesHistory] = useState([]); 
  const [channelHistory, setChannelHistory] = useState([]);

  // PAGO Y LICENCIA PREMIUM
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem('licenseStatus') === 'premium');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [activationCode, setActivationCode] = useState('');

  // (Lógica de panel desplegable eliminada por prueba de panel fijo)

  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);

  // GESTION DE MULTIPLES LISTAS
  const [savedLists, setSavedLists] = useState([]);
  const [isEditListOpen, setIsEditListOpen] = useState(false);
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
        const exists = stored.find(l => l.url === currentUrl && l.user === currentUser);
        if (!exists) {
           const currentList = { url: currentUrl, user: currentUser, pass: currentPass, name: currentUser };
           stored.push(currentList);
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
    if (activeBottomNav === 'movies') {
      const newHistory = movieHistory.filter(id => id !== itemId);
      setMovieHistory([itemId, ...newHistory]);
      setSelectedMovieId(itemId);
    } else if (activeBottomNav === 'series') {
      const newHistory = seriesHistory.filter(id => id !== itemId);
      setSeriesHistory([itemId, ...newHistory]);
      setSelectedSeriesId(itemId);
    } else {
      const newHistory = channelHistory.filter(id => id !== itemId);
      setChannelHistory([itemId, ...newHistory]);
      // Live TV u otros: lanzamos directamente el reproductor
      const channelObj = MOCK_CHANNELS.find(c => c.id === itemId);
      if (channelObj) {
        setPlayingMedia(channelObj);
      }
    }
  };

  // CÁLCULO DINÁMICO DE DATOS (Memoizado para rendimiento)
  const categoriesWithCounts = useMemo(() => {
    return MOCK_CATEGORIES.map(cat => {
      if (cat.id === 'fav') return { ...cat, count: favorites.length };
      if (cat.id === 'hist') {
        let histCount = 0;
        if (activeBottomNav === 'movies') histCount = movieHistory.length;
        else if (activeBottomNav === 'series') histCount = seriesHistory.length;
        else histCount = channelHistory.length;
        return { ...cat, count: histCount };
      }
      
      if (cat.id === 'all') {
        const allCount = activeBottomNav === 'movies' ? MOCK_MOVIES.length : activeBottomNav === 'series' ? MOCK_SERIES.length : MOCK_CHANNELS.length;
        return { ...cat, count: allCount };
      }

      let specificCount = 0;
      if (activeBottomNav === 'movies') {
        specificCount = MOCK_MOVIES.filter(m => m.groupId === cat.id).length;
      } else if (activeBottomNav === 'series') {
        specificCount = MOCK_SERIES.filter(s => s.groupId === cat.id).length;
      } else {
        specificCount = MOCK_CHANNELS.filter(c => c.groupId === cat.id).length;
      }

      return { ...cat, count: specificCount };
    });
  }, [MOCK_CATEGORIES, favorites, movieHistory, seriesHistory, channelHistory, activeBottomNav, MOCK_MOVIES, MOCK_SERIES, MOCK_CHANNELS]);

  // RUTINAS DE FILTRADO MEMOIZADAS
  const displayedChannels = useMemo(() => {
    let filtered = MOCK_CHANNELS;
    if (activeCategory === 'fav') {
      filtered = MOCK_CHANNELS.filter(c => favorites.includes(c.id));
    } else if (activeCategory === 'hist') {
      filtered = channelHistory.map(id => MOCK_CHANNELS.find(c => c.id === id)).filter(Boolean);
    } else if (activeCategory !== 'all') {
      filtered = MOCK_CHANNELS.filter(c => c.groupId === activeCategory);
    }

    if (debouncedSearchQuery.trim() !== '') {
      const q = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(q));
    }
    return filtered.slice(0, visibleItemsCount);
  }, [MOCK_CHANNELS, activeCategory, favorites, channelHistory, debouncedSearchQuery, visibleItemsCount]);

  const displayedMovies = useMemo(() => {
    let filtered = MOCK_MOVIES;
    if (activeCategory === 'fav') {
      filtered = MOCK_MOVIES.filter(m => favorites.includes(m.id));
    } else if (activeCategory === 'hist') {
      filtered = movieHistory.map(id => MOCK_MOVIES.find(m => m.id === id)).filter(Boolean);
    } else if (activeCategory !== 'all') {
      filtered = MOCK_MOVIES.filter(m => m.groupId === activeCategory);
    }

    if (activeGenre !== 'Todos') {
      filtered = filtered.filter(m => m.genre && m.genre.toLowerCase().includes(activeGenre.toLowerCase()));
    }

    if (debouncedSearchQuery.trim() !== '') {
      const q = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(m => m.title.toLowerCase().includes(q));
    }
    return filtered.slice(0, visibleItemsCount);
  }, [MOCK_MOVIES, activeCategory, favorites, movieHistory, activeGenre, debouncedSearchQuery, visibleItemsCount]);

  const displayedSeries = useMemo(() => {
    let filtered = MOCK_SERIES;
    if (activeCategory === 'fav') {
      filtered = MOCK_SERIES.filter(s => favorites.includes(s.id));
    } else if (activeCategory === 'hist') {
      filtered = seriesHistory.map(id => MOCK_SERIES.find(s => s.id === id)).filter(Boolean);
    } else if (activeCategory !== 'all') {
      filtered = MOCK_SERIES.filter(s => s.groupId === activeCategory);
    }

    if (activeGenre !== 'Todos') {
      filtered = filtered.filter(s => s.genre && s.genre.toLowerCase().includes(activeGenre.toLowerCase()));
    }

    if (debouncedSearchQuery.trim() !== '') {
      const q = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(s => s.title.toLowerCase().includes(q));
    }
    return filtered.slice(0, visibleItemsCount);
  }, [MOCK_SERIES, activeCategory, favorites, seriesHistory, activeGenre, debouncedSearchQuery, visibleItemsCount]);

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
          <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px', fontSize: '15px', lineHeight: '1.5' }}>Tu periodo de prueba de 7 días ha expirado. Por favor, adquiere la Licencia Premium para continuar disfrutando de la aplicación.</p>
          
          <div className="telegram-steps-container">
            <div className="telegram-step">
              <div className="telegram-step-header">
                <div className="telegram-step-number">1</div>
                <h4>{tr.payment?.step1 || 'Transfiere 4.95 €'}</h4>
              </div>
              <div className="qr-image-wrapper telegram-qr-wrapper">
                <img loading="lazy" decoding="async" src="/QR.png" alt="Código QR @thriptw" className="qr-image" 
                  onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://paypal.me/thrip/6.95EUR"} />
              </div>
            </div>
            <div className="telegram-step">
              <div className="telegram-step-header">
                <div className="telegram-step-number">2</div>
                <h4>{tr.payment?.step2 || 'Avisar al Administrador'}</h4>
              </div>
              <button className="btn-telegram-action" onClick={() => window.open('https://t.me/thriptw', '_blank')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.198 2.027c-1.004-.326-2.008-.326-3.013 0L3.125 7.575C1.65 8.12 1.65 9.754 3.125 10.3l4.316 1.6v5.8c0 1.09.89 1.98 1.98 1.98h.02c1.09 0 1.98-.89 1.98-1.98v-3.513l5.093 3.395c.78.52 1.83.213 2.152-.64l3.528-11.64c.265-.873-.13-1.803-.996-2.068z"/></svg> 
                {tr.payment?.btnTelegram || 'Enviar Recibo por Telegram'}
              </button>
            </div>
            <div className="telegram-step">
              <div className="telegram-step-header">
                <div className="telegram-step-number">3</div>
                <h4>{tr.payment?.step3 || 'Código de 12 dígitos'}</h4>
              </div>
              <div className="telegram-input-group">
                <input 
                  type="text" 
                  placeholder={tr.payment?.codePlaceholder || 'Ingresa tu Pin'}
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                  maxLength={14}
                />
                <button className="btn-paypal btn-redeem" onClick={handleConfirmPayment} disabled={isVerifying || activationCode.length < 12}>
                  <Key size={18} /> {isVerifying ? (tr.payment?.verifying || 'Validando...') : (tr.payment?.confirmPayment || 'Canjear')}
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
                  className={`menu-item focusable ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (window.innerWidth < 1024) setIsDrawerOpen(false);
                    
                    setTimeout(() => {
                      // 1. Reset scroll position
                      const containers = document.querySelectorAll('.channels-container, .movies-container, .scroll-area');
                      containers.forEach(c => c.scrollTop = 0);
                      
                      // 2. Jump focus
                      const firstItem = document.querySelector('.channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
                      if (firstItem) firstItem.focus();
                    }, 200);
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
                  className={`menu-item focusable ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (window.innerWidth < 1024) setIsDrawerOpen(false);
                    
                    setTimeout(() => {
                      // 1. Reset scroll position of all content containers
                      const containers = document.querySelectorAll('.channels-container, .movies-container, .scroll-area');
                      containers.forEach(c => c.scrollTop = 0);
                      
                      // 2. Jump focus to first item
                      const firstItem = document.querySelector('.channels-grid .focusable, .movies-grid .focusable, .sports-agenda-board .focusable');
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
                        <div key={match.id} className="sports-match-row manual-sports-card focusable" onClick={() => setSelectedMatchId(match.id)} style={{ position: 'relative', overflow: 'hidden', minHeight: '65px', width: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', alignItems: 'center', padding: '10px 20px', marginBottom: '8px' }}>
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
                            
                            <div className="match-tournament-col" style={{ display: 'flex', alignItems: 'center', gap: '12px', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '220px', paddingLeft: '20px', paddingRight: '10px', height: '100%' }}>
                              {match.tournamentLogo && <img loading="lazy" decoding="async" src={match.tournamentLogo} alt="Torneo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />}
                              {match.tournament && <span className="match-time-sub tournament-name" style={{ color: '#f1c40f', fontWeight: '800', fontSize: '17px', textTransform: 'uppercase', margin: 0, padding: 0, letterSpacing: '1px' }}>{match.tournament}</span>}
                            </div>

                            <div className="match-teams-col" style={{ display: 'flex', alignItems: 'center', paddingLeft: '25px', flex: 1, overflow: 'hidden' }}>
                              <span style={{ color: 'white', fontWeight: '700', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0, padding: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(match.title || '').replace(/\s+vs\s+/gi, ' - ')}</span>
                            </div>
                          </div>

                          <div className="match-action-col" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: '100px' }}>
                            <button className="premium-btn focusable" onClick={(e) => { e.stopPropagation(); setSelectedMatchId(match.id); }} style={{ background: 'var(--primary-red)', padding: '8px 24px', fontSize: '13px', fontWeight: 'bold', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(217, 30, 24, 0.4)', marginTop: '4px' }}>
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
                
                <button className="carousel-nav-btn left fade-in focusable" onClick={() => scrollRef(homeMoviesRef, -600)}>
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
                        className="movie-poster-card focusable" 
                        style={{ flexShrink: 0, width: '220px', height: '330px' }}
                        onClick={() => {
                          const newHistory = movieHistory.filter(id => id !== movie.id);
                          setMovieHistory([movie.id, ...newHistory]);
                          setSelectedMovieId(movie.id);
                        }}
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

                <button className="carousel-nav-btn right fade-in focusable" onClick={() => scrollRef(homeMoviesRef, 600)}>
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
                
                <button className="carousel-nav-btn left fade-in focusable" onClick={() => scrollRef(homeSeriesRef, -600)}>
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
                        className="movie-poster-card focusable" 
                        style={{ flexShrink: 0, width: '220px', height: '330px' }}
                        onClick={() => {
                          const newHistory = seriesHistory.filter(id => id !== series.id);
                          setSeriesHistory([series.id, ...newHistory]);
                          setSelectedSeriesId(series.id);
                        }}
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

                <button className="carousel-nav-btn right fade-in focusable" onClick={() => scrollRef(homeSeriesRef, 600)}>
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
                    <button className="btn-back focusable" onClick={() => setSelectedMatchId(null)}>
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
                                className="channel-card focusable" 
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
                  <div key={channel.id} className="channel-card focusable" onClick={() => handleItemClick(channel.id)}>
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
                    <button className="btn-back focusable" onClick={() => setSelectedMovieId(null)} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: 'bold', marginBottom: '35px', cursor: 'pointer', outline: 'none' }}>
                      <ArrowLeft size={16} /> Volver
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
                          <button className="btn-play-movie focusable" onClick={() => setPlayingMedia(movie)} style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '12px 26px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <Play size={20} fill="currentColor" /> Reproducir
                          </button>
                          <button 
                            className={`btn-fav-movie focusable ${isFav ? 'favorited' : ''}`} 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, movie.id); }}
                          >
                            <Star size={24} fill={isFav ? '#f1c40f' : 'transparent'} color={isFav ? '#f1c40f' : '#fff'} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="movie-similar-section fade-in-up" style={{ marginTop: '50px', width: '100%', paddingBottom: '30px' }}>
                      <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '20px', fontWeight: 'bold' }}>Películas parecidas:</h3>
                      <div className="similar-movies-row scroll-area-x" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
                        {MOCK_MOVIES.filter(m => m.groupId === movie.groupId && m.id !== movie.id).slice(0, 20).map(similar => (
                          <div key={similar.id} className="similar-movie-card focusable" onClick={(e) => { 
                            e.stopPropagation(); 
                            const newHistory = movieHistory.filter(id => id !== similar.id);
                            setMovieHistory([similar.id, ...newHistory]);
                            setSelectedMovieId(similar.id); 
                          }} style={{ width: '140px', flexShrink: 0, cursor: 'pointer', transition: 'transform 0.2s' }}>
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
            <div className="genre-pills-container" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
              {[tr.common.all, tr.common.action, tr.common.drama, tr.common.comedy, tr.common.crime, tr.common.romance, tr.common.terror].map(genre => (
                <button 
                  key={genre} 
                  className={`genre-pill focusable ${activeGenre === genre ? 'active' : ''}`}
                  onClick={() => setActiveGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="movies-grid">
              
              {displayedMovies.length === 0 && (
                <div style={{ color: 'gray', textAlign: 'center', marginTop: '40px', gridColumn: '1 / -1' }}>
                  {tr.common.notFound}
                </div>
              )}

              {displayedMovies.map(movie => {
                const isFav = favorites.includes(movie.id);
                const currentPoster = fixedPosters[movie.id] || movie.poster;
                const isFetchingIMDB = activeSearchIMDB[movie.id];
                return (
                  <div key={movie.id} className="movie-poster-card focusable" onClick={() => handleItemClick(movie.id)}>
                    
                    <div className="movie-poster-wrapper" style={{ position: 'relative' }}>

                      
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
              const displaySeasons = activeDetails.seasons || series.seasons || [];
              const currentSeason = (displaySeasons && displaySeasons.length > 0) 
                ? (displaySeasons.find(s => s.seasonNumber === activeSeason) || displaySeasons[0])
                : { seasonNumber: 1, episodes: [] };
              
              return (
                <div className="movie-detail-wrapper">
                  <div className="movie-detail-content scroll-area">
                    <button className="btn-back focusable" onClick={() => setSelectedSeriesId(null)} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: 'bold', marginBottom: '35px', cursor: 'pointer', outline: 'none' }}>
                      <ArrowLeft size={16} /> Volver
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
                                <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', paddingBottom: '8px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>Director:</td>
                                <td style={{ color: '#d1d1d1', paddingBottom: '8px' }}>{activeDetails.director || series.director}</td>
                              </tr>
                              <tr>
                                <td style={{ color: '#fff', fontWeight: 'bold', paddingRight: '20px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>Reparto:</td>
                                <td style={{ color: '#d1d1d1' }}>{activeDetails.cast || series.cast}</td>
                              </tr>
                            </tbody>
                          </table>

                          <div className="movie-detail-actions">
                            <button 
                              className={`btn-fav-movie focusable ${isFav ? 'favorited' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(e, series.id); }}
                            >
                              <Star size={24} fill={isFav ? '#f1c40f' : 'transparent'} color={isFav ? '#f1c40f' : '#fff'} />
                            </button>
                          </div>
                        </div>
                    </div>

                    {/* SELECTOR DE TEMPORADAS Y EPISODIOS */}
                    <div className="series-seasons-section">
                      <div className="seasons-selector-container fade-in-up" style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <select 
                          className="season-select focusable"
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
                          <div key={ep.id} className="episode-card-text-only focusable" onClick={() => setPlayingMedia({ ...ep, parentTitle: series.title })}>
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
                          <div key={similar.id} className="similar-movie-card focusable" onClick={(e) => { 
                            e.stopPropagation(); 
                            const newHistory = seriesHistory.filter(id => id !== similar.id);
                            setSeriesHistory([similar.id, ...newHistory]);
                            setSelectedSeriesId(similar.id); 
                          }} style={{ width: '140px', flexShrink: 0, cursor: 'pointer', transition: 'transform 0.2s' }}>
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
               {displayedSeries.filter(Boolean).map(series => {
                const isFav = favorites.includes(series.id);
                return (
                 <div key={series.id} className="movie-poster-card focusable" onClick={() => { 
                   const newHistory = seriesHistory.filter(id => id !== series.id);
                   setSeriesHistory([series.id, ...newHistory]);
                   setSelectedSeriesId(series.id); 
                   setActiveSeason(1); 
                 }}>
                    <div className="movie-poster-wrapper" style={{ position: 'relative' }}>

                      
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
                  <h3 style={{ color: '#f1c40f' }}>{tr.payment?.title || 'Licencia Premium (1 Año)'}</h3>
                  <p>{tr.payment?.desc || 'Acceso total 1 año y máxima calidad.'}</p>
                </div>
              </div>

              {!isPremium ? (
                <div className="payment-action-box fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
                  <button className="btn-play-movie" onClick={handlePayPalPayment} disabled={isVerifying} style={{ width: '100%', maxWidth: '300px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', padding: '0 16px', letterSpacing: '1px', borderRadius: '12px' }}>
                    <span style={{ fontWeight: '900', fontSize: '26px' }}>6,95 €</span>
                  </button>
                </div>
              ) : (
                <div className="payment-success-box bounce-in" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', padding: '16px', background: 'rgba(46, 204, 113, 0.1)', borderRadius: '8px', border: '1px solid rgba(46, 204, 113, 0.3)' }}>
                  <div className="status-dot green" style={{ width: 14, height: 14 }}></div>
                  <h4 style={{ color: '#2ecc71', fontSize: '18px', margin: 0 }}>{tr.payment?.success || '¡Licencia Activada con éxito!'}</h4>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: Listas IPTW */}
            <div className="settings-card">
              <div className="settings-card-header">
                <Tv size={24} color="var(--primary-red)" />
                <div className="settings-card-title-group" style={{ flex: 1 }}>
                  <h3>{tr.settings.iptwLists}</h3>
                  <p>{tr.settings.iptwListsSub}</p>
                </div>
              </div>

              {/* CARD DE LA SUSCRIPCIÓN / LISTA ACTIVA */}
              <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: 'var(--primary-red, #e74c3c)', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '2px' }}>
                  {tr.settings.activeList}
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#fff' }}>
                  {tr.settings.listUser} {localStorage.getItem('thriptw_xtUser') || 'Modo Archivo'}
                </p>
                {playlistData?.account_info?.exp_date && (
                  <p style={{ margin: 0, fontSize: '13px', color: '#f1c40f' }}>
                    {tr.settings.listExpires} {new Date(playlistData.account_info.exp_date * 1000).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              {/* BOTON GESTOR MULTI-LISTAS */}
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button className="btn-play-movie" onClick={() => setIsEditListOpen(!isEditListOpen)} style={{ width: '100%', maxWidth: '300px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', padding: '0 16px', letterSpacing: '1px', borderRadius: '12px' }}>
                  {isEditListOpen ? tr.settings.closeManager : tr.settings.editLists}
                </button>
              </div>

              {isEditListOpen && (
                <div style={{ marginTop: '16px', background: '#0a0a0a', border: '1px solid #1f1f1f', borderRadius: '12px', padding: '16px' }} className="fade-in-up">
                   <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#fff' }}>{tr.settings.savedLists}</h4>
                   {savedLists.length === 0 && <p style={{ color: '#888', fontSize: '13px' }}>{tr.settings.noSavedLists}</p>}
                   {savedLists.map((list, idx) => (
                      <div key={idx} onClick={() => handleActivateList(list)} title={tr.common.action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', padding: '8px 12px', borderRadius: '8px', marginBottom: '8px', border: '1px solid #222', cursor: 'pointer', transition: 'border 0.2s' }}>
                         <div>
                           <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#fff' }}>{list.name}</div>
                         </div>
                         <button onClick={(e) => { e.stopPropagation(); handleDeleteList(list); }} style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                           {tr.settings.deleteList}
                         </button>
                      </div>
                   ))}

                   <div style={{ marginTop: '20px', borderTop: '1px solid #222', paddingTop: '16px' }}>
                      <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#aaa' }}>{tr.settings.addNewList}</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input type="text" placeholder={tr.settings.serverUrlPlaceholder2} value={newListUrl} onChange={(e) => setNewListUrl(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '6px', fontSize: '14px' }} />
                        <input type="text" placeholder={tr.settings.usernamePlaceholder2} value={newListUser} onChange={(e) => setNewListUser(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '6px', fontSize: '14px' }} />
                        <input type="password" placeholder={tr.settings.passwordPlaceholder2} value={newListPass} onChange={(e) => setNewListPass(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '6px', fontSize: '14px' }} />
                        <button onClick={handleAddList} style={{ background: 'var(--primary-red)', border: 'none', color: '#fff', padding: '12px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
                          {tr.settings.saveList}
                        </button>
                      </div>
                   </div>
                </div>
              )}

            </div>

            {/* SECCIÓN 3: Configuración IPTW */}
            <div className="settings-card">
              <div className="settings-card-header">
                <Settings size={24} color="var(--primary-red)" />
                <div className="settings-card-title-group">
                  <h3>{tr.settings.iptwConfig}</h3>
                  <p>{tr.settings.iptwConfigSub}</p>
                </div>
              </div>

              <div className="settings-form-row">
                <label>{tr.settings.bufferSize}</label>
                <select className="settings-select focusable" defaultValue="medio">
                  <option value="medio">{tr.settings.bufferDesc}</option>
                  <option value="grande">{tr.settings.bufferBig}</option>
                  <option value="pequeno">{tr.settings.bufferSmall}</option>
                </select>
              </div>

              <div className="settings-form-row">
                <label>{tr.settings.streamQuality}</label>
                <select className="settings-select focusable" defaultValue="1080p">
                  <option value="1080p">{tr.settings.qualityFHD}</option>
                  <option value="720p">{tr.settings.qualityHD}</option>
                  <option value="4k">{tr.settings.quality4k}</option>
                </select>
              </div>


            </div>

            {/* SECCIÓN NUEVA: Idioma de la App */}
            <div className="settings-card">
              <div className="settings-card-header">
                <Globe size={24} color="var(--primary-red)" />
                <div className="settings-card-title-group">
                  <h3>{tr.settings.appLanguage}</h3>
                  <p>{tr.settings.appLanguageSub}</p>
                </div>
              </div>

              <div className="settings-form-row" style={{ justifyContent: 'center' }}>
                <select className="settings-select focusable" value={appLanguage} onChange={(e) => setAppLanguage(e.target.value)}>
                  <option value="es">{tr.settings.langES}</option>
                  <option value="en">{tr.settings.langEN}</option>
                  <option value="fr">{tr.settings.langFR}</option>
                  <option value="de">{tr.settings.langDE}</option>
                </select>
              </div>
            </div>

            {/* SECCIÓN 4: Acciones de Cuenta */}
            <div className="settings-card account-actions-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', background: 'transparent', border: 'none' }}>
              <button className="btn-play-movie" onClick={onLogout} style={{ width: '100%', maxWidth: '300px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', padding: '0 16px', letterSpacing: '1px', borderRadius: '12px' }}>
                <LogOut size={22} style={{ marginRight: '8px' }} /> {tr.nav.logout.toUpperCase()}
              </button>
            </div>

          </div>
        </div>
      )}

      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-nav">
        <div className={`nav-item focusable ${activeBottomNav === 'home' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('home'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <Home size={28} />
        </div>
        <div className={`nav-item focusable ${activeBottomNav === 'live' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('live'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <Tv size={28} />
        </div>
        <div className={`nav-item focusable ${activeBottomNav === 'movies' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('movies'); setActiveCategory('all'); setSearchQuery(''); setActiveGenre('Todos'); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <Film size={28} />
        </div>
        <div className={`nav-item focusable ${activeBottomNav === 'series' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('series'); setActiveCategory('all'); setSearchQuery(''); setActiveGenre('Todos'); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <Clapperboard size={28} />
        </div>
        <div className={`nav-item focusable ${activeBottomNav === 'settings' ? 'active' : ''}`} onClick={() => { setActiveBottomNav('settings'); setActiveCategory('all'); setSearchQuery(''); setSelectedMovieId(null); setSelectedSeriesId(null); setSelectedMatchId(null); }}>
          <Settings size={28} />
        </div>
        <div className="nav-item focusable" onClick={onLogout}>
          <LogOut size={28} />
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
            <button className="btn-close-qr focusable" onClick={() => setShowQRModal(false)}>✕</button>
            <h2 className="qr-title">{tr.payment?.title || 'Adquirir Licencia VIP'}</h2>
            
            <div className="telegram-steps-container">
              {/* PASO 1 */}
              <div className="telegram-step">
                <div className="telegram-step-header">
                  <div className="telegram-step-number">1</div>
                  <h4>{tr.payment?.step1 || 'Transfiere 4.95 €'}</h4>
                </div>
                <div className="qr-image-wrapper telegram-qr-wrapper">
                  <img loading="lazy" decoding="async" src="/QR.png" alt="Código QR @thriptw" className="qr-image" 
                    onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://paypal.me/thrip/4.95EUR"} />
                </div>
              </div>

              {/* PASO 2 */}
              <div className="telegram-step">
                <div className="telegram-step-header">
                  <div className="telegram-step-number">2</div>
                  <h4>{tr.payment?.step2 || 'Avisar al Administrador'}</h4>
                </div>
                <button className="btn-telegram-action focusable" onClick={() => window.open('https://t.me/thriptw', '_blank')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.198 2.027c-1.004-.326-2.008-.326-3.013 0L3.125 7.575C1.65 8.12 1.65 9.754 3.125 10.3l4.316 1.6v5.8c0 1.09.89 1.98 1.98 1.98h.02c1.09 0 1.98-.89 1.98-1.98v-3.513l5.093 3.395c.78.52 1.83.213 2.152-.64l3.528-11.64c.265-.873-.13-1.803-.996-2.068z"/></svg> 
                  {tr.payment?.btnTelegram || 'Enviar Recibo por Telegram'}
                </button>
              </div>

              {/* PASO 3 */}
              <div className="telegram-step">
                <div className="telegram-step-header">
                  <div className="telegram-step-number">3</div>
                  <h4>{tr.payment?.step3 || 'Código de 12 dígitos'}</h4>
                </div>
                <div className="telegram-input-group">
                  <input 
                    type="text" 
                    placeholder={tr.payment?.codePlaceholder || 'Ingresa tu Pin'}
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                    maxLength={14}
                  />
                  <button className="btn-paypal btn-redeem focusable" onClick={handleConfirmPayment} disabled={isVerifying || activationCode.length < 12}>
                    <Key size={18} /> {isVerifying ? (tr.payment?.verifying || 'Validando...') : (tr.payment?.confirmPayment || 'Canjear')}
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

