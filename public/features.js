// Glia features: live trade tape, Hot right now, compute pool meter, share cards
(() => {
  const ready = f => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', f) : f();
  const wait = (test, cb, tries = 60) => { const v = test(); if (v) return cb(v); if (tries > 0) setTimeout(() => wait(test, cb, tries - 1), 150); };
  const css = `
  .gl-tape{position:relative;overflow:hidden;border-bottom:1px solid var(--line,rgba(10,10,10,.08));background:rgba(255,255,255,.6);backdrop-filter:blur(20px) saturate(180%);font-size:12px;height:30px;display:flex;align-items:center}
  .gl-tape-track{display:flex;gap:28px;white-space:nowrap;animation:gltape 60s linear infinite;padding-left:100%}
  .gl-tape:hover .gl-tape-track{animation-play-state:paused}
  .gl-tape a{color:var(--muted,#9aa);text-decoration:none;display:inline-flex;gap:6px;align-items:center}
  .gl-tape a:hover{color:var(--ink,#0a0a0a)}
  .gl-tape .b{color:#00b543;font-weight:600}.gl-tape .s{color:#e5392a;font-weight:600}
  .gl-tape .lbl{position:absolute;left:0;top:0;bottom:0;z-index:2;display:flex;align-items:center;gap:6px;padding:0 12px;background:inherit;font-weight:600;letter-spacing:.04em;font-size:11px}
  .gl-tape .dot{width:6px;height:6px;border-radius:50%;background:#00b543;box-shadow:0 0 8px #00b543;animation:glpulse 1.6s ease-in-out infinite}
  @keyframes gltape{from{transform:translateX(0)}to{transform:translateX(-100%)}}
  @keyframes glpulse{50%{opacity:.35}}
  .gl-sec{margin:2.5rem 0}
  .gl-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:1rem;gap:1rem}
  .gl-head h2{margin:0;font-family:var(--head);font-weight:600;font-size:1.6rem;letter-spacing:-.01em}
  .gl-tabs{display:flex;gap:6px}.gl-tabs button{background:transparent;border:1px solid var(--line,rgba(10,10,10,.12));color:var(--muted,#9aa);padding:5px 12px;border-radius:999px;cursor:pointer;font:inherit;font-size:12px}
  .gl-tabs button.on{color:var(--ink,#0a0a0a);border-color:var(--accent,#00b543);background:rgba(0,181,67,.1)}
  .gl-hot{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
  .gl-card{display:block;padding:14px;border-radius:14px;border:1px solid var(--line,rgba(10,10,10,.08));background:var(--card,rgba(255,255,255,.7));text-decoration:none;color:inherit;transition:transform .15s,border-color .15s}
  .gl-card:hover{transform:translateY(-2px);border-color:var(--accent,#00b543)}
  .gl-card .r{display:flex;align-items:center;gap:10px}.gl-card .rank{font-size:11px;color:var(--muted,#9aa);margin-left:auto}
  .gl-lg{position:relative;width:36px;height:36px;border-radius:50%;overflow:hidden;flex:none;display:grid;place-items:center;background:linear-gradient(135deg,#eef7f1,#cfe9d9);border:1px solid rgba(11,26,51,.08)}.gl-lg b{font-family:Outfit,system-ui;font-size:15px;color:#0f7a3a}.gl-lg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#fff}.gl-grad{color:#0f7a3a;font-weight:600}
  .gl-card .nm{font-weight:600}.gl-card .sy{font-size:12px;color:var(--muted,#9aa)}
  .gl-card dl{display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;margin:12px 0 0;font-size:12px}.gl-card dt{color:var(--muted,#9aa)}.gl-card dd{margin:0;text-align:right;font-variant-numeric:tabular-nums}
  .gl-bar{height:4px;border-radius:4px;background:rgba(10,10,10,.08);margin-top:10px;overflow:hidden}.gl-bar i{display:block;height:100%;background:var(--accent,#00b543)}
  .gl-pool{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
  .gl-stat{padding:16px;border-radius:14px;border:1px solid var(--line,rgba(10,10,10,.08));background:var(--card,rgba(255,255,255,.7))}
  .gl-stat .k{font-size:12px;color:var(--muted,#9aa)}.gl-stat .v{font-family:var(--head);font-size:1.8rem;font-weight:600;margin-top:4px;font-variant-numeric:tabular-nums}
  .gl-meter{grid-column:1/-1;height:10px;border-radius:10px;background:rgba(10,10,10,.06);overflow:hidden}.gl-meter i{display:block;height:100%;background:linear-gradient(90deg,#00b543,#3ddc7a);transition:width 1s}
  .gl-share-btn{display:inline-flex;align-items:center;gap:6px;cursor:pointer;border:1px solid var(--line,rgba(10,10,10,.14));background:rgba(255,255,255,.04);color:inherit;font:inherit;font-size:13px;padding:7px 14px;border-radius:999px}
  .gl-share-btn:hover{border-color:var(--accent,#00b543)}
  .gl-modal{position:fixed;inset:0;z-index:9999;background:rgba(10,10,10,.35);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px}
  .gl-modal .box{max-width:680px;width:100%;background:rgba(255,255,255,.92);backdrop-filter:blur(30px);box-shadow:var(--glass-shadow);border-radius:24px;padding:16px}
  .gl-modal canvas{width:100%;height:auto;border-radius:10px;display:block}
  .gl-modal .acts{display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  let ethUsd = 0;
  const G = () => window.GLIA;
  const stats = () => G().api('stats').then(s => { ethUsd = s.ethUsd || 0; return s; });
  const usdOf = t => t.marketCapUsd != null ? t.marketCapUsd : (t.marketCapEth || 0) * ethUsd;
  const gradOf = t => { if (t.graduation != null) return t.graduation; const c = t.curveState || {}; const r = Number(c.ethReserve || 0), g = Number(c.graduationThreshold || 0); return g ? Math.min(1, r / g) : 0; };
  const shortModel = m => m ? String(m).split('/').pop() : 'Glia';

  // 1. live trade tape under the nav, every page
  function tape() {
    const nav = document.getElementById('nav'); if (!nav || document.querySelector('.gl-tape')) return;
    const bar = document.createElement('div'); bar.className = 'gl-tape';
    bar.innerHTML = '<span class="lbl"><span class="dot"></span>LIVE</span><div class="gl-tape-track"></div>';
    nav.insertAdjacentElement('afterend', bar);
    const load = () => G().api('live?limit=24').then(({ events }) => {
      if (!events || !events.length) { bar.querySelector('.gl-tape-track').innerHTML = '<span style="color:var(--muted)">Trades stream here the moment they hit the chain.</span>'; return; }
      const { esc, short, ago, href } = G();
      bar.querySelector('.gl-tape-track').innerHTML = events.map(e => {
        const eth = Number(e.ethWei || 0) / 1e18, u = eth * ethUsd;
        const side = e.type === 'sell' ? '<span class="s">SELL</span>' : e.type === 'launch' ? '<span class="b">LAUNCH</span>' : '<span class="b">BUY</span>';
        const amt = e.type === 'launch' ? '' : (u ? G().fmtUsd(u) : eth.toFixed(4) + ' ETH');
        return `<a href="${href('/token/' + e.token)}">${side}<b>${esc(e.symbol || '?')}</b>${amt}<span>${short(e.by || '')}</span><span>${ago(e.at)}</span></a>`;
      }).join('');
    }).catch(() => {});
    load(); setInterval(load, 30000);
  }

  // 2. Hot right now + compute pool, home page only
  function home() {
    const path = location.pathname.replace(/\/+$/, '');
    if (path !== '' && path !== '/index.html' && !/\/$/.test(location.pathname)) return;
    if (document.getElementById('gl-hot')) return;
    const main = document.querySelector('main .wrap'); if (!main) return;
    const first = main.firstElementChild;
    const sec = document.createElement('section'); sec.className = 'gl-sec'; sec.id = 'gl-hot';
    sec.innerHTML = `<div class="gl-head"><h2>Hot right now</h2><div class="gl-tabs"><button data-s="volume" class="on">Volume</button><button data-s="graduation">Near graduation</button><button data-s="new">New</button></div></div><div class="gl-hot"></div>
    <div class="gl-head" style="margin-top:2.5rem"><h2>Compute pool</h2><a href="${G().href('/docs#pool')}" class="faint" style="font-size:13px">How it works →</a></div>
    <div class="gl-pool" id="gl-pool"><div class="gl-stat"><div class="k">Raised for compute</div><div class="v" data-k="raised">...</div></div><div class="gl-stat"><div class="k">Available now</div><div class="v" data-k="avail">...</div></div><div class="gl-stat"><div class="k">Coins launched</div><div class="v" data-k="launches">...</div></div><div class="gl-stat"><div class="k">Model replies served</div><div class="v" data-k="messages">...</div></div><div class="gl-meter"><i style="width:0"></i></div></div>`;
    if (first && first.nextElementSibling) first.insertAdjacentElement('afterend', sec); else main.appendChild(sec);
    const grid = sec.querySelector('.gl-hot');
    const render = sort => G().api('tokens?sort=' + sort + '&limit=8').then(({ tokens }) => {
      const { esc, href, fmtUsd } = G();
      if (!tokens || !tokens.length) { grid.innerHTML = `<div class="empty">No coins yet. <a href="${href('/launch')}">Launch the first one →</a></div>`; return; }
      grid.innerHTML = tokens.slice(0, 8).map((t, i) => {
        const grad = t.status === 'Graduated', g = grad ? 1 : gradOf(t), mc = usdOf(t);
        const ini = esc(((t.symbol || t.name || '?')[0] || '?').toUpperCase());
        const logo = `<span class="gl-lg"><img src="${esc(href('/api/token/' + t.token + '/logo'))}" alt="" loading="lazy" onerror="this.remove()"><b>${ini}</b></span>`;
        return `<a class="gl-card" href="${href('/token/' + t.token)}"><div class="r">${logo}<div><div class="nm">${esc(t.name || '?')}</div><div class="sy">${esc(t.symbol || '')} · ${esc(shortModel(t.model || t.modelName))}</div></div><span class="rank">#${i + 1}</span></div>
        <dl><dt>Market cap</dt><dd>${mc ? fmtUsd(mc) : (grad ? 'On DEX' : 'New')}</dd><dt>24h volume</dt><dd>${fmtUsd(t.volume24hUsd || 0)}</dd><dt>Curve</dt><dd>${grad ? '<span class="gl-grad">Graduated</span>' : Math.round(g * 100) + '%'}</dd><dt>Trades 24h</dt><dd>${t.trades24h || 0}</dd></dl><div class="gl-bar"><i style="width:${Math.round(g * 100)}%"></i></div></a>`;
      }).join('');
    }).catch(() => { grid.innerHTML = ''; });
    sec.querySelectorAll('.gl-tabs button').forEach(b => b.addEventListener('click', () => { sec.querySelectorAll('.gl-tabs button').forEach(x => x.classList.toggle('on', x === b)); render(b.dataset.s); }));
    render('volume');
    stats().then(s => {
      const p = document.getElementById('gl-pool'), f = G().fmtUsd;
      p.querySelector('[data-k=raised]').textContent = f(s.raisedUsd || 0);
      p.querySelector('[data-k=avail]').textContent = f(s.availableUsd || 0);
      p.querySelector('[data-k=launches]').textContent = s.launches || 0;
      p.querySelector('[data-k=messages]').textContent = s.messages || 0;
      const pct = s.raisedUsd ? Math.max(4, Math.round(100 * (s.availableUsd || 0) / s.raisedUsd)) : 0;
      setTimeout(() => p.querySelector('.gl-meter i').style.width = pct + '%', 100);
    }).catch(() => {});
    render && null;
  }

  // 3. share card on token pages
  const MARK_D = "M32.94 97.07C29.52 96.74 26.15 94.84 24.10 92.08C22.96 90.54 22.45 89.39 21.99 87.36C21.66 85.87 21.40 85.11 20.89 84.09C19.69 81.70 17.56 79.60 15.16 78.45C13.94 77.86 13.23 77.62 11.93 77.33C9.35 76.78 7.39 75.76 5.66 74.08C3.15 71.65 1.92 68.78 1.91 65.40C1.91 64.13 2.12 62.94 2.53 61.77C3.23 59.78 4.02 58.60 5.90 56.75C7.53 55.13 7.92 54.65 8.46 53.57C9.63 51.25 9.49 48.69 8.05 46.21C7.73 45.65 7.24 45.09 6.10 43.96C4.44 42.32 3.72 41.36 3.02 39.84C1.39 36.30 1.64 32.17 3.71 28.73C4.87 26.79 6.81 24.95 8.73 23.98C9.66 23.51 10.27 23.30 11.91 22.86C13.38 22.46 14.82 21.93 15.51 21.53C17.32 20.46 18.72 19.25 19.83 17.79C21.02 16.22 21.55 15.07 21.99 13.12C22.60 10.47 23.61 8.54 25.37 6.71C27.21 4.81 29.31 3.64 32.07 3.00C33.27 2.72 35.81 2.70 36.99 2.96C39.53 3.52 41.65 4.62 43.39 6.29C45.41 8.23 46.65 10.43 47.23 13.14C47.43 14.07 47.46 14.60 47.55 19.99C47.60 23.20 47.63 27.89 47.61 30.41C47.58 34.40 47.55 35.07 47.40 35.60C46.85 37.48 45.59 39.00 43.90 39.81C42.77 40.36 42.05 40.52 40.84 40.52C39.17 40.51 38.84 40.38 34.69 37.99C33.20 37.13 30.50 35.57 28.70 34.54C26.90 33.50 25.27 32.56 25.08 32.44C24.88 32.32 24.67 32.23 24.60 32.23C24.50 32.23 24.47 33.00 24.47 35.78L24.47 39.33L25.60 39.98C26.23 40.33 27.03 40.80 27.39 41.01C27.75 41.23 29.16 42.05 30.51 42.82C35.17 45.49 35.45 45.69 36.24 46.87C37.02 48.04 37.21 48.73 37.20 50.30C37.20 51.83 37.05 52.36 36.30 53.48C35.60 54.53 34.97 55.02 32.51 56.42C31.27 57.12 28.97 58.44 27.39 59.35L24.52 61.00L24.50 64.55C24.47 67.38 24.49 68.09 24.60 68.05C24.67 68.02 26.08 67.22 27.74 66.26C29.41 65.31 31.38 64.18 32.12 63.75C32.87 63.33 34.45 62.42 35.64 61.74C36.82 61.06 38.03 60.39 38.32 60.26C40.14 59.46 42.23 59.55 44.04 60.50C45.42 61.22 46.73 62.76 47.23 64.23C47.61 65.37 47.64 66.51 47.60 76.54C47.57 85.90 47.56 86.18 47.35 87.02C46.21 91.72 42.18 95.67 37.38 96.78C36.55 96.97 34.59 97.20 34.04 97.17C33.90 97.16 33.41 97.12 32.94 97.07ZM64.45 97.12C62.23 96.88 60.94 96.53 59.41 95.77C56.42 94.26 54.13 91.71 53.09 88.72C52.39 86.69 52.42 87.20 52.42 75.58C52.42 65.31 52.43 65.09 52.63 64.44C53.16 62.74 54.46 61.20 56.00 60.45C57.17 59.89 58.18 59.68 59.41 59.75C60.91 59.83 61.37 60.04 66.21 62.84C68.13 63.95 73.68 67.14 74.66 67.70C75.04 67.91 75.38 68.06 75.41 68.03C75.45 67.99 75.49 66.41 75.51 64.51L75.54 61.06L70.43 58.15C65.65 55.42 65.27 55.19 64.55 54.48C63.17 53.13 62.67 51.85 62.77 49.90C62.83 48.71 63.07 47.93 63.66 47.01C64.46 45.78 65.03 45.36 68.83 43.20C69.83 42.64 73.84 40.32 74.95 39.67L75.52 39.33L75.53 35.72L75.53 32.12L75.10 32.36C74.22 32.86 67.88 36.51 66.67 37.21C61.26 40.33 61.12 40.39 59.37 40.46C58.44 40.49 58.00 40.46 57.50 40.34C55.16 39.73 53.31 37.92 52.66 35.60C52.46 34.89 52.45 14.72 52.65 13.65C52.98 11.81 53.74 9.96 54.80 8.39C55.45 7.41 57.21 5.65 58.16 5.02C62.69 2.01 68.28 1.99 72.63 4.95C74.29 6.08 75.52 7.41 76.62 9.24C77.25 10.28 77.65 11.34 78.10 13.07C78.45 14.46 78.96 15.81 79.39 16.56C80.31 18.12 81.81 19.73 83.30 20.75C84.85 21.81 86.13 22.35 88.82 23.07C92.91 24.16 96.37 27.53 97.57 31.58C98.44 34.51 98.18 37.30 96.77 40.08C96.04 41.54 95.37 42.42 93.81 43.96C92.91 44.85 92.20 45.66 91.87 46.16C90.35 48.48 90.19 51.21 91.44 53.54C92.03 54.64 92.57 55.32 93.84 56.54C94.94 57.61 96.06 58.97 96.61 59.92C97.34 61.18 97.93 63.22 98.04 64.82C98.31 68.73 96.33 72.81 93.03 75.16C91.52 76.24 90.24 76.80 88.14 77.30C85.81 77.85 84.63 78.32 83.13 79.30C81.43 80.41 79.98 81.89 78.99 83.54C78.34 84.63 77.92 85.76 77.59 87.28C77.04 89.80 76.15 91.44 74.33 93.25C71.88 95.69 69.10 96.91 65.56 97.11C65.14 97.14 64.65 97.14 64.45 97.12Z";
  let storm = null;
  const stormImg = () => storm || (storm = new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = '/static/assets/storm.jpg'; }));
  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  async function drawCard(t, cv) {
    const W = 1200, H = 630, x = cv.getContext('2d'); cv.width = W; cv.height = H;
    try { await Promise.all(['600 88px Outfit', '500 30px Outfit', '500 24px Inter', '500 22px "JetBrains Mono"'].map(f => document.fonts.load(f))); } catch (e) {}
    const img = await stormImg();
    x.fillStyle = '#eef0f3'; x.fillRect(0, 0, W, H);
    if (img) { x.save(); x.filter = 'blur(10px) saturate(.8)'; const sc = Math.max(W / img.width, H / img.height) * 1.08; x.drawImage(img, (W - img.width * sc) / 2, (H - img.height * sc) / 2, img.width * sc, img.height * sc); x.restore(); }
    const veil = x.createLinearGradient(0, 0, 0, H); veil.addColorStop(0, 'rgba(255,255,255,.5)'); veil.addColorStop(1, 'rgba(255,255,255,.8)'); x.fillStyle = veil; x.fillRect(0, 0, W, H);
    x.save(); x.shadowColor = 'rgba(10,10,10,.18)'; x.shadowBlur = 50; x.shadowOffsetY = 20; rr(x, 48, 48, W - 96, H - 96, 28); x.fillStyle = 'rgba(255,255,255,.74)'; x.fill(); x.restore();
    rr(x, 48, 48, W - 96, H - 96, 28); x.strokeStyle = 'rgba(10,10,10,.07)'; x.lineWidth = 2; x.stroke();
    x.save(); x.translate(92, 84); x.scale(.44, .44); x.fillStyle = '#0a0a0a'; x.fill(new Path2D(MARK_D), 'evenodd'); x.restore();
    x.fillStyle = '#0a0a0a'; x.font = '600 32px Outfit, system-ui, sans-serif'; x.fillText('Glia', 146, 118);
    x.textAlign = 'right'; x.fillStyle = '#6b7280'; x.font = '500 20px "JetBrains Mono", monospace'; x.fillText('AI MODEL COIN', W - 92, 114); x.textAlign = 'left';
    const g1 = x.createLinearGradient(0, 170, 0, 250); g1.addColorStop(0, '#0a0a0a'); g1.addColorStop(1, '#3b4a6b');
    x.fillStyle = g1; x.font = '600 88px Outfit, system-ui, sans-serif'; x.fillText((t.name || '?').slice(0, 18), 92, 244);
    x.fillStyle = '#4b5058'; x.font = '500 30px Outfit, system-ui, sans-serif'; x.fillText('$' + (t.symbol || '') + '  \u00b7  backs ' + shortModel(t.model || t.modelName), 92, 292);
    const f = G().fmtUsd, g = gradOf(t);
    [['Market cap', f(usdOf(t))], ['24h volume', f(t.volume24hUsd || 0)], ['Curve filled', Math.round(g * 100) + '%']].forEach(([k, v], i) => {
      const cx = 92 + i * 342; rr(x, cx, 336, 318, 118, 18); x.fillStyle = 'rgba(247,248,250,.92)'; x.fill(); x.strokeStyle = 'rgba(10,10,10,.06)'; x.lineWidth = 1.5; x.stroke();
      x.fillStyle = '#6b7280'; x.font = '500 22px Inter, system-ui, sans-serif'; x.fillText(k, cx + 24, 374);
      x.fillStyle = '#0a0a0a'; x.font = '600 46px Outfit, system-ui, sans-serif'; x.fillText(v, cx + 24, 428);
    });
    rr(x, 92, 482, W - 184, 12, 6); x.fillStyle = 'rgba(10,10,10,.08)'; x.fill();
    rr(x, 92, 482, Math.max(12, (W - 184) * g), 12, 6); x.fillStyle = '#00b543'; x.fill();
    x.fillStyle = '#4b5058'; x.font = '500 22px Inter, system-ui, sans-serif'; x.fillText('Every trade funds AI compute on Robinhood Chain', 92, 540);
    x.textAlign = 'right'; x.fillStyle = '#0a0a0a'; x.font = '600 24px Outfit, system-ui, sans-serif'; x.fillText('useglia.xyz', W - 92, 540); x.textAlign = 'left';
  }
  function tokenPage() {
    const m = location.pathname.match(/\/token\/(0x[0-9a-fA-F]{40})/); if (!m) return;
    G().api('token/' + m[1]).then(t => {
      wait(() => document.querySelector('#root h1, main h1'), h1 => {
        if (document.querySelector('.gl-share-btn')) return;
        const b = document.createElement('button'); b.className = 'gl-share-btn'; b.type = 'button'; b.textContent = '↗ Share card';
        b.style.marginLeft = '12px'; b.style.verticalAlign = 'middle';
        h1.appendChild(b);
        b.addEventListener('click', ev => {
          ev.preventDefault();
          const md = document.createElement('div'); md.className = 'gl-modal';
          md.innerHTML = '<div class="box"><canvas></canvas><div class="acts"><button class="gl-share-btn" data-a="copy">Copy link</button><button class="gl-share-btn" data-a="dl">Download image</button><button class="gl-share-btn" data-a="x">Post on X</button><button class="gl-share-btn" data-a="close">Close</button></div></div>';
          document.body.appendChild(md);
          const cv = md.querySelector('canvas'); drawCard(t, cv).then(() => md.dataset.ready = '1');
          const url = location.origin + G().href('/token/' + t.token);
          md.addEventListener('click', e => {
            const a = e.target.dataset && e.target.dataset.a;
            if (e.target === md || a === 'close') md.remove();
            if (a === 'dl') { const l = document.createElement('a'); l.download = (t.symbol || 'glia') + '-card.png'; l.href = cv.toDataURL('image/png'); l.click(); }
            if (a === 'copy') navigator.clipboard.writeText(url).then(() => e.target.textContent = 'Copied ✓');
            if (a === 'x') { const txt = `$${t.symbol} on @useglia backs ${shortModel(t.model || t.modelName)}. Market cap ${G().fmtUsd(usdOf(t))}, curve ${Math.round(gradOf(t) * 100)}% filled. Every trade funds AI compute.`; open('https://x.com/intent/post?text=' + encodeURIComponent(txt) + '&url=' + encodeURIComponent(url), '_blank', 'noopener'); }
          });
        });
      });
    }).catch(() => {});
  }

  ready(() => wait(() => window.GLIA && window.GLIA.api, () => stats().catch(() => {}).finally(() => { tape(); home(); tokenPage(); })));
})();

// Price Alerts: site-wide checker (runs on every page), bell button on coin pages
(() => {
  const KEY = 'glia.alerts';
  const list = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } };
  const save = a => { localStorage.setItem(KEY, JSON.stringify(a)); window.dispatchEvent(new Event('glia-alerts')); };
  const A = window.GLIA_ALERTS = { list, add: o => { const a = list(); a.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), createdAt: Date.now(), ...o }); save(a); },
    remove: id => save(list().filter(x => x.id !== id)) };
  const fmt = (m, v) => m === 'price' ? (v >= 1 ? '$' + v.toFixed(2) : '$' + Number(v).toPrecision(3)) : '$' + (v >= 1e6 ? (v / 1e6).toFixed(2) + 'M' : v >= 1e3 ? (v / 1e3).toFixed(1) + 'K' : Math.round(v));
  function banner(msg, tok) {
    let w = document.getElementById('gl-alerts'); if (!w) { w = document.createElement('div'); w.id = 'gl-alerts'; w.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:9999;display:flex;flex-direction:column;gap:8px;max-width:340px'; document.body.appendChild(w); }
    const d = document.createElement('a'); d.href = (window.GLIA ? GLIA.href('/token/' + tok) : '/token/' + tok);
    d.style.cssText = 'display:block;background:#fff;border:1px solid rgba(11,26,51,.1);border-left:4px solid #22c55e;border-radius:14px;padding:12px 14px;box-shadow:0 12px 32px rgba(11,26,51,.14);color:#0a0a0a;text-decoration:none;font:500 14px Outfit,system-ui';
    d.innerHTML = '<div style="font-size:11px;opacity:.55;margin-bottom:2px">🔔 Price alert</div>' + msg.replace(/</g, '&lt;'); w.appendChild(d); setTimeout(() => d.remove(), 15000);
  }
  async function check() {
    const open = list().filter(a => !a.hitAt); if (!open.length) return;
    try {
      const r = await fetch((window.GLIA ? GLIA.href('/api/tokens?sort=mcap&limit=200') : '/api/tokens?sort=mcap&limit=200')); const toks = (await r.json()).tokens || [];
      const all = list(); let hit = false;
      all.forEach(a => { if (a.hitAt) return; const t = toks.find(x => x.token.toLowerCase() === a.token.toLowerCase()); if (!t) return;
        const cur = a.metric === 'price' ? t.priceUsd : t.marketCapUsd; if (!cur) return;
        if (a.dir === 'above' ? cur >= a.value : cur <= a.value) { a.hitAt = Date.now(); a.hitValue = cur; hit = true;
          const msg = `$${t.symbol} ${a.metric === 'price' ? 'price' : 'market cap'} is ${a.dir} ${fmt(a.metric, a.value)} (now ${fmt(a.metric, cur)})`;
          banner(msg, t.token);
          try { if (window.Notification && Notification.permission === 'granted') { const n = new Notification('Glia price alert', { body: msg, icon: '/static/official-logo.png', tag: a.id }); n.onclick = () => { window.focus(); location.href = '/token/' + t.token; }; } } catch (e) {}
        } });
      if (hit) save(all);
    } catch (e) {}
  }
  const start = () => { check(); setInterval(check, 20000); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
  // bell on coin pages
  const tok = (location.pathname.split('/token/')[1] || '').split(/[/?#]/)[0];
  if (tok) { let n = 0; const iv = setInterval(() => { const h = document.querySelector('main h1'); if (!h && ++n < 40) return; clearInterval(iv); if (!h || document.getElementById('al-bell')) return;
    const b = document.createElement('a'); b.id = 'al-bell'; b.href = (window.GLIA ? GLIA.href('/alerts?token=' + tok) : '/alerts?token=' + tok); b.title = 'Set a price alert';
    b.style.cssText = 'display:inline-block;border:1px solid rgba(11,26,51,.12);background:#fff;border-radius:999px;padding:.3rem .75rem;margin-left:.5rem;font:500 .85rem Outfit,system-ui;color:#0a0a0a;text-decoration:none;vertical-align:middle';
    const c = list().filter(a => a.token.toLowerCase() === tok.toLowerCase() && !a.hitAt).length; b.textContent = c ? `🔔 ${c} alert${c > 1 ? 's' : ''}` : '🔔 Alert'; h.appendChild(b); }, 300); }
})();
