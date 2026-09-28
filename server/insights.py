"""Checkup (per coin health report) and Creator Watch (what every launcher did with their own coin). Read only, built from indexed trades and holder balances."""
import store, chain, hidden
_SUPPLY = {}
def _supply(token):
    k = token.lower()
    if k not in _SUPPLY:
        try: _SUPPLY[k] = int(chain.call(token, 'totalSupply()')[0])
        except Exception: return 0
    return _SUPPLY[k]
def _balances(token): return {a: int(w) for a, w in store.load('holders', {}).get(token.lower(), {}).items() if str(w).isdigit() and int(w) > 0}
def _flows(rows, who):
    b = s = bt = st = 0
    for r in rows:
        if (r.get('trader') or '').lower() != who: continue
        e = int(r.get('ethWei', 0)); t = int(r.get('tokenWei', 0) or 0)
        if r.get('side') == 'buy': b += e; bt += t
        else: s += e; st += t
    return b / 1e18, s / 1e18, bt, st

def checkup(rec, rows, eth_usd):
    tk = rec['token']; now = store.now(); sup = _supply(tk); bal = _balances(tk)
    curve = (rec.get('curve') or '').lower(); dep = (rec.get('deployer') or '').lower()
    wallets = {a: w for a, w in bal.items() if a != curve}
    pct = lambda w: (w / sup * 100) if sup else 0
    top10 = sum(sorted(wallets.values(), reverse=True)[:10]); dep_pct = pct(wallets.get(dep, 0))
    b, s, bt, st = _flows(rows, dep)
    day = [r for r in rows if r.get('at', 0) > now - 86400]
    buys = sum(int(r['ethWei']) for r in day if r.get('side') == 'buy') / 1e18; sells = sum(int(r['ethWei']) for r in day if r.get('side') != 'buy') / 1e18
    traders = len({(r.get('trader') or '').lower() for r in rows}); last = rows[-1]['at'] if rows else None
    cs = rec.get('curveState') or {}; grad = str(cs.get('graduated')) == 'True' or rec.get('phase') == 2
    try: prog = 1.0 if grad else min(1.0, int(cs.get('balanceWei') or 0) / int(cs.get('graduationThreshold') or 1))
    except Exception: prog = 0
    def grade(v, good, ok, higher=True):
        if higher: return 'strong' if v >= good else 'ok' if v >= ok else 'watch'
        return 'strong' if v <= good else 'ok' if v <= ok else 'watch'
    checks = [
        {'id': 'holders', 'label': 'Holder count', 'value': f'{len(wallets)} wallets', 'grade': grade(len(wallets), 100, 25), 'note': 'More holders means a wider community.'},
        {'id': 'top10', 'label': 'Top 10 wallets', 'value': f'{pct(top10):.1f}% of supply', 'grade': grade(pct(top10), 30, 55, False), 'note': 'Share held by the ten largest wallets, bonding curve excluded.'},
        {'id': 'creator', 'label': 'Creator holding', 'value': f'{dep_pct:.1f}% of supply', 'grade': grade(dep_pct, 5, 15, False), 'note': 'What the launcher still holds right now.'},
        {'id': 'creatorflow', 'label': 'Creator trading', 'value': f'bought {b:.3f} ETH, sold {s:.3f} ETH', 'grade': 'strong' if s <= b * 0.5 or s < 0.005 else 'ok' if s <= b * 1.5 else 'watch', 'note': 'How the launcher traded their own coin.'},
        {'id': 'flow', 'label': '24h buy pressure', 'value': f'{buys:.3f} ETH in, {sells:.3f} ETH out', 'grade': 'strong' if buys > sells * 1.2 else 'ok' if buys >= sells * 0.8 else 'watch', 'note': 'Buys against sells over the last day.'},
        {'id': 'traders', 'label': 'Unique traders', 'value': f'{traders} wallets', 'grade': grade(traders, 150, 30), 'note': 'Every wallet that has ever traded it.'},
        {'id': 'curve', 'label': 'Graduation', 'value': 'Graduated to DEX' if grad else f'{prog*100:.0f}% of the curve', 'grade': 'strong' if grad else 'ok' if prog >= .35 else 'watch', 'note': 'Progress toward the DEX listing.'},
    ]
    pts = {'strong': 2, 'ok': 1, 'watch': 0}; score = round(sum(pts[c['grade']] for c in checks) / (2 * len(checks)) * 100)
    return {'token': tk, 'symbol': rec.get('symbol'), 'name': rec.get('name'), 'deployer': rec.get('deployer'), 'score': score,
            'verdict': 'Strong' if score >= 70 else 'Solid' if score >= 45 else 'Early', 'checks': checks, 'lastTradeAt': last,
            'marketCapUsd': (rec.get('marketCapEth') or 0) * (eth_usd or 0), 'checkedAt': now}

def creators(tokens, trades, eth_usd):
    by = {}
    for rec in tokens.values():
        if hidden.is_hidden(rec.get('token')) or not rec.get('deployer'): continue
        dep = rec['deployer'].lower(); rows = trades.get(rec['token'].lower(), [])
        b, s, bt, st = _flows(rows, dep); sup = _supply(rec['token']); held = _balances(rec['token']).get(dep, 0)
        hp = (held / sup * 100) if sup else 0; peak = (bt / sup * 100) if sup else 0
        style = 'Holder' if s < 0.005 or st <= bt * 0.25 else 'Trimmed' if held > 0 else 'Exited'
        coin = {'token': rec['token'], 'symbol': rec.get('symbol'), 'name': rec.get('name'), 'launchedAt': rec.get('launchedAt'), 'boughtEth': round(b, 5), 'soldEth': round(s, 5),
                'pnlEth': round(s - b, 5), 'holdPct': round(hp, 2), 'boughtPct': round(peak, 2), 'style': style,
                'marketCapUsd': (rec.get('marketCapEth') or 0) * (eth_usd or 0), 'graduated': str((rec.get('curveState') or {}).get('graduated')) == 'True' or rec.get('phase') == 2}
        by.setdefault(dep, {'address': rec['deployer'], 'coins': []})['coins'].append(coin)
    out = []
    for c in by.values():
        cs = c['coins']; n = len(cs); hold = sum(1 for x in cs if x['style'] == 'Holder')
        c.update({'launched': n, 'graduated': sum(1 for x in cs if x['graduated']), 'holderRate': round(hold / n * 100), 'mcapUsd': sum(x['marketCapUsd'] for x in cs),
                  'boughtEth': round(sum(x['boughtEth'] for x in cs), 5), 'soldEth': round(sum(x['soldEth'] for x in cs), 5),
                  'badge': 'Diamond creator' if hold == n else 'Active trader' if hold else 'Takes profit'})
        cs.sort(key=lambda x: -(x['launchedAt'] or 0)); out.append(c)
    out.sort(key=lambda c: (-c['holderRate'], -c['mcapUsd']))
    return {'creators': out, 'ethUsd': eth_usd, 'now': store.now()}
