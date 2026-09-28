"""The operator's own token holds the first slot everywhere. Until GLIA_OFFICIAL_TOKEN is set the slot renders as a placeholder."""
import os
def official():
    import re
    raw = os.environ.get('GLIA_OFFICIAL_TOKEN', '') + ' ' + os.environ.get('GLIA_OFFICIAL_LINK', '')
    m = re.search(r'0x[0-9a-fA-F]{40}', raw)
    tok = m.group(0).lower() if m else None
    return {'name': os.environ.get('GLIA_OFFICIAL_NAME', 'Glia'), 'symbol': os.environ.get('GLIA_OFFICIAL_SYMBOL', 'GLIA'),
            'pairedWith': 'Glia', 'token': tok, 'link': os.environ.get('GLIA_OFFICIAL_LINK', '').strip() or None,
            'live': bool(tok)}
