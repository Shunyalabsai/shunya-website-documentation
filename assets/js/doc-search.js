/* Docs search, palette UI, suggestions, sidebar + index matching */
(function () {
  const CATEGORIES = [
    { id: 'stt', label: 'Speech-to-Text', color: 'stt' },
    { id: 'tts', label: 'Text-to-Speech', color: 'tts' },
    { id: 'agent', label: 'Voice Agent', color: 'features' },
    { id: 'api', label: 'API Reference', color: 'api' },
    { id: 'models', label: 'Models', color: 'models' },
    { id: 'features', label: 'Features', color: 'features' },
    { id: 'intel', label: 'Intelligence', color: 'intel' },
  ];

  function getDocBase() {
    const link = document.querySelector('link[href*="main.css"]');
    if (link) {
      const href = link.getAttribute('href') || '';
      const i = href.indexOf('/assets/css/');
      if (i !== -1) return href.slice(0, i);
    }
    return window.location.pathname.indexOf('/shunya-website-documentation') !== -1 ? '/shunya-website-documentation' : '';
  }

  function docUrl(path) {
    const base = getDocBase();
    const p = path.charAt(0) === '/' ? path : '/' + path;
    return base + p;
  }

  const INDEX = [
    { category: 'stt', query: 'How do I transcribe an audio file?', keywords: ['transcribe', 'batch', 'upload', 'wav', 'asr', 'stt'], href: '/get-started/quickstart.html' },
    { category: 'stt', query: 'Speech-to-Text overview and models', keywords: ['zero stt', 'overview', 'wer', 'languages'], href: '/asr/overview.html' },
    { category: 'stt', query: 'Which ASR model should I use?', keywords: ['zero-indic', 'hinglish', 'medical', 'universal'], href: '/asr/models.html' },
    { category: 'stt', query: 'Streaming ASR over WebSocket', keywords: ['websocket', 'live', 'real-time', 'streaming'], href: '/asr/streaming.html' },
    { category: 'stt', query: 'ASR request parameters and configuration', keywords: ['configuration', 'parameters', 'language_code'], href: '/asr/configuration.html' },
    { category: 'stt', query: 'POST /v1/audio/transcriptions', keywords: ['endpoint', 'api', 'transcriptions'], href: '/asr/api-reference.html#post-transcriptions' },

    { category: 'tts', query: 'How do I synthesize text to speech?', keywords: ['tts', 'synthesize', 'voice', 'speech'], href: '/tts/quickstart.html' },
    { category: 'tts', query: 'Text-to-Speech overview', keywords: ['tts', 'overview', 'omni-voice'], href: '/tts/overview.html' },
    { category: 'tts', query: 'TTS authentication and Bearer token', keywords: ['auth', 'token', 'bearer', 'api key', 'expires'], href: '/tts/api-reference.html#authentication' },
    { category: 'tts', query: 'Standard TTS endpoint (omni-voice synthesize)', keywords: ['synthesize', 'omni-voice', 'endpoint', 'meera'], href: '/tts/api-reference.html#post-synthesize' },
    { category: 'tts', query: 'Education TTS with LaTeX', keywords: ['latex', 'math', 'education', 'language'], href: '/tts/api-reference.html#education-tts' },
    { category: 'tts', query: 'OpenAI-compatible TTS endpoint', keywords: ['openai', 'compatible', 'audio speech', 'base_url', 'pcm'], href: '/tts/api-reference.html#post-speech' },
    { category: 'tts', query: 'Pipecat voice agent integration', keywords: ['pipecat', 'voice agent', 'openai tts service'], href: '/tts/api-reference.html#pipecat' },
    { category: 'tts', query: 'Client integration checklist', keywords: ['checklist', 'onboarding', 'api key', 'token'], href: '/tts/api-reference.html#client-checklist' },
    { category: 'tts', query: 'Interactive TTS API documentation', keywords: ['api docs', 'docs', 'ttsv2'], href: '/tts/api-reference.html#api-docs' },
    { category: 'tts', query: 'LLM to TTS pipeline for voice agents', keywords: ['llm', 'agent', 'conversational'], href: '/tts/llm-to-tts.html' },

    { category: 'api', query: 'API Reference hub', keywords: ['api reference', 'endpoints', 'rest'], href: '/api-reference/index.html' },
    { category: 'api', query: 'How do I authenticate API requests?', keywords: ['bearer', 'api key', 'auth', 'token'], href: '/api-reference/authentication.html' },
    { category: 'api', query: 'API errors and status codes', keywords: ['error', '401', '429', '500'], href: '/api-reference/errors.html' },
    { category: 'api', query: 'Rate limits and quotas', keywords: ['rate limit', 'throttle', 'quota'], href: '/api-reference/rate-limits.html' },
    { category: 'api', query: 'Request IDs and tracing', keywords: ['request id', 'trace', 'debug'], href: '/api-reference/request-ids.html' },

    { category: 'models', query: 'Compare all models (capability matrix)', keywords: ['matrix', 'pricing', 'wer', 'compare'], href: '/get-started/capability-matrix.html' },
    { category: 'models', query: 'ASR model picker, zero-indic, universal, med', keywords: ['model', 'pick', 'zero-med', 'codeswitch'], href: '/asr/models.html' },
    { category: 'models', query: 'Open weights on Hugging Face', keywords: ['huggingface', 'self-host', 'weights'], href: '/integrations/hugging-face.html' },

    { category: 'features', query: 'ASR features and intelligence flags', keywords: ['diarization', 'features', 'enable_'], href: '/asr/features.html' },
    { category: 'features', query: 'Batch vs streaming, when to use which?', keywords: ['batch', 'streaming', 'transport'], href: '/asr/overview.html#batch-vs-streaming' },
    { category: 'features', query: 'Speaker registration and deletion APIs', keywords: ['speaker', 'register', 'delete', 'enrol'], href: '/asr/api-reference.html#speakers' },

    { category: 'intel', query: 'Speech Intelligence overview with examples', keywords: ['intelligence', 'nlp', 'speechintelligence', 'analysis'], href: '/intelligence/overview.html' },
    { category: 'agent', query: 'Voice Agent - Meera overview', keywords: ['meera', 'voice agent', 'outbound call', 'telephony'], href: '/voice-agent/meera.html' },
    { category: 'agent', query: 'Create and configure a voice agent', keywords: ['create agent', 'prompt', 'behavior', 'voice', 'messages'], href: '/voice-agent/meera.html#create-agent' },
    { category: 'agent', query: 'Trigger outbound calls with callbacks', keywords: ['calls', 'callback_url', 'external_id', 'from_number'], href: '/voice-agent/meera.html#trigger-calls' },
    { category: 'features', query: 'Diarization, who spoke when?', keywords: ['diarization', 'diarize', 'speaker', 'segments'], href: '/asr/features.html#diarization' },
    { category: 'intel', query: 'Intent detection on transcripts', keywords: ['intent', 'classification', 'complaint'], href: '/intelligence/overview.html#intent-detection' },
    { category: 'intel', query: 'Sentiment analysis and summarization', keywords: ['sentiment', 'summary', 'speechintelligence'], href: '/intelligence/overview.html#sentiment-analysis' },
    { category: 'features', query: 'Data privacy, audio deletion, compliance', keywords: ['privacy', 'compliance', 'deleted', 'sovereign'], href: '/security/compliance.html' },

    { category: 'api', query: 'Mint an access token (POST /auth/token)', keywords: ['access token', 'auth token', 'bearer', 'mint', 'expires'], href: '/asr/api-reference.html#post-auth-token' },
    { category: 'stt', query: 'Realtime protocol (WS /v1/realtime)', keywords: ['realtime', 'websocket', 'ws', 'pcm', 'end'], href: '/asr/api-reference.html#websocket' },
  ];

  let activeIndex = -1;
  let filtered = [];

  function catMeta(id) {
    return CATEGORIES.find((c) => c.id === id) || { label: id, color: '' };
  }

  function scoreItem(item, q) {
    const text = (item.query + ' ' + item.keywords.join(' ')).toLowerCase();
    if (text.includes(q)) {
      if (item.query.toLowerCase().startsWith(q)) return 100;
      if (item.query.toLowerCase().includes(q)) return 80;
      return 50;
    }
    const words = q.split(/\s+/).filter(Boolean);
    let s = 0;
    words.forEach((w) => {
      if (text.includes(w)) s += 20;
    });
    return s;
  }

  function filterIndex(q) {
    if (!q) return INDEX.slice();
    const lower = q.toLowerCase();
    return INDEX.map((item) => ({ item, score: scoreItem(item, lower) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item);
  }

  function collectSidebarLinks() {
    return Array.from(
      document.querySelectorAll('.sidebar-link, .sidebar-heading-link, .product-nav-link, .api-ref-link')
    ).map((a) => ({
      category: 'features',
      query: a.textContent.trim().replace(/\s+/g, ' '),
      keywords: [],
      href: a.getAttribute('href') || '',
      external: true,
    })).filter((x) => x.query && x.href);
  }

  function renderPanel(panel, items, q) {
    const grouped = {};
    items.forEach((item) => {
      const id = item.category || 'features';
      if (!grouped[id]) grouped[id] = [];
      grouped[id].push(item);
    });

    const order = CATEGORIES.map((c) => c.id).filter((id) => grouped[id]);
    if (order.length === 0) {
      panel.innerHTML = `
        <div class="doc-search-empty">
          <span class="doc-search-empty-icon" aria-hidden="true">◇</span>
          <p>No matches for <strong>${escapeHtml(q)}</strong></p>
          <p class="doc-search-empty-hint">Try a topic below or press <kbd>Esc</kbd> to browse suggestions.</p>
        </div>`;
      return;
    }

    const title = q
      ? `<div class="doc-search-panel-title">${items.length} result${items.length === 1 ? '' : 's'}</div>`
      : `<div class="doc-search-panel-title">Popular searches</div>`;

    let hitIndex = 0;
    panel.innerHTML =
      title +
      order
        .map((catId) => {
          const meta = catMeta(catId);
          const rows = grouped[catId]
            .map((item) => {
              const i = hitIndex++;
              const href =
                item.href.startsWith('http') || item.href.startsWith('/')
                  ? item.href
                  : docUrl(item.href);
              return `
            <a class="doc-search-hit${i === activeIndex ? ' is-highlighted' : ''}" href="${href}" role="option" data-index="${i}">
              <span class="doc-search-hit-query">${highlightQuery(item.query, q)}</span>
            </a>`;
            })
            .join('');
          return `
          <div class="doc-search-group" data-category="${catId}">
            <div class="doc-search-group-label doc-search-cat-${meta.color}">${meta.label}</div>
            ${rows}
          </div>`;
        })
        .join('');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightQuery(text, q) {
    if (!q) return escapeHtml(text);
    const lower = text.toLowerCase();
    const qi = lower.indexOf(q.toLowerCase());
    if (qi === -1) return escapeHtml(text);
    return (
      escapeHtml(text.slice(0, qi)) +
      '<mark class="doc-search-mark">' +
      escapeHtml(text.slice(qi, qi + q.length)) +
      '</mark>' +
      escapeHtml(text.slice(qi + q.length))
    );
  }

  function setHeaderSearchOpen(open) {
    document.querySelector('.header')?.classList.toggle('is-search-open', open);
  }

  function openSearch(root, field, input, panel, backdrop) {
    root.classList.add('is-open');
    field.classList.add('is-focused');
    input.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    backdrop.hidden = false;
    setHeaderSearchOpen(true);
    requestAnimationFrame(() => {
      root.classList.add('is-visible');
      backdrop.classList.add('is-visible');
    });
    refreshResults(root, input, panel);
  }

  function closeSearch(root, field, input, panel, backdrop) {
    root.classList.remove('is-visible', 'is-open');
    field.classList.remove('is-focused');
    input.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('is-visible');
    setHeaderSearchOpen(false);
    activeIndex = -1;
    setTimeout(() => {
      if (!root.classList.contains('is-open')) {
        panel.hidden = true;
        backdrop.hidden = true;
      }
    }, 200);
  }

  function updateFieldState(field, input, clearBtn, kbd) {
    const hasValue = input.value.length > 0;
    field.classList.toggle('has-value', hasValue);
    clearBtn.hidden = !hasValue;
    kbd.hidden = hasValue || field.classList.contains('is-focused');
  }

  function refreshResults(root, input, panel) {
    const q = input.value.trim();
    filtered = filterIndex(q);
    if (q && filtered.length < 8) {
      const sidebar = collectSidebarLinks().filter(
        (l) => l.query.toLowerCase().includes(q.toLowerCase()) && !filtered.some((f) => f.href === l.href)
      );
      filtered = filtered.concat(sidebar.slice(0, 6));
    }
    activeIndex = filtered.length ? 0 : -1;
    renderPanel(panel, filtered, q);
    root.classList.toggle('has-results', filtered.length > 0);
  }

  function navigateToHighlighted(panel) {
    const hit = panel.querySelector('.doc-search-hit.is-highlighted');
    if (hit) {
      window.location.href = hit.href;
      return true;
    }
    return false;
  }

  function setHighlight(panel, idx) {
    const hits = panel.querySelectorAll('.doc-search-hit');
    if (!hits.length) return;
    activeIndex = ((idx % hits.length) + hits.length) % hits.length;
    hits.forEach((h, i) => h.classList.toggle('is-highlighted', i === activeIndex));
    hits[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  function init() {
    const root = document.getElementById('doc-search');
    if (!root || root.dataset.wired === '1') return;
    root.dataset.wired = '1';

    const field = root.querySelector('.doc-search-field');
    const input = root.querySelector('.doc-search-input');
    const panel = root.querySelector('.doc-search-panel');
    const clearBtn = root.querySelector('.doc-search-clear');
    const kbd = root.querySelector('.doc-search-kbd');

    let backdrop = document.querySelector('.doc-search-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'doc-search-backdrop';
      backdrop.hidden = true;
      document.body.appendChild(backdrop);
    }

    INDEX.forEach((item) => {
      if (item.href && !item.href.startsWith('http')) {
        item.href = docUrl(item.href);
      }
    });

    input.addEventListener('focus', () => {
      openSearch(root, field, input, panel, backdrop);
      updateFieldState(field, input, clearBtn, kbd);
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        if (!root.contains(document.activeElement) && !backdrop.matches(':hover')) {
          field.classList.remove('is-focused');
          updateFieldState(field, input, clearBtn, kbd);
          if (!root.classList.contains('is-open')) return;
          closeSearch(root, field, input, panel, backdrop);
        }
      }, 120);
    });

    input.addEventListener('input', () => {
      updateFieldState(field, input, clearBtn, kbd);
      refreshResults(root, input, panel);
      if (!root.classList.contains('is-open')) openSearch(root, field, input, panel, backdrop);
    });

    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      input.value = '';
      input.focus();
      updateFieldState(field, input, clearBtn, kbd);
      refreshResults(root, input, panel);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        input.blur();
        closeSearch(root, field, input, panel, backdrop);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight(panel, activeIndex + 1);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight(panel, activeIndex - 1);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (navigateToHighlighted(panel)) return;
        const q = input.value.trim().toLowerCase();
        if (!q) return;
        const match = collectSidebarLinks().find((l) => l.query.toLowerCase().includes(q));
        if (match) window.location.href = match.href;
      }
    });

    panel.addEventListener('mousedown', (e) => e.preventDefault());

    panel.addEventListener('click', (e) => {
      const hit = e.target.closest('.doc-search-hit');
      if (hit) closeSearch(root, field, input, panel, backdrop);
    });

    backdrop.addEventListener('click', () => {
      input.blur();
      closeSearch(root, field, input, panel, backdrop);
    });

    root.addEventListener('click', (e) => {
      if (e.target === field || e.target.closest('.doc-search-field')) {
        if (document.activeElement !== input) input.focus();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        input.focus();
        openSearch(root, field, input, panel, backdrop);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        input.focus();
        openSearch(root, field, input, panel, backdrop);
      }
    });

    updateFieldState(field, input, clearBtn, kbd);
  }

  window.ShunyaDocSearch = { init, INDEX };

  if (document.querySelector('#doc-search')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();
