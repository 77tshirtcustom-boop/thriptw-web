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
    // Determinar categoría por grupo
    const groupTitle = (item.group && item.group.title) ? item.group.title.toUpperCase() : 'UNCATEGORIZED';
    groupsTemp.add(groupTitle);
    
    // Lógica básica de tipo de contenido
    const isVOD = item.url && (item.url.includes('/movie/') || item.url.endsWith('.mp4') || item.url.endsWith('.mkv') || groupTitle.includes('VOD') || groupTitle.includes('PELICULA') || groupTitle.includes('MOVI'));
    const isSeries = item.url && (item.url.includes('/series/') || groupTitle.includes('SERIE'));
    
    const id = item.tvg?.id || `ch-${index}`;
    const name = item.name || 'Unknown Channel';
    const logo = item.tvg?.logo || '';
    const groupId = groupTitle;
    
    if (isSeries) {
      vodSeries.push({
        id: id,
        title: name,
        poster: logo,
        groupId: groupId,
        imdb: 'N/A',
        year: 'N/A',
        genre: groupId,
        director: 'Unknown',
        cast: 'Unknown',
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
        director: 'Unknown',
        cast: 'Unknown',
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

  return {
    channels: liveChannels,
    movies: vodMovies,
    series: vodSeries,
    categories: Array.from(groupsTemp).map(g => ({ id: g, name: g }))
  };
};
