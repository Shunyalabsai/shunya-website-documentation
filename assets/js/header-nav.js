/* Top product nav — quick jumps (Deepgram-style second header row) */
(function () {
  const HF_ICON =
    '<path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378"/>';

  const ICONS = {
    home: '<path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    stt: '<path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/><path d="M6 14a6 6 0 0 0 12 0"/><line x1="12" y1="20" x2="12" y2="22"/><path d="M8 22h8"/>',
    tts: '<path d="M11 6L6 10H3v4h3l5 4V6z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8 8 0 0 1 0 12"/>',
    translate:
      '<circle cx="12" cy="12" r="9"/><path d="M2 12h20"/><path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z"/><path d="M8 9l4 3-4 3M16 9l-4 3 4 3"/>',
    api: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22" opacity="0.35"/>',
    integrations:
      '<path d="M12 2v6"/><path d="M8 8h8"/><rect x="3" y="10" width="7" height="7" rx="1.5"/><rect x="14" y="10" width="7" height="7" rx="1.5"/><path d="M6.5 13.5h0M17.5 13.5h0"/><path d="M10 17v3M14 17v3"/>',
    deploy:
      '<rect x="4" y="4" width="16" height="5" rx="1"/><rect x="4" y="11" width="16" height="5" rx="1"/><rect x="4" y="18" width="16" height="2" rx="0.5"/><circle cx="7" cy="6.5" r="0.75" fill="currentColor" stroke="none"/><circle cx="7" cy="13.5" r="0.75" fill="currentColor" stroke="none"/>',
    models: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
  };

  const LINKS = [
    {
      id: 'home',
      label: 'Home',
      href: '/shunya-website-documentation/index.html',
      icon: 'home',
      match: [/^\/shunya-website-documentation\/?$/, /^\/shunya-website-documentation\/index\.html$/, /what-is-shunya/, /glossary/, /capability-matrix/],
    },
    {
      id: 'quickstart',
      label: 'Quickstart',
      href: '/shunya-website-documentation/get-started/quickstart.html',
      icon: 'zap',
      match: [/\/get-started\/quickstart/],
    },
    {
      id: 'stt',
      label: 'Speech-to-Text',
      href: '/shunya-website-documentation/asr/overview.html',
      icon: 'stt',
      match: [/\/asr\//],
    },
    {
      id: 'tts',
      label: 'Text-to-Speech',
      href: '/shunya-website-documentation/tts/overview.html',
      icon: 'tts',
      match: [/\/tts\//],
    },
    {
      id: 'translate',
      label: 'Translation',
      href: '/shunya-website-documentation/translation/vak-overview.html',
      icon: 'translate',
      match: [/\/translation\//],
    },
    {
      id: 'api',
      label: 'API Reference',
      icon: 'api',
      dropdown: [
        { label: 'ASR API reference', href: '/shunya-website-documentation/asr/api-reference.html', desc: 'Transcriptions, streaming, speakers' },
        { label: 'TTS API reference', href: '/shunya-website-documentation/tts/api-reference.html', desc: 'Speech synthesis, voices, formats' },
        { label: 'Capability matrix', href: '/shunya-website-documentation/get-started/capability-matrix.html', desc: 'Models, languages, pricing' },
      ],
      match: [/\/api-reference/, /capability-matrix/],
    },
    {
      id: 'integrations',
      label: 'Integrations',
      href: '/shunya-website-documentation/integrations/overview.html',
      icon: 'integrations',
      match: [/\/integrations\//],
    },
    {
      id: 'deploy',
      label: 'Deployment',
      href: '/shunya-website-documentation/deployment/overview.html',
      icon: 'deploy',
      match: [/\/deployment\//, /\/security\//, /\/enterprise\//],
    },
  ];

  let initialized = false;

  function svg(name, cls) {
    const path = ICONS[name] || '';
    return `<svg class="${cls || 'header-nav-ico'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  function isActive(item, path) {
    if (item.match) return item.match.some((re) => re.test(path));
    return false;
  }

  function renderNav() {
    const nav = document.querySelector('.header-nav');
    if (!nav) return;
    const path = window.location.pathname;

    nav.innerHTML = LINKS.map((item) => {
      const active = isActive(item, path);
      if (item.dropdown) {
        const links = item.dropdown
          .map(
            (d) => `
          <a class="header-nav-drop-link" href="${d.href}">
            <span class="header-nav-drop-title">${d.label}</span>
            <span class="header-nav-drop-desc">${d.desc}</span>
          </a>`
          )
          .join('');
        return `
          <div class="header-nav-item${active ? ' is-active' : ''}" data-nav-id="${item.id}">
            <button type="button" class="header-nav-link" aria-expanded="false" aria-haspopup="true">
              ${svg(item.icon)}
              <span>${item.label}</span>
              ${svg('chevron', 'header-nav-chevron')}
            </button>
            <div class="header-nav-dropdown" role="menu">${links}</div>
          </div>`;
      }
      return `
        <a class="header-nav-link${active ? ' is-active' : ''}" href="${item.href}" data-nav-id="${item.id}">
          ${svg(item.icon)}
          <span>${item.label}</span>
        </a>`;
    }).join('');
  }

  function wireDropdowns() {
    document.querySelectorAll('.header-nav-item').forEach((item) => {
      const btn = item.querySelector('button.header-nav-link');
      const panel = item.querySelector('.header-nav-dropdown');
      if (!btn || !panel) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.querySelectorAll('.header-nav-item.is-open').forEach((other) => {
          if (other !== item) {
            other.classList.remove('is-open');
            const b = other.querySelector('button.header-nav-link');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.header-nav-item.is-open').forEach((item) => {
        item.classList.remove('is-open');
        const b = item.querySelector('button.header-nav-link');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function wireScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function setHeaderHeight() {
    const header = document.querySelector('.header');
    if (!header) return;
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', h + 'px');
  }

  function init() {
    renderNav();
    wireDropdowns();
    setHeaderHeight();
    if (!initialized) {
      wireScroll();
      window.addEventListener('resize', setHeaderHeight);
      initialized = true;
    }
  }

  window.ShunyaHeaderNav = { init, ICONS, HF_ICON };
})();

