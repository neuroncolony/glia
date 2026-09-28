// Glia features: live trade tape, Hot right now, compute pool meter, share cards
(() => {
  const ready = f => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', f) : f();
  const wait = (test, cb, tries = 60) => { const v = test(); if (v) return cb(v); if (tries > 0) setTimeout(() => wait(test, cb, tries - 1), 150); };
  const css = `
  .gl-tape{position:relative;overflow:hidden;border-bottom:1px solid var(--line,rgba(255,255,255,.08));background:rgba(0,0,0,.25);backdrop-filter:blur(6px);font-size:12px;height:30px;display:flex;align-items:center}
  .gl-tape-track{display:flex;gap:28px;white-space:nowrap;animation:gltape 60s linear infinite;padding-left:100%}
  .gl-tape:hover .gl-tape-track{animation-play-state:paused}
  .gl-tape a{color:var(--muted,#9aa);text-decoration:none;display:inline-flex;gap:6px;align-items:center}
  .gl-tape a:hover{color:var(--fg,#fff)}
  .gl-tape .b{color:#54d97e;font-weight:600}.gl-tape .s{color:#e5484d;font-weight:600}
  .gl-tape .lbl{position:absolute;left:0;top:0;bottom:0;z-index:2;display:flex;align-items:center;gap:6px;padding:0 12px;background:inherit;font-weight:600;letter-spacing:.04em;font-size:11px}
  .gl-tape .dot{width:6px;height:6px;border-radius:50%;background:#54d97e;box-shadow:0 0 8px #54d97e;animation:glpulse 1.6s ease-in-out infinite}
  @keyframes gltape{from{transform:translateX(0)}to{transform:translateX(-100%)}}
  @keyframes glpulse{50%{opacity:.35}}
  .gl-sec{margin:2.5rem 0}
  .gl-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:1rem;gap:1rem}
  .gl-head h2{margin:0;font-size:1.35rem}
  .gl-tabs{display:flex;gap:6px}.gl-tabs button{background:transparent;border:1px solid var(--line,rgba(255,255,255,.12));color:var(--muted,#9aa);padding:5px 12px;border-radius:999px;cursor:pointer;font:inherit;font-size:12px}
  .gl-tabs button.on{color:var(--fg,#fff);border-color:var(--accent,#54d97e);background:rgba(84,217,126,.1)}
  .gl-hot{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
  .gl-card{display:block;padding:14px;border-radius:14px;border:1px solid var(--line,rgba(255,255,255,.08));background:var(--card,rgba(255,255,255,.03));text-decoration:none;color:inherit;transition:transform .15s,border-color .15s}
  .gl-card:hover{transform:translateY(-2px);border-color:var(--accent,#54d97e)}
  .gl-card .r{display:flex;align-items:center;gap:10px}.gl-card .rank{font-size:11px;color:var(--muted,#9aa);margin-left:auto}
  .gl-card img,.gl-card .ph{width:36px;height:36px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#2a3a4a,#16202a);flex:none}
  .gl-card .nm{font-weight:600}.gl-card .sy{font-size:12px;color:var(--muted,#9aa)}
  .gl-card dl{display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;margin:12px 0 0;font-size:12px}.gl-card dt{color:var(--muted,#9aa)}.gl-card dd{margin:0;text-align:right;font-variant-numeric:tabular-nums}
  .gl-bar{height:4px;border-radius:4px;background:rgba(255,255,255,.08);margin-top:10px;overflow:hidden}.gl-bar i{display:block;height:100%;background:var(--accent,#54d97e)}
  .gl-pool{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
  .gl-stat{padding:16px;border-radius:14px;border:1px solid var(--line,rgba(255,255,255,.08));background:var(--card,rgba(255,255,255,.03))}
  .gl-stat .k{font-size:12px;color:var(--muted,#9aa)}.gl-stat .v{font-size:1.6rem;font-weight:700;margin-top:4px;font-variant-numeric:tabular-nums}
  .gl-meter{grid-column:1/-1;height:10px;border-radius:10px;background:rgba(255,255,255,.06);overflow:hidden}.gl-meter i{display:block;height:100%;background:linear-gradient(90deg,#54d97e,#8be9b0);transition:width 1s}
  .gl-share-btn{display:inline-flex;align-items:center;gap:6px;cursor:pointer;border:1px solid var(--line,rgba(255,255,255,.14));background:rgba(255,255,255,.04);color:inherit;font:inherit;font-size:13px;padding:7px 14px;border-radius:999px}
  .gl-share-btn:hover{border-color:var(--accent,#54d97e)}
  .gl-modal{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:20px}
  .gl-modal .box{max-width:680px;width:100%;background:var(--bg,#0b0f14);border:1px solid var(--line,rgba(255,255,255,.1));border-radius:16px;padding:16px}
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
        const g = gradOf(t), logo = t.logo ? `<img src="${esc(t.logo)}" alt="">` : `<span class="ph"></span>`;
        return `<a class="gl-card" href="${href('/token/' + t.token)}"><div class="r">${logo}<div><div class="nm">${esc(t.name || '?')}</div><div class="sy">${esc(t.symbol || '')} · ${esc(shortModel(t.model || t.modelName))}</div></div><span class="rank">#${i + 1}</span></div>
        <dl><dt>Market cap</dt><dd>${fmtUsd(usdOf(t))}</dd><dt>24h volume</dt><dd>${fmtUsd(t.volume24hUsd || 0)}</dd><dt>Curve</dt><dd>${Math.round(g * 100)}%</dd><dt>Trades 24h</dt><dd>${t.trades24h || 0}</dd></dl><div class="gl-bar"><i style="width:${Math.round(g * 100)}%"></i></div></a>`;
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
  function drawCard(t, cv) {
    const W = 1200, H = 630, x = cv.getContext('2d'); cv.width = W; cv.height = H;
    const bg = x.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#0a1016'); bg.addColorStop(1, '#101c24'); x.fillStyle = bg; x.fillRect(0, 0, W, H);
    const glow = x.createRadialGradient(W - 180, 120, 10, W - 180, 120, 420); glow.addColorStop(0, 'rgba(84,217,126,.28)'); glow.addColorStop(1, 'rgba(84,217,126,0)'); x.fillStyle = glow; x.fillRect(0, 0, W, H);
    x.strokeStyle = 'rgba(255,255,255,.08)'; x.lineWidth = 2; x.strokeRect(24, 24, W - 48, H - 48);
    x.fillStyle = '#54d97e'; x.font = '600 26px DM Sans, system-ui, sans-serif'; x.fillText('GLIA · AI MODEL COIN', 72, 104);
    x.fillStyle = '#fff'; x.font = '700 92px DM Sans, system-ui, sans-serif'; x.fillText((t.name || '?').slice(0, 18), 72, 210);
    x.fillStyle = '#9fb0bb'; x.font = '500 34px DM Sans, system-ui, sans-serif'; x.fillText('$' + (t.symbol || '') + '  ·  backs ' + shortModel(t.model || t.modelName), 72, 262);
    const f = G().fmtUsd, g = gradOf(t);
    const cells = [['Market cap', f(usdOf(t))], ['24h volume', f(t.volume24hUsd || 0)], ['Curve filled', Math.round(g * 100) + '%']];
    cells.forEach(([k, v], i) => { const cx = 72 + i * 360; x.fillStyle = '#7f909b'; x.font = '500 26px DM Sans, system-ui, sans-serif'; x.fillText(k, cx, 380); x.fillStyle = '#fff'; x.font = '700 58px DM Sans, system-ui, sans-serif'; x.fillText(v, cx, 446); });
    x.fillStyle = 'rgba(255,255,255,.08)'; x.fillRect(72, 492, W - 144, 12); x.fillStyle = '#54d97e'; x.fillRect(72, 492, Math.max(12, (W - 144) * g), 12);
    x.fillStyle = '#9fb0bb'; x.font = '500 26px DM Sans, system-ui, sans-serif'; x.fillText('Every trade funds AI compute on Robinhood Chain', 72, 566);
    x.textAlign = 'right'; x.fillStyle = '#fff'; x.font = '600 26px DM Sans, system-ui, sans-serif'; x.fillText('@useglia', W - 72, 566); x.textAlign = 'left';
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
          const cv = md.querySelector('canvas'); drawCard(t, cv);
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
