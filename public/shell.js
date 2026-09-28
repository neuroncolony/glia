/* glia shell: brand, nav, wallet (EIP-6963 + window.ethereum), api helpers, formatters. Loaded by every page. */
window.GLIA = (() => {
  const MARK = '<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M32.94 97.07C29.52 96.74 26.15 94.84 24.10 92.08C22.96 90.54 22.45 89.39 21.99 87.36C21.66 85.87 21.40 85.11 20.89 84.09C19.69 81.70 17.56 79.60 15.16 78.45C13.94 77.86 13.23 77.62 11.93 77.33C9.35 76.78 7.39 75.76 5.66 74.08C3.15 71.65 1.92 68.78 1.91 65.40C1.91 64.13 2.12 62.94 2.53 61.77C3.23 59.78 4.02 58.60 5.90 56.75C7.53 55.13 7.92 54.65 8.46 53.57C9.63 51.25 9.49 48.69 8.05 46.21C7.73 45.65 7.24 45.09 6.10 43.96C4.44 42.32 3.72 41.36 3.02 39.84C1.39 36.30 1.64 32.17 3.71 28.73C4.87 26.79 6.81 24.95 8.73 23.98C9.66 23.51 10.27 23.30 11.91 22.86C13.38 22.46 14.82 21.93 15.51 21.53C17.32 20.46 18.72 19.25 19.83 17.79C21.02 16.22 21.55 15.07 21.99 13.12C22.60 10.47 23.61 8.54 25.37 6.71C27.21 4.81 29.31 3.64 32.07 3.00C33.27 2.72 35.81 2.70 36.99 2.96C39.53 3.52 41.65 4.62 43.39 6.29C45.41 8.23 46.65 10.43 47.23 13.14C47.43 14.07 47.46 14.60 47.55 19.99C47.60 23.20 47.63 27.89 47.61 30.41C47.58 34.40 47.55 35.07 47.40 35.60C46.85 37.48 45.59 39.00 43.90 39.81C42.77 40.36 42.05 40.52 40.84 40.52C39.17 40.51 38.84 40.38 34.69 37.99C33.20 37.13 30.50 35.57 28.70 34.54C26.90 33.50 25.27 32.56 25.08 32.44C24.88 32.32 24.67 32.23 24.60 32.23C24.50 32.23 24.47 33.00 24.47 35.78L24.47 39.33L25.60 39.98C26.23 40.33 27.03 40.80 27.39 41.01C27.75 41.23 29.16 42.05 30.51 42.82C35.17 45.49 35.45 45.69 36.24 46.87C37.02 48.04 37.21 48.73 37.20 50.30C37.20 51.83 37.05 52.36 36.30 53.48C35.60 54.53 34.97 55.02 32.51 56.42C31.27 57.12 28.97 58.44 27.39 59.35L24.52 61.00L24.50 64.55C24.47 67.38 24.49 68.09 24.60 68.05C24.67 68.02 26.08 67.22 27.74 66.26C29.41 65.31 31.38 64.18 32.12 63.75C32.87 63.33 34.45 62.42 35.64 61.74C36.82 61.06 38.03 60.39 38.32 60.26C40.14 59.46 42.23 59.55 44.04 60.50C45.42 61.22 46.73 62.76 47.23 64.23C47.61 65.37 47.64 66.51 47.60 76.54C47.57 85.90 47.56 86.18 47.35 87.02C46.21 91.72 42.18 95.67 37.38 96.78C36.55 96.97 34.59 97.20 34.04 97.17C33.90 97.16 33.41 97.12 32.94 97.07ZM64.45 97.12C62.23 96.88 60.94 96.53 59.41 95.77C56.42 94.26 54.13 91.71 53.09 88.72C52.39 86.69 52.42 87.20 52.42 75.58C52.42 65.31 52.43 65.09 52.63 64.44C53.16 62.74 54.46 61.20 56.00 60.45C57.17 59.89 58.18 59.68 59.41 59.75C60.91 59.83 61.37 60.04 66.21 62.84C68.13 63.95 73.68 67.14 74.66 67.70C75.04 67.91 75.38 68.06 75.41 68.03C75.45 67.99 75.49 66.41 75.51 64.51L75.54 61.06L70.43 58.15C65.65 55.42 65.27 55.19 64.55 54.48C63.17 53.13 62.67 51.85 62.77 49.90C62.83 48.71 63.07 47.93 63.66 47.01C64.46 45.78 65.03 45.36 68.83 43.20C69.83 42.64 73.84 40.32 74.95 39.67L75.52 39.33L75.53 35.72L75.53 32.12L75.10 32.36C74.22 32.86 67.88 36.51 66.67 37.21C61.26 40.33 61.12 40.39 59.37 40.46C58.44 40.49 58.00 40.46 57.50 40.34C55.16 39.73 53.31 37.92 52.66 35.60C52.46 34.89 52.45 14.72 52.65 13.65C52.98 11.81 53.74 9.96 54.80 8.39C55.45 7.41 57.21 5.65 58.16 5.02C62.69 2.01 68.28 1.99 72.63 4.95C74.29 6.08 75.52 7.41 76.62 9.24C77.25 10.28 77.65 11.34 78.10 13.07C78.45 14.46 78.96 15.81 79.39 16.56C80.31 18.12 81.81 19.73 83.30 20.75C84.85 21.81 86.13 22.35 88.82 23.07C92.91 24.16 96.37 27.53 97.57 31.58C98.44 34.51 98.18 37.30 96.77 40.08C96.04 41.54 95.37 42.42 93.81 43.96C92.91 44.85 92.20 45.66 91.87 46.16C90.35 48.48 90.19 51.21 91.44 53.54C92.03 54.64 92.57 55.32 93.84 56.54C94.94 57.61 96.06 58.97 96.61 59.92C97.34 61.18 97.93 63.22 98.04 64.82C98.31 68.73 96.33 72.81 93.03 75.16C91.52 76.24 90.24 76.80 88.14 77.30C85.81 77.85 84.63 78.32 83.13 79.30C81.43 80.41 79.98 81.89 78.99 83.54C78.34 84.63 77.92 85.76 77.59 87.28C77.04 89.80 76.15 91.44 74.33 93.25C71.88 95.69 69.10 96.91 65.56 97.11C65.14 97.14 64.65 97.14 64.45 97.12Z"/></svg>';
  window.GLIA_MARK = MARK;
  if (!document.querySelector('link[rel="icon"]')) { const l = document.createElement('link'); l.rel = 'icon'; l.type = 'image/svg+xml'; l.href = '/logo.svg'; document.head.appendChild(l); }

  const BRAND = { name: 'glia', display: 'Glia', symbol: 'GLIA' };
  const CHAIN = { id: 4663, hex: '0x1237', name: 'Robinhood Chain', rpc: 'https://rpc.mainnet.chain.robinhood.com', explorer: 'https://robinhoodchain.blockscout.com' };
  const NAV_GROUPS = [['/explore','Explore'],['/live','Live'],['/portfolio','Portfolio'],
    ['Markets',[['/race','Race','Which coin graduates first'],['/whales','Whales','Biggest wallets and moves'],['/compare','Compare','Two coins side by side'],['/heatmap','Heatmap','The whole market at a glance'],['/diamonds','Diamond Hands','Longest holders'],['/timemachine','Time Machine','What $100 at launch is worth now'],['/checkup','Checkup','A health score for any coin'],['/creators','Creator Watch','What every launcher did with their coin'],['/watchlist','Watchlist','Your starred coins, live'],['/alerts','Price Alerts','Get pinged when a coin moves']]],
    ['AI',[['/agora','Agora','Models debate your coin'],['/models','Models','The minds behind glia'],['/chat','Chat','Talk to a model']]],
    ['Build',[['/keys','API','Keys for the glia API'],['/docs','Docs','How glia works']]]];
  const NAV = NAV_GROUPS.flatMap(g => Array.isArray(g[1]) ? g[1].map(x => [x[0], x[1]]) : [g]);
  const base = new URL(document.querySelector('base')?.href || (location.pathname.match(/^\/preview\/[^/]+\//)?.[0] || '/'), location.origin);
  const href = p => new URL(p.replace(/^\//,''), base).pathname;
  const $ = (s, r=document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state = { provider:null, address:null, chainId:null, wallets:[] };
  let session = null;

  // ---------- dev mode theme
  const isDev = () => document.documentElement.getAttribute('data-theme') === 'dev';
  function setTheme(dev){ try{ dev ? localStorage.setItem('glia.theme','dev') : localStorage.removeItem('glia.theme'); }catch(e){} location.reload(); }

  // ---------- api
  async function api(path, body, opts={}) {
    const r = await fetch(new URL('api/' + path.replace(/^\//,''), base), {
      credentials:'same-origin',
      ...(body !== undefined ? { method:'POST', headers:{'Content-Type':'application/json', ...(session?.csrf ? {'X-CSRF-Token':session.csrf} : {})}, body:JSON.stringify(body) } : {}),
      ...opts });
    let d; try { d = await r.json(); } catch { throw Error('The server did not return a usable response.'); }
    if (!r.ok) throw Error(d.error || 'This request could not be completed.');
    return d;
  }

  // ---------- formatters
  const fmtUsd = n => n == null || !isFinite(n) ? '...' : n >= 1e9 ? '$'+(n/1e9).toFixed(2)+'B' : n >= 1e6 ? '$'+(n/1e6).toFixed(2)+'M' : n >= 1e3 ? '$'+(n/1e3).toFixed(1)+'K' : n >= 1 ? '$'+n.toFixed(2) : n === 0 ? '$0.00' : subscript(n);
  function subscript(n) { // 0.0₅443 style for tiny prices
    const s = n.toExponential(2); const [m, e] = s.split('e'); const exp = -parseInt(e,10);
    if (exp <= 3) return '$' + n.toFixed(Math.min(8, exp+2));
    const zeros = exp - 1; const digits = m.replace('.','').slice(0,3);
    return '$0.0' + String(zeros).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]) + digits;
  }
  const fmtEth = (wei, dp=4) => wei == null ? '...' : (Number(BigInt(wei)) / 1e18).toFixed(dp).replace(/\.?0+$/,'') || '0';
  const fromWei = wei => (Number(BigInt(wei))/1e18).toString();
  const toWei = v => { const [w, f=''] = String(v).trim().split('.'); if (!/^\d*$/.test(w) || !/^\d*$/.test(f) || (w===''&&f==='')) throw Error('Enter a valid amount.'); return (BigInt(w||'0')*10n**18n + BigInt((f+'0'.repeat(18)).slice(0,18))).toString(); };
  const ago = ts => { const s = Math.max(0, Date.now()/1000 - ts); if (s<60) return Math.floor(s)+'s'; if (s<3600) return Math.floor(s/60)+'m'; if (s<86400) return Math.floor(s/3600)+'h'; return (s/86400).toFixed(s<86400*10?1:0).replace(/\.0$/,'')+'d'; };
  const short = a => a ? a.slice(0,6)+'…'+a.slice(-4) : '';
  const pct = x => x == null ? '...' : (x*100).toFixed(x*100 < 10 ? 1 : 0) + '%';
  function toast(m, ms=3200) { const t = document.createElement('div'); t.className='toast'; t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(), ms); }

  // ---------- cookie notice (bottom right, non-blocking, separate from the terms gate)
  function cookieBar() {
    const CK = 'glia_cookies';
    if (localStorage.getItem(CK) || document.cookie.split(';').some(c => /^glia_cookies=/.test(c.trim()))) return;
    const set = v => { document.cookie = CK + '=' + v + '; max-age=31536000; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); localStorage.setItem(CK, v); };
    const el = document.createElement('div'); el.className = 'cookie-pop';
    el.innerHTML = `<div class="cookie-t">Cookies</div><p>We use one first-party cookie to remember your choices. No trackers, no third-party analytics.</p><div class="cookie-actions"><button class="btn ghost" data-no>Decline</button><button class="btn accent" data-ok>Accept</button></div>`;
    el.addEventListener('click', e => { if (e.target.closest('[data-ok]')) set('1'); else if (e.target.closest('[data-no]')) set('0'); else return; el.classList.add('bye'); setTimeout(() => el.remove(), 300); });
    const mount = () => document.body.appendChild(el);
    document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);
  }

  // ---------- entry gate (terms). Must be accepted before using the site.
  (function gate() {
    const KEY = 'glia_consent', EXIT = 'https://www.ponsfamily.com';
    const has = () => document.cookie.split(';').some(c => c.trim().startsWith(KEY + '=1')) || localStorage.getItem(KEY) === '1';
    if (has()) { const mount = () => cookieBar(); document.body ? mount() : document.addEventListener('DOMContentLoaded', mount); return; }
    const accept = () => { document.cookie = KEY + '=1; max-age=31536000; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); localStorage.setItem(KEY, '1'); m.classList.add('out'); document.documentElement.classList.remove('gated'); setTimeout(() => m.remove(), 320); cookieBar(); };
    const leave = () => { location.replace(EXIT); };
    const m = document.createElement('div'); m.className = 'modal gate'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    m.innerHTML = `<div class="card modal-card gate-card">
      <div class="gate-mark">${MARK}</div>
      <h2 class="modal-title">Before you enter</h2>
      <p>glia is a token launcher on Robinhood Chain. Tokens launched here are experimental and can go to zero. Nothing on this site is financial advice. Trades are on-chain and cannot be reversed.</p>
      <p>By entering you confirm you are of legal age where you live, you are not in a restricted jurisdiction, and you accept the <a href="/terms">terms</a> of this product.</p>
      <div class="gate-actions"><button class="btn ghost" data-leave>I do not accept</button><button class="btn accent" data-accept>Accept and enter</button></div>
    </div>`;
    m.addEventListener('click', e => { if (e.target.closest('[data-accept]')) accept(); else if (e.target.closest('[data-leave]')) leave(); });
    m.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); } });
    document.documentElement.classList.add('gated');
    const mount = () => { document.body.appendChild(m); m.querySelector('[data-accept]').focus(); };
    document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);
  })();

  // ---------- wallet
  window.addEventListener('eip6963:announceProvider', e => { if (!state.wallets.find(w => w.info.uuid === e.detail.info.uuid)) state.wallets.push(e.detail); });
  window.dispatchEvent(new Event('eip6963:requestProvider'));
  function providers() { const list = [...state.wallets]; if (!list.length && window.ethereum) list.push({ info:{ name: window.ethereum.isRabby ? 'Rabby' : window.ethereum.isMetaMask ? 'MetaMask' : 'Browser wallet', icon:'' }, provider: window.ethereum }); return list; }
  async function connectWith(p) {
    const [addr] = await p.provider.request({ method:'eth_requestAccounts' });
    state.provider = p.provider; state.address = addr; state.chainId = await p.provider.request({ method:'eth_chainId' });
    p.provider.on?.('accountsChanged', a => { state.address = a[0] || null; session = null; renderNav(); });
    p.provider.on?.('chainChanged', c => { state.chainId = c; });
    localStorage.setItem('glia.wallet', p.info.name); renderNav();
    document.dispatchEvent(new CustomEvent('glia:wallet', { detail:{ address: addr } }));
  }
  function openWalletModal() {
    return new Promise((resolve, reject) => {
      const list = providers(); const m = document.createElement('div'); m.className='modal';
      m.innerHTML = `<div class="card modal-card"><button class="modal-x" data-x aria-label="Close"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg></button><h2 class="modal-title">Connect a wallet</h2><div class="wallet-list">${list.length ? list.map((w,i)=>`<button data-i="${i}">${w.info.icon?`<img src="${esc(w.info.icon)}" alt="">`:''}<span>${esc(w.info.name)}</span></button>`).join('') : '<div class="empty">No browser wallet detected. Install MetaMask, Rabby or another EIP-1193 wallet.</div>'}</div></div>`;
      m.onclick = async e => { if (e.target === m || e.target.closest('[data-x]')) { m.remove(); reject(Error('Cancelled.')); return; } const b = e.target.closest('[data-i]'); if (!b) return; try { await connectWith(list[+b.dataset.i]); m.remove(); resolve(); } catch (err) { toast(err.message); } };
      document.body.appendChild(m);
    });
  }
  async function ensureChain() {
    if (!state.provider) await openWalletModal();
    const p = state.provider; let c = await p.request({ method:'eth_chainId' });
    if (parseInt(c,16) !== CHAIN.id) {
      try { await p.request({ method:'wallet_switchEthereumChain', params:[{ chainId: CHAIN.hex }] }); }
      catch (e) { if (e.code === 4902) await p.request({ method:'wallet_addEthereumChain', params:[{ chainId: CHAIN.hex, chainName: CHAIN.name, nativeCurrency:{ name:'Ether', symbol:'ETH', decimals:18 }, rpcUrls:[CHAIN.rpc], blockExplorerUrls:[CHAIN.explorer] }] }); else throw e; }
      c = await p.request({ method:'eth_chainId' });
      if (parseInt(c,16) !== CHAIN.id) throw Error('Switch your wallet to Robinhood Chain before continuing.');
    }
    state.chainId = c;
  }
  // ---------- dev mode: one signature at entry, then a local key signs everything
  const DEV_ACK = 'glia.dev.ack', DEV_SK = 'glia.dev.sk';
  const devSk = () => { try { return localStorage.getItem(DEV_SK); } catch (e) { return null; } };
  const devOn = () => isDev() && !!devSk();
  let _v = null;
  async function viem() {
    if (_v) return _v;
    const [core, acct] = await Promise.all([import('https://esm.sh/viem@2.21.4'), import('https://esm.sh/viem@2.21.4/accounts')]);
    _v = { ...core, ...acct }; return _v;
  }
  const DEV_CHAIN = { id: CHAIN.id, name: CHAIN.name, nativeCurrency: { name:'Ether', symbol:'ETH', decimals:18 }, rpcUrls:{ default:{ http:[CHAIN.rpc] } } };
  async function devClients(create) {
    const v = await viem();
    let sk = devSk();
    if (!sk) {
      if (!create) return null;
      sk = '0x' + [...crypto.getRandomValues(new Uint8Array(32))].map(b => b.toString(16).padStart(2,'0')).join('');
      localStorage.setItem(DEV_SK, sk);
    }
    const account = v.privateKeyToAccount(sk);
    return { v, account,
      pub: v.createPublicClient({ chain: DEV_CHAIN, transport: v.http(CHAIN.rpc) }),
      wal: v.createWalletClient({ account, chain: DEV_CHAIN, transport: v.http(CHAIN.rpc) }) };
  }
  async function devBalance() { try { const c = await devClients(false); if (!c) return null; return await c.pub.getBalance({ address: c.account.address }); } catch (e) { return null; } }
  async function devSend(tx) {
    const c = await devClients(false); if (!c) throw Error('No dev key on this browser.');
    const bal = await c.pub.getBalance({ address: c.account.address });
    if (bal <= BigInt(tx.value)) throw Error('The dev key is out of ETH. Top it up from the dev panel.');
    const hash = await c.wal.sendTransaction({ to: tx.to, data: tx.data, value: BigInt(tx.value) });
    toast('Sent from the dev key. No signature asked.');
    const r = await c.pub.waitForTransactionReceipt({ hash });
    if (r.status !== 'success') throw Error('The transaction reverted on-chain.');
    return { hash, receipt: r };
  }
  async function devPanel() {
    const c = await devClients(true);
    const m = document.createElement('div'); m.className = 'modal dev-panel';
    const row = (k, v) => `<div class="dev-row"><span class="k">${k}</span><span class="v">${v}</span></div>`;
    m.innerHTML = `<div class="card modal-card dev-card"><button class="modal-x" data-x aria-label="Close"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="2"/></svg></button>
      <h2 class="modal-title">Dev key</h2>
      <p class="dev-note">Every on-chain action in dev mode is signed by this key, with no wallet prompt. It spends real ETH on chain ${CHAIN.id}.</p>
      <div class="dev-rows">
      ${row('Address', `<span class="mono">${short(c.account.address)}</span>`)}
      ${row('Balance', `<span class="mono" data-bal>checking…</span>`)}
      </div>
      <div class="dev-fund"><label class="field dev-amt"><span>Amount in ETH</span><input data-amt type="text" inputmode="decimal" value="0.01"></label><button class="btn accent" data-fund>Fund from my wallet</button></div>
      <div class="gate-actions"><button class="btn ghost" data-drain>Send it all back</button><button class="btn ghost" data-copy>Copy private key</button></div>
      <p class="dev-warn">Anyone with access to this browser can spend this key. Keep only what you are willing to lose.</p></div>`;
    document.body.appendChild(m);
    const setBal = async () => { const b = await devBalance(); const el = m.querySelector('[data-bal]'); if (el) el.textContent = b === null ? 'unreachable' : (Number(b) / 1e18).toFixed(5) + ' ETH'; };
    setBal();
    m.onclick = async e => {
      if (e.target === m || e.target.closest('[data-x]')) return m.remove();
      try {
        if (e.target.closest('[data-copy]')) { await navigator.clipboard.writeText(devSk()); return toast('Private key copied.'); }
        if (e.target.closest('[data-fund]')) {
          if (!state.address) await openWalletModal();
          await ensureChain();
          const eth = Number(m.querySelector('[data-amt]').value); if (!(eth > 0)) throw Error('Enter an amount.');
          const val = '0x' + BigInt(Math.round(eth * 1e18)).toString(16);
          await state.provider.request({ method:'eth_sendTransaction', params:[{ from: state.address, to: c.account.address, value: val }] });
          toast('Funding sent. Balance updates in a few seconds.'); setTimeout(setBal, 6000); return;
        }
        if (e.target.closest('[data-drain]')) {
          if (!state.address) await openWalletModal();
          const bal = await c.pub.getBalance({ address: c.account.address });
          const gp = await c.pub.getGasPrice(); const fee = gp * 21000n * 2n;
          if (bal <= fee) throw Error('Not enough left to cover gas.');
          const hash = await c.wal.sendTransaction({ to: state.address, value: bal - fee });
          toast('Sent back to your wallet.'); await c.pub.waitForTransactionReceipt({ hash }); setBal(); return;
        }
      } catch (err) { toast(err.message || 'That did not go through.'); }
    };
  }
  function devGate() {
    if (!isDev()) return;
    try { if (localStorage.getItem(DEV_ACK) === '1') return; } catch (e) { return; }
    const m = document.createElement('div'); m.className = 'modal gate dev-gate'; m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true');
    m.innerHTML = `<div class="card modal-card gate-card">
      <h2 class="modal-title">Dev mode</h2>
      <p>Dev mode is the fast lane. No animation, no video, no chrome, and no wallet prompt between you and the chain.</p>
      <p>You sign <b>once</b> when you turn it on. That single signature opens your session across the whole site, so nothing asks you to sign in again.</p>
      <p>After that, glia creates a <b>dev key inside this browser</b>. You fund it from your wallet, and every launch, buy and sell is signed by that key on its own.</p>
      <div class="dev-warnbox"><b>Read this before you accept.</b><ul>
        <li>Transactions go through with <b>no confirmation step</b>. A click is the whole flow.</li>
        <li>It spends <b>real ETH</b> on chain ${CHAIN.id}. Nothing here is a testnet.</li>
        <li>The dev key sits in this browser's storage. Anyone on this machine can drain it. It is not backed up.</li>
        <li>Mistakes are final. There is no confirm dialog to catch a wrong click and no way to reverse a transaction.</li>
        <li>Fund it with small amounts only. Send the rest back when you are done.</li>
      </ul></div>
      <div class="gate-actions"><button class="btn ghost" data-no>Leave dev mode</button><button class="btn accent" data-yes>I understand, enable it</button></div>
    </div>`;
    m.addEventListener('click', async e => {
      if (e.target.closest('[data-no]')) { m.remove(); return setTheme(false); }
      if (!e.target.closest('[data-yes]')) return;
      localStorage.setItem(DEV_ACK, '1'); m.remove();
      try {
        if (!state.address) await openWalletModal();
        await login();
        await devPanel();
      } catch (err) { toast(err.message || 'Connect a wallet to finish setting up dev mode.'); }
    });
    const mount = () => document.body.appendChild(m);
    document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);
  }
  function devChip() {
    if (!isDev()) return;
    const right = document.querySelector('.pill-right'); if (!right || right.querySelector('.dev-chip')) return;
    const b = document.createElement('button'); b.className = 'dev-chip'; b.type = 'button'; b.title = 'Dev key';
    b.innerHTML = '<span class="mono" data-chipbal>dev</span>';
    b.onclick = () => devPanel();
    right.insertBefore(b, right.firstChild);
    devBalance().then(v => { const el = b.querySelector('[data-chipbal]'); if (el) el.textContent = v === null ? 'dev' : 'dev ' + (Number(v)/1e18).toFixed(3); });
  }

  async function sendTx(tx, expectedTo) {
    if (!tx || tx.chainId !== CHAIN.id || !/^0x[0-9a-fA-F]{40}$/.test(tx.to) || (expectedTo && tx.to.toLowerCase() !== expectedTo.toLowerCase()) || !/^0x[0-9a-fA-F]*$/.test(tx.data) || !/^0x[0-9a-fA-F]+$/.test(tx.value)) throw Error('The transaction did not match the expected contract.');
    if (devOn()) return devSend(tx);
    await ensureChain();
    const bal = BigInt(await state.provider.request({ method:'eth_getBalance', params:[state.address,'latest'] }));
    if (bal <= BigInt(tx.value)) throw Error('Your wallet needs enough ETH for the transaction plus gas.');
    const hash = await state.provider.request({ method:'eth_sendTransaction', params:[{ from: state.address, to: tx.to, data: tx.data, value: tx.value }] });
    toast('Submitted. Waiting for confirmation.');
    for (let i = 0; i < 90; i++) { const r = await state.provider.request({ method:'eth_getTransactionReceipt', params:[hash] }); if (r) { if (parseInt(r.status,16) !== 1) throw Error('The transaction reverted on-chain.'); return { hash, receipt: r }; } await new Promise(r => setTimeout(r, 2000)); }
    throw Error('Still pending. Check your wallet, then refresh.');
  }
  // SIWE-style session: server issues a nonce, wallet signs, server sets cookie.
  async function login() {
    if (session?.address?.toLowerCase() === state.address?.toLowerCase()) return session;
    await ensureChain();
    const { nonce, message } = await api('auth/nonce', { address: state.address });
    const sig = await state.provider.request({ method:'personal_sign', params:[message, state.address] });
    session = await api('auth/verify', { address: state.address, signature: sig, nonce });
    renderNav(); return session;
  }
  async function me() { if (session) return session; try { const r = await api('auth/me'); session = r?.address ? r : null; if (session && !state.address) state.address = session.address; } catch { session = null; } return session; }

  // ---------- address resolution + raw RPC (works with no injected wallet)
  async function devAddress(){ try { const c = await devClients(false); return c ? c.account.address : null; } catch(e){ return null; } }
  async function rpcCall(to, data){
    const r = await fetch(CHAIN.rpc, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ jsonrpc:'2.0', id:1, method:'eth_call', params:[{ to, data }, 'latest'] }) });
    const j = await r.json();
    if (j.error) throw Error(j.error.message || 'RPC call failed.');
    return j.result;
  }
  async function activeAddress(){ if (devOn()) { const a = await devAddress(); if (a) return a; } if (state.address) return state.address; const m = await me().catch(()=>null); return (m && m.address) || null; }

  // ---------- nav / footer
  function navDesktop(path) {
    const caret = '<svg class="nd-caret" viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return NAV_GROUPS.map(g => {
      if (!Array.isArray(g[1])) return `<a href="${href(g[0])}" class="${path.startsWith(g[0])?'active':''}">${g[1]}</a>`;
      const on = g[1].some(x => path.startsWith(x[0]));
      return `<div class="nd"><button type="button" class="nd-btn${on?' active':''}" aria-haspopup="true" aria-expanded="false">${g[0]}${caret}</button><div class="nd-menu" role="menu">${g[1].map(([p,l,d]) => `<a role="menuitem" href="${href(p)}" class="${path.startsWith(p)?'active':''}"><b>${l}</b><span>${d}</span></a>`).join('')}</div></div>`;
    }).join('');
  }
  function renderNav() {
    const path = location.pathname.replace(base.pathname.replace(/\/$/,''), '') || '/';
    const nav = $('#nav'); if (!nav) return;
    nav.innerHTML = `<div class="wrap nav-row"><div class="pill pill-left"><a class="brand" href="${href('/')}"><span class="mark">${MARK}</span><span class="wm-text">${BRAND.name}</span></a><nav class="nav-links">${navDesktop(path)}</nav><button class="btn sm ghost nav-burger" id="burger" aria-label="menu">&#9776;</button></div><div class="pill pill-right"><button class="theme-tg" id="theme-tg" type="button" title="${isDev() ? 'Standard theme' : 'Dev theme'}" aria-label="Toggle theme" aria-pressed="${isDev()}"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2.2v15.6a7.8 7.8 0 0 1 0-15.6z"/></svg></button><a class="nav-x" href="https://x.com/useglia" target="_blank" rel="noopener" aria-label="glia on X"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L0 1.2h7.7l5.3 7 6-7zm-1.3 19.4h2L6.6 3.3H4.4l13.2 17.3z"/></svg></a><a class="nav-x nav-pons" href="https://www.ponsfamily.com/launchpad" data-pons target="_blank" rel="noopener" aria-label="glia on pons"><svg width="17" height="17" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M209 79L307 79L307 80L317 80L317 81L326 82L328 84L338 87L339 89L343 90L348 95L350 95L358 103L358 105L360 106L360 108L362 109L362 111L364 112L364 114L366 115L369 121L369 124L372 129L373 139L374 139L374 263L373 263L373 268L372 268L372 271L368 279L361 286L351 291L342 292L342 293L264 293L264 294L259 295L255 299L254 305L253 305L253 393L252 393L251 403L248 409L241 417L239 417L236 420L229 421L229 422L189 423L189 422L179 422L179 421L172 420L162 415L160 412L158 412L149 403L149 401L145 397L144 392L142 391L142 388L140 385L139 377L138 377L138 149L139 149L139 138L140 138L140 132L142 129L142 125L147 115L153 108L153 106L163 96L165 96L172 90L184 84L194 82L194 81L209 80ZM210 82L207 84L197 85L195 87L212 86L212 85L244 85L244 84L239 84L239 83L230 84L230 83ZM310 83L309 84L297 84L297 85L321 87L319 85L315 85L314 83ZM210 89L200 90L200 91L190 93L188 95L185 95L184 97L177 99L175 102L170 104L163 111L163 113L159 116L159 118L156 120L155 124L152 127L150 137L149 137L150 363L151 363L152 298L153 298L152 290L153 290L153 237L154 237L154 233L153 233L154 231L154 148L155 148L155 142L156 142L156 138L157 138L157 134L160 129L160 126L162 122L164 121L166 115L168 114L170 108L173 106L173 104L182 102L183 100L187 100L192 97L210 95L210 94L307 94L307 95L297 95L297 96L283 97L283 98L263 98L263 99L217 99L217 100L201 99L201 100L195 100L195 101L189 102L175 111L175 113L171 116L167 124L168 126L165 129L165 132L162 133L160 140L159 140L159 145L158 145L159 267L160 267L162 218L163 218L162 214L163 214L163 191L164 191L164 170L165 170L165 140L166 140L166 134L168 134L169 131L173 127L175 127L176 124L178 124L181 120L184 120L185 118L191 115L202 113L202 111L206 112L208 110L210 111L210 110L216 110L216 109L308 108L308 109L315 109L317 111L321 111L321 112L324 112L325 114L333 116L344 127L345 132L349 136L351 134L350 122L342 108L345 109L345 111L352 117L353 121L355 121L355 119L350 114L350 112L347 110L347 108L345 108L345 106L342 105L339 101L337 101L336 99L334 99L333 97L329 95L326 95L324 93L321 93L315 90L307 90L307 89ZM359 121L358 121L358 125L359 125L361 135L362 135L362 147L363 147L363 152L364 152L364 200L365 200L365 218L366 218L366 142L365 142L364 131ZM146 129L144 132L143 144L142 144L142 270L143 270L143 148L144 148L144 138L145 138ZM366 243L364 246L363 253L360 257L358 267L361 266L363 260L365 259L364 256L365 256L365 251L366 251ZM262 277L246 281L243 287L244 288L247 287L251 282L255 280L266 279ZM271 277L270 279L277 279L277 278L321 279L321 278L326 278L326 277ZM298 282L297 283L265 283L265 284L334 284L331 282ZM252 286L248 288L246 296L247 294L248 295L250 294L249 292L250 290L251 290L250 292L254 292L255 288ZM244 348L243 348L242 382L238 390L238 397L243 391ZM167 405L166 406L169 407L170 409L178 411L178 412L182 412L182 413L201 413L201 412L196 412L190 409L181 410L171 405Z"/></svg></a>${state.address ? `<button class="btn sm ghost mono" data-acct>${short(state.address)}</button>` : `<button class="btn sm ghost" data-connect>Connect wallet</button>`}<a class="btn sm accent" href="${href('/launch')}">Launch a coin</a></div></div><div class="nav-mobile" id="navm"><button class="theme-tg" id="theme-tg-m" type="button" title="${isDev() ? 'Standard theme' : 'Dev theme'}" aria-label="Toggle theme" aria-pressed="${isDev()}"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2.2v15.6a7.8 7.8 0 0 1 0-15.6z"/></svg></button>${NAV.map(([p,l])=>`<a href="${href(p)}" class="${path.startsWith(p)?'active':''}">${l}</a>`).join('')}<div class="nm-actions">${state.address ? `<button class="btn sm ghost mono" data-acct>${short(state.address)}</button>` : `<button class="btn sm ghost" data-connect>Connect wallet</button>`}<a class="btn sm accent" href="${href('/launch')}">Launch a coin</a></div></div>`;
    const stuck = () => { if (window.scrollY > 8) nav.setAttribute('data-stuck',''); else nav.removeAttribute('data-stuck'); };
    if (!nav.dataset.scrollBound) { nav.dataset.scrollBound = '1'; addEventListener('scroll', stuck, { passive: true }); }
    stuck();
    // the pons mark points at our own token page once the official CA is set
    official().then(o => { if (o && o.link) document.querySelectorAll('[data-pons]').forEach(a => a.href = o.link); }).catch(() => {});
    const tg = $('#theme-tg'); if (tg) tg.addEventListener('click', () => setTheme(!isDev()));
    devChip();
    const closeAll = ex => nav.querySelectorAll('.nd.open').forEach(d => { if (d !== ex) { d.classList.remove('open'); d.firstElementChild.setAttribute('aria-expanded','false'); } });
    nav.querySelectorAll('.nd').forEach(d => {
      const b = d.firstElementChild; let t;
      b.addEventListener('click', e => { e.stopPropagation(); const o = !d.classList.contains('open'); closeAll(d); d.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o)); });
      d.addEventListener('mouseenter', () => { if (!matchMedia('(hover:hover)').matches) return; clearTimeout(t); closeAll(d); d.classList.add('open'); b.setAttribute('aria-expanded','true'); });
      d.addEventListener('mouseleave', () => { if (!matchMedia('(hover:hover)').matches) return; t = setTimeout(() => { d.classList.remove('open'); b.setAttribute('aria-expanded','false'); }, 160); });
    });
    if (!nav.dataset.ndBound) { nav.dataset.ndBound = '1'; document.addEventListener('click', e => { if (!e.target.closest('.nd')) closeAll(); }); document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); }); }
    const tgm = $('#theme-tg-m'); if (tgm) tgm.addEventListener('click', () => setTheme(!isDev()));
    // sliding indicator under the active tab; follows hover and returns to the active page
    const links = $('.nav-links', nav); if (links && !isDev()) {
      const ind = document.createElement('span'); ind.className = 'nav-ind'; links.appendChild(ind);
      const moveTo = a => { if (!a) { ind.classList.remove('on'); return; } ind.style.left = ((a.closest('.nd') || a).offsetLeft + 12) + 'px'; ind.style.width = Math.max(0, a.offsetWidth - 24) + 'px'; ind.classList.add('on'); };
      const active = () => links.querySelector(':scope > a.active, :scope > .nd > .nd-btn.active');
      requestAnimationFrame(() => { ind.style.transition = 'none'; moveTo(active()); requestAnimationFrame(() => { ind.style.transition = ''; }); });
      for (const a of links.querySelectorAll(':scope > a, :scope > .nd')) a.addEventListener('mouseenter', () => moveTo(a.classList.contains('nd') ? a.firstElementChild : a));
      links.addEventListener('mouseleave', () => moveTo(active()));
      addEventListener('resize', () => moveTo(active()), { passive: true });
    }
    // fade the page out before a same-site navigation when the browser lacks cross-document view transitions
    if (!nav.dataset.navBound) { nav.dataset.navBound = '1'; document.addEventListener('click', e => {
      if (isDev()) return; // no page-leave fade in dev mode
      const a = e.target.closest('a[href]'); if (!a || a.target === '_blank' || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const u = new URL(a.href, location.href); if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (CSS.supports && CSS.supports('view-transition-name', 'x') && 'navigation' in window) return; // native cross document transition handles it
      const pg = document.querySelector('main.page'); if (!pg) return;
      e.preventDefault(); pg.classList.add('leaving'); setTimeout(() => { location.href = u.href; }, 190);
    }); }
    for (const b of document.querySelectorAll('[data-connect]')) b.addEventListener('click', () => openWalletModal().catch(e => e.message !== 'Cancelled.' && toast(e.message)));
    for (const b of document.querySelectorAll('[data-acct]')) b.addEventListener('click', () => { if (confirm('Disconnect this wallet from the page?')) { state.provider = null; state.address = null; session = null; localStorage.removeItem('glia.wallet'); api('auth/logout', {}).catch(()=>{}); renderNav(); } });
    const burger = $('#burger'), navm = $('#navm');
    if (burger && navm) {
      const place = () => { const r = burger.getBoundingClientRect(); navm.style.top = (r.bottom + 8) + 'px'; navm.style.right = Math.max(12, innerWidth - r.right) + 'px'; };
      burger.addEventListener('click', e => { e.stopPropagation(); place(); navm.classList.toggle('open'); });
      document.addEventListener('click', e => { if (navm.classList.contains('open') && !navm.contains(e.target)) navm.classList.remove('open'); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') navm.classList.remove('open'); });
      addEventListener('resize', () => { if (navm.classList.contains('open')) place(); }, { passive: true });
    }
    if (!document.getElementById('mit-modal')) {
      const m = document.createElement('div');
      m.id = 'mit-modal';
      m.style.cssText = 'display:none';
      m.className = 'modal';
      m.innerHTML = '<div class="sheet" style="max-width:540px;width:100%;padding:2rem 2.5rem;border-radius:24px;background:var(--panel-a);box-shadow:0 24px 60px -10px rgba(11,26,51,.18);position:relative"><button onclick="document.getElementById(\'mit-modal\').style.display=\'none\'" style="position:absolute;top:1rem;right:1rem;background:none;border:none;cursor:pointer;font-size:20px;color:#666;line-height:1" aria-label="Close">&times;</button><h2 style="margin:0 0 1.2rem;font-family:var(--head);font-size:1.3rem;font-weight:700">MIT License</h2><pre style="white-space:pre-wrap;word-break:break-word;font-family:var(--mono);font-size:13px;line-height:1.7;color:var(--ink);margin:0">Copyright (c) 2026 Glia\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</pre></div>';
      m.addEventListener('click', e => { if (e.target === m) m.style.display = 'none'; });
      document.body.appendChild(m);
    }
    if (!isDev() && !document.querySelector('.sky-bg')) {
      const sky = document.createElement('div');
      sky.className = 'sky-bg';
      sky.innerHTML = '<div class="sky-img"></div>';
      document.body.prepend(sky);
    }
    document.querySelectorAll('.btn.cta .mark:empty').forEach(m => m.innerHTML = MARK);
    const f = $('#footer'); if (f) f.innerHTML = `<div class="wrap"><div class="fgrid"><div><a class="brand" href="${href('/')}"><span class="mark">${MARK}</span>${BRAND.name}</a><p class="ftxt">Every trade buys thinking. Tokens launch on pons v2 on Robinhood Chain (chain 4663); two percent of every curve trade funds a shared compute pool that holders draw on.</p><div class="fstatus"><span class="dot" id="f-dot"></span><span id="f-chain">Robinhood Chain · 4663</span></div></div><div><p class="eyebrow">Product</p><div class="flinks"><a href="${href('/launch')}">Launch a coin</a><a href="${href('/explore')}">Explore</a><a href="${href('/live')}">Live</a><a href="${href('/leaderboard')}">Leaderboards</a><a href="${href('/models')}">Models</a><a href="${href('/chat')}">Chat</a></div></div><div><p class="eyebrow">Developers</p><div class="flinks"><a href="${href('/keys')}">API keys</a><a href="${href('/docs')}">Docs</a><a href="${href('/docs')}#api">API reference</a><a href="${CHAIN.explorer}" target="_blank" rel="noopener">Block explorer</a></div></div><div><p class="eyebrow">Company</p><div class="flinks"><a href="${href('/')}">Home page</a><a href="${href('/article')}">About glia</a><a href="${href('/offspring')}">Offspring</a><a href="${href('/terms')}">Terms of use</a><a href="${href('/privacy')}">Privacy</a><a href="${href('/risk')}">Risk disclosure</a></div></div><div><p class="eyebrow">Community</p><div class="flinks"><a href="https://x.com/useglia" target="_blank" rel="noopener" class="f-x">X / Twitter</a><a href="https://www.ponsfamily.com/launchpad" target="_blank" rel="noopener">pons launchpad</a><a href="mailto:hello@glia.fun">hello@glia.fun</a></div></div></div><div class="fbottom"><span>&copy; ${new Date().getFullYear()} ${BRAND.display}. All rights reserved.</span><span class="fnote">Tokens on glia are experimental, unaudited, and can lose all value. Nothing here is financial advice.</span><span class="mono"><a href="${href('/terms')}">Terms</a> · <a href="${href('/privacy')}">Privacy</a> · <a href="${href('/risk')}">Risk</a> · <a href="#" onclick="document.getElementById('mit-modal').style.display='grid';return false">MIT</a> · pons v2 · Robinhood Chain</span></div></div>`;
    api('status').then(st => { const d = $('#f-dot'); if (d) d.classList.add(st && st.ok ? 'ok' : 'bad'); }).catch(() => {});
  }
  async function autoReconnect() {
    const want = localStorage.getItem('glia.wallet'); if (!want) return;
    await new Promise(r => setTimeout(r, 150));
    const p = providers().find(w => w.info.name === want); if (!p) return;
    try { const accts = await p.provider.request({ method:'eth_accounts' }); if (accts[0]) { state.provider = p.provider; state.address = accts[0]; state.chainId = await p.provider.request({ method:'eth_chainId' }); renderNav(); document.dispatchEvent(new CustomEvent('glia:wallet', { detail:{ address: accts[0] } })); } } catch {}
  }

  /* popups: bottom right launch / trade / graduation / note feed */
  (function popups(){
    const KEY='glia.popupsSince'; const seen=new Set(); let since=Number(localStorage.getItem(KEY)||0); if(!since){ since=Math.floor(Date.now()/1000); localStorage.setItem(KEY,String(since)); }
    let stack=null;
    function box(){ if(!stack){ stack=document.createElement('div'); stack.className='pops'; document.body.appendChild(stack); } return stack; }
    function title(e){
      if(e.type==='launch') return `${e.symbol} just launched`;
      if(e.type==='graduated') return `${e.symbol} graduated to the DEX`;
      if(e.type==='trade') return `${e.side==='sell'?'Sell':'Buy'} on ${e.symbol}${e.ethAmount?` · ${Number(e.ethAmount).toFixed(4)} ETH`:''}`;
      if(e.type==='note') return `${e.symbol} wrote today's note`;
      if(e.type==='post') return `${e.symbol} posted in the agora`;
      return e.symbol||'glia';
    }
    function show(e){
      const st=box(); if(st.children.length>=3) st.firstElementChild?.remove();
      const el=document.createElement('a'); el.className='pop pop-'+esc(e.type||'x');
      el.href = e.type==='note' && e.noteId ? href('/note/'+e.noteId) : href('/token/'+e.token);
      el.innerHTML = `<img class="pop-logo" src="${href(e.logoUrl||('/api/token/'+e.token+'/logo'))}" alt="" onerror="this.style.visibility='hidden'"><div class="pop-body"><div class="pop-title">${esc(title(e))}</div><div class="pop-sub">${esc(e.name||'')}${e.model?` · ${esc(String(e.model).split('/').pop())}`:''}<span class="pop-time"> · ${esc(ago(e.at))}</span></div></div><button class="pop-x" aria-label="dismiss">&times;</button>`;
      let t=setTimeout(()=>el.remove(),8000);
      el.onmouseenter=()=>clearTimeout(t); el.onmouseleave=()=>{ t=setTimeout(()=>el.remove(),4000); };
      el.querySelector('.pop-x').onclick=(ev)=>{ ev.preventDefault(); ev.stopPropagation(); el.remove(); };
      st.appendChild(el); if (isDev()) el.classList.add('in'); else requestAnimationFrame(()=>el.classList.add('in'));
    }
    async function tick(){
      try{ const r=await api('live/recent?since='+since); const list=(r.events||[]).slice().sort((a,b)=>a.at-b.at);
        for(const e of list){ if(!e.id||seen.has(e.id)) continue; seen.add(e.id); if(e.at>since) since=e.at; show(e); }
        localStorage.setItem(KEY,String(since));
      }catch(_){}
    }
    document.addEventListener('DOMContentLoaded',()=>{ setTimeout(tick,1500); setInterval(tick,10000); });
  })();

  /* themed dropdowns: keeps the native <select> as the source of truth, paints an in page listbox so the scrollbar is ours */
  function fancySelect(sel){
    if(sel.dataset.xsel||sel.multiple||sel.size>1) return;
    sel.dataset.xsel='1';
    const wrap=document.createElement('div');
    wrap.className='xsel'+(sel.classList.contains('sel')?' sm inline':'');
    sel.parentNode.insertBefore(wrap,sel); wrap.appendChild(sel);
    const btn=document.createElement('button'); btn.type='button'; btn.className='xsel-btn';
    btn.setAttribute('aria-haspopup','listbox'); btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span class="xsel-val"></span>';
    const menu=document.createElement('div'); menu.className='xsel-menu'; menu.setAttribute('role','listbox');
    wrap.appendChild(btn); wrap.appendChild(menu);
    let cursor=-1;
    const opts=()=>Array.from(sel.options);
    function paint(){
      const cur=sel.selectedIndex;
      btn.querySelector('.xsel-val').textContent = cur>=0 ? sel.options[cur].text : '';
      menu.innerHTML='';
      opts().forEach((o,i)=>{
        const row=document.createElement('div');
        row.className='xsel-opt'; row.setAttribute('role','option');
        row.setAttribute('aria-selected', i===cur?'true':'false');
        row.dataset.i=i;
        const t=o.text; const mt=t.match(/^(.*)\s\(([^()]+)\)$/);
        row.innerHTML = mt ? `<span>${esc(mt[1])}</span><small>${esc(mt[2])}</small>` : `<span>${esc(t)}</span>`;
        if(o.disabled) row.style.opacity='.45';
        menu.appendChild(row);
      });
    }
    function moveCursor(i){
      const rows=Array.from(menu.children); if(!rows.length) return;
      cursor=Math.max(0,Math.min(rows.length-1,i));
      rows.forEach((r,n)=>r.classList.toggle('cursor',n===cursor));
      rows[cursor].scrollIntoView({block:'nearest'});
    }
    function open(){
      if(wrap.classList.contains('open')) return;
      paint();
      const below=window.innerHeight-wrap.getBoundingClientRect().bottom;
      wrap.classList.toggle('up', below<260);
      wrap.classList.add('open'); btn.setAttribute('aria-expanded','true');
      moveCursor(Math.max(0,sel.selectedIndex));
      const cur=menu.querySelector('[aria-selected="true"]'); if(cur) cur.scrollIntoView({block:'center'});
    }
    function close(){ wrap.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    function choose(i){
      if(i<0||i>=sel.options.length||sel.options[i].disabled) return;
      if(sel.selectedIndex!==i){ sel.selectedIndex=i; sel.dispatchEvent(new Event('input',{bubbles:true})); sel.dispatchEvent(new Event('change',{bubbles:true})); }
      paint(); close(); btn.focus();
    }
    btn.addEventListener('click',e=>{ e.preventDefault(); wrap.classList.contains('open')?close():open(); });
    menu.addEventListener('mousedown',e=>e.preventDefault());
    menu.addEventListener('click',e=>{ const r=e.target.closest('.xsel-opt'); if(r) choose(+r.dataset.i); });
    btn.addEventListener('keydown',e=>{
      const isOpen=wrap.classList.contains('open');
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){ e.preventDefault(); if(!isOpen){ open(); return; } moveCursor(cursor+(e.key==='ArrowDown'?1:-1)); }
      else if(e.key==='Enter'||e.key===' '){ e.preventDefault(); isOpen?choose(cursor):open(); }
      else if(e.key==='Escape'&&isOpen){ e.preventDefault(); close(); }
      else if(e.key==='Home'&&isOpen){ e.preventDefault(); moveCursor(0); }
      else if(e.key==='End'&&isOpen){ e.preventDefault(); moveCursor(sel.options.length-1); }
      else if(isOpen&&e.key.length===1){ const q=e.key.toLowerCase(); const i=opts().findIndex(o=>o.text.toLowerCase().startsWith(q)); if(i>=0) moveCursor(i); }
    });
    document.addEventListener('click',e=>{ if(!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    window.addEventListener('resize',close);
    new MutationObserver(()=>paint()).observe(sel,{childList:true,subtree:true,attributes:true,attributeFilter:['value']});
    sel.addEventListener('change',paint);
    const desc=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value');
    try{ Object.defineProperty(sel,'value',{get(){return desc.get.call(sel);},set(v){ desc.set.call(sel,v); paint(); },configurable:true}); }catch(_){}
    paint();
  }
  function fancySelects(root){ (root||document).querySelectorAll('select:not([data-xsel]):not([data-plain])').forEach(fancySelect); }

  // ---------- official token: reserved first slot in every market grid and table
  let _official = null;
  let _officialSync = null;
  function official() { return _official || (_official = api('official').then(d => { _officialSync = d; return d; }).catch(() => { const d = { name: 'Glia', symbol: 'GLIA', pairedWith: 'Glia', token: null, live: false }; _officialSync = d; return d; })); }
  function officialLogo() { return `<span class="official-logo">${MARK}</span>`; }
  function officialCard(o) {
    const inner = `<div class="mkt-head">${officialLogo()}<div class="mkt-name"><span class="n">${esc(o.name)}</span><span class="chip">${esc(o.symbol)}</span></div></div>
      <div class="mkt-sub"><span class="mono">${o.live ? '' : 'Launching soon'}</span><span class="chip official">Paired to ${esc(o.pairedWith)}</span></div>
      <div class="mkt-stats"><span>Price <b>soon</b></span><span>24h vol <b>soon</b></span></div>
      <div class="mkt-grad"><span class="bar"><i style="width:0%"></i></span><span class="mono faint">0%</span></div>
      <div class="mkt-foot"><span class="chip">Official</span><span class="faint">${o.link ? `<a href="${esc(o.link)}" target="_blank" rel="noopener">link ↗</a>` : 'launching soon'}</span></div>`;
    return `<div class="mkt-card official-slot placeholder">${inner}</div>`;
  }
  function officialRow(cols) {
    // cols = total column count of the table; first cell is the token cell, second is model/backs, remaining are filled with n/a except the last which gets the chip
    const o = _officialSync || { name: 'Glia', symbol: 'GLIA', pairedWith: 'Glia' };
    const cells = [`<td><div class="tok">${officialLogo()}<span><span class="n">${esc(o.name)}</span><br><span class="s">${esc(o.symbol)} · paired to ${esc(o.pairedWith)}</span></span></div></td>`, `<td><span class="chip official">Official</span></td>`];
    for (let i = 2; i < cols - 1; i++) cells.push('<td class="num faint">soon</td>');
    cells.push('<td><span class="chip">Soon</span></td>');
    return `<tr class="official-row">${cells.join('')}</tr>`;
  }

  document.addEventListener('DOMContentLoaded', () => { devGate(); renderNav(); autoReconnect(); fancySelects(); new MutationObserver(()=>fancySelects()).observe(document.body,{childList:true,subtree:true}); });
  return { devPanel, devBalance, devOn, BRAND, CHAIN, base, href, $, esc, api, fmtUsd, fmtEth, fromWei, toWei, ago, short, pct, toast, state, fancySelects, openWalletModal, ensureChain, sendTx, login, me, renderNav, official, officialCard, officialRow, setTheme, isDev, devAddress, rpcCall, activeAddress };
})();
