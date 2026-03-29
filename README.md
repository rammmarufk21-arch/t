# Pret Wallet (PWA)

Static single-page app: wallet UI with tab bar, installable as a PWA.

## Run locally

Serve the folder over HTTP (required for the service worker):

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Contents

- `index.html` — UI and client script
- `manifest.json` — PWA manifest
- `sw.js` — offline cache for static assets
- `assets/` — fonts and icons

## Deploy

Upload the project root to any static host (GitHub Pages, Netlify, etc.). Use HTTPS so the service worker registers.
