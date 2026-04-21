import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://thrlachkar_db_user:7G5K44ssqKTVQc8L@cluster0.msa9buh.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

const codeSchema = new mongoose.Schema({
  pin: String,
  status: { type: String, default: 'available' },
  usedAt: Date,
  createdAt: { type: Date, default: Date.now }
});
const Code = mongoose.model('Code', codeSchema);

const sportSchema = new mongoose.Schema({
  id: String,
  sportType: String,
  title: String,
  time: String,
  day: String,
  tournament: String,
  tournamentLogo: String,
  channelsList: [String],
  team1: String,
  team2: String,
  bgImage: String,
  createdAt: { type: Date, default: Date.now }
});
const Sport = mongoose.model('Sport', sportSchema);

const configSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String
});
const Config = mongoose.model('Config', configSchema);

async function checkAdminPassword(pwd) {
  try {
    const adminConfig = await Config.findOne({ key: 'admin_password' });
    const truePassword = adminConfig ? adminConfig.value : (process.env.ADMIN_PASSWORD || 'thrbek+76');
    return pwd === truePassword;
  } catch (e) {
    return pwd === 'thrbek+76';
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// -------- AGENDA DEPORTIVA MANUAL (CMS) --------
app.get('/api/sports/schedule', async (req, res) => {
  try {
    const sports = await Sport.find().sort({ createdAt: 1 });
    res.json({ success: true, schedule: sports });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.post('/api/sports/schedule', async (req, res) => {
  const { password, event } = req.body;
  
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Contraseña de administrador incorrecta' });
  
  const newEvent = new Sport({
    id: `match-live-${Date.now()}`,
    sportType: 'football',
    title: `${event.homeTeam || 'Local'} - ${event.awayTeam || 'Visitante'}`,
    time: event.time || '20:00',
    day: event.day || '',
    tournament: event.tournament || 'Campeonato',
    tournamentLogo: event.tournamentLogo || '',
    channelsList: event.channelsList || [], 
    team1: event.homeLogo || 'https://placehold.co/100x100/101010/FFF.png?text=L',
    team2: event.awayLogo || 'https://placehold.co/100x100/101010/FFF.png?text=V',
    bgImage: event.bgImage || 'https://i.pinimg.com/1200x/c7/ab/3c/c7ab3c490ec9e59124fb442b58ea0b33.jpg'
  });
  
  await newEvent.save();
  res.json({ success: true, event: newEvent });
});

app.delete('/api/sports/schedule/:id', async (req, res) => {
  const { password } = req.body;
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Contraseña de administrador incorrecta' });
  
  await Sport.deleteOne({ id: req.params.id });
  res.json({ success: true });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Online', message: 'THR IPTW Backend Funciona' });
});

// -------- PROXY XTREAM CODES (Anti-CORS) --------
// Útil en producción para ocultar claves y saltar CORS.
app.post('/api/proxy/xtream', async (req, res) => {
  const { url, username, password, action } = req.body;
  try {
    const targetUrl = `${url}/player_api.php?username=${username}&password=${password}&action=${action}`;
    const response = await axios.get(targetUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy Request Failed', details: error.message });
  }
});

// PROXY GENÉRICO PARA LISTAS M3U
app.post('/api/proxy/m3u', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy Request Failed', details: error.message });
  }
});

// PUENTE DE VÍDEO (Stream Proxy) - Para evitar Mixed Content en Web
app.get('/api/proxy/stream', async (req, res) => {
  const streamUrl = req.query.url;
  if (!streamUrl) return res.status(400).send('URL faltante');

  try {
    const isM3U8 = streamUrl.includes('.m3u8') || streamUrl.includes('m3u8');
    
    if (isM3U8) {
      // MODO HLS: Descargamos y reescribimos el manifiesto
      const streamUrlObj = new URL(streamUrl);
      const response = await axios.get(streamUrl, { 
        timeout: 12000,
        responseType: 'text',
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Referer': streamUrlObj.origin + '/',
          'Origin': streamUrlObj.origin
        }
      });
      let content = response.data;
      
      const protocol = 'https'; 
      const host = req.get('host');
      const proxyBase = `${protocol}://${host}/api/proxy/stream?url=`;

      // Base URL para enlaces relativos
      const urlObj = new URL(streamUrl);
      const baseUrlOnly = urlObj.origin + urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf('/') + 1);

      const lines = content.split(/\r?\n/);
      const rewrittenLines = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return line;
        
        if (trimmed.startsWith('#')) {
          if (trimmed.includes('URI=')) {
            return trimmed.replace(/URI="([^"]+)"/, (match, uri) => {
              let fullUri = uri;
              if (!uri.startsWith('http')) {
                fullUri = uri.startsWith('/') ? urlObj.origin + uri : baseUrlOnly + uri;
              }
              return `URI="${proxyBase}${encodeURIComponent(fullUri)}"`;
            });
          }
          return line;
        }
        
        // Es un segmento o sub-manifiesto
        let fullUrl = trimmed;
        if (!trimmed.startsWith('http')) {
          fullUrl = trimmed.startsWith('/') ? urlObj.origin + trimmed : baseUrlOnly + trimmed;
        }
        return `${proxyBase}${encodeURIComponent(fullUrl)}`;
      });

      res.setHeader('Content-Type', 'application/x-mpegURL');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'no-cache');
      return res.send(rewrittenLines.join('\n'));

    } else {
      // MODO VOD o Segmentos HLS: Pipeamos el vídeo directamente
      const segUrlObj = new URL(streamUrl);
      const response = await axios({
        method: 'get',
        url: streamUrl,
        responseType: 'stream',
        timeout: 25000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Referer': segUrlObj.origin + '/',
          'Origin': segUrlObj.origin,
          'Range': req.headers.range || 'bytes=0-'
        }
      });

      // Copiar cabeceras importantes
      if (response.headers['content-type']) res.setHeader('Content-Type', response.headers['content-type']);
      if (response.headers['content-length']) res.setHeader('Content-Length', response.headers['content-length']);
      if (response.headers['content-range']) res.setHeader('Content-Range', response.headers['content-range']);
      if (response.headers['accept-ranges']) res.setHeader('Accept-Ranges', response.headers['accept-ranges']);
      
      res.setHeader('Access-Control-Allow-Origin', '*');
      response.data.pipe(res);
    }
  } catch (error) {
    console.error('Error en Puente de Vídeo:', error.message);
    res.status(500).send('Error al puentear el stream: ' + error.message);
  }
});

// -------- SISTEMA DE PINES (TELEGRAM VIP) --------
app.post('/api/payments/verify', async (req, res) => {
  const { pinCode } = req.body;

  if (pinCode && typeof pinCode === 'string') {
    const cleanedCode = pinCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    if (cleanedCode.length === 12) {
      const codeRecord = await Code.findOne({ pin: cleanedCode });

      if (codeRecord) {
        if (codeRecord.status === 'used') {
          return res.status(400).json({ success: false, message: 'Este Pin ya ha sido utilizado.' });
        }

        // Quemar el pin en base de datos
        codeRecord.status = 'used';
        codeRecord.usedAt = new Date();
        await codeRecord.save();
        
        console.log(`[PIN VERIFIED] Código de Activación Quemado: ${cleanedCode}`);
        
        const issueDate = new Date();
        const expirationDate = new Date();
        expirationDate.setFullYear(issueDate.getFullYear() + 1);

        return res.json({ 
          success: true, 
          license: {
            status: 'premium',
            expiresAt: expirationDate.toISOString(),
            pinUsed: cleanedCode
          }
        });
      } else {
         return res.status(400).json({ success: false, message: 'Código no encontrado en el sistema base.' });
      }
    }
  }

  return res.status(400).json({ success: false, message: 'Pin inválido. Debe contener exactamente 12 caracteres.' });
});

// -------- PANEL ADMIN (NUEVAS RUTAS) --------
app.post('/api/admin/generate-code', async (req, res) => {
  const { password } = req.body;
  
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Contraseña de administrador incorrecta' });

  // Excluimos I, O, 0, 1 para evitar confusión en códigos de canjeo
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rawPin = '';
  for(let i=0; i<12; i++) {
    rawPin += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const newCode = new Code({
    pin: rawPin,
    status: 'available'
  });
  await newCode.save();

  res.json({ success: true, pin: rawPin });
});

app.post('/api/admin/codes', async (req, res) => {
  const { password } = req.body;
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Acceso Denegado' });
  
  const codes = await Code.find().sort({ createdAt: -1 });
  res.json(codes);
});

// -------- SERVIR EL FRONTEND (REACT / VITE) --------
// Esto permite que el backend de Node sea también quien entregue la web al navegador
app.use(express.static(path.join(process.cwd(), 'dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 SERVIDOR BACKEND ACTIVO EN PUERTO ${PORT}`);
  console.log(`========================================\n`);
});

