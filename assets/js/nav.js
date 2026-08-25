/* Shared sidebar navigation — single source of truth */
(function () {
  const NAV = [
    {
      heading: 'Get Started',
      items: [
        { href: '/shunya-website-documentation/index.html', label: 'Overview', icon: 'home' },
        { href: '/shunya-website-documentation/get-started/what-is-shunya.html', label: 'What is Shunya?', icon: 'sparkles' },
        { href: '/shunya-website-documentation/get-started/quickstart.html', label: 'Quickstart', icon: 'zap' },
        { href: '/shunya-website-documentation/get-started/capability-matrix.html', label: 'Capability matrix', icon: 'grid' },
        { href: '/shunya-website-documentation/get-started/supported-languages.html', label: 'Supported languages', icon: 'globe' },
        { href: '/shunya-website-documentation/get-started/glossary.html', label: 'Glossary', icon: 'book' },
        { href: '/shunya-website-documentation/get-started/faqs.html', label: 'FAQs', icon: 'help-circle' },
      ]
    },
    {
      heading: 'Speech-to-Text',
      headingLink: '/shunya-website-documentation/asr/overview.html',
      headingMatch: [/\/asr\//],
    },
    {
      heading: 'Text-to-Speech',
      headingLink: '/shunya-website-documentation/tts/overview.html',
      headingMatch: [/\/tts\//],
    },
    {
      heading: 'Intelligence',
      items: [
        { href: '/shunya-website-documentation/intelligence/overview.html', label: 'Overview & examples', icon: 'sparkles' },
        { href: '/shunya-website-documentation/asr/api-reference.html#post-speechintelligence', label: 'Configuration', icon: 'sliders' },
        { href: '/shunya-website-documentation/asr/features.html', label: 'Full reference', icon: 'book' },
      ]
    },
    {
      heading: 'Translation',
      items: [
        { href: '/shunya-website-documentation/translation/vak-overview.html', label: 'Vāķ Translate', icon: 'globe' },
      ]
    },
    {
      heading: 'Solutions',
      items: [
        { href: '/shunya-website-documentation/solutions/bfsi.html', label: 'BFSI', icon: 'banknote' },
        { href: '/shunya-website-documentation/solutions/healthcare.html', label: 'Healthcare', icon: 'heart' },
        { href: '/shunya-website-documentation/solutions/contact-centers.html', label: 'Contact centers', icon: 'headphones' },
        { href: '/shunya-website-documentation/solutions/media.html', label: 'Media & entertainment', icon: 'film' },
      ]
    },
    {
      heading: 'Integrations',
      items: [
        { href: '/shunya-website-documentation/integrations/overview.html', label: 'Overview', icon: 'plug' },
        { href: '/shunya-website-documentation/integrations/python-sdk.html', label: 'Python SDK', icon: 'code' },
        { href: '/shunya-website-documentation/integrations/openai-sdk.html', label: 'OpenAI SDK', icon: 'compatible' },
        { href: '/shunya-website-documentation/integrations/sip-pstn.html', label: 'SIP / PSTN', icon: 'wifi' },
        { href: '/shunya-website-documentation/integrations/hugging-face.html', label: 'Hugging Face', icon: 'flask' },
        { href: '/shunya-website-documentation/integrations/pipecat.html', label: 'Pipecat', icon: 'building' },
        { href: '/shunya-website-documentation/integrations/livekit.html', label: 'LiveKit', icon: 'phone' },
      ]
    },
    {
      heading: 'Deployment',
      items: [
        { href: '/shunya-website-documentation/deployment/overview.html', label: 'Cloud / on-prem', icon: 'server' },
      ]
    },
    {
      heading: 'Enterprise',
      items: [
        { href: '/shunya-website-documentation/enterprise/sso.html', label: 'Set up SSO', icon: 'lock' },
        { href: '/shunya-website-documentation/enterprise/hands-on-evaluation.html', label: 'Hands-on evaluation', icon: 'beaker' },
      ]
    },
    {
      heading: 'Security',
      items: [
        { href: '/shunya-website-documentation/security/compliance.html', label: 'Compliance & privacy', icon: 'shield' },
      ]
    },
  ];

  // Inline SVG icons (Lucide subset)
  const ICONS = {
    home: '<path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2V9.5z"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    flask: '<path d="M9 2v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 8V2"/><line x1="8" y1="2" x2="16" y2="2"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><line x1="9" y1="9" x2="9" y2="9"/><line x1="15" y1="9" x2="15" y2="9"/><line x1="9" y1="14" x2="9" y2="14"/><line x1="15" y1="14" x2="15" y2="14"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
    star: '<polygon points="12 2 15 9 22 10 17 15 18 22 12 19 6 22 7 15 2 10 9 9"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'file-audio': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    banknote: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    film: '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
    server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    plug: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"/>',
    compatible: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    beaker: '<path d="M9 2v6L4 18a2 2 0 0 0 1.79 3h12.42A2 2 0 0 0 20 18l-5-10V2"/><line x1="9" y1="2" x2="15" y2="2"/><line x1="6" y1="14" x2="18" y2="14"/>',
    'help-circle': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  };

  function icon(name) {
    const path = ICONS[name] || '';
    return `<svg class="ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  }

  // Determine base path depth so links work from any subdirectory
  function getBase() {
    const path = window.location.pathname;
    // Count the number of directories past the site root
    // Our site has files at /, /asr/, /tts/, /get-started/, etc.
    // We'll use relative-to-root href (with leading /) and rely on <base> being set
    return '';
  }

  function isHeadingLinkActive(section, normalized) {
    if (section.headingMatch && section.headingMatch.some((re) => re.test(normalized))) {
      return true;
    }
    const href = section.headingLink || '';
    return href === normalized ||
      normalized.endsWith(href.replace('/shunya-website-documentation', '')) ||
      (href === '/shunya-website-documentation/index.html' && normalized === '/');
  }

  function renderSidebar() {
    const base = document.querySelector('meta[name="site-base"]')?.content || '';
    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    const normalized = currentPath === '/' ? '/index.html' : currentPath;

    const html = NAV.map((section) => {
      if (section.headingLink) {
        const isActive = isHeadingLinkActive(section, normalized);
        return `
      <div class="sidebar-section">
        <a class="sidebar-heading sidebar-heading-link${isActive ? ' is-active' : ''}" href="${base}${section.headingLink}">${section.heading}</a>
      </div>`;
      }
      const items = section.items || [];
      return `
      <div class="sidebar-section">
        ${section.heading ? `<div class="sidebar-heading">${section.heading}</div>` : ''}
        ${items.map((item) => {
          const itemPath = item.href;
          const isActive = itemPath === normalized ||
            (itemPath === '/index.html' && normalized === '/');
          return `<a class="sidebar-link${isActive ? ' active' : ''}" href="${base}${item.href}">${icon(item.icon)}<span>${item.label}</span></a>`;
        }).join('')}
      </div>`;
    }).join('');

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.innerHTML = html;

    // After the sidebar renders, scroll the active link into view inside
    // the sidebar so the user can always see where they are in the doc tree.
    // We only scroll the sidebar (its own overflow container) — not the page.
    const active = sidebar.querySelector('.sidebar-link.active, .sidebar-heading-link.is-active');
    if (active) {
      const sb = sidebar.getBoundingClientRect();
      const a = active.getBoundingClientRect();
      const visible = a.top >= sb.top && a.bottom <= sb.bottom;
      if (!visible) {
        const target = active.offsetTop - (sidebar.clientHeight / 2) + (active.clientHeight / 2);
        sidebar.scrollTop = Math.max(0, target);
      }
    }
  }

  function wireMobileToggle() {
    const btn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (!btn || !sidebar) return;
    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
    // Close on link click (mobile)
    sidebar.addEventListener('click', (e) => {
      if (e.target.closest('.sidebar-link, .sidebar-heading-link, .product-nav-link, .api-ref-link') && window.innerWidth <= 900) {
        sidebar.classList.remove('open');
      }
    });
  }

  function buildTOC() {
    const toc = document.querySelector('.toc');
    if (!toc) return;
    const content = document.querySelector('.content');
    if (!content) return;
    const headings = content.querySelectorAll('h2, h3');
    if (headings.length === 0) { toc.style.display = 'none'; return; }
    const items = Array.from(headings).map(h => {
      if (!h.id) {
        h.id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
      }
      return `<a class="${h.tagName === 'H3' ? 'toc-l3' : ''}" href="#${h.id}">${h.textContent}</a>`;
    }).join('');
    toc.innerHTML = `<div class="toc-title">On this page</div>${items}`;

    // Active-section highlight on scroll
    const links = toc.querySelectorAll('a');
    const map = new Map();
    links.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) map.set(el, a);
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.remove('active'));
          const link = map.get(e.target);
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-120px 0px -70% 0px' });
    map.forEach((_, el) => obs.observe(el));
  }

  function wireCodeTabs() {
    document.querySelectorAll('.code-group').forEach(group => {
      const tabs = group.querySelectorAll('.code-tab');
      const panels = group.querySelectorAll('.code-panel');
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          panels.forEach(p => p.classList.remove('active'));
          tab.classList.add('active');
          if (panels[i]) panels[i].classList.add('active');
        });
      });
    });
  }

  function wireCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const target = btn.closest('.code-group, pre')?.querySelector('.code-panel.active code, code');
        if (!target) return;
        try {
          await navigator.clipboard.writeText(target.textContent);
          btn.textContent = 'Copied';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
        } catch {}
      });
    });
  }

  function wireSearch() {
    /* Search UI lives in doc-search.js (loaded by shell.js) */
  }

  function bootSidebar() {
    if (window.ShunyaIntelligenceNav && window.ShunyaIntelligenceNav.isIntelligenceContext()) {
      window.ShunyaIntelligenceNav.init();
      return;
    }
    if (window.ShunyaSttNav && window.ShunyaSttNav.isSttContext()) {
      window.ShunyaSttNav.init();
      return;
    }
    if (window.ShunyaTtsNav && window.ShunyaTtsNav.isTtsContext()) {
      window.ShunyaTtsNav.init();
      return;
    }
    if (window.ShunyaApiRefNav && window.ShunyaApiRefNav.isApiRefContext()) {
      window.ShunyaApiRefNav.init();
      return;
    }
    renderSidebar();
  }

  document.addEventListener('DOMContentLoaded', () => {
    bootSidebar();
    wireMobileToggle();
    buildTOC();
    wireCodeTabs();
    wireCopyButtons();
    wireSearch();
  });
})();
