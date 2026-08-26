/* Text-to-Speech docs - grouped sidebar (Batch, Streaming, Voices, etc.) */
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
    return '/shunya-website-documentation';
  }

  function docUrl(path) {
    const base = getDocBase();
    const p = path.charAt(0) === '/' ? path : '/' + path;
    return base + p;
  }

  function isTtsContext() {
    return /\/tts\//.test(window.location.pathname);
  }

  const NAV = [
    { id: 'title', title: 'Text-to-Speech (TTS)' },
    {
      id: 'start',
      heading: 'Get started',
      open: true,
      items: [
        { label: 'Quickstart', path: '/tts/quickstart.html' },
        { label: 'Overview', path: '/tts/overview.html' },
      ],
    },
    {
      id: 'endpoints',
      heading: 'Endpoints',
      open: true,
      items: [
        { label: 'Authentication', path: '/tts/api-reference.html#authentication' },
        { label: 'Standard TTS', path: '/tts/api-reference.html#post-synthesize' },
        { label: 'Education TTS (LaTeX)', path: '/tts/api-reference.html#education-tts' },
        { label: 'OpenAI-compatible', path: '/tts/api-reference.html#post-speech' },
        { label: 'Pipecat', path: '/tts/api-reference.html#pipecat' },
      ],
    },
    {
      id: 'api',
      heading: 'API reference',
      open: false,
      items: [
        { label: 'Client checklist', path: '/tts/api-reference.html#client-checklist' },
        { label: 'API documentation', path: '/tts/api-reference.html#api-docs' },
        { label: 'TTS API reference', path: '/tts/api-reference.html' },
      ],
    },
    {
      id: 'pipelines',
      heading: 'Pipelines',
      open: false,
      items: [{ label: 'LLM → TTS pipeline', path: '/tts/llm-to-tts.html' }],
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
    if (!isTtsContext()) return;
    document.body.classList.add('tts-doc-mode');
    document.querySelector('.app')?.classList.add('app-tts-doc');
    renderSidebar();
  }

  window.ShunyaTtsNav = { init, isTtsContext, docUrl };
})();
