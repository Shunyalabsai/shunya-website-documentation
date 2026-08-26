# Shunya Labs Documentation Site

Static documentation site for the Shunya Labs voice AI stack (ASR, TTS, Vāķ Translation, and speech intelligence). This repo is plain HTML/CSS/JS and is deployed as a GitHub Pages project site under `/shunya-website-documentation/`.

## Run locally

Use the project server script so links behave exactly like production:

```bash
python3 scripts/serve.py
open http://localhost:8765/shunya-website-documentation/
```

Avoid opening pages with `file://` or serving at `/` only. Many links and assets are rooted at `/shunya-website-documentation/...`.

## Project structure

```
/index.html                  Landing page
/assets/
  /css/main.css              Design tokens and layout/styles
  /js/                       Shared shell, nav, search, theme, Mermaid init
/get-started/                Onboarding and core concepts
/personas/                   API, SDK, Playground, OpenAI-compatible tracks
/asr/                        Zero STT product docs
/tts/                        Zero TTS product docs
/translation/                Vāķ Translation docs
/intelligence/               Speech intelligence docs
/api-reference/              Auth, errors, limits, request IDs
/integrations/               Python/OpenAI SDK, LiveKit, Pipecat, SIP, HF
/solutions/                  BFSI, Healthcare, Contact center, Media
/deployment/                 Cloud/on-prem deployment docs
/enterprise/                 SSO and evaluation docs
/security/                   Compliance and privacy docs
/scripts/                    Local serving and maintenance scripts
```

## Current footprint

- 48 HTML files in total
- 44 content pages
- 4 redirect pages in `personas/`
- Shared JS-driven shell for header/sidebar, page TOC, code tabs, and search

## Editing guide

- **Navigation source of truth**: `assets/js/nav.js`
- **Product sidebars**: `assets/js/stt-nav.js`, `assets/js/tts-nav.js`, `assets/js/api-ref-nav.js`, `assets/js/intelligence-nav.js`
- **Theme and design tokens**: `assets/css/main.css`
- **Search index**: `assets/js/doc-search.js`
- **Page authoring**: copy an existing page in the same section, update `<main>` content, then register nav/search entries if needed

## Deployment

Push to `main` and GitHub Actions publishes to GitHub Pages via:

- `.github/workflows/jekyll-gh-pages.yml`

## Known limitations

- No automated HTML linting or link checking is configured.
- Search is curated-index based, not full-text crawling.
