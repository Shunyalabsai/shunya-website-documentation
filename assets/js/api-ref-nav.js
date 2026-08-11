/* API Reference hub — Deepgram-style sidebar (only on API reference pages) */
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

  function isApiRefContext() {
    const p = window.location.pathname;
    /* Hub pages only — product ASR/TTS api-reference pages keep their product sidebar */
    return /\/api-reference\//.test(p);
  }

  const NAV = {
    general: [
      { label: 'API Overview', path: '/api-reference/index.html' },
      { label: 'Authentication', path: '/api-reference/authentication.html' },
      { label: 'HTTP error codes', path: '/api-reference/errors.html' },
      { label: 'API Rate Limits', path: '/api-reference/rate-limits.html' },
      { label: 'Request IDs', path: '/api-reference/request-ids.html' },
    ],
    products: [
      {
        id: 'stt',
        label: 'Speech-to-Text',
        open: true,
        items: [
          { method: 'POST', label: 'Authentication (token)', path: '/asr/api-reference.html#post-auth-token' },
          { method: 'POST', label: 'Transcribe Audio', path: '/asr/api-reference.html#post-transcriptions' },
          { method: 'WSS', label: 'Realtime (v1/realtime)', path: '/asr/api-reference.html#websocket' },
          { method: 'POST', label: 'Speech Intelligence', path: '/asr/api-reference.html#post-speechintelligence' },
        ],
        speakers: [
          { method: 'POST', label: '/v1/speakers/register', path: '/asr/api-reference.html#speakers-register' },
          { method: 'DELETE', label: '/v1/speakers/delete', path: '/asr/api-reference.html#speakers-delete' },
        ],
      },
      {
        id: 'tts',
        label: 'Text-to-Speech',
        open: true,
        items: [
          { method: 'POST', label: 'Auth (token)', path: '/tts/api-reference.html#authentication' },
          { method: 'POST', label: 'Omni Voice (synthesize)', path: '/tts/api-reference.html#post-synthesize' },
          { method: 'POST', label: 'OpenAI-compatible (audio/speech)', path: '/tts/api-reference.html#post-speech' },
        ],
      },
    ],
  };

  function currentPath() {
    return window.location.pathname + window.location.hash;
  }

  function isActive(href) {
    const full = docUrl(href.split('#')[0]) + (href.includes('#') ? '#' + href.split('#')[1] : '');
    const here = window.location.pathname + window.location.hash;
    if (href.includes('#')) {
      return here === full || (window.location.pathname === docUrl(href.split('#')[0]) && window.location.hash === '#' + href.split('#')[1]);
    }
    return window.location.pathname === docUrl(href) || window.location.pathname.endsWith(href);
  }

  function methodBadge(method) {
    return `<span class="api-method api-method-${method.toLowerCase()}">${method}</span>`;
  }

  function renderLink(item) {
    const href = docUrl(item.path);
    const active = isActive(item.path);
    return `<a class="api-ref-link product-nav-link${active ? ' active' : ''}" href="${href}">${methodBadge(item.method)}<span class="product-nav-link-label">${item.label}</span></a>`;
  }

  function renderGeneralLink(item) {
    const href = docUrl(item.path);
    const active = window.location.pathname === docUrl(item.path) || window.location.pathname.endsWith(item.path);
    return `<a class="api-ref-link product-nav-link product-nav-link-general${active ? ' active' : ''}" href="${href}"><span class="product-nav-link-label">${item.label}</span></a>`;
  }

  function renderProductSection(section) {
    const items = section.items.map(renderLink).join('');
    const speakers = section.speakers
      ? `<div class="api-ref-nested">
          <button type="button" class="product-nav-group-toggle api-ref-group-toggle" aria-expanded="true">
            <span>Speaker APIs</span>
            <svg class="product-nav-chevron api-ref-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="product-nav-group-links api-ref-nested-links">${section.speakers.map(renderLink).join('')}</div>
        </div>`
      : '';
    return `
      <div class="api-ref-product" data-product="${section.id}">
        <button type="button" class="product-nav-group-toggle api-ref-product-toggle" aria-expanded="${section.open ? 'true' : 'false'}">
          <span>${section.label}</span>
          <svg class="product-nav-chevron api-ref-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="product-nav-group-links api-ref-product-links" ${section.open ? '' : 'hidden'}>
          ${items}
          ${speakers}
        </div>
      </div>`;
  }

  function renderSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.add('product-nav-sidebar', 'api-ref-sidebar');
    sidebar.innerHTML = `
      <div class="product-nav-sidebar-inner api-ref-sidebar-inner">
        <div class="api-ref-sidebar-section">
          <div class="api-ref-sidebar-heading">General</div>
          ${NAV.general.map(renderGeneralLink).join('')}
        </div>
        <div class="api-ref-sidebar-section">
          <div class="api-ref-sidebar-heading">API Reference</div>
          ${NAV.products.map(renderProductSection).join('')}
        </div>
      </div>`;

    sidebar.querySelectorAll('.product-nav-group-toggle, .api-ref-product-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wrap = btn.closest('.api-ref-product');
        const panel = wrap.querySelector('.api-ref-product-links');
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });

    sidebar.querySelectorAll('.api-ref-group-toggle.product-nav-group-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) panel.hidden = !open;
      });
    });

    const active = sidebar.querySelector('.product-nav-link.active');
    if (active) {
      const sb = sidebar;
      const t = active.offsetTop - sb.clientHeight / 3;
      sb.scrollTop = Math.max(0, t);
    }
  }

  function init() {
    if (!isApiRefContext()) return;
    document.body.classList.add('api-ref-mode');
    document.querySelector('.app')?.classList.add('app-api-ref');
    renderSidebar();
  }

  window.ShunyaApiRefNav = { init, isApiRefContext, docUrl };
})();
