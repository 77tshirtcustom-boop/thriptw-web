import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Monitor, 
  ArrowLeft, 
  PlusCircle, 
  Copy, 
  Trash2, 
  ShieldCheck, 
  RefreshCcw,
  CheckCircle,
  Lock,
  Smartphone,
  Trophy,
  ShieldAlert,
  Plus,
  Pencil
} from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('licencias'); // 'licencias' | 'dispositivos'
  const [error, setError] = useState('');
  
  // Data States
  const [codes, setCodes] = useState([]);
  const [devices, setDevices] = useState([]);
  const [stats, setStats] = useState({
    devices: { total: 0, trial: 0, active: 0, blocked: 0 },
    codes: { total: 0, available: 0, used: 0 }
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [pinToDelete, setPinToDelete] = useState(null);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [showAddPinModal, setShowAddPinModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDeviceForEdit, setSelectedDeviceForEdit] = useState(null);
  const [tempName, setTempName] = useState('');
  const [tempPin, setTempPin] = useState('');


  const isWeb = typeof window !== 'undefined' && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost';
  const isElectron = typeof window !== 'undefined' && (window.process?.type === 'renderer' || navigator.userAgent.toLowerCase().indexOf(' electron/') > -1);
  const API_BASE_URL = isWeb ? window.location.origin : (isElectron ? 'http://localhost:3001' : 'https://thriptw-web.onrender.com');

  const fetchAllData = async (pass) => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      const body = JSON.stringify({ password: pass || password });

      let codesData = null;
      let devicesData = null;

      // Fetch Codes
      const respCodes = await fetch(`${API_BASE_URL}/api/admin/codes`, { method: 'POST', headers, body });
      if (respCodes.ok) {
        codesData = await respCodes.json();
        setCodes(codesData);
        setIsAuthenticated(true);
      } else if (respCodes.status === 403) {
        setError('Contraseña incorrecta');
        return;
      }

      // Fetch Devices
      const respDevices = await fetch(`${API_BASE_URL}/api/admin/devices`, { method: 'POST', headers, body });
      if (respDevices.ok) {
        devicesData = await respDevices.json();
        setDevices(devicesData);
      }

      // Fetch Stats (Intentar backend primero)
      const respStats = await fetch(`${API_BASE_URL}/api/admin/stats`, { method: 'POST', headers, body });
      if (respStats.ok) {
        setStats(await respStats.json());
      } else {
        // Fallback: Calcular estadísticas localmente si el endpoint falla
        const codesList = codesData || codes;
        const devicesList = devicesData || devices;
        
        setStats({
          devices: {
            total: devicesList.length,
            trial: devicesList.filter(d => d.status === 'trial').length,
            active: devicesList.filter(d => d.status === 'active').length,
            blocked: devicesList.filter(d => d.status === 'blocked').length
          },
          codes: {
            total: codesList.length,
            available: codesList.filter(c => c.status === 'available').length,
            used: codesList.filter(c => c.status === 'used').length
          }
        });
      }

    } catch (err) {
      setError('Error conectando al servidor.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchAllData(password);
  };

  const handleGenerateCode = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/generate-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (resp.ok) fetchAllData();
    } catch (err) {
      alert("Error generando código");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateDeviceStatus = async (deviceId, status, expiresAt, name, pin) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/devices/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, deviceId, status, expiresAt, name, activatedByPin: pin })
      });
      if (resp.ok) fetchAllData();
    } catch (err) {
      alert("Error al actualizar dispositivo");
    }
  };

  const handleDeleteCode = (pin) => {
    setPinToDelete(pin);
  };

  const confirmDeleteCode = async () => {
    if (!pinToDelete) return;
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/codes/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, pin: pinToDelete })
      });
      if (resp.ok) fetchAllData();
    } catch (err) {
      alert("Error al eliminar código");
    } finally {
      setPinToDelete(null);
    }
  };

  const handleDeleteDevice = (deviceId) => {
    setDeviceToDelete(deviceId);
  };

  const confirmDeleteDevice = async () => {
    if (!deviceToDelete) return;
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/devices/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, deviceId: deviceToDelete })
      });
      if (resp.ok) fetchAllData();
    } catch (err) {
      alert("Error al eliminar dispositivo");
    } finally {
      setDeviceToDelete(null);
    }
  };

  const handleIncrementStat = async (type) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/stats/increment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, type })
      });
      if (resp.ok) {
        setShowAddPinModal(false);
        fetchAllData();
      }
    } catch (err) {
      alert("Error al incrementar contador");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Opcional: mostrar un pequeño toast o feedback
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-layout">
        <div className="admin-login-card">
          <img src="./Logo.png" alt="Logo" style={{ height: '60px', marginBottom: '20px', objectFit: 'contain' }} />
          <h2>THRIPTW</h2>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input 
              type="password" 
              placeholder="Contraseña de Administrador" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              autoFocus
            />
            <button type="submit" className="admin-btn-login">ENTRAR</button>
            {error && <div className="admin-error" style={{ color: '#f1c40f', marginTop: '20px', fontSize: '16px', fontWeight: '900', letterSpacing: '0.5px' }}>{error.toUpperCase()}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-layout">
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-branding">
          <img src="./Logo.png" alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          <h2>THRIPTW</h2>
        </div>
        
        <div className="admin-nav">
          <div 
            className={`admin-nav-item ${activeTab === 'licencias' ? 'active' : ''}`} 
            onClick={() => setActiveTab('licencias')}
          >
            <Key size={20} /> Licencias
          </div>
          <div 
            className={`admin-nav-item ${activeTab === 'dispositivos' ? 'active' : ''}`} 
            onClick={() => setActiveTab('dispositivos')}
          >
            <Monitor size={20} /> Dispositivos
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button className="admin-btn-logout" onClick={() => window.location.href = '/'}>
            <ArrowLeft size={16} /> Salir
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="admin-content">
        
        {activeTab === 'licencias' && (
          <>
            <div className="admin-header">
              <h1>Licencias</h1>
              <button className="admin-btn-action-red" onClick={handleGenerateCode} disabled={isGenerating}>
                {isGenerating ? 'Generando...' : 'CREAR PIN'}
              </button>
            </div>

            <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="admin-stat-card">
                <span className="stat-label">TOTAL GENERADOS</span>
                <div className="stat-value-row">
                  <span className="stat-number" style={{ color: '#f1c40f' }}>{stats?.codes?.total || 0}</span>
                  <Lock className="stat-icon" size={24} color="#f1c40f" />
                </div>
              </div>
              <div className="admin-stat-card">
                <span className="stat-label">DISPONIBLES</span>
                <div className="stat-value-row">
                  <span className="stat-number" style={{ color: '#2ecc71' }}>{stats?.codes?.available || 0}</span>
                  <CheckCircle className="stat-icon" size={24} color="#2ecc71" />
                </div>
              </div>
              <div className="admin-stat-card">
                <span className="stat-label">CLIENTES</span>
                <div className="stat-value-row">
                  <span className="stat-number" style={{ color: '#ff3131' }}>{stats?.codes?.used || 0}</span>
                  <Key className="stat-icon" size={24} color="#ff3131" />
                </div>
              </div>
              <div className="admin-stat-card">
                <span className="stat-label">VENDIDOS</span>
                <div className="stat-value-row">
                  <span className="stat-number" style={{ color: '#3498db' }}>{stats?.devices?.total || 0}</span>
                  <Smartphone className="stat-icon" size={24} color="#3498db" />
                </div>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>PIN</th>
                    <th>ESTADO ACTUAL</th>
                    <th>FECHA CREACIÓN</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c, idx) => (
                    <tr key={idx}>
                      <td className="pin-cell" onClick={() => copyToClipboard(c.pin)} style={{ cursor: 'pointer' }}>
                        {c.pin.substring(0, 4)}-{c.pin.substring(4, 8)}-{c.pin.substring(8, 12)}
                      </td>
                      <td>
                        <span className={`status-tag ${c.status}`}>
                          {c.status === 'available' ? 'LIBRE' : 'CLIENTE'}
                        </span>
                      </td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-icon-action" onClick={() => handleDeleteCode(c.pin)} style={{ color: '#ff3131' }}>
                            <Trash2 size={16} />
                          </button>
                          <button 
                            className="btn-icon-action" 
                            style={{ color: '#fff', opacity: 0.8 }}
                            onClick={() => setShowAddPinModal(true)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'dispositivos' && (
          <>
            <div className="admin-header">
              <h1>Dispositivos</h1>
              <button className="admin-btn-action-red" onClick={() => fetchAllData()}>
                <RefreshCcw size={18} style={{ marginRight: '8px' }} /> ACTUALIZAR LISTA
              </button>
            </div>

            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <span className="stat-label">TOTAL</span>
                <div className="stat-value-row">
                  <span className="stat-number">{stats?.devices?.total || 0}</span>
                  <Monitor className="stat-icon" size={24} color="#fff" />
                </div>
              </div>
              <div className="admin-stat-card">
                <span className="stat-label">EN PRUEBA</span>
                <div className="stat-value-row">
                  <span className="stat-number" style={{ color: '#3498db' }}>{stats?.devices?.trial || 0}</span>
                  <Smartphone className="stat-icon" size={24} color="#3498db" />
                </div>
              </div>
              <div className="admin-stat-card">
                <span className="stat-label">ACTIVADOS</span>
                <div className="stat-value-row">
                  <span className="stat-number" style={{ color: '#2ecc71' }}>{stats?.devices?.active || 0}</span>
                  <Trophy className="stat-icon" size={24} color="#2ecc71" />
                </div>
              </div>
              <div className="admin-stat-card">
                <span className="stat-label">BLOQUEADOS</span>
                <div className="stat-value-row">
                  <span className="stat-number" style={{ color: '#ff3131' }}>{stats?.devices?.blocked || 0}</span>
                  <ShieldAlert className="stat-icon" size={24} color="#ff3131" />
                </div>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table devices-table">
                <thead>
                  <tr>
                    <th>CLIENTE</th>
                    <th>PIN</th>
                    <th>MAC</th>
                    <th>ESTADO</th>
                    <th>EXPIRA EN</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((d, idx) => (
                    <tr key={idx}>
                      <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>{d.name || '---'}</td>
                      <td style={{ color: '#f1c40f', fontWeight: 'bold' }}>{d.activatedByPin || '---'}</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{d.deviceId}</td>
                      <td>
                        <span className={`status-tag ${(d.status || 'trial').toLowerCase()}`}>
                          {(d.status || 'TRIAL').toUpperCase()}
                        </span>
                      </td>
                      <td>{d.expiresAt ? new Date(d.expiresAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {(d.status || 'trial').toLowerCase() !== 'active' && (
                            <button 
                              className="btn-icon-action" 
                              title="Activar" 
                              onClick={() => handleUpdateDeviceStatus(d.deviceId, 'active')}
                              style={{ color: '#2ecc71' }}
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          
                          <button 
                            className="btn-icon-action" 
                            title={d.status === 'blocked' ? "Desbloquear" : "Bloquear"} 
                            onClick={() => handleUpdateDeviceStatus(d.deviceId, d.status === 'blocked' ? 'trial' : 'blocked')}
                            style={{ color: d.status === 'blocked' ? '#f1c40f' : '#ff3131' }}
                          >
                            <ShieldAlert size={16} />
                          </button>

                           <button 
                            className="btn-icon-action" 
                            title="Editar Cliente" 
                            onClick={() => {
                              setSelectedDeviceForEdit(d);
                              setTempName(d.name || '');
                              setTempPin(d.activatedByPin || '');
                              setShowEditModal(true);
                            }}
                            style={{ color: '#3498db' }}
                          >
                            <Pencil size={14} />
                          </button>

                          <button 
                            className="btn-icon-action" 
                            title="Eliminar" 
                            onClick={() => handleDeleteDevice(d.deviceId)}
                            style={{ color: '#ff3131', opacity: 0.8 }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* MODAL DE CONFIRMACIÓN DE BORRADO ESTILO TV */}
      {pinToDelete && (
        <div className="admin-modal-overlay fade-in" onClick={() => setPinToDelete(null)}>
          <div className="admin-modal-card bounce-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">¿Seguro que quieres borrar este PIN?</h2>
            <div className="admin-modal-actions">
              <button 
                className="admin-btn-modal-cancel" 
                onClick={() => setPinToDelete(null)}
              >
                Cancelar
              </button>
              <button 
                className="admin-btn-modal-confirm" 
                onClick={confirmDeleteCode}
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}

      {deviceToDelete && (
        <div className="admin-modal-overlay fade-in" onClick={() => setDeviceToDelete(null)}>
          <div className="admin-modal-card bounce-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">¿Borrar dispositivo {deviceToDelete}?</h2>
            <p style={{ color: '#888', marginBottom: '30px' }}>Esta acción no se puede deshacer.</p>
            <div className="admin-modal-actions">
              <button 
                className="admin-btn-modal-cancel" 
                onClick={() => setDeviceToDelete(null)}
              >
                Cancelar
              </button>
              <button 
                className="admin-btn-modal-confirm" 
                onClick={confirmDeleteDevice}
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddPinModal && (
        <div className="admin-modal-overlay fade-in" onClick={() => setShowAddPinModal(false)}>
          <div className="admin-modal-card bounce-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">¿Quieres añadir el PIN?</h2>
            <div className="admin-modal-actions" style={{ flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
              <button 
                className="admin-btn-modal-confirm" 
                style={{ width: '100%', background: '#3498db', margin: 0 }}
                onClick={() => handleIncrementStat('clients')}
              >
                CLIENTES
              </button>
              <button 
                className="admin-btn-modal-confirm" 
                style={{ width: '100%', background: '#2ecc71', margin: 0 }}
                onClick={() => handleIncrementStat('sold')}
              >
                VENDIDOS
              </button>
              <button 
                className="admin-btn-modal-cancel" 
                style={{ width: '100%', margin: 0 }}
                onClick={() => setShowAddPinModal(false)}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedDeviceForEdit && (
        <div className="admin-modal-overlay fade-in" onClick={() => setShowEditModal(false)}>
          <div className="admin-modal-card bounce-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">Editar Cliente</h2>
            <p style={{ color: '#888', marginBottom: '20px' }}>MAC: {selectedDeviceForEdit.deviceId}</p>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '5px', textAlign: 'left' }}>NOMBRE DEL CLIENTE</label>
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="admin-input"
                style={{ width: '100%', textAlign: 'left', padding: '12px', background: '#222', border: '1px solid #444' }}
                placeholder="Ej: Juan Pérez"
                autoFocus
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '5px', textAlign: 'left' }}>CÓDIGO PIN</label>
              <input 
                type="text" 
                value={tempPin}
                onChange={(e) => setTempPin(e.target.value)}
                className="admin-input"
                style={{ width: '100%', textAlign: 'left', padding: '12px', background: '#222', border: '1px solid #444', color: '#f1c40f' }}
                placeholder="Ej: ABCD-1234-EFGH"
              />
            </div>

            <div className="admin-modal-actions">
              <button 
                className="admin-btn-modal-cancel" 
                onClick={() => setShowEditModal(false)}
              >
                CANCELAR
              </button>
              <button 
                className="admin-btn-modal-confirm" 
                onClick={() => {
                  handleUpdateDeviceStatus(selectedDeviceForEdit.deviceId, null, null, tempName, tempPin);
                  setShowEditModal(false);
                }}
              >
                GUARDAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
