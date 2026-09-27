/* glia shell: brand, nav, wallet (EIP-6963 + window.ethereum), api helpers, formatters. Loaded by every page. */
window.GLIA = (() => {
  const MARK = '<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M0.01 83.15C0.01 69.51 0.02 67.30 0.08 67.75C0.47 70.60 1.73 73.07 3.83 75.07C5.76 76.92 7.60 77.88 10.45 78.51C13.72 79.24 16.32 80.81 18.29 83.27C19.64 84.97 20.36 86.51 20.83 88.77C21.10 90.04 21.38 90.90 21.81 91.80C23.71 95.74 27.69 98.51 32.20 99.02C32.43 99.05 25.76 99.07 16.30 99.08L0.00 99.08L0.01 83.15ZM35.26 99.00C39.68 98.52 43.70 95.84 45.95 91.86C46.65 90.63 47.08 89.42 47.37 87.93C47.52 87.15 47.51 66.40 47.36 65.76C47.08 64.56 46.72 63.78 46.02 62.85C44.30 60.60 41.17 59.60 38.55 60.48C37.81 60.72 37.53 60.87 35.34 62.12C34.95 62.35 34.43 62.64 34.19 62.78C33.94 62.91 33.44 63.21 33.06 63.43C32.69 63.65 31.89 64.11 31.28 64.45C30.68 64.79 30.02 65.16 29.82 65.28C29.46 65.50 28.34 66.14 27.51 66.61C27.28 66.74 26.85 67.00 26.54 67.17C25.60 67.73 23.57 68.87 23.52 68.87C23.46 68.87 23.40 62.02 23.45 61.71C23.48 61.52 24.16 61.10 26.88 59.57C27.17 59.41 27.70 59.11 28.06 58.90C29.23 58.23 30.15 57.70 32.03 56.63C34.11 55.45 34.44 55.22 35.08 54.55C37.20 52.31 37.38 49.04 35.52 46.56C34.83 45.63 34.19 45.16 31.81 43.81C31.60 43.70 30.96 43.32 30.37 42.98C29.08 42.22 27.60 41.37 27.09 41.10C26.89 40.99 26.60 40.81 26.44 40.71C26.28 40.60 25.99 40.42 25.79 40.31C25.12 39.95 23.64 39.07 23.55 38.99C23.41 38.87 23.40 31.67 23.54 31.61C23.63 31.58 23.85 31.69 25.03 32.38C25.50 32.66 26.10 33.01 26.36 33.15C26.62 33.29 27.15 33.60 27.54 33.82C27.93 34.05 28.88 34.59 29.66 35.04C31.02 35.82 31.59 36.15 32.49 36.68C32.72 36.81 33.58 37.31 34.40 37.78C38.50 40.12 38.68 40.19 40.45 40.20C41.50 40.21 41.87 40.16 42.73 39.89C44.94 39.19 46.67 37.36 47.29 35.07L47.46 34.45L47.45 24.74C47.45 13.03 47.44 12.90 46.94 10.99C45.99 7.37 43.48 4.22 40.16 2.47C38.49 1.60 36.42 1.02 34.63 0.95C34.43 0.94 41.31 0.94 49.92 0.94C58.53 0.94 65.45 0.94 65.29 0.95C59.08 1.33 53.83 6.07 52.78 12.23C52.58 13.36 52.56 14.92 52.58 24.97L52.59 34.45L52.74 34.97C53.48 37.68 55.36 39.48 58.14 40.12C58.41 40.18 58.76 40.20 59.42 40.20C60.98 40.20 61.70 39.98 63.53 38.94C66.04 37.52 67.01 36.96 67.59 36.62C67.92 36.43 68.96 35.83 69.90 35.30C70.83 34.77 72.24 33.96 73.04 33.50C73.83 33.04 74.78 32.49 75.16 32.28C75.53 32.07 75.97 31.81 76.14 31.72C76.31 31.62 76.47 31.56 76.50 31.57C76.52 31.59 76.54 33.08 76.54 35.26C76.54 38.67 76.54 38.92 76.45 38.99C76.33 39.10 74.16 40.39 72.92 41.09C72.62 41.26 72.08 41.57 71.70 41.79C70.25 42.63 69.69 42.95 69.24 43.19C68.98 43.33 68.71 43.48 68.64 43.53C68.49 43.64 67.71 44.10 66.62 44.73C65.20 45.55 64.29 46.53 63.72 47.87C63.13 49.23 63.07 50.94 63.54 52.41C63.86 53.39 64.88 54.72 65.85 55.42C66.03 55.54 66.65 55.92 67.24 56.24C67.82 56.57 68.42 56.91 68.56 57.00C68.81 57.16 69.66 57.65 70.84 58.31C71.14 58.48 71.62 58.76 71.91 58.92C72.20 59.09 72.88 59.48 73.43 59.79C73.98 60.10 74.89 60.63 75.46 60.96L76.49 61.56L76.49 65.15C76.49 67.13 76.47 68.78 76.44 68.82C76.38 68.91 75.98 68.70 73.59 67.30C73.15 67.05 72.31 66.56 71.70 66.22C70.63 65.61 69.70 65.08 68.69 64.48C68.42 64.32 67.96 64.06 67.67 63.90C67.38 63.74 66.69 63.34 66.13 63.01C62.31 60.81 61.83 60.56 60.88 60.34C57.28 59.53 53.56 61.80 52.68 65.34L52.54 65.92L52.53 76.41C52.52 83.14 52.53 87.10 52.56 87.43C52.99 91.78 55.72 95.66 59.76 97.68C61.28 98.44 62.75 98.85 64.71 99.05C64.81 99.06 58.09 99.07 49.76 99.07C37.07 99.07 34.73 99.06 35.26 99.00ZM67.43 98.98C71.66 98.46 75.59 95.77 77.61 92.01C78.08 91.14 78.40 90.17 78.72 88.69C79.24 86.23 80.21 84.42 81.99 82.57C84.01 80.49 86.44 79.15 89.35 78.54C92.26 77.92 94.25 76.91 96.14 75.05C98.38 72.87 99.65 70.27 99.94 67.28C99.97 67.00 99.99 73.54 99.99 82.95L100.00 99.08L83.34 99.08C67.09 99.07 66.69 99.07 67.43 98.98ZM99.95 65.40C99.95 65.04 99.85 64.34 99.71 63.70C99.13 61.11 97.82 58.94 95.60 56.91C93.74 55.21 92.66 53.47 92.32 51.64C92.16 50.76 92.20 49.25 92.42 48.51C92.89 46.87 93.81 45.42 95.14 44.21C97.96 41.65 99.43 39.03 99.92 35.71C99.98 35.31 99.99 37.59 99.99 50.43C100.00 58.79 99.99 65.63 99.97 65.63C99.96 65.63 99.95 65.53 99.95 65.40ZM0.01 32.97L0.00 0.92L17.00 0.92C26.35 0.93 33.68 0.95 33.27 0.97C28.86 1.20 24.78 3.68 22.48 7.53C21.77 8.72 21.22 10.16 20.87 11.75C20.32 14.24 19.36 15.98 17.49 17.90C15.50 19.94 13.35 21.13 10.36 21.85C7.66 22.50 5.79 23.52 3.97 25.32C1.86 27.41 0.71 29.59 0.20 32.43C0.06 33.23 0.03 35.53 0.15 36.31C0.39 37.91 1.08 39.67 2.01 41.10C2.70 42.16 3.35 42.88 4.69 44.12C5.52 44.89 5.94 45.39 6.37 46.13C8.20 49.24 8.04 52.47 5.90 55.27C5.54 55.75 5.11 56.19 4.39 56.84C1.91 59.08 0.52 61.58 0.08 64.55C0.02 64.95 0.01 59.73 0.01 32.97ZM99.93 33.14C99.81 31.57 98.97 29.18 98.06 27.83C97.23 26.58 96.42 25.63 95.58 24.91C93.69 23.27 92.13 22.48 89.63 21.87C86.21 21.03 83.48 19.30 81.59 16.78C80.26 15.01 79.75 13.90 79.19 11.57C78.67 9.43 78.07 8.13 76.76 6.28C76.36 5.72 74.92 4.25 74.30 3.78C72.19 2.16 69.90 1.24 67.30 0.97C67.07 0.95 74.34 0.93 83.44 0.92L100.00 0.92L100.00 17.25C100.00 26.24 99.99 33.59 99.98 33.59C99.97 33.59 99.95 33.38 99.93 33.14Z"/></svg>';
  window.GLIA_MARK = MARK;
  if (!document.querySelector('link[rel="icon"]')) { const l = document.createElement('link'); l.rel = 'icon'; l.type = 'image/svg+xml'; l.href = '/logo.svg'; document.head.appendChild(l); }

  const BRAND = { name: 'glia', display: 'Glia', symbol: 'GLIA' };
  const CHAIN = { id: 4663, hex: '0x1237', name: 'Robinhood Chain', rpc: 'https://rpc.mainnet.chain.robinhood.com', explorer: 'https://robinhoodchain.blockscout.com' };
  const NAV = [['/explore','Explore'],['/live','Live'],['/models','Models'],['/chat','Chat'],['/keys','API'],['/docs','Docs']];
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
      <p>By entering you confirm you are of legal age where you live, you are not in a restricted jurisdiction, and you accept the <a href="/docs#limits">honest limits</a> of this product.</p>
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
  function renderNav() {
    const path = location.pathname.replace(base.pathname.replace(/\/$/,''), '') || '/';
    const nav = $('#nav'); if (!nav) return;
    nav.innerHTML = `<div class="wrap nav-row"><div class="pill pill-left"><a class="brand" href="${href('/')}"><span class="mark">${MARK}</span><span class="wm-text">${BRAND.name}</span></a><nav class="nav-links">${NAV.map(([p,l])=>`<a href="${href(p)}" class="${path.startsWith(p)?'active':''}">${l}</a>`).join('')}</nav><button class="btn sm ghost nav-burger" id="burger" aria-label="menu">&#9776;</button></div><div class="pill pill-right"><button class="theme-tg" id="theme-tg" type="button" title="${isDev() ? 'Standard theme' : 'Dev theme'}" aria-label="Toggle theme" aria-pressed="${isDev()}"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2.2v15.6a7.8 7.8 0 0 1 0-15.6z"/></svg></button><a class="nav-x" href="https://x.com/gliapad" target="_blank" rel="noopener" aria-label="glia on X"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L0 1.2h7.7l5.3 7 6-7zm-1.3 19.4h2L6.6 3.3H4.4l13.2 17.3z"/></svg></a><a class="nav-x nav-pons" href="https://www.ponsfamily.com/launchpad" data-pons target="_blank" rel="noopener" aria-label="glia on pons"><svg width="17" height="17" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M209 79L307 79L307 80L317 80L317 81L326 82L328 84L338 87L339 89L343 90L348 95L350 95L358 103L358 105L360 106L360 108L362 109L362 111L364 112L364 114L366 115L369 121L369 124L372 129L373 139L374 139L374 263L373 263L373 268L372 268L372 271L368 279L361 286L351 291L342 292L342 293L264 293L264 294L259 295L255 299L254 305L253 305L253 393L252 393L251 403L248 409L241 417L239 417L236 420L229 421L229 422L189 423L189 422L179 422L179 421L172 420L162 415L160 412L158 412L149 403L149 401L145 397L144 392L142 391L142 388L140 385L139 377L138 377L138 149L139 149L139 138L140 138L140 132L142 129L142 125L147 115L153 108L153 106L163 96L165 96L172 90L184 84L194 82L194 81L209 80ZM210 82L207 84L197 85L195 87L212 86L212 85L244 85L244 84L239 84L239 83L230 84L230 83ZM310 83L309 84L297 84L297 85L321 87L319 85L315 85L314 83ZM210 89L200 90L200 91L190 93L188 95L185 95L184 97L177 99L175 102L170 104L163 111L163 113L159 116L159 118L156 120L155 124L152 127L150 137L149 137L150 363L151 363L152 298L153 298L152 290L153 290L153 237L154 237L154 233L153 233L154 231L154 148L155 148L155 142L156 142L156 138L157 138L157 134L160 129L160 126L162 122L164 121L166 115L168 114L170 108L173 106L173 104L182 102L183 100L187 100L192 97L210 95L210 94L307 94L307 95L297 95L297 96L283 97L283 98L263 98L263 99L217 99L217 100L201 99L201 100L195 100L195 101L189 102L175 111L175 113L171 116L167 124L168 126L165 129L165 132L162 133L160 140L159 140L159 145L158 145L159 267L160 267L162 218L163 218L162 214L163 214L163 191L164 191L164 170L165 170L165 140L166 140L166 134L168 134L169 131L173 127L175 127L176 124L178 124L181 120L184 120L185 118L191 115L202 113L202 111L206 112L208 110L210 111L210 110L216 110L216 109L308 108L308 109L315 109L317 111L321 111L321 112L324 112L325 114L333 116L344 127L345 132L349 136L351 134L350 122L342 108L345 109L345 111L352 117L353 121L355 121L355 119L350 114L350 112L347 110L347 108L345 108L345 106L342 105L339 101L337 101L336 99L334 99L333 97L329 95L326 95L324 93L321 93L315 90L307 90L307 89ZM359 121L358 121L358 125L359 125L361 135L362 135L362 147L363 147L363 152L364 152L364 200L365 200L365 218L366 218L366 142L365 142L364 131ZM146 129L144 132L143 144L142 144L142 270L143 270L143 148L144 148L144 138L145 138ZM366 243L364 246L363 253L360 257L358 267L361 266L363 260L365 259L364 256L365 256L365 251L366 251ZM262 277L246 281L243 287L244 288L247 287L251 282L255 280L266 279ZM271 277L270 279L277 279L277 278L321 279L321 278L326 278L326 277ZM298 282L297 283L265 283L265 284L334 284L331 282ZM252 286L248 288L246 296L247 294L248 295L250 294L249 292L250 290L251 290L250 292L254 292L255 288ZM244 348L243 348L242 382L238 390L238 397L243 391ZM167 405L166 406L169 407L170 409L178 411L178 412L182 412L182 413L201 413L201 412L196 412L190 409L181 410L171 405Z"/></svg></a>${state.address ? `<button class="btn sm ghost mono" data-acct>${short(state.address)}</button>` : `<button class="btn sm ghost" data-connect>Connect wallet</button>`}<a class="btn sm accent" href="${href('/launch')}">Launch a coin</a></div></div><div class="nav-mobile" id="navm"><button class="theme-tg" id="theme-tg-m" type="button" title="${isDev() ? 'Standard theme' : 'Dev theme'}" aria-label="Toggle theme" aria-pressed="${isDev()}"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2.2v15.6a7.8 7.8 0 0 1 0-15.6z"/></svg></button>${NAV.map(([p,l])=>`<a href="${href(p)}" class="${path.startsWith(p)?'active':''}">${l}</a>`).join('')}<div class="nm-actions">${state.address ? `<button class="btn sm ghost mono" data-acct>${short(state.address)}</button>` : `<button class="btn sm ghost" data-connect>Connect wallet</button>`}<a class="btn sm accent" href="${href('/launch')}">Launch a coin</a></div></div>`;
    const stuck = () => { if (window.scrollY > 8) nav.setAttribute('data-stuck',''); else nav.removeAttribute('data-stuck'); };
    if (!nav.dataset.scrollBound) { nav.dataset.scrollBound = '1'; addEventListener('scroll', stuck, { passive: true }); }
    stuck();
    // the pons mark points at our own token page once the official CA is set
    official().then(o => { if (o && o.link) document.querySelectorAll('[data-pons]').forEach(a => a.href = o.link); }).catch(() => {});
    const tg = $('#theme-tg'); if (tg) tg.addEventListener('click', () => setTheme(!isDev()));
    devChip();
    const tgm = $('#theme-tg-m'); if (tgm) tgm.addEventListener('click', () => setTheme(!isDev()));
    // sliding indicator under the active tab; follows hover and returns to the active page
    const links = $('.nav-links', nav); if (links && !isDev()) {
      const ind = document.createElement('span'); ind.className = 'nav-ind'; links.appendChild(ind);
      const moveTo = a => { if (!a) { ind.classList.remove('on'); return; } ind.style.left = (a.offsetLeft + 12) + 'px'; ind.style.width = Math.max(0, a.offsetWidth - 24) + 'px'; ind.classList.add('on'); };
      const active = () => links.querySelector('a.active');
      requestAnimationFrame(() => { ind.style.transition = 'none'; moveTo(active()); requestAnimationFrame(() => { ind.style.transition = ''; }); });
      for (const a of links.querySelectorAll('a')) a.addEventListener('mouseenter', () => moveTo(a));
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
    const f = $('#footer'); if (f) f.innerHTML = `<div class="wrap"><div class="fgrid"><div><a class="brand" href="${href('/')}"><span class="mark">${MARK}</span>${BRAND.name}</a><p class="ftxt">Every trade buys thinking. Tokens launch on pons v2 on Robinhood Chain (chain 4663); two percent of every curve trade funds a shared compute pool that holders draw on.</p><div class="fstatus"><span class="dot" id="f-dot"></span><span id="f-chain">Robinhood Chain · 4663</span></div></div><div><p class="eyebrow">Product</p><div class="flinks"><a href="${href('/launch')}">Launch a coin</a><a href="${href('/explore')}">Explore</a><a href="${href('/live')}">Live</a><a href="${href('/leaderboard')}">Leaderboards</a><a href="${href('/models')}">Models</a><a href="${href('/chat')}">Chat</a></div></div><div><p class="eyebrow">Developers</p><div class="flinks"><a href="${href('/keys')}">API keys</a><a href="${href('/docs')}">Docs</a><a href="${href('/docs')}#api">API reference</a><a href="${CHAIN.explorer}" target="_blank" rel="noopener">Block explorer</a><a href="https://github.com/neuroncolony/glia" target="_blank" rel="noopener">GitHub</a></div></div><div><p class="eyebrow">Company</p><div class="flinks"><a href="${href('/')}">Home page</a><a href="${href('/article')}">About glia</a><a href="${href('/offspring')}">Offspring</a><a href="${href('/terms')}">Terms of use</a><a href="${href('/privacy')}">Privacy</a><a href="${href('/risk')}">Risk disclosure</a></div></div><div><p class="eyebrow">Community</p><div class="flinks"><a href="https://x.com/gliapad" target="_blank" rel="noopener" class="f-x">X / Twitter</a><a href="https://www.ponsfamily.com/launchpad" target="_blank" rel="noopener">pons launchpad</a><a href="mailto:hello@glia.fun">hello@glia.fun</a></div></div></div><div class="fbottom"><span>&copy; ${new Date().getFullYear()} ${BRAND.display}. All rights reserved.</span><span class="fnote">Tokens on glia are experimental, unaudited, and can lose all value. Nothing here is financial advice.</span><span class="mono"><a href="${href('/terms')}">Terms</a> · <a href="${href('/privacy')}">Privacy</a> · <a href="${href('/risk')}">Risk</a> · <a href="#" onclick="document.getElementById('mit-modal').style.display='grid';return false">MIT</a> · pons v2 · Robinhood Chain</span></div></div>`;
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
      <div class="mkt-stats"><span>Price <b>n/a</b></span><span>24h vol <b>n/a</b></span></div>
      <div class="mkt-grad"><span class="bar"><i style="width:0%"></i></span><span class="mono faint">0%</span></div>
      <div class="mkt-foot"><span class="chip">Official</span><span class="faint">${o.link ? `<a href="${esc(o.link)}" target="_blank" rel="noopener">link ↗</a>` : 'reserved'}</span></div>`;
    return `<div class="mkt-card official-slot placeholder">${inner}</div>`;
  }
  function officialRow(cols) {
    // cols = total column count of the table; first cell is the token cell, second is model/backs, remaining are filled with n/a except the last which gets the chip
    const o = _officialSync || { name: 'Glia', symbol: 'GLIA', pairedWith: 'Glia' };
    const cells = [`<td><div class="tok">${officialLogo()}<span><span class="n">${esc(o.name)}</span><br><span class="s">${esc(o.symbol)} · paired to ${esc(o.pairedWith)}</span></span></div></td>`, `<td><span class="chip official">Official</span></td>`];
    for (let i = 2; i < cols - 1; i++) cells.push('<td class="num faint">n/a</td>');
    cells.push('<td><span class="chip">Soon</span></td>');
    return `<tr class="official-row">${cells.join('')}</tr>`;
  }

  document.addEventListener('DOMContentLoaded', () => { devGate(); renderNav(); autoReconnect(); fancySelects(); new MutationObserver(()=>fancySelects()).observe(document.body,{childList:true,subtree:true}); });
  return { devPanel, devBalance, devOn, BRAND, CHAIN, base, href, $, esc, api, fmtUsd, fmtEth, fromWei, toWei, ago, short, pct, toast, state, fancySelects, openWalletModal, ensureChain, sendTx, login, me, renderNav, official, officialCard, officialRow, setTheme, isDev, devAddress, rpcCall, activeAddress };
})();
