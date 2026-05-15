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

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, unique: true },
  name: { type: String, default: '' }, // Nombre del cliente
  status: { type: String, default: 'trial' }, // 'trial', 'active', 'blocked'
  activatedByPin: String, // NUEVO: Para saber qué PIN usó
  expiresAt: Date,
  lastConnected: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
const Device = mongoose.model('Device', deviceSchema);

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
  res.json({ status: 'Online', message: 'THRIPTW Backend Funciona' });
});

// -------- GESTIÓN DE DISPOSITIVOS (CLIENTE) --------
app.post('/api/devices/sync', async (req, res) => {
  const { deviceId } = req.body;
  if (!deviceId) return res.status(400).json({ error: 'DeviceId missing' });

  try {
    // Si MongoDB no está conectado, devolvemos un estado por defecto para no bloquear al usuario
    if (mongoose.connection.readyState !== 1) {
      console.warn("⚠️ MongoDB offline. Usando modo de emergencia para:", deviceId);
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      return res.json({ 
        success: true, 
        device: { deviceId, status: 'trial', expiresAt: expires } 
      });
    }

    let device = await Device.findOne({ deviceId });
    if (!device) {
      // Registrar nuevo dispositivo con 7 días de trial
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      device = new Device({ deviceId, status: 'trial', expiresAt: expires });
      await device.save();
    } else {
      // LÓGICA DE CADUCIDAD: Si la fecha ha pasado, bloqueamos el dispositivo
      if (device.expiresAt && device.expiresAt < new Date() && device.status !== 'blocked') {
        console.log(`[EXPIRATION] Dispositivo ${deviceId} ha caducado. Bloqueando...`);
        device.status = 'blocked';
      }
      
      device.lastConnected = new Date();
      await device.save();
    }
    res.json({ success: true, device });
  } catch (e) {
    console.error("Sync error:", e);
    // En caso de error crítico, devolvemos un estado de trial por defecto
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.json({ success: true, device: { deviceId, status: 'trial', expiresAt: expires } });
  }
});

// -------- PROXY XTREAM CODES (Anti-CORS) --------
// Útil en producción para ocultar claves y saltar CORS.
app.post('/api/proxy/xtream', async (req, res) => {
  const { url, username, password, action } = req.body;
  try {
    const timestamp = Date.now();
    const actionParam = action ? `&action=${action}` : '';
    const targetUrl = `${url}/player_api.php?username=${username}&password=${password}${actionParam}&t=${timestamp}`;

    const response = await axios({
      method: 'get',
      url: targetUrl,
      responseType: 'stream'
    });
    if (response.headers['content-type']) res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Proxy Request Failed', details: error.message });
  }
});

// PROXY GENÉRICO PARA LISTAS M3U
app.post('/api/proxy/m3u', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    });
    if (response.headers['content-type']) res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
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
      const urlObj = new URL(streamUrl);
      const commonHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Referer': urlObj.origin + '/',
        'Origin': urlObj.origin,
        'Connection': 'keep-alive',
        'Icy-MetaData': '1'
      };

      const response = await axios.get(streamUrl, { 
        timeout: 10000,
        responseType: 'text',
        headers: commonHeaders
      });
      let content = response.data;
      
      const protocol = req.protocol; 
      const host = req.get('host');
      const proxyBase = `${protocol}://${host}/api/proxy/stream?url=`;

      console.log(`[PROXY-HLS] Puentenado: ${streamUrl}`);

      const baseUrlOnly = urlObj.origin + urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf('/') + 1);

      const lines = content.split(/\r?\n/);
      const rewrittenLines = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed === '') return line;
        
        if (trimmed.startsWith('#')) {
          // Reemplazar URIs en etiquetas (EPG, Subtítulos, etc)
          return trimmed.replace(/URI="([^"]+)"/g, (match, uri) => {
            let fullUri = uri;
            if (!uri.startsWith('http')) {
              fullUri = uri.startsWith('/') ? urlObj.origin + uri : baseUrlOnly + uri;
            }
            return `URI="${proxyBase}${encodeURIComponent(fullUri)}"`;
          });
        }
        
        // Segmentos o Playlists hijas
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
      // MODO VOD o Segmentos HLS (.ts, .mp4, .mkv)
      const segUrlObj = new URL(streamUrl);
      const response = await axios({
        method: 'get',
        url: streamUrl,
        responseType: 'stream',
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Referer': segUrlObj.origin + '/',
          'Origin': segUrlObj.origin,
          'Range': req.headers.range || 'bytes=0-'
        }
      });

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
  const { pinCode, deviceId } = req.body;

  if (pinCode && typeof pinCode === 'string') {
    const cleanedCode = pinCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    if (cleanedCode.length === 12) {
      const codeRecord = await Code.findOne({ pin: cleanedCode });

      if (codeRecord) {
        if (codeRecord.status === 'used') {
          return res.status(400).json({ success: false, message: 'Este Pin ya ha sido utilizado.' });
        }

        // 1. Quemar el pin en base de datos
        codeRecord.status = 'used';
        codeRecord.usedAt = new Date();
        await codeRecord.save();
        
        console.log(`[PIN VERIFIED] Código de Activación Quemado: ${cleanedCode}`);
        
        // 2. Vincular con el dispositivo si se proporciona deviceId
        let expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        if (deviceId) {
          try {
            const device = await Device.findOne({ deviceId });
            if (device) {
              device.status = 'active';
              device.activatedByPin = cleanedCode;
              device.expiresAt = expirationDate;
              await device.save();
              console.log(`[DEVICE ACTIVATED] Dispositivo ${deviceId} ahora es PREMIUM hasta ${expirationDate.toISOString()}`);
            }
          } catch (e) {
            console.error("Error al actualizar dispositivo tras pago:", e);
          }
        }

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

app.post('/api/admin/devices', async (req, res) => {
  const { password } = req.body;
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Acceso Denegado' });
  
  const devices = await Device.find().sort({ lastConnected: -1 });
  res.json(devices);
});

app.post('/api/admin/devices/update-status', async (req, res) => {
  const { password, deviceId, status, expiresAt, name } = req.body;
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Acceso Denegado' });
  
  try {
    const device = await Device.findOne({ deviceId });
    if (device) {
      if (status) device.status = status;
      if (name !== undefined) device.name = name;
      
      // Si se envía una fecha específica, la usamos
      if (expiresAt) {
        device.expiresAt = new Date(expiresAt);
      } else if (status === 'active' && (!device.expiresAt || device.expiresAt < new Date())) {
        // Lógica por defecto de +1 año si no hay fecha manual y se activa
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        device.expiresAt = expires;
      }
      
      await device.save();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Update failed' });
  }
});

app.post('/api/admin/codes/clear-used', async (req, res) => {
  const { password } = req.body;
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Acceso Denegado' });

  try {
    await Code.deleteMany({ status: 'used' });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Reset failed' });
  }
});

app.post('/api/admin/codes/delete', async (req, res) => {
  const { password, pin } = req.body;
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Acceso Denegado' });

  try {
    await Code.findOneAndDelete({ pin });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.post('/api/admin/devices/delete', async (req, res) => {
  const { password, deviceId } = req.body;
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Acceso Denegado' });

  try {
    await Device.findOneAndDelete({ deviceId });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.post('/api/admin/stats', async (req, res) => {
  const { password } = req.body;
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Acceso Denegado' });

  try {
    const totalDevices = await Device.countDocuments();
    const trialDevices = await Device.countDocuments({ status: 'trial' });
    const activeDevices = await Device.countDocuments({ status: 'active' });
    const blockedDevices = await Device.countDocuments({ status: 'blocked' });

    const totalCodes = await Code.countDocuments();
    const availableCodes = await Code.countDocuments({ status: 'available' });
    const usedCodes = await Code.countDocuments({ status: 'used' });

    // Cargar extras manuales
    const extraClients = await Config.findOne({ key: 'extra_clients' });
    const extraSold = await Config.findOne({ key: 'extra_sold' });
    const bonusClients = extraClients ? parseInt(extraClients.value) : 0;
    const bonusSold = extraSold ? parseInt(extraSold.value) : 0;

    res.json({
      devices: { 
        total: bonusSold, 
        trial: trialDevices, 
        active: activeDevices, 
        blocked: blockedDevices 
      },
      codes: { 
        total: totalCodes, 
        available: availableCodes, 
        used: bonusClients 
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Stats failed' });
  }
});

app.post('/api/admin/stats/increment', async (req, res) => {
  const { password, type } = req.body; // 'clients' o 'sold'
  if (!(await checkAdminPassword(password))) return res.status(403).json({ error: 'Acceso Denegado' });

  try {
    const key = type === 'clients' ? 'extra_clients' : 'extra_sold';
    const config = await Config.findOne({ key });
    const currentVal = config ? parseInt(config.value) : 0;
    await Config.findOneAndUpdate({ key }, { value: (currentVal + 1).toString() }, { upsert: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Increment failed' });
  }
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

