import React, { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  ArrowLeft, 
  Settings, 
  Subtitles,
  AudioLines,
  SkipBack,
  SkipForward
} from 'lucide-react';
import './VideoPlayer.css';

const isWebPlayer = typeof window !== 'undefined' && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost';
const API_BASE_URL = isWebPlayer ? window.location.origin : 'https://thriptw-web.onrender.com';

const VideoPlayer = ({ media, onClose, onNext, onPrev }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeMenu, setActiveMenu] = useState(null); // 'audio' | 'subtitles' | null

  // Mock Tracks
  const audioTracks = ['Español', 'Inglés'];
  const subtitleTracks = ['Apagado', 'Español', 'Inglés'];
  const [selectedAudio, setSelectedAudio] = useState('Español');
  const [selectedSubtitle, setSelectedSubtitle] = useState('Apagado');

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !media?.url) return;

    setError(null);
    setIsLoading(true);
    setIsPlaying(false);
    
    let hls;
    let streamUrl = media.url;
    const isHTTPS = window.location.protocol === 'https:';
    const isWeb = window.location.protocol !== 'file:';

    // -- ACTIVACIÓN DEL PUENTE DE VÍDEO (Modo Automático) --
    if (isWeb && isHTTPS && streamUrl.startsWith('http:')) {
      console.log("Activando Puente de Vídeo para saltar Mixed Content...");
      // Usamos el proxy de nuestro servidor para convertir el stream en HTTPS "falso"
      streamUrl = `${API_BASE_URL}/api/proxy/stream?url=${encodeURIComponent(streamUrl)}`;
    }

    const isDirectVideo = 
      streamUrl.includes('.mp4') || 
      streamUrl.includes('.mkv') || 
      streamUrl.includes('.avi') || 
      streamUrl.includes('.ts') || 
      streamUrl.includes('.webm') ||
      streamUrl.includes('.mov');

    const isM3U8 = streamUrl.includes('.m3u8') || streamUrl.includes('m3u8');

    const handlePlay = () => {
      video.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(e => {
        console.log("Autoplay blocked, muting...", e);
        video.muted = true;
        setIsMuted(true);
        setVolume(0);
        video.play().then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        }).catch(err => {
          console.error("Play failed even muted:", err);
          setIsPlaying(false);
          setIsLoading(false);
          setError("El navegador bloqueó la reproducción automática. Haz clic en el botón Play.");
        });
      });
    };

    // Detección de Smart TV para priorizar reproducción nativa
    const isSmartTV = /SmartTV|LG|Samsung|Tizen|WebOS|Viera|BRAVIA/i.test(navigator.userAgent);
    const canPlayNatively = video.canPlayType('application/vnd.apple.mpegurl') || video.canPlayType('application/x-mpegURL');

    if (isM3U8 && canPlayNatively && (isSmartTV || !Hls.isSupported())) {
      // MODO NATIVO (Ideal para LG, Samsung y Safari)
      console.log("Usando reproductor nativo de la Smart TV...");
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', handlePlay);
    } else if (Hls.isSupported() && isM3U8) {
      // MODO HLS.JS (Para Chrome y navegadores sin soporte nativo)
      hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        startLevel: -1,
        enableWorker: true
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, handlePlay);
      
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Error de red HLS, intentando recuperar...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Error de medios HLS, intentando recuperar...");
              hls.recoverMediaError();
              break;
            default:
              console.error("Error fatal HLS, no se puede recuperar.");
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl') || isDirectVideo) {
      video.src = streamUrl;
      video.onloadedmetadata = () => {
        handlePlay();
      };
      video.onerror = () => {
        console.error("Native Video Error:", video.error);
        if (isHTTPS && streamUrl.startsWith('http:')) {
           setError("Contenido Bloqueado: Este navegador no permite reproducir canales HTTP en una web HTTPS. Usa la App .EXE o habilita 'Contenido no seguro' en el navegador.");
        } else {
           setError("Error del reproductor nativo. Problema de Codecs o Mixed Content.");
        }
        setIsLoading(false);
      };
    } else {
      video.src = streamUrl;
      handlePlay();
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [media]);

  useEffect(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    if (isPlaying && !activeMenu) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    } else if (!isPlaying) {
      setShowControls(true);
    }
    
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, activeMenu]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    // Si algún menú está abierto, no ocultar los controles
    if (!activeMenu && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying && !activeMenu) {
      setShowControls(false);
    }
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.muted && isMuted) {
         videoRef.current.muted = false;
         setIsMuted(false);
         setVolume(1);
      }

      if (isPlaying) {
        videoRef.current.pause();
        setShowControls(true); // Mostrar controles siempre al posar
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        videoRef.current.play().catch(err => {
            console.log("Play failed manually:", err);
            setIsPlaying(false);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercentage = clickX / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = clickPercentage * videoRef.current.duration;
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleFullscreen = async (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div 
      className={`video-player-container ${showControls || !isPlaying || activeMenu ? 'show-controls' : 'hide-controls'}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => { setActiveMenu(null); setShowControls(true); }} // Cierra menús al clickear fuera
    >
      <video
        ref={videoRef}
        className="video-element"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onClick={togglePlay}
        playsInline
        webkit-playsinline="true"
        autoPlay
      >
        <track kind="captions" />
      </video>

      {/* OVERLAY DE CARGA (LOADING) */}
      {isLoading && !error && (
        <div className="player-loading-overlay">
          <div className="player-spinner"></div>
          <p>Cargando stream...</p>
        </div>
      )}

      {/* OVERLAY DE ERROR */}
      {error && (
        <div className="player-error-overlay fade-in">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h3>No se pudo cargar el video</h3>
            <p className="error-text">{error}</p>
            <p className="error-hint">
              Si estás en un navegador, asegúrate de permitir <b>"Contenido no seguro"</b> en los ajustes del sitio (click en el candado de la barra de direcciones).
            </p>
            <button className="btn-error-retry focusable" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* OVERLAY DE CONTROLES */}
      <div className="player-ui">
        
        {/* HEADER */}
        <div className="player-header fade-element">
          <button className="btn-player-back focusable" onClick={onClose}>
            <ArrowLeft size={28} />
          </button>
          <div className="player-title-info">
            <h2>{media?.title || "Reproduciendo..."}</h2>
          </div>
        </div>

        {/* CUBIERTA CENTRAL DE PLAY/PAUSE AL HACER CLIC */}
        <div className="center-play-pause fade-element focusable" onClick={togglePlay}>
           {!isPlaying && (
             <div className="big-play-btn">
               <Play size={48} fill="currentColor" />
             </div>
           )}
        </div>

        {/* MENÚ DE IDIOMAS Y SUBTÍTULOS */}
        {activeMenu && (
          <div className="settings-menu-overlay fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="settings-menu-content">
              
              <div className="menu-column">
                <div className="menu-header">
                  <AudioLines size={18} />
                  <h3>Audio</h3>
                </div>
                {audioTracks.map(audio => (
                  <div 
                    key={audio} 
                    className={`menu-option focusable ${selectedAudio === audio ? 'selected' : ''}`}
                    onClick={() => { setSelectedAudio(audio); setActiveMenu(null); }}
                  >
                    {audio}
                  </div>
                ))}
              </div>

              <div className="settings-divider"></div>

              <div className="menu-column">
                <div className="menu-header">
                  <Subtitles size={18} />
                  <h3>Subtítulos</h3>
                </div>
                {subtitleTracks.map(sub => (
                  <div 
                    key={sub} 
                    className={`menu-option focusable ${selectedSubtitle === sub ? 'selected' : ''}`}
                    onClick={() => { setSelectedSubtitle(sub); setActiveMenu(null); }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM CONTROLS */}
        <div className="player-bottom fade-element" onClick={(e) => e.stopPropagation()}>
          
          <div className="progress-bar-container focusable" onClick={handleProgressClick}>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              <div className="progress-bar-thumb" style={{ left: `${progress}%` }}></div>
            </div>
          </div>

          <div className="player-controls-row">
            
            <div className="controls-left">
              {onPrev && (
                <button className="player-icon-btn focusable" onClick={onPrev} title="Anterior">
                  <SkipBack size={24} fill="currentColor" />
                </button>
              )}
              
              <button className="player-icon-btn focusable" onClick={togglePlay}>
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              
              {onNext && (
                <button className="player-icon-btn focusable" onClick={onNext} title="Siguiente">
                  <SkipForward size={24} fill="currentColor" />
                </button>
              )}
              
              <div className="volume-container">
                <button className="player-icon-btn focusable" onClick={toggleMute}>
                  {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <input 
                  type="range" 
                  className="volume-slider focusable" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={isMuted ? 0 : volume} 
                  onChange={handleVolumeChange} 
                />
              </div>

              <div className="time-display">
                {currentTime} / {duration}
              </div>
            </div>

            <div className="controls-right">
              <button 
                className="player-icon-btn focusable" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setActiveMenu(activeMenu ? null : 'settings');
                }}
                title="Ajustes"
              >
                <Settings size={24} />
              </button>

              <button className="player-icon-btn focusable" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoPlayer;
