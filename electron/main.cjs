const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const { fork } = require('child_process');
let serverProcess = null;

function createWindow() {
  const win = new BrowserWindow({
    title: 'THRIPTW',
    width: 1280,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, '../public/Logo.ico')
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools();
  } else {
    // Iniciar servidor backend en producción
    try {
      serverProcess = fork(path.join(__dirname, '../server/index.js'), [], {
        env: { ...process.env, PORT: 3001, NODE_ENV: 'production' }
      });
      console.log('Backend server started from Electron');
    } catch (e) {
      console.error('Failed to start backend server:', e);
    }
    
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
