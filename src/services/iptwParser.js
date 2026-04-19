export const parseM3UString = (m3uString) => {
  const lines = m3uString.split(/\r?\n/);
  const items = [];
  let currentItem = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      currentItem = { tvg: {}, group: {} };
      
      // Extraer atributos como tvg-id="", tvg-logo="", group-title=""
      const attrRegex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
      let match;
      while ((match = attrRegex.exec(line)) !== null) {
        const key = match[1];
        const val = match[2];
        if (key === 'tvg-id') currentItem.tvg.id = val;
        if (key === 'tvg-logo') currentItem.tvg.logo = val;
        if (key === 'group-title') currentItem.group.title = val;
      }
      
      // Extraer el nombre (todo lo que va después de la última coma)
      const commaIndex = line.lastIndexOf(',');
      if (commaIndex !== -1) {
        currentItem.name = line.substring(commaIndex + 1).trim();
      }
    } else if (!line.startsWith('#')) {
      // Esta línea es la URL
      if (currentItem.name) {
        currentItem.url = line;
        items.push(currentItem);
        currentItem = {};
      }
    }
  }

  const liveChannels = [];
  const vodMovies = [];
  const vodSeries = [];
  const groupsTemp = new Set();
  
  items.forEach((item, index) => {
    // Determinar categoría por grupo (Respetando el nombre original del archivo)
    let groupTitle = (item.group && item.group.title) ? item.group.title.trim() : 'Sin Categoría';
    const name = item.name || 'Unknown Channel';
    const id = item.tvg?.id || `ch-${index}`;
    const logo = item.tvg?.logo || '';
    const groupId = groupTitle;

    // Lógica de detección de tipo
    const normalizedGroup = groupTitle.toUpperCase();
    const url = (item.url || '').toLowerCase();

    // Detección de Series
    const isSeries = url && (
      url.includes('/series/') || 
      normalizedGroup.includes('SERIE') || 
      normalizedGroup.includes('TEMPORADA') || 
      normalizedGroup.includes('SEASON') || 
      normalizedGroup.includes('TV SHOW') ||
      normalizedGroup.includes('SHOWS') ||
      /S\d{1,2}/i.test(name) ||          // S01, S1...
      /T\d{1,2}/i.test(name) ||          // T01, T1...
      /E\d{1,3}/i.test(name) ||          // E01, E1...
      /\bCAP\.\d+/i.test(name) ||        // Cap. 1
      /\bEP\.\d+/i.test(name) ||         // Ep. 1
      /\bTEM\.\d+/i.test(name)           // Tem. 1
    );

    // Detección de Películas (VOD)
    const isVOD = !isSeries && url && (
      url.includes('/movie/') || 
      url.endsWith('.mp4') || 
      url.endsWith('.mkv') || 
      url.endsWith('.avi') ||
      normalizedGroup.includes('VOD') || 
      normalizedGroup.includes('PELICULA') || 
      normalizedGroup.includes('MOVIE') ||
      normalizedGroup.includes('CINE') ||
      normalizedGroup.includes('ESTRENOS') ||
      normalizedGroup.includes('4K') ||
      normalizedGroup.includes('FILM')
    );
    
    if (isSeries) {
      vodSeries.push({
        id: id,
        title: name,
        poster: logo,
        groupId: groupId,
        imdb: 'N/A',
        year: 'N/A',
        genre: groupId,
        director: 'Desconocido',
        cast: 'Desconocido',
        synopsis: name,
        url: item.url,
        seasons: [{ seasonNumber: 1, episodes: [{ episodeNumber: 1, title: name, duration: 'N/A', url: item.url }] }]
      });
    } else if (isVOD) {
      vodMovies.push({
        id: id,
        title: name,
        poster: logo,
        groupId: groupId,
        imdb: 'N/A',
        year: 'N/A',
        duration: 'N/A',
        genre: groupId,
        director: 'Desconocido',
        cast: 'Desconocido',
        synopsis: name,
        url: item.url,
        backdrop: logo
      });
    } else {
      liveChannels.push({
        id: id,
        name: name,
        epg: 'En Directo', 
        img: logo,
        groupId: groupId,
        url: item.url,
        category: 'TV'
      });
    }
  });

  // Generar categorías respetando el orden de cada sección
  const getCategoriesFor = (itemsList) => {
    const set = new Set();
    itemsList.forEach(item => {
      if (item.groupId) set.add(item.groupId);
    });
    return Array.from(set).map(g => ({ id: g, name: g }));
  };

  return {
    channels: liveChannels,
    movies: vodMovies,
    series: vodSeries,
    categories: getCategoriesFor(liveChannels),
    movieCategories: getCategoriesFor(vodMovies),
    seriesCategories: getCategoriesFor(vodSeries)
  };
};
