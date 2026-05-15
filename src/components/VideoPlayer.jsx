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
  SkipForward,
  Menu,
  RotateCcw,
  RefreshCcw,
  Tv
} from 'lucide-react';

import './VideoPlayer.css';

const isWebPlayer = typeof window !== 'undefined' && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost';
const isElectronPlayer = typeof window !== 'undefined' && (window.process?.type === 'renderer' || navigator.userAgent.toLowerCase().indexOf(' electron/') > -1);
const API_BASE_URL = isWebPlayer ? window.location.origin : (isElectronPlayer ? 'http://localhost:3001' : 'https://thriptw-web.onrender.com');

const VideoPlayer = ({ media, onClose, onNext, onPrev, useAntiBloqueo = false, isLive = false, channels = [], onSelectChannel, isSeries = false, seasons = [], onRefresh }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const [selectedAudioIdx, setSelectedAudioIdx] = useState(-1);
  const [selectedSubtitleIdx, setSelectedSubtitleIdx] = useState(-1);
  const [retryWithProxy, setRetryWithProxy] = useState(false);

  const hlsRef = useRef(null);
  const loadingRef = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    let streamUrl = media.url;

    // Si es serie y no hay URL, intentamos cargar el primer episodio
    if (isSeries && (!streamUrl || streamUrl === '#')) {
      const firstSeason = seasons?.[0];
      const firstEpisode = firstSeason?.episodes?.[0];
      if (firstEpisode?.url && firstEpisode.url !== '#') {
        streamUrl = firstEpisode.url;
      }
    }

    if (!video || !streamUrl || streamUrl === '#') {
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsLoading(true);
    loadingRef.current = true;
    setIsPlaying(false);

    let hls;
    const isHTTPS = window.location.protocol === 'https:';
    const isWeb = window.location.protocol !== 'file:';

    // Evitar doble proxy
    const needsProxy = useAntiBloqueo || retryWithProxy || (isWeb && isHTTPS && typeof streamUrl === 'string' && streamUrl.startsWith('http:'));
    const alreadyProxied = streamUrl.includes('/api/proxy/stream');

    if (needsProxy && !alreadyProxied) {
      streamUrl = `${API_BASE_URL}/api/proxy/stream?url=${encodeURIComponent(streamUrl)}`;
    }

    const isM3U8 = streamUrl.includes('.m3u8') || streamUrl.includes('m3u8');
    const isDirectVideo = /\.(mp4|mkv|avi|ts|webm|mov)$/i.test(streamUrl);

    const timeoutDuration = useAntiBloqueo 
      ? (isLive ? 15000 : 20000) 
      : (isLive ? 12000 : 15000);

    const loadingTimeout = setTimeout(() => {
      if (loadingRef.current) {
        console.log("Timeout reached - Closing player instantly");
        loadingRef.current = false;
        
        // Paramos todo el tráfico de red inmediatamente
        if (video) { 
          video.pause(); 
          video.src = ""; 
          video.load(); 
        }
        if (hlsRef.current) {
          hlsRef.current.stopLoad();
          hlsRef.current.destroy();
          hlsRef.current = null;
        }

        onClose(); // Cierre directo sin mensajes
      }
    }, timeoutDuration);

    const handlePlay = () => {
      clearTimeout(loadingTimeout);
      video.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
        loadingRef.current = false;
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
        if (!isLive && media?.id) {
          try {
            const savedTime = localStorage.getItem(`thriptw_progress_${media.id}`);
            if (savedTime) {
              const data = JSON.parse(savedTime);
              const time = typeof data === 'object' ? data.time : parseFloat(data);
              // Solo reanudamos si el progreso es significativo (más de 10 segundos)
              if (!isNaN(time) && time > 10) {
                console.log(`Reanudando ${media.id} en ${time}s`);
                // Pequeño delay para asegurar que el buffer está listo
                setTimeout(() => {
                  video.currentTime = time;
                }, 150);
              }
            }
          } catch (e) { console.error("Error al reanudar:", e); }
        }
      }).catch(() => {
        video.muted = true;
        setIsMuted(true);
        setVolume(0);
        video.play().then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
          controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
        }).catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
          setError("Error de reproducción.");
        });
      });
    };

    const handleVideoError = (e) => {
      console.warn("Video playback error detected:", e);
      if (!retryWithProxy) {
        console.log("Retrying playback with forced proxy tunnel...");
        setRetryWithProxy(true);
        return;
      }
      clearTimeout(loadingTimeout);
      setIsLoading(false);
      onClose();
    };

    const isSmartTV = /SmartTV|LG|Samsung|Tizen|WebOS|Viera|BRAVIA/i.test(navigator.userAgent);
    const canPlayNatively = video.canPlayType('application/vnd.apple.mpegurl') || video.canPlayType('application/x-mpegURL');

    video.addEventListener('error', handleVideoError);

    if (isM3U8 && canPlayNatively && (isSmartTV || !Hls.isSupported())) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', handlePlay);
    } else if (Hls.isSupported() && isM3U8) {
      hls = new Hls({ 
        maxBufferLength: 60, 
        maxMaxBufferLength: 600, 
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });
      hlsRef.current = hls;
      hls.on(Hls.Events.MANIFEST_PARSED, () => { handlePlay(); updateTracksFromHls(hls); });
      hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, () => updateTracksFromHls(hls));
      hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, () => updateTracksFromHls(hls));
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          handleVideoError(data);
          hls.destroy();
        }
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
    } else {
      video.src = streamUrl;
      video.load(); // Forzar carga del nuevo archivo
      video.addEventListener('loadedmetadata', handlePlay);
    }

    return () => {
      clearTimeout(loadingTimeout);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('loadedmetadata', handlePlay);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      video.removeAttribute('src');
      video.load();
    };
  }, [media, retryWithProxy]);

  const updateTracksFromHls = (hlsInstance) => {
    if (hlsInstance.audioTracks.length > 0) {
      setAudioTracks(hlsInstance.audioTracks.map(t => t.name || t.lang || `Audio ${t.id}`));
      setSelectedAudioIdx(hlsInstance.audioTrack);
    }
    if (hlsInstance.subtitleTracks.length > 0) {
      const subs = hlsInstance.subtitleTracks.map(t => t.name || t.lang || `Sub ${t.id}`);
      setSubtitleTracks(['Apagado', ...subs]);
      setSelectedSubtitleIdx(hlsInstance.subtitleTrack + 1);
    }
  };

  const handleAudioChange = (index) => {
    if (hlsRef.current) { hlsRef.current.audioTrack = index; setSelectedAudioIdx(index); }
  };

  const handleSubtitleChange = (index) => {
    if (hlsRef.current) { hlsRef.current.subtitleTrack = index - 1; setSelectedSubtitleIdx(index); }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return "00:00:00";
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const lastSavedTimeRef = useRef(0);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
    setCurrentTime(formatTime(video.currentTime));
    setDuration(formatTime(video.duration));

    // Guardar progreso cada 5 segundos de forma fiable
    if (!isLive && media?.id && Math.abs(video.currentTime - lastSavedTimeRef.current) >= 5) {
      localStorage.setItem(`thriptw_progress_${media.id}`, JSON.stringify({
        time: video.currentTime,
        timestamp: Date.now()
      }));
      lastSavedTimeRef.current = video.currentTime;
    }
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        // Guardar al pausar
        if (!isLive && media?.id) {
          localStorage.setItem(`thriptw_progress_${media.id}`, JSON.stringify({
            time: videoRef.current.currentTime,
            timestamp: Date.now()
          }));
        }
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      // Si desmuteamos y el volumen era 0, lo ponemos al 50%
      if (!newMuted && volume === 0) {
        videoRef.current.volume = 0.5;
        setVolume(0.5);
      }
    }
  };

  const adjustVolume = (delta) => {
    if (videoRef.current) {
      let newVol = Math.min(1, Math.max(0, volume + delta));
      videoRef.current.volume = newVol;
      setVolume(newVol);
      if (newVol > 0) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    if (!document.fullscreenElement) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
    setIsFullscreen(!isFullscreen);
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    videoRef.current.currentTime = (clickX / rect.width) * videoRef.current.duration;
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

      // Teclas de TV: Tizen (10009), WebOS (461), Android (4)
      if (e.key === 'Escape' || e.key === 'Backspace' || e.keyCode === 10009 || e.keyCode === 461 || e.keyCode === 4) {
        e.preventDefault(); e.stopPropagation();
        if (activeMenu) {
          setActiveMenu(null);
        } else {
          onClose();
        }
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement === containerRef.current) {
          e.preventDefault(); e.stopPropagation();
          togglePlay();
        }
      }

      // Mostramos controles al pulsar cualquier tecla
      setShowControls(true);

      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
      }
    };

    const handleTVBack = () => {
      if (activeMenu) setActiveMenu(null);
      else onClose();
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('tv-back-button', handleTVBack);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('tv-back-button', handleTVBack);
    };
  }, [isPlaying, activeMenu, onClose]);



  useEffect(() => {
    if (activeMenu === 'channels') {
      const activeItem = document.querySelector('.quick-channel-item.active');
      if (activeItem) activeItem.focus();
      else document.querySelector('.quick-channel-item')?.focus();
    } else {
      const playBtn = document.getElementById('sn-player-play');
      if (playBtn) playBtn.focus();
      else containerRef.current?.focus();
    }
  }, [activeMenu]);

  useEffect(() => {
    const playBtn = document.getElementById('sn-player-play');
    if (playBtn) {
      playBtn.focus();
    } else {
      containerRef.current?.focus();
    }
  }, []);

  return (
    <div
      className={`video-player-container ${showControls || !isPlaying || activeMenu ? 'show-controls' : 'hide-controls'}`}
      ref={containerRef}
      style={{ outline: 'none' }}
      onMouseMove={() => { setShowControls(true); if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); }}
    >
      <video
        ref={videoRef}
        className="video-element"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(formatTime(videoRef.current.duration))}
        onEnded={() => setIsPlaying(false)}
        autoPlay
      />

      {isLoading && <div className="player-loading-overlay"><div className="player-spinner"></div><p>Cargando...</p></div>}

      <div className="player-ui">
        <div className="player-header">
          <button id="sn-player-back" className="btn-player-back focusable" onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); (document.getElementById('sn-player-progress') || document.getElementById('sn-player-prev') || document.getElementById('sn-player-play'))?.focus(); }
              if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); (document.getElementById('sn-player-fs-top') || document.getElementById('sn-player-menu'))?.focus(); }
              if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); (document.getElementById('sn-player-fs-top') || document.getElementById('sn-player-fs') || document.getElementById('sn-player-menu'))?.focus(); }
            }}>
            <ArrowLeft size={28} />
          </button>
          <div className="player-title-info"><h2>{media?.name || media?.title || "Reproduciendo..."}</h2></div>
          <div className="header-right-actions">
            <button id="sn-player-fs-top" className="player-icon-btn focusable" onClick={toggleFullscreen}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-player-back')?.focus(); }
                if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-player-back')?.focus(); }
                if (e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); (document.getElementById('sn-player-progress') || document.getElementById('sn-player-menu'))?.focus(); }
              }}>
              <Maximize size={24} />
            </button>
          </div>
        </div>

        {!isLoading && (
          <div className="center-play-pause" onClick={togglePlay}>
            {!isPlaying && <div className="big-play-btn"><Play size={48} fill="currentColor" /></div>}
          </div>
        )}

        <div className="player-bottom" onClick={(e) => e.stopPropagation()}>
          {!isLive && (
            <div id="sn-player-progress" className="progress-bar-container focusable" tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('sn-player-back')?.focus(); }
                if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('sn-player-play')?.focus(); }
                if (e.key === 'ArrowLeft') { e.preventDefault(); videoRef.current.currentTime -= 10; }
                if (e.key === 'ArrowRight') { e.preventDefault(); videoRef.current.currentTime += 10; }
              }}
              onClick={handleProgressClick}
            >
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                <div className="progress-bar-thumb" style={{ left: `${progress}%` }}></div>
              </div>
            </div>
          )}

          <div className="player-controls-row">
            <div className="controls-left">
              {isLive && (
                <button 
                  id="sn-player-prev" 
                  className="player-icon-btn focusable" 
                  onClick={() => onPrev?.()} 
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-player-menu')?.focus(); }
                    if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-player-play')?.focus(); }
                    if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); (document.getElementById('sn-player-progress') || document.getElementById('sn-player-back'))?.focus(); }
                  }}
                  title="Canal Anterior"
                >
                  <SkipBack size={24} fill="currentColor" />
                </button>
              )}

              <button id="sn-player-play" className="player-icon-btn focusable" onClick={togglePlay} onKeyDown={(e) => {
                if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); (document.getElementById('sn-player-progress') || document.getElementById('sn-player-back'))?.focus(); }
                if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); (isLive ? document.getElementById('sn-player-prev') : document.getElementById('sn-player-menu'))?.focus(); }
                if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); (isLive ? document.getElementById('sn-player-next') : document.getElementById('sn-player-mute'))?.focus(); }
              }}>{isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}</button>

              {isLive && (
                <button 
                  id="sn-player-next" 
                  className="player-icon-btn focusable" 
                  onClick={() => onNext?.()} 
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-player-play')?.focus(); }
                    if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-player-mute')?.focus(); }
                    if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); (document.getElementById('sn-player-progress') || document.getElementById('sn-player-back'))?.focus(); }
                  }}
                  title="Siguiente Canal"
                >
                  <SkipForward size={24} fill="currentColor" />
                </button>
              )}
              <button id="sn-player-mute" className="player-icon-btn focusable" onClick={toggleMute} onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); (isLive ? document.getElementById('sn-player-next') : document.getElementById('sn-player-play'))?.focus(); }
                if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-player-menu')?.focus(); }
                if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); adjustVolume(0.1); }
                if (e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); adjustVolume(-0.1); }
              }}>
                <div className="volume-control-wrapper">
                  <div className="volume-bar-vertical">
                    <div className="volume-bar-fill" style={{ height: `${volume * 100}%` }}></div>
                  </div>
                  {isMuted || volume === 0 ? <VolumeX size={24} color="var(--primary-red)" /> : <Volume2 size={24} />}
                  <span className="volume-percent">{Math.round(volume * 100)}%</span>
                </div>
              </button>
              {!isLive && <div className="time-display">{currentTime} / {duration}</div>}
            </div>

            <div className="controls-right">

              <button 
                id="sn-player-menu" 
                className="player-icon-btn focusable" 
                onClick={() => {
                  if (isLive) setActiveMenu(activeMenu === 'channels' ? null : 'channels');
                  // En Películas/Series no hace nada por ahora
                }} 
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); document.getElementById('sn-player-mute')?.focus(); }
                  if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); (isLive ? document.getElementById('sn-player-prev') : document.getElementById('sn-player-play'))?.focus(); }
                  if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); (document.getElementById('sn-player-fs-top') || document.getElementById('sn-player-back'))?.focus(); }
                }}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {activeMenu === 'channels' && (
          <div className="player-channels-sidebar fade-in">
            <div className="sidebar-header">
              <Tv size={20} />
              <span>
                {isSeries ? "SERIES Y EPISODIOS" : (isLive ? "LISTA DE CANALES" : "PELÍCULAS SIMILARES")}
              </span>
            </div>
            <div className="sidebar-content scroll-area">
              {isSeries && seasons?.length > 1 && (
                <div className="seasons-selector">
                  {seasons.map((s, idx) => (
                    <div
                      key={idx}
                      id={`sn-sidebar-season-${idx}`}
                      className={`season-tab focusable ${selectedSeasonIdx === idx ? 'active' : ''}`}
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('sn-quick-ch-0')?.focus(); }
                        if (e.key === 'ArrowRight' && idx < seasons.length - 1) { e.preventDefault(); document.getElementById(`sn-sidebar-season-${idx + 1}`)?.focus(); }
                        if (e.key === 'ArrowLeft' && idx > 0) { e.preventDefault(); document.getElementById(`sn-sidebar-season-${idx - 1}`)?.focus(); }
                        if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('sn-player-menu')?.focus(); }
                      }}
                      onFocus={() => setSelectedSeasonIdx(idx)}
                      onClick={() => setSelectedSeasonIdx(idx)}
                    >
                      Temporada {s.seasonNumber}
                    </div>
                  ))}
                </div>
              )}

              {(() => {
                let items = channels;
                if (isSeries && seasons?.length > 0) {
                  const s = seasons[selectedSeasonIdx] || seasons[0];
                  items = s.episodes.map(ep => ({
                    ...ep,
                    id: ep.id || `ep_${ep.episodeNumber}`,
                    name: `T${s.seasonNumber} E${ep.episodeNumber}: ${ep.title}`
                  }));
                }
                return items.map((ch, idx) => (
                  <div
                    key={ch.id || idx}
                    className={`quick-channel-item focusable ${media.id === ch.id ? 'active' : ''}`}
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault(); e.stopPropagation();
                        document.getElementById(`sn-quick-ch-${idx + 1}`)?.focus();
                      }
                      if (e.key === 'ArrowUp') {
                        e.preventDefault(); e.stopPropagation();
                        const prevItem = document.getElementById(`sn-quick-ch-${idx - 1}`);
                        if (prevItem) prevItem.focus();
                        else if (isSeries) document.getElementById(`sn-sidebar-season-${selectedSeasonIdx}`)?.focus();
                      }
                      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Escape' || e.key === 'Backspace') {
                        e.preventDefault(); e.stopPropagation();
                        setActiveMenu(null);
                        setTimeout(() => document.getElementById('sn-player-menu')?.focus(), 100);
                      }
                    }}
                    id={`sn-quick-ch-${idx}`}
                    onClick={() => {
                      if (isSeries) {
                        onSelectChannel({ ...media, ...ch, id: ch.id });
                      } else {
                        onSelectChannel(ch);
                      }
                      setActiveMenu(null);
                    }}
                  >
                    <span>{ch.name || ch.title}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {activeMenu === 'settings' && (
          <div className="player-settings-menu fade-in">
            <div className="settings-menu-header"><Settings size={20} /><span>Ajustes</span></div>
            <div className="settings-menu-content">
              <div className="settings-section">
                <div className="settings-section-title">Audio</div>
                <div className="settings-options">
                  {audioTracks.map((t, i) => <button key={i} id={`sn-player-audio-${i}`} className={`settings-option focusable ${selectedAudioIdx === i ? 'active' : ''}`} onClick={() => handleAudioChange(i)} onKeyDown={(e) => { if (e.key === 'ArrowDown' && i < audioTracks.length - 1) document.getElementById(`sn-player-audio-${i + 1}`)?.focus(); if (e.key === 'ArrowUp' && i > 0) document.getElementById(`sn-player-audio-${i - 1}`)?.focus(); }}>{t}</button>)}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VideoPlayer;
