/* Speech-to-Text docs — grouped sidebar (Batch, Streaming, Models, Intelligence, etc.) */
(function () {
  function getDocBase() {
    const link = document.querySelector('link[href*="main.css"]');
    if (link) {
      const href = link.getAttribute('href') || '';
      const i = href.indexOf('/assets/css/');
      if (i !== -1) return href.slice(0, i);
    }
    const script = document.querySelector('script[src*="shell.js"]');
    if (script) {
      const src = script.getAttribute('src') || '';
      const i = src.indexOf('/assets/js/');
      if (i !== -1) return src.slice(0, i);
    }
    return '/web_doc';
  }

  function docUrl(path) {
    const base = getDocBase();
    const p = path.charAt(0) === '/' ? path : '/' + path;
    return base + p;
  }

  function isSttContext() {
    return /\/asr\//.test(window.location.pathname);
  }

  const NAV = [
    { id: 'title', title: 'Speech-to-Text (ASR)' },
    {
      id: 'auth',
      heading: 'Authentication',
      open: true,
      items: [
        { label: 'Access token (POST /auth/token)', path: '/asr/api-reference.html#post-auth-token' },
      ],
    },
    {
      id: 'batch',
      heading: 'Batch',
      open: true,
      items: [
        { label: 'Batch vs Streaming', path: '/asr/overview.html#batch-vs-streaming' },
        { label: 'Configuration', path: '/asr/configuration.html' },
        { label: 'Features', path: '/asr/features.html' },
        { label: 'POST /v1/audio/transcriptions', path: '/asr/api-reference.html#post-transcriptions' },
      ],
    },
    {
      id: 'streaming',
      heading: 'Streaming',
      open: true,
      items: [
        { label: 'Streaming (WebSocket)', path: '/asr/streaming.html' },
        { label: 'WebSocket /v1/realtime', path: '/asr/api-reference.html#websocket' },
      ],
    },
    {
      id: 'models',
      heading: 'Models',
      open: true,
      items: [
        { label: 'Models', path: '/asr/models.html' },
      ],
    },
    {
      id: 'intelligence',
      heading: 'Intelligence layer',
      open: false,
      items: [
        { label: 'Speech Intelligence', path: '/intelligence/overview.html' },
        { label: 'Intent detection', path: '/intelligence/overview.html#intent-detection' },
        { label: 'Summarization', path: '/intelligence/overview.html#summarization' },
        { label: 'Sentiment analysis', path: '/intelligence/overview.html#sentiment-analysis' },
        { label: 'Combining features', path: '/intelligence/overview.html#combining-features' },
        { label: 'Diarization (ASR)', path: '/asr/features.html#diarization' },
        { label: 'Word timestamps (ASR)', path: '/asr/features.html#word-timestamps' },
        { label: 'Speaker enrolment (ASR)', path: '/asr/features.html#speaker-enrolment' },
        { label: 'Full reference', path: '/asr/features.html' },
      ],
    },
    {
      id: 'params',
      heading: 'Request parameters',
      open: false,
      items: [
        { label: 'Audio source', path: '/asr/configuration.html#audio-source' },
        { label: 'Model', path: '/asr/configuration.html#model' },
        { label: 'Language', path: '/asr/configuration.html#language' },
        { label: 'Diarization', path: '/asr/configuration.html#diarization' },
        { label: 'Output format', path: '/asr/configuration.html#output' },
        { label: 'Realtime streaming fields', path: '/asr/configuration.html#realtime' },
      ],
    },
    {
      id: 'speakers',
      heading: 'Speaker APIs',
      open: false,
      items: [
        { label: 'Speaker APIs', path: '/asr/api-reference.html#speakers' },
        { label: 'POST /v1/speakers/register', path: '/asr/api-reference.html#speakers-register' },
        { label: 'DELETE /v1/speakers/delete', path: '/asr/api-reference.html#speakers-delete' },
      ],
    },
    {
      id: 'more',
      heading: 'More',
      open: false,
      items: [
        { label: 'Dashboard', path: '/asr/dashboard.html' },
        { label: 'API reference', path: '/asr/api-reference.html' },
      ],
    },
  ];

  function isActive(path) {
    const here = window.location.pathname + window.location.hash;
    const basePath = docUrl(path.split('#')[0]);
    const hash = path.includes('#') ? '#' + path.split('#')[1] : '';
    if (hash) {
      return here === basePath + hash || (window.location.pathname === basePath && window.location.hash === hash);
    }
    return window.location.pathname === basePath || window.location.pathname.endsWith(path);
  }

  function sectionHasActive(section) {
    return section.items && section.items.some((item) => isActive(item.path));
  }

  function renderLink(item) {
    const href = docUrl(item.path);
    const active = isActive(item.path);
    return `<a class="product-nav-link${active ? ' active' : ''}" href="${href}"><span class="product-nav-link-label">${item.label}</span></a>`;
  }

  function renderSection(section) {
    if (section.title) {
      return `<div class="product-nav-title" role="presentation">${section.title}</div>`;
    }
    const open = section.open || sectionHasActive(section);
    const items = section.items.map(renderLink).join('');
    return `
      <div class="product-nav-group" data-group="${section.id}">
        <button type="button" class="product-nav-group-toggle" aria-expanded="${open ? 'true' : 'false'}">
          <span>${section.heading}</span>
          <svg class="product-nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="product-nav-group-links" ${open ? '' : 'hidden'}>${items}</div>
      </div>`;
  }

  function renderSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.add('product-nav-sidebar');
    sidebar.innerHTML = `<div class="product-nav-sidebar-inner">${NAV.map(renderSection).join('')}</div>`;

    sidebar.querySelectorAll('.product-nav-group-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wrap = btn.closest('.product-nav-group');
        const panel = wrap.querySelector('.product-nav-group-links');
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });

    const active = sidebar.querySelector('.product-nav-link.active');
    if (active) {
      sidebar.scrollTop = Math.max(0, active.offsetTop - sidebar.clientHeight / 3);
      const group = active.closest('.product-nav-group');
      if (group) {
        const panel = group.querySelector('.product-nav-group-links');
        const btn = group.querySelector('.product-nav-group-toggle');
        if (panel && panel.hidden) {
          panel.hidden = false;
          if (btn) btn.setAttribute('aria-expanded', 'true');
        }
      }
    }
  }

  function init() {
    if (!isSttContext()) return;
    document.body.classList.add('stt-doc-mode');
    document.querySelector('.app')?.classList.add('app-stt-doc');
    renderSidebar();
  }

  window.ShunyaSttNav = { init, isSttContext, docUrl };
})();
