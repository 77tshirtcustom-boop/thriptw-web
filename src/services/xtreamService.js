const isWebSvc = typeof window !== 'undefined' && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost';
const isElectron = typeof window !== 'undefined' && window.process && window.process.type === 'renderer' || navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
const API_BASE_URL = isWebSvc ? window.location.origin : (isElectron ? 'http://localhost:3001' : 'https://thriptw-web.onrender.com');



export const fetchXtreamData = async (serverUrl, username, password, useAntiBloqueo = false) => {
  const baseUrl = serverUrl.replace(/\/+$/, '');

  console.log(`[Anti-Bloqueo: ${useAntiBloqueo ? 'ON' : 'OFF'}] Interceptando Xtream Codes API:`, baseUrl);
  
  const proxyFetch = async (action) => {
    const actionParam = action ? `&action=${action}` : '';
    const timestamp = Date.now();
    const directUrl = `${baseUrl}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}${actionParam}&t=${timestamp}`;

    
    // 1. Intento Directo (Siempre primero, a menos que se fuerce Anti-Bloqueo)
    if (!useAntiBloqueo) {
      try {
        const resp = await fetch(directUrl);
        if (resp.ok) return await resp.json();
        throw new Error(`Direct fetch failed with status: ${resp.status}`);
      } catch (e) {
        console.error('Error en conexión directa:', e);
        throw e; // No reintentamos por proxy si el usuario lo quiere desactivado
      }
    }

    // 2. Solo si Anti-Bloqueo está ON, usamos el servidor local como túnel
    try {
      const response = await fetch(`${API_BASE_URL}/api/proxy/xtream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: baseUrl, username, password, action })
      });
      if (!response.ok) throw new Error('Error en proxy fetch');
      return await response.json();
    } catch (e) {
      console.warn('Fallo en petición con Anti-Bloqueo:', action, e);
      return [];
    }
  };

  try {
    // 1. Obtenemos diccionarios de categorías
    const [liveCat, vodCat, seriesCat] = await Promise.all([
      proxyFetch('get_live_categories'),
      proxyFetch('get_vod_categories'),
      proxyFetch('get_series_categories')
    ]);

    const catMap = {};
    const processCats = (arr) => {
      if (Array.isArray(arr)) {
        arr.forEach(c => { catMap[c.category_id] = (c.category_name || '').trim(); });
      }
    };
    processCats(liveCat);
    processCats(vodCat);
    processCats(seriesCat);

    // 2. Fetch masivo de streams
    const [liveRaw, vodRaw, seriesRaw] = await Promise.all([
      proxyFetch('get_live_streams'),
      proxyFetch('get_vod_streams'),
      proxyFetch('get_series')
    ]);

    // 3. Traducimos al estándar del Dashboard
    const channels = (Array.isArray(liveRaw) ? liveRaw : []).map(ch => ({
      id: `live_${ch.stream_id}`,
      name: ch.name || 'Canal Desconocido',
      epg: 'En Directo',
      img: ch.stream_icon || '',
      groupId: catMap[ch.category_id] || 'General',
      url: useAntiBloqueo ? `${API_BASE_URL}/api/proxy/stream?url=${encodeURIComponent(`${baseUrl}/live/${username}/${password}/${ch.stream_id}.m3u8`)}` : `${baseUrl}/live/${username}/${password}/${ch.stream_id}.m3u8`,
      category: 'TV'
    }));

    const movies = (Array.isArray(vodRaw) ? vodRaw : []).map(m => ({
      id: `vod_${m.stream_id}`,
      title: m.name,
      poster: m.stream_icon || '',
      groupId: catMap[m.category_id] || 'Películas',
      imdb: m.rating || m.rating_5based || 'N/A',
      year: m.added || 'N/A',
      director: 'Desconocido',
      cast: 'Desconocido',
      synopsis: m.name,
      genre: catMap[m.category_id] || 'Películas',
      url: useAntiBloqueo ? `${API_BASE_URL}/api/proxy/stream?url=${encodeURIComponent(`${baseUrl}/movie/${username}/${password}/${m.stream_id}.${m.container_extension || 'mp4'}`)}` : `${baseUrl}/movie/${username}/${password}/${m.stream_id}.${m.container_extension || 'mp4'}`,
      backdrop: m.stream_icon || ''
    }));

    const series = (Array.isArray(seriesRaw) ? seriesRaw : []).map(s => ({
      id: `series_${s.series_id}`,
      title: s.name,
      poster: s.cover || '',
      groupId: catMap[s.category_id] || 'Series',
      imdb: s.rating || s.rating_5based || 'N/A',
      year: s.releaseDate || 'N/A',
      director: 'Desconocido',
      cast: 'Desconocido',
      genre: catMap[s.category_id] || 'Series',
      synopsis: s.name,
      seasons: [{ seasonNumber: 1, episodes: [{ episodeNumber: 1, title: s.name, duration: 'N/A', url: '#' }] }]
    }));
    
    // Extracción de categorías por tipo
    const getCats = (list) => {
      const set = new Set();
      list.forEach(item => { if(item.groupId) set.add(item.groupId); });
      return Array.from(set).map(g => ({ id: g, name: g }));
    };

    // 0. Obtenemos información de la cuenta (User Info)
    const accountData = await proxyFetch();
    const account_info = accountData?.user_info || null;

    return { 
      channels, 
      movies, 
      series, 
      account_info,
      categories: getCats(channels),
      movieCategories: getCats(movies),
      seriesCategories: getCats(series)
    };

  } catch (error) {
    console.error("Fallo maestro conectando a Xtream Codes:", error);
    throw new Error('No se pudo procesar la respuesta del servidor Proxy.');
  }
};

export const fetchSeriesInfo = async (serverUrl, username, password, seriesId, useAntiBloqueo = false) => {
  const baseUrl = serverUrl.replace(/\/+$/, '');
  const timestamp = Date.now();
  const directUrl = `${baseUrl}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&action=get_series_info&series_id=${seriesId}&t=${timestamp}`;

  try {
    let data;
    if (!useAntiBloqueo) {
      const resp = await fetch(directUrl);
      data = await resp.json();
    } else {
      const response = await fetch(`${API_BASE_URL}/api/proxy/xtream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: baseUrl, username, password, action: 'get_series_info', series_id: seriesId })
      });
      data = await response.json();
    }

    if (!data || !data.episodes) return null;

    // Procesamos las temporadas y episodios
    const seasons = Object.keys(data.episodes).map(seasonNum => {
      const episodes = data.episodes[seasonNum].map(ep => ({
        id: `ep_${ep.id}`,
        episodeNumber: ep.episode_num,
        title: ep.title || `Episodio ${ep.episode_num}`,
        duration: ep.info?.duration || 'N/A',
        url: useAntiBloqueo 
          ? `${API_BASE_URL}/api/proxy/stream?url=${encodeURIComponent(`${baseUrl}/series/${username}/${password}/${ep.id}.${ep.container_extension || 'mp4'}`)}`
          : `${baseUrl}/series/${username}/${password}/${ep.id}.${ep.container_extension || 'mp4'}`
      }));

      return {
        seasonNumber: parseInt(seasonNum),
        episodes
      };
    });

    return { seasons, info: data.info };

  } catch (e) {
    console.error('Error cargando episodios de la serie:', e);
    return null;
  }
};
