/* Intelligence layer docs - feature sidebar */
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

  function isIntelligenceContext() {
    return /\/intelligence\//.test(window.location.pathname);
  }

  const NAV = [
    { id: 'title', title: 'Intelligence' },
    {
      id: 'start',
      heading: 'Get started',
      open: true,
      items: [
        { label: 'Overview', path: '/intelligence/overview.html' },
        { label: 'How to call it', path: '/intelligence/overview.html#how-to-call' },
        { label: 'Combine features', path: '/intelligence/overview.html#combining-features' },
      ],
    },
    {
      id: 'nlp',
      heading: 'Speech Intelligence',
      open: true,
      items: [
        { label: 'Intent detection', path: '/intelligence/overview.html#intent-detection' },
        { label: 'Summarization', path: '/intelligence/overview.html#summarization' },
        { label: 'Sentiment analysis', path: '/intelligence/overview.html#sentiment-analysis' },
      ],
    },
    {
      id: 'asr-side',
      heading: 'On the ASR side',
      open: false,
      items: [
        { label: 'Diarization', path: '/asr/features.html#diarization' },
        { label: 'Word timestamps', path: '/asr/features.html#word-timestamps' },
        { label: 'Speaker enrolment', path: '/asr/features.html#speaker-enrolment' },
      ],
    },
    {
      id: 'more',
      heading: 'More',
      open: false,
      items: [
        { label: 'ASR configuration', path: '/asr/configuration.html' },
        { label: 'Full feature reference', path: '/asr/features.html' },
        { label: 'Speech-to-Text overview', path: '/asr/overview.html' },
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
    if (!isIntelligenceContext()) return;
    document.body.classList.add('intel-doc-mode');
    document.querySelector('.app')?.classList.add('app-intel-doc');
    renderSidebar();
  }

  window.ShunyaIntelligenceNav = { init, isIntelligenceContext, docUrl };
})();
