/* ================================================================
   Agenda Corporativa PWA — app.js
   Backend: GitHub REST API v3  |  Storage: agenda.csv (base64)
   ================================================================ */

'use strict';

// ── Lucide icons subset (inline so no extra request needed) ─────
const Icon = {
  render(name, size = 16, cls = '') {
    return `<svg class="${cls}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${Icon._paths[name] || ''}</svg>`;
  },
  _paths: {
    plus:         '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    settings:     '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    calendar:     '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    clock:        '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    check:        '<polyline points="20 6 9 17 4 12"/>',
    'check-circle':'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    x:            '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    trash:        '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>',
    bell:         '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    'bell-off':   '<path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M18.63 13A17.89 17.89 0 0 1 18 8"/><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/><path d="M18 8a6 6 0 0 0-9.33-5"/><line x1="1" y1="1" x2="23" y2="23"/>',
    mail:         '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    'mail-off':   '<path d="M9.18 8.18A2 2 0 0 1 20 6v12c0 .91-.49 1.71-1.22 2.15"/><path d="M13.49 13.49 4 20H4a2 2 0 0 1-2-2V6c0-.91.49-1.71 1.22-2.15"/><path d="M1 1l22 22"/>',
    edit:         '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    save:         '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    refresh:      '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    'sticky-note':'<path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"/><polyline points="15 3 15 9 21 9"/>',
    'alert-circle':'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    loader:       '<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',
    key:          '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
    inbox:        '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    tag:          '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    'eye-off':    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
    eye:          '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  }
};

// ── Config ───────────────────────────────────────────────────────
const CONFIG_KEY = 'agendaCorp_config';
const NOTES_KEY  = 'agendaCorp_quickNotes';
const API_BASE   = 'https://api.github.com';

function loadConfig() {
  try { return JSON.parse(localStorage.getItem(CONFIG_KEY)) || {}; }
  catch { return {}; }
}

function saveConfig(cfg) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
}

// ── CSV Parser ───────────────────────────────────────────────────
const CSV_HEADER = 'id,tipo,titulo,fecha,hora_inicio,hora_fin,prioridad,estado,notas,push_activo,email_activo';

function csvParse(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const row = {};
    const tokens = splitCsvLine(lines[i]);
    headers.forEach((h, idx) => {
      row[h] = (tokens[idx] || '').trim().replace(/^"|"$/g, '');
    });
    if (row.id) rows.push(row);
  }
  return rows;
}

function splitCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function csvStringify(rows) {
  const lines = [CSV_HEADER];
  for (const row of rows) {
    const notas = (row.notas || '').replace(/"/g, '""');
    const titulo = (row.titulo || '').replace(/"/g, '""');
    lines.push([
      row.id          || '',
      row.tipo        || '',
      `"${titulo}"`,
      row.fecha       || '',
      row.hora_inicio || '',
      row.hora_fin    || '',
      row.prioridad   || '',
      row.estado      || '',
      `"${notas}"`,
      row.push_activo || 'false',
      row.email_activo|| 'false',
    ].join(','));
  }
  return lines.join('\n') + '\n';
}

// ── GitHub API ───────────────────────────────────────────────────
async function ghRequest(method, path, body = null, cfg = loadConfig()) {
  if (!cfg.token) throw new Error('Token no configurado');
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${cfg.token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  };
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

async function fetchCsv() {
  const cfg = loadConfig();
  const path = `/repos/${cfg.owner}/${cfg.repo}/contents/${cfg.csvPath || 'agenda.csv'}`;
  const data = await ghRequest('GET', path);
  const binary = atob(data.content.replace(/\n/g, ''));
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const text = new TextDecoder('utf-8').decode(bytes);
  return { rows: csvParse(text), sha: data.sha };
}

async function pushCsv(rows, sha) {
  const cfg = loadConfig();
  const path = `/repos/${cfg.owner}/${cfg.repo}/contents/${cfg.csvPath || 'agenda.csv'}`;
  const content = btoa(unescape(encodeURIComponent(csvStringify(rows))));
  await ghRequest('PUT', path, {
    message: `chore: agenda update ${new Date().toISOString()}`,
    content,
    sha,
  });
}

// ── State ────────────────────────────────────────────────────────
let STATE = {
  rows: [],
  sha: null,
  loading: false,
  syncing: false,
  lastSync: null,
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ── Toast ────────────────────────────────────────────────────────
function toast(msg, type = 'info', duration = 3500) {
  const icons = { success: 'check-circle', error: 'alert-circle', info: 'bell' };
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = Icon.render(icons[type] || 'bell', 16) + `<span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), duration);
}

// ── Auto end-of-day migration ────────────────────────────────────
function migrateOverdue(rows) {
  const td = today();
  let changed = false;
  rows.forEach(r => {
    if (r.tipo === 'evento' && r.fecha < td && r.estado === 'pendiente') {
      r.tipo        = 'tarea';
      r.hora_inicio = '';
      r.hora_fin    = '';
      r.fecha       = td;
      changed       = true;
    }
  });
  return changed;
}

// ── Render helpers ───────────────────────────────────────────────
function renderPriorityBadge(p) {
  const label = { alta: 'Alta', media: 'Media', baja: 'Baja' }[p] || p;
  return `<span class="badge-${p} text-xs px-2 py-0.5 rounded-full font-semibold">${label}</span>`;
}

function renderAlertIcons(row) {
  // Puntos de colores compactos — no ocupan espacio en la fila del título
  const dots = [];
  if (row.push_activo  === 'true') dots.push('<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#f59e0b;flex-shrink:0;" title="Push activo"></span>');
  if (row.email_activo === 'true') dots.push('<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#4ade80;flex-shrink:0;" title="Email activo"></span>');
  return dots.length
    ? `<span style="display:inline-flex;gap:3px;align-items:center;margin-left:.25rem;">${dots.join('')}</span>`
    : '';
}

// ── Timeline (Today's events) ────────────────────────────────────
function renderTimeline() {
  const td = today();
  const events = STATE.rows
    .filter(r => r.tipo === 'evento' && r.fecha === td)
    .sort((a, b) => (a.hora_inicio || '').localeCompare(b.hora_inicio || ''));

  const container = document.getElementById('timeline-list');
  if (!events.length) {
    container.innerHTML = `<div class="empty-state">
      ${Icon.render('calendar', 40)}
      <p class="text-sm font-medium mt-1">Sin eventos hoy</p>
      <p class="text-xs mt-0.5">Crea uno con el botón +</p>
    </div>`;
    return;
  }

  container.innerHTML = events.map((ev, i) => `
    <div class="item-row relative" data-id="${ev.id}" onclick="openEditModal('${ev.id}')">
      ${i < events.length - 1 ? '<div class="timeline-line"></div>' : ''}
      <div style="flex-shrink:0;margin-top:.125rem;">
        <div style="width:32px;height:32px;border-radius:50%;background:#071a08;border:1px solid #1b4d1e;display:flex;align-items:center;justify-content:center;">
          ${Icon.render('clock', 13, 'text-indigo-400')}
        </div>
      </div>
      <div class="item-body">
        <div class="item-title-row">
          <p class="item-title">${escHtml(ev.titulo)}${renderAlertIcons(ev)}</p>
          <div class="item-actions">
            <button onclick="event.stopPropagation(); deleteRow('${ev.id}')" class="delete-btn">
              ${Icon.render('trash', 14)}
            </button>
          </div>
        </div>
        ${ev.hora_inicio ? `<span class="time-pill">${ev.hora_inicio}${ev.hora_fin ? ' → ' + ev.hora_fin : ''}</span>` : ''}
        ${ev.notas ? `<p style="font-size:.72rem;color:#888;margin-top:.25rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${escHtml(ev.notas)}</p>` : ''}
        <div style="margin-top:.375rem;">${renderPriorityBadge(ev.prioridad)}</div>
      </div>
    </div>
  `).join('');
}

// ── Pending inbox ────────────────────────────────────────────────
function renderInbox() {
  const order = { alta: 0, media: 1, baja: 2 };
  const tasks = STATE.rows
    .filter(r => r.tipo === 'tarea')
    .sort((a, b) => (order[a.prioridad] ?? 3) - (order[b.prioridad] ?? 3));

  const pending   = tasks.filter(t => t.estado !== 'completada');
  const completed = tasks.filter(t => t.estado === 'completada');

  const container = document.getElementById('inbox-list');
  if (!tasks.length) {
    container.innerHTML = `<div class="empty-state">
      ${Icon.render('inbox', 40)}
      <p class="text-sm font-medium mt-1">Bandeja vacía</p>
      <p class="text-xs mt-0.5">Añade tareas pendientes</p>
    </div>`;
    return;
  }

  const renderTask = (t) => `
    <div class="item-row priority-${t.prioridad} ${t.estado === 'completada' ? 'task-completed' : ''}"
         data-id="${t.id}" onclick="openEditModal('${t.id}')">
      <input type="checkbox" class="custom-checkbox" style="margin-top:.125rem;flex-shrink:0;"
             ${t.estado === 'completada' ? 'checked' : ''}
             onclick="event.stopPropagation()"
             onchange="toggleComplete('${t.id}', this.checked)">
      <div class="item-body">
        <div class="item-title-row">
          <p class="item-title ${t.estado === 'completada' ? 'task-completed' : ''}">${escHtml(t.titulo)}${renderAlertIcons(t)}</p>
          <div class="item-actions">
            <button onclick="event.stopPropagation(); deleteRow('${t.id}')" class="delete-btn">
              ${Icon.render('trash', 14)}
            </button>
          </div>
        </div>
        ${t.fecha && t.fecha !== today() ? `<p style="font-size:.7rem;color:#666;margin-top:.2rem;">${Icon.render('calendar', 10, 'inline-block')} ${t.fecha}</p>` : ''}
        ${t.notas ? `<p style="font-size:.72rem;color:#888;margin-top:.2rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${escHtml(t.notas)}</p>` : ''}
        <div style="margin-top:.3rem;">${renderPriorityBadge(t.prioridad)}</div>
      </div>
    </div>
  `;

  container.innerHTML = pending.map(renderTask).join('') +
    (completed.length ? `
      <div style="margin-top:.75rem;padding-top:.75rem;border-top:1px solid var(--border);">
        <p style="font-size:.65rem;color:#444;margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.08em;">Completadas (${completed.length})</p>
        ${completed.map(renderTask).join('')}
      </div>` : '');
}

// ── Stats bar ────────────────────────────────────────────────────
function renderStats() {
  const td = today();
  const eventsToday  = STATE.rows.filter(r => r.tipo === 'evento' && r.fecha === td).length;
  const pendingTasks = STATE.rows.filter(r => r.tipo === 'tarea' && r.estado === 'pendiente').length;
  const highPriority = STATE.rows.filter(r => r.prioridad === 'alta' && r.estado === 'pendiente').length;

  document.getElementById('stat-events').textContent  = eventsToday;
  document.getElementById('stat-pending').textContent = pendingTasks;
  document.getElementById('stat-high').textContent    = highPriority;
}

// ── Full render ──────────────────────────────────────────────────
function renderAll() {
  renderTimeline();
  renderInbox();
  renderStats();
  updateSyncStatus();
}

function updateSyncStatus() {
  const cfg = loadConfig();
  const dot  = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  const syncInfo = document.getElementById('sync-info');

  if (!cfg.token || !cfg.owner || !cfg.repo) {
    dot.className  = 'status-dot disconnected';
    text.textContent = 'Sin configurar';
    if (syncInfo) syncInfo.textContent = '';
    return;
  }
  dot.className  = 'status-dot';
  text.textContent = STATE.lastSync
    ? `${cfg.owner}/${cfg.repo}`
    : 'Conectado';
  if (syncInfo && STATE.lastSync) {
    syncInfo.textContent = `Sync ${STATE.lastSync.toLocaleTimeString()}`;
  }
}

// ── Data operations ──────────────────────────────────────────────
async function syncData() {
  if (STATE.syncing) return;
  STATE.syncing = true;
  setSyncBtn(true);
  try {
    const { rows, sha } = await fetchCsv();
    const changed = migrateOverdue(rows);
    STATE.rows  = rows;
    STATE.sha   = sha;
    STATE.lastSync = new Date();
    if (changed) {
      await pushCsv(STATE.rows, STATE.sha);
      const updated = await fetchCsv();
      STATE.rows = updated.rows;
      STATE.sha  = updated.sha;
      toast('Eventos vencidos movidos a tareas', 'info');
    }
    renderAll();
    scheduleNotifications(STATE.rows);
    toast('Sincronizado con GitHub', 'success', 2500);
  } catch (e) {
    toast(`Error: ${e.message}`, 'error', 5000);
  } finally {
    STATE.syncing = false;
    setSyncBtn(false);
  }
}

function setSyncBtn(loading) {
  const btn = document.getElementById('btn-sync');
  if (!btn) return;
  if (loading) {
    btn.innerHTML = `<div class="spinner"></div>`;
    btn.disabled = true;
  } else {
    btn.innerHTML = Icon.render('refresh', 15);
    btn.disabled = false;
  }
}

async function saveRows() {
  if (!STATE.sha) {
    toast('Primero sincroniza con GitHub', 'error');
    return false;
  }
  STATE.syncing = true;
  try {
    await pushCsv(STATE.rows, STATE.sha);
    const updated = await fetchCsv();
    STATE.rows     = updated.rows;
    STATE.sha      = updated.sha;
    STATE.lastSync = new Date();
    renderAll();
    return true;
  } catch (e) {
    toast(`Error al guardar: ${e.message}`, 'error', 5000);
    return false;
  } finally {
    STATE.syncing = false;
  }
}

// ── Toggle complete ──────────────────────────────────────────────
async function toggleComplete(id, checked) {
  const row = STATE.rows.find(r => r.id === id);
  if (!row) return;
  row.estado = checked ? 'completada' : 'pendiente';
  renderAll();
  const ok = await saveRows();
  if (ok) toast(checked ? 'Tarea completada' : 'Tarea reabierta', 'success', 2000);
}

// ── Delete ───────────────────────────────────────────────────────
async function deleteRow(id) {
  if (!confirm('¿Eliminar este elemento?')) return;
  STATE.rows = STATE.rows.filter(r => r.id !== id);
  renderAll();
  await saveRows();
  toast('Eliminado', 'info', 2000);
}

// ── New / Edit Modal ─────────────────────────────────────────────
let editingId = null;

function openNewModal(defaultType = 'tarea') {
  editingId = null;
  _currentTipo = defaultType;
  renderFormModal({
    tipo: defaultType, prioridad: 'media', estado: 'pendiente',
    fecha: today(), push_activo: 'false', email_activo: 'false',
  });
}

function openEditModal(id) {
  editingId = id;
  const row = STATE.rows.find(r => r.id === id);
  if (!row) return;
  _currentTipo = row.tipo || 'tarea';
  renderFormModal(row);
}

function renderFormModal(data) {
  const isEdit = !!data.id;
  const modal = document.getElementById('modal-form');
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeFormModal(event)">
      <div class="modal-box" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-base font-bold" style="color:#fff;">
            ${isEdit ? 'Editar' : 'Nueva'} ${_currentTipo === 'evento' ? 'Evento' : 'Tarea'}
          </h2>
          <button onclick="closeFormModal()" style="color:#666;" class="hover:text-white transition-colors">
            ${Icon.render('x', 20)}
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="form-label">Tipo</label>
            <div class="flex gap-2">
              <button id="btn-tipo-tarea" onclick="setTipo('tarea')"
                class="tipo-btn ${_currentTipo === 'tarea' ? 'active' : ''}">
                ${Icon.render('inbox', 14, 'inline mr-1')} Tarea
              </button>
              <button id="btn-tipo-evento" onclick="setTipo('evento')"
                class="tipo-btn ${_currentTipo === 'evento' ? 'active' : ''}">
                ${Icon.render('calendar', 14, 'inline mr-1')} Evento
              </button>
            </div>
          </div>

          <div>
            <label class="form-label">Título *</label>
            <input id="f-titulo" class="form-input" value="${escHtml(data.titulo || '')}" placeholder="Nombre del evento o tarea">
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="form-label">Fecha *</label>
              <input id="f-fecha" type="date" class="form-input" value="${data.fecha || today()}">
            </div>
            <div>
              <label class="form-label">Inicio</label>
              <input id="f-hora-inicio" type="time" class="form-input" value="${data.hora_inicio || ''}">
            </div>
            <div>
              <label class="form-label">Fin</label>
              <input id="f-hora-fin" type="time" class="form-input" value="${data.hora_fin || ''}">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="form-label">Prioridad</label>
              <select id="f-prioridad" class="form-input">
                ${['alta','media','baja'].map(p =>
                  `<option value="${p}" ${data.prioridad===p?'selected':''}>${p.charAt(0).toUpperCase()+p.slice(1)}</option>`
                ).join('')}
              </select>
            </div>
            <div>
              <label class="form-label">Estado</label>
              <select id="f-estado" class="form-input">
                <option value="pendiente"  ${data.estado==='pendiente' ?'selected':''}>Pendiente</option>
                <option value="completada" ${data.estado==='completada'?'selected':''}>Completada</option>
              </select>
            </div>
          </div>

          <div>
            <label class="form-label">Notas</label>
            <textarea id="f-notas" class="posit-area" rows="3" placeholder="Notas o descripción...">${escHtml(data.notas || '')}</textarea>
          </div>

          <div class="flex items-center justify-between py-3" style="border-top:1px solid #1f1f1f;border-bottom:1px solid #1f1f1f;">
            <span class="text-sm" style="color:#888;">Alertas</span>
            <div class="flex gap-5">
              <label class="toggle-wrap cursor-pointer">
                ${Icon.render('bell', 14, 'text-amber-400')}
                <input type="checkbox" id="f-push" class="toggle" ${data.push_activo==='true'?'checked':''}>
                <span class="text-xs" style="color:#888;">Push</span>
              </label>
              <label class="toggle-wrap cursor-pointer">
                ${Icon.render('mail', 14, 'text-indigo-400')}
                <input type="checkbox" id="f-email" class="toggle" ${data.email_activo==='true'?'checked':''}>
                <span class="text-xs" style="color:#888;">Email</span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-5">
          <button onclick="closeFormModal()" class="btn-ghost flex-1">Cancelar</button>
          <button onclick="submitForm()" class="btn-primary flex-1">
            ${Icon.render('save', 15)} ${isEdit ? 'Guardar cambios' : 'Crear'}
          </button>
        </div>
      </div>
    </div>`;
  modal.style.display = 'flex';
  document.getElementById('f-titulo').focus();
}

let _currentTipo = 'tarea';
function setTipo(tipo) {
  _currentTipo = tipo;
  const ta = document.getElementById('btn-tipo-tarea');
  const te = document.getElementById('btn-tipo-evento');
  if (!ta || !te) return;

  const activeClasses  = ['bg-indigo-700', 'border-indigo-500', 'text-white'];
  const passiveClasses = ['bg-transparent', 'border-slate-700', 'text-slate-400'];

  const activate = (el) => {
    el.classList.remove(...passiveClasses);
    el.classList.add(...activeClasses);
  };
  const deactivate = (el) => {
    el.classList.remove(...activeClasses);
    el.classList.add(...passiveClasses);
  };

  if (tipo === 'tarea') { activate(ta); deactivate(te); }
  else                  { activate(te); deactivate(ta); }
}

function closeFormModal(evt) {
  if (evt && evt.target !== evt.currentTarget) return;
  const modal = document.getElementById('modal-form');
  modal.style.display = 'none';
  modal.innerHTML = '';
}

async function submitForm() {
  const titulo = document.getElementById('f-titulo').value.trim();
  if (!titulo) { toast('El título es obligatorio', 'error'); return; }

  const row = {
    id:          editingId || uid(),
    tipo:        _currentTipo,
    titulo,
    fecha:       document.getElementById('f-fecha').value || today(),
    hora_inicio: document.getElementById('f-hora-inicio')?.value || '',
    hora_fin:    document.getElementById('f-hora-fin')?.value || '',
    prioridad:   document.getElementById('f-prioridad').value,
    estado:      document.getElementById('f-estado').value,
    notas:       document.getElementById('f-notas').value.trim(),
    push_activo: document.getElementById('f-push').checked ? 'true' : 'false',
    email_activo:document.getElementById('f-email').checked ? 'true' : 'false',
  };

  if (editingId) {
    const idx = STATE.rows.findIndex(r => r.id === editingId);
    if (idx !== -1) STATE.rows[idx] = row;
  } else {
    STATE.rows.push(row);
  }

  closeFormModal();
  renderAll();

  const ok = await saveRows();
  if (ok) toast(editingId ? 'Elemento actualizado' : 'Creado correctamente', 'success');
}

// ── Settings Modal ───────────────────────────────────────────────
function openSettings() {
  const cfg = loadConfig();
  const modal = document.getElementById('modal-settings');
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeSettings(event)">
      <div class="modal-box" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-base font-bold flex items-center gap-2" style="color:#fff;">
            ${Icon.render('settings', 18, 'text-indigo-400')} Configuración GitHub
          </h2>
          <button onclick="closeSettings()" style="color:#666;" class="hover:text-white transition-colors">
            ${Icon.render('x', 20)}
          </button>
        </div>

        <div class="warning-box mb-5">
          ${Icon.render('alert-circle', 14, 'text-amber-400 flex-shrink-0 mt-0.5')}
          <span>Tu Token de Acceso Personal (PAT) se almacena <strong>únicamente en el localStorage</strong> de este navegador y nunca se expone en el código fuente.</span>
        </div>

        <div class="space-y-4">
          <div>
            <label class="form-label">Usuario u Organización GitHub *</label>
            <input id="cfg-owner" class="form-input" value="${escHtml(cfg.owner||'')}" placeholder="ej: mi-empresa">
          </div>
          <div>
            <label class="form-label">Nombre del Repositorio *</label>
            <input id="cfg-repo" class="form-input" value="${escHtml(cfg.repo||'')}" placeholder="ej: agenda-corporativa">
          </div>
          <div>
            <label class="form-label">Ruta del archivo CSV</label>
            <input id="cfg-csv" class="form-input" value="${escHtml(cfg.csvPath||'agenda.csv')}" placeholder="agenda.csv">
          </div>
          <div>
            <label class="form-label">Personal Access Token (PAT) *</label>
            <div class="relative">
              <input id="cfg-token" type="password" class="form-input pr-10"
                     value="${cfg.token ? '••••••••••••••••••••' : ''}"
                     placeholder="ghp_xxxxxxxxxxxx..."
                     autocomplete="off">
              <button onclick="toggleTokenVisibility()"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors"
                style="color:#666;">
                ${Icon.render('eye', 15)}
              </button>
            </div>
            <p class="text-xs mt-1" style="color:#666;">Scopes requeridos: <code style="color:#4ade80;">repo</code> o <code style="color:#4ade80;">contents:write</code></p>
          </div>
        </div>

        <!-- ── Notificaciones ──────────────────────────── -->
        <div class="mt-5 pt-5" style="border-top:1px solid #1f1f1f;">
          <p class="form-label mb-3 flex items-center gap-2">
            ${Icon.render('bell', 12, 'inline')} Push &amp; Email
          </p>

          <!-- Permiso push -->
          <div class="flex items-center justify-between mb-4 p-3 rounded-lg" style="background:#071a08;border:1px solid #1b4d1e;">
            <div>
              <p class="text-sm font-medium" style="color:#a5d6a7;">Notificaciones Push</p>
              <p class="text-xs mt-0.5" style="color:#666;" id="notif-perm-label">
                ${Notification && Notification.permission === 'granted' ? '✅ Permiso concedido' :
                  Notification && Notification.permission === 'denied'  ? '❌ Bloqueado en el navegador' :
                  '⏳ Sin permiso'}
              </p>
            </div>
            <button onclick="grantNotifPermission()" class="btn-ghost text-xs !py-1.5 !px-3"
              ${Notification && Notification.permission === 'granted' ? 'disabled style="opacity:.4;"' : ''}>
              Activar
            </button>
          </div>

          <!-- Email config -->
          <div class="space-y-3">
            <div>
              <label class="form-label">Email destino (para recordatorios)</label>
              <input id="cfg-emailTo" class="form-input" type="email"
                     value="${escHtml(cfg.emailTo||'')}" placeholder="tu@email.com">
            </div>

            <details class="group">
              <summary class="text-xs cursor-pointer select-none"
                       style="color:#888; list-style:none;">
                ▶ Configuración EmailJS
                <span style="color:#555;"> (necesario para enviar emails)</span>
              </summary>
              <div class="space-y-3 mt-3 pl-2" style="border-left:2px solid #1f1f1f;">
                <div class="warning-box !text-xs">
                  ${Icon.render('alert-circle', 12, 'flex-shrink-0')}
                  <span>Crea cuenta gratuita en <strong>emailjs.com</strong> → Email Services → Email Templates. Variables requeridas en la plantilla: <code>to_email</code>, <code>subject</code>, <code>message</code>, <code>titulo</code>.</span>
                </div>
                <div>
                  <label class="form-label">Service ID</label>
                  <input id="cfg-ejsService" class="form-input" value="${escHtml(cfg.ejsService||'')}" placeholder="service_xxxxxxx">
                </div>
                <div>
                  <label class="form-label">Template ID</label>
                  <input id="cfg-ejsTemplate" class="form-input" value="${escHtml(cfg.ejsTemplate||'')}" placeholder="template_xxxxxxx">
                </div>
                <div>
                  <label class="form-label">Public Key</label>
                  <input id="cfg-ejsKey" class="form-input" value="${escHtml(cfg.ejsKey||'')}" placeholder="xxxxxxxxxxxxxxxxxxxxxx">
                </div>
              </div>
            </details>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button onclick="closeSettings()" class="btn-ghost flex-1">Cancelar</button>
          <button onclick="saveSettings()" class="btn-primary flex-1">
            ${Icon.render('save', 15)} Guardar y Sincronizar
          </button>
        </div>

        ${cfg.token ? `
        <div class="mt-3 pt-3" style="border-top:1px solid #1f1f1f;">
          <button onclick="clearConfig()" class="btn-danger w-full text-sm">
            ${Icon.render('trash', 14, 'inline mr-1')} Borrar credenciales
          </button>
        </div>` : ''}
      </div>
    </div>`;
  modal.style.display = 'flex';
}

function toggleTokenVisibility() {
  const input = document.getElementById('cfg-token');
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
}

function closeSettings(evt) {
  if (evt && evt.target !== evt.currentTarget) return;
  const modal = document.getElementById('modal-settings');
  modal.style.display = 'none';
  modal.innerHTML = '';
}

async function saveSettings() {
  const owner    = document.getElementById('cfg-owner').value.trim();
  const repo     = document.getElementById('cfg-repo').value.trim();
  const csvPath  = document.getElementById('cfg-csv').value.trim() || 'agenda.csv';
  const rawToken = document.getElementById('cfg-token').value.trim();

  if (!owner || !repo) { toast('Usuario y repositorio son obligatorios', 'error'); return; }

  const cfg = loadConfig();
  const token = rawToken && !rawToken.startsWith('•') ? rawToken : cfg.token;
  if (!token) { toast('El Token es obligatorio', 'error'); return; }

  const emailTo   = document.getElementById('cfg-emailTo')?.value.trim()    || '';
  const ejsService  = document.getElementById('cfg-ejsService')?.value.trim()  || '';
  const ejsTemplate = document.getElementById('cfg-ejsTemplate')?.value.trim() || '';
  const ejsKey      = document.getElementById('cfg-ejsKey')?.value.trim()      || '';

  saveConfig({ owner, repo, csvPath, token, emailTo, ejsService, ejsTemplate, ejsKey });

  // Inicializar EmailJS si está configurado
  if (ejsKey && typeof emailjs !== 'undefined') emailjs.init(ejsKey);

  closeSettings();
  toast('Configuración guardada', 'success', 2000);
  await syncData();
}

async function grantNotifPermission() {
  const granted = await requestNotifPermission();
  if (granted) {
    toast('Notificaciones push activadas ✅', 'success');
    document.getElementById('notif-perm-label').textContent = '✅ Permiso concedido';
    scheduleNotifications(STATE.rows);
  } else {
    toast('Permiso denegado. Actívalo desde la configuración del navegador.', 'error', 5000);
  }
}

function clearConfig() {
  if (!confirm('¿Borrar todas las credenciales del navegador?')) return;
  localStorage.removeItem(CONFIG_KEY);
  closeSettings();
  STATE = { rows: [], sha: null, loading: false, syncing: false, lastSync: null };
  renderAll();
  toast('Credenciales borradas', 'info');
}

// ── Notifications & Email ─────────────────────────────────────────
const _notifTimers = new Map();

async function requestNotifPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  return (await Notification.requestPermission()) === 'granted';
}

function scheduleNotifications(rows) {
  _notifTimers.forEach(t => clearTimeout(t));
  _notifTimers.clear();

  const td  = today();
  const now = Date.now();

  rows.forEach(row => {
    if (row.estado === 'completada') return;
    const wantsPush  = row.push_activo  === 'true';
    const wantsEmail = row.email_activo === 'true';
    if (!wantsPush && !wantsEmail) return;

    let fireAt = null;

    if (row.tipo === 'evento' && row.fecha === td && row.hora_inicio) {
      const [h, m] = row.hora_inicio.split(':').map(Number);
      fireAt = new Date().setHours(h, m, 0, 0) - 15 * 60 * 1000; // 15 min antes
    } else if (row.tipo === 'tarea' && row.fecha === td) {
      fireAt = new Date().setHours(9, 0, 0, 0); // 9:00
    }

    if (!fireAt) return;

    const delay = fireAt - now;
    const WINDOW = 10 * 60 * 1000; // si pasó hace menos de 10 min, lanzar ya

    const fire = () => {
      if (wantsPush)  fireNotif(row);
      if (wantsEmail) fireEmail(row).catch(() => {});
    };

    if (delay <= 0 && delay > -WINDOW) {
      fire();
    } else if (delay > 0) {
      _notifTimers.set(row.id, setTimeout(fire, delay));
    }
  });

  // Also delegate to SW so notifications survive tab suspension
  scheduleNotificationsToSW(rows);
}

function fireNotif(row) {
  if (Notification.permission !== 'granted') return;
  const body = [
    row.hora_inicio ? `🕐 ${row.hora_inicio}${row.hora_fin ? ' → ' + row.hora_fin : ''}` : null,
    row.notas || null,
    `Prioridad: ${row.prioridad}`,
  ].filter(Boolean).join('\n');

  try {
    new Notification(row.tipo === 'evento' ? `📅 ${row.titulo}` : `📋 ${row.titulo}`, {
      body,
      icon: './icon-192.svg',
      badge: './icon-192.svg',
      tag: row.id,
      renotify: true,
    });
  } catch(e) { console.warn('Notification error:', e); }
}

function scheduleNotificationsToSW(rows) {
  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return;
  const td  = today();
  const now = Date.now();
  rows.forEach(row => {
    if (row.estado === 'completada' || row.push_activo !== 'true') return;
    let fireAt = null;
    if (row.tipo === 'evento' && row.fecha === td && row.hora_inicio) {
      const [h, m] = row.hora_inicio.split(':').map(Number);
      fireAt = new Date().setHours(h, m, 0, 0) - 15 * 60 * 1000;
    } else if (row.tipo === 'tarea' && row.fecha === td) {
      fireAt = new Date().setHours(9, 0, 0, 0);
    }
    if (!fireAt || fireAt <= now) return;
    const title = row.tipo === 'evento' ? `📅 ${row.titulo}` : `📋 ${row.titulo}`;
    const body  = [
      row.hora_inicio ? `🕐 ${row.hora_inicio}${row.hora_fin ? ' → ' + row.hora_fin : ''}` : null,
      row.notas || null,
      `Prioridad: ${row.prioridad}`,
    ].filter(Boolean).join('\n');
    navigator.serviceWorker.controller.postMessage({ type: 'SCHEDULE_NOTIF', id: row.id, title, body, fireAt });
  });
}

async function fireEmail(row) {
  const cfg = loadConfig();
  if (!cfg.emailTo || !cfg.ejsService || !cfg.ejsTemplate || !cfg.ejsKey) return;

  if (typeof emailjs === 'undefined') {
    console.warn('EmailJS SDK no cargado');
    return;
  }

  const subject = row.tipo === 'evento'
    ? `[Agenda] Evento en 15 min: ${row.titulo}`
    : `[Agenda] Tarea pendiente: ${row.titulo}`;

  const message = [
    row.hora_inicio ? `Hora: ${row.hora_inicio}${row.hora_fin ? ' → ' + row.hora_fin : ''}` : null,
    `Prioridad: ${row.prioridad}`,
    row.notas ? `Notas: ${row.notas}` : null,
  ].filter(Boolean).join('\n');

  await emailjs.send(cfg.ejsService, cfg.ejsTemplate, {
    to_email: cfg.emailTo,
    subject,
    message,
    titulo:    row.titulo,
    tipo:      row.tipo,
    hora:      row.hora_inicio || 'Sin hora',
    prioridad: row.prioridad,
    notas:     row.notas || '',
  }, cfg.ejsKey);
}


function loadNotes() {
  document.getElementById('quick-notes').value = localStorage.getItem(NOTES_KEY) || '';
}

function saveNotes() {
  localStorage.setItem(NOTES_KEY, document.getElementById('quick-notes').value);
  toast('Nota guardada localmente', 'success', 1800);
}

// ── Utility ──────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// ── Date header ──────────────────────────────────────────────────
function renderDateHeader() {
  const now = new Date();
  const narrow = window.innerWidth < 480;
  const opts = narrow
    ? { weekday: 'short', day: 'numeric', month: 'short' }
    : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const label = now.toLocaleDateString('es-ES', opts);
  const el = document.getElementById('date-header');
  if (el) el.textContent = label.charAt(0).toUpperCase() + label.slice(1);
}

// ── Keyboard shortcuts ───────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal-form').style.display = 'none';
    document.getElementById('modal-settings').style.display = 'none';
    document.getElementById('modal-form').innerHTML = '';
    document.getElementById('modal-settings').innerHTML = '';
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    openNewModal();
  }
});

// ── Expose globals ───────────────────────────────────────────────
window.openNewModal    = openNewModal;
window.openEditModal   = openEditModal;
window.closeFormModal  = closeFormModal;
window.submitForm      = submitForm;
window.setTipo         = setTipo;
window.openSettings    = openSettings;
window.closeSettings   = closeSettings;
window.saveSettings    = saveSettings;
window.clearConfig     = clearConfig;
window.grantNotifPermission = grantNotifPermission;
window.toggleTokenVisibility = toggleTokenVisibility;
window.toggleComplete  = toggleComplete;
window.deleteRow       = deleteRow;
window.syncData        = syncData;
window.saveNotes       = saveNotes;

// ── Bootstrap ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDateHeader();
  loadNotes();

  // Initial tipo state
  _currentTipo = 'tarea';

  const cfg = loadConfig();

  // Inicializar EmailJS si está configurado
  if (cfg.ejsKey && typeof emailjs !== 'undefined') emailjs.init(cfg.ejsKey);

  // Solicitar permiso de notificaciones en segundo plano
  requestNotifPermission();

  if (cfg.token && cfg.owner && cfg.repo) {
    syncData();
  } else {
    renderAll();
    toast('Configura tus credenciales de GitHub para empezar', 'info', 5000);
  }

  // Auto-sync every 5 minutes
  setInterval(() => {
    if (loadConfig().token) syncData();
  }, 5 * 60 * 1000);

  // Quick notes auto-save with debounce
  let notesTimer;
  document.getElementById('quick-notes').addEventListener('input', () => {
    clearTimeout(notesTimer);
    notesTimer = setTimeout(() => {
      localStorage.setItem(NOTES_KEY, document.getElementById('quick-notes').value);
    }, 800);
  });
});
