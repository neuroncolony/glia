"""The operator's own token holds the first slot everywhere. Until GLIA_OFFICIAL_TOKEN is set the slot renders as a placeholder."""
import os
def official():
    tok = os.environ.get('GLIA_OFFICIAL_TOKEN', '').strip().lower() or None
    return {'name': os.environ.get('GLIA_OFFICIAL_NAME', 'Glia'), 'symbol': os.environ.get('GLIA_OFFICIAL_SYMBOL', 'GLIA'),
            'pairedWith': 'Glia', 'token': tok, 'link': os.environ.get('GLIA_OFFICIAL_LINK', '').strip() or None,
            'live': bool(tok)}
