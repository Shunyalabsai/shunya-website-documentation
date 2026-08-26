/* Shell: header + product nav + sidebar placeholder (single file, no extra requests) */
(function () {
  const HF_ICON =
    '<path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378"/>';

  const NAV_ICONS = {
    home: '<path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    stt: '<path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/><path d="M6 14a6 6 0 0 0 12 0"/><line x1="12" y1="20" x2="12" y2="22"/><path d="M8 22h8"/>',
    tts: '<path d="M11 6L6 10H3v4h3l5 4V6z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8 8 0 0 1 0 12"/>',
    intel:
      '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><circle cx="12" cy="12" r="2.5" opacity="0.35"/>',
    agent:
      '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    translate:
      '<circle cx="12" cy="12" r="9"/><path d="M2 12h20"/><path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z"/><path d="M8 9l4 3-4 3M16 9l-4 3 4 3"/>',
    api: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22" opacity="0.35"/>',
    integrations:
      '<path d="M12 2v6"/><path d="M8 8h8"/><rect x="3" y="10" width="7" height="7" rx="1.5"/><rect x="14" y="10" width="7" height="7" rx="1.5"/><path d="M10 17v3M14 17v3"/>',
    deploy:
      '<rect x="4" y="4" width="16" height="5" rx="1"/><rect x="4" y="11" width="16" height="5" rx="1"/><rect x="4" y="18" width="16" height="2" rx="0.5"/><circle cx="7" cy="6.5" r="0.75" fill="currentColor" stroke="none"/><circle cx="7" cy="13.5" r="0.75" fill="currentColor" stroke="none"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
  };

  let docBase = '';
  let headerNavWired = false;

  // ── Google Translate ───────────────────────────────────────────────────────
  function loadGoogleTranslate() {
    if (document.getElementById('gt-script')) return;
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };
    const s = document.createElement('script');
    s.id = 'gt-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(s);
  }

  function triggerTranslate(lang) {
    if (lang === 'en') {
      try {
        document.querySelector('.goog-te-banner-frame')
          ?.contentDocument?.querySelector('.goog-close-link')?.click();
      } catch (e) {}
      return;
    }
    const t = setInterval(() => {
      const combo = document.querySelector('select.goog-te-combo');
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        clearInterval(t);
      }
    }, 100);
    setTimeout(() => clearInterval(t), 5000);
  }

  // ── Google Translate ───────────────────────────────────────────────────────
  const LANGUAGES = [
    { group: '🌐 International' },
    { value: 'en',    label: 'English',            flag: '🌐' },
    { value: 'ja',    label: 'Japanese',           flag: '🇯🇵' },
    { value: 'zh-CN', label: 'Chinese (Simplified)',flag: '🇨🇳' },
    { value: 'zh-TW', label: 'Chinese (Traditional)',flag:'🇹🇼' },
    { value: 'ar',    label: 'Arabic',             flag: '🇸🇦' },
    { value: 'de',    label: 'German',             flag: '🇩🇪' },
    { value: 'fr',    label: 'French',             flag: '🇫🇷' },
    { value: 'es',    label: 'Spanish',            flag: '🇪🇸' },
    { value: 'pt',    label: 'Portuguese',         flag: '🇧🇷' },
    { value: 'ru',    label: 'Russian',            flag: '🇷🇺' },
    { value: 'ko',    label: 'Korean',             flag: '🇰🇷' },
    { group: '🇮🇳 Hindi Belt' },
    { value: 'hi',    label: 'हिन्दी - Hindi',      flag: '🇮🇳' },
    { value: 'bho',   label: 'भोजपुरी - Bhojpuri', flag: '🇮🇳' },
    { value: 'mai',   label: 'मैथिली - Maithili',  flag: '🇮🇳' },
    { value: 'raj',   label: 'राजस्थानी - Rajasthani', flag: '🇮🇳' },
    { group: '🇮🇳 South India' },
    { value: 'ta',    label: 'தமிழ் - Tamil',      flag: '🇮🇳' },
    { value: 'te',    label: 'తెలుగు - Telugu',    flag: '🇮🇳' },
    { value: 'kn',    label: 'ಕನ್ನಡ - Kannada',    flag: '🇮🇳' },
    { value: 'ml',    label: 'മലയാളം - Malayalam', flag: '🇮🇳' },
    { group: '🇮🇳 West India' },
    { value: 'mr',    label: 'मराठी - Marathi',    flag: '🇮🇳' },
    { value: 'gu',    label: 'ગુજરાતી - Gujarati', flag: '🇮🇳' },
    { value: 'kok',   label: 'कोंकणी - Konkani',   flag: '🇮🇳' },
    { group: '🇮🇳 East India' },
    { value: 'bn',    label: 'বাংলা - Bengali',    flag: '🇮🇳' },
    { value: 'or',    label: 'ଓଡ଼ିଆ - Odia',       flag: '🇮🇳' },
    { value: 'as',    label: 'অসমীয়া - Assamese', flag: '🇮🇳' },
    { group: '🇮🇳 North-East' },
    { value: 'mni',   label: 'মেইতেই - Meitei',   flag: '🇮🇳' },
    { value: 'ne',    label: 'नेपाली - Nepali',    flag: '🇮🇳' },
    { group: '🇮🇳 North India' },
    { value: 'pa',    label: 'ਪੰਜਾਬੀ - Punjabi',   flag: '🇮🇳' },
    { value: 'ur',    label: 'اردو - Urdu',        flag: '🇮🇳' },
    { value: 'ks',    label: 'کٲشُر - Kashmiri',   flag: '🇮🇳' },
    { value: 'doi',   label: 'डोगरी - Dogri',      flag: '🇮🇳' },
    { value: 'sd',    label: 'سنڌي - Sindhi',      flag: '🇮🇳' },
  ];

  let currentLang = 'en';

  function renderLangList(filter) {
    const list = document.getElementById('langList');
    if (!list) return;
    const q = (filter || '').toLowerCase();
    let html = '';
    let inGroup = false;
    LANGUAGES.forEach(item => {
      if (item.group) {
        if (!q) {
          html += `<div class="lang-group">${item.group}</div>`;
          inGroup = true;
        }
        return;
      }
      if (q && !item.label.toLowerCase().includes(q)) return;
      const active = item.value === currentLang;
      html += `
        <div class="lang-option${active ? ' is-active' : ''}" data-value="${item.value}" role="option" aria-selected="${active}">
          <span class="lang-flag">${item.flag}</span>
          <span class="lang-name">${item.label}</span>
          ${active ? '<svg class="lang-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>`;
    });
    list.innerHTML = html || '<div class="lang-no-results">No results</div>';

    list.querySelectorAll('.lang-option').forEach(el => {
      el.addEventListener('click', () => {
        const val = el.dataset.value;
        selectLang(val);
      });
    });
  }

  function selectLang(val) {
    const item = LANGUAGES.find(l => l.value === val);
    if (!item) return;
    currentLang = val;
    localStorage.setItem('shunya_lang', val);

    // Update trigger label
    const label = document.getElementById('langLabel');
    if (label) label.textContent = val === 'en' ? 'EN' : (item.flag + ' ' + val.toUpperCase().slice(0, 3));

    closeLangDropdown();
    triggerTranslate(val);
  }

  function closeLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    const trigger = document.getElementById('langTrigger');
    const switcher = document.getElementById('langSwitcher');
    if (dropdown) dropdown.classList.remove('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (switcher) switcher.classList.remove('is-open');
  }

  function wireLangSwitcher() {
    const trigger = document.getElementById('langTrigger');
    const dropdown = document.getElementById('langDropdown');
    const search = document.getElementById('langSearch');
    const switcher = document.getElementById('langSwitcher');
    if (!trigger || !dropdown) return;

    // Render full list
    const saved = localStorage.getItem('shunya_lang') || 'en';
    currentLang = saved;
    const savedItem = LANGUAGES.find(l => l.value === saved);
    if (savedItem && saved !== 'en') {
      const label = document.getElementById('langLabel');
      if (label) label.textContent = savedItem.flag + ' ' + saved.toUpperCase().slice(0, 3);
      setTimeout(() => triggerTranslate(saved), 900);
    }
    renderLangList('');

    // Toggle open/close
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      switcher.classList.toggle('is-open', isOpen);
      if (isOpen) {
        setTimeout(() => search && search.focus(), 50);
        renderLangList('');
      }
    });

    // Search filter
    if (search) {
      search.addEventListener('input', () => renderLangList(search.value));
      search.addEventListener('click', e => e.stopPropagation());
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!switcher.contains(e.target)) closeLangDropdown();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLangDropdown();
    });
  }

  function getDocBase() {
    if (docBase) return docBase;
    const link = document.querySelector('link[href*="main.css"]');
    if (link) {
      const href = link.getAttribute('href') || '';
      const i = href.indexOf('/assets/css/');
      if (i !== -1) {
        docBase = href.slice(0, i);
        return docBase;
      }
      if (href.startsWith('.')) {
        try {
          docBase = new URL(href, window.location.href).pathname.replace(/\/assets\/css\/.*$/, '');
          return docBase;
        } catch (e) {
          /* fall through */
        }
      }
    }
    const script = document.querySelector('script[src*="shell.js"]');
    if (script) {
      const src = script.getAttribute('src') || '';
      const i = src.indexOf('/assets/js/');
      if (i !== -1) {
        docBase = src.slice(0, i);
        return docBase;
      }
    }
    if (window.location.pathname.indexOf('/shunya-website-documentation') !== -1) {
      docBase = '/shunya-website-documentation';
    } else {
      docBase = '';
    }
    return docBase;
  }

  function docUrl(path) {
    const base = getDocBase();
    const p = path.charAt(0) === '/' ? path : '/' + path;
    return base + p;
  }

  function navSvg(name, cls) {
    const path = NAV_ICONS[name] || '';
    return `<svg class="${cls || 'header-nav-ico'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  function buildHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
      <div class="header-top">
        <button type="button" class="icon-btn mobile-menu-btn" aria-label="Open sidebar menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <a href="${docUrl('/index.html')}" class="brand">
          <span class="brand-logo">S</span>
          <span class="brand-text">Shunya <span class="brand-accent">Labs Docs</span></span>
        </a>
        <div class="header-spacer"></div>
        <div class="doc-search" id="doc-search">
          <div class="doc-search-field">
            <span class="doc-search-glow" aria-hidden="true"></span>
            <svg class="doc-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="search" class="doc-search-input" placeholder="Search docs, models, APIs..." aria-label="Search documentation" aria-expanded="false" aria-controls="doc-search-panel" autocomplete="off" spellcheck="false">
            <button type="button" class="doc-search-clear" hidden aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <kbd class="doc-search-kbd" aria-hidden="true">/</kbd>
          </div>
          <div class="doc-search-panel" id="doc-search-panel" role="listbox" hidden></div>
        </div>
        <div class="header-actions">
          <a href="https://playground.shunyalabs.ai" class="header-action-link header-action-playground" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Playground</span>
          </a>
          <a href="https://huggingface.co/shunyalabs" class="header-action-link header-action-models" target="_blank" rel="noopener" title="Open weights on Hugging Face">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${HF_ICON}</svg>
            <span>Models</span>
          </a>
          <a href="https://accounts.shunyalabs.ai" class="header-btn header-btn-ghost" target="_blank" rel="noopener">Log in</a>
          <a href="https://accounts.shunyalabs.ai" class="header-btn header-btn-primary" target="_blank" rel="noopener">Free API key</a>
         <div id="google_translate_element" style="display:none"></div>
          <div class="lang-switcher-wrapper" id="langSwitcher">
            <button type="button" class="lang-trigger" id="langTrigger" aria-haspopup="listbox" aria-expanded="false">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span id="langLabel">EN</span>
              <svg class="lang-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="lang-dropdown" id="langDropdown" role="listbox" aria-label="Select Language">
              <div class="lang-search-wrap">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" class="lang-search" id="langSearch" placeholder="Search language..." autocomplete="off" spellcheck="false">
              </div>
              <div class="lang-list" id="langList">
                <div class="lang-group-label">🌐 International</div>
                <div class="lang-option active" data-value="en" data-label="EN">🇺🇸 English</div>
                <div class="lang-option" data-value="ja" data-label="JA">🇯🇵 Japanese</div>
                <div class="lang-option" data-value="zh-CN" data-label="中文">🇨🇳 Chinese (Simplified)</div>
                <div class="lang-option" data-value="zh-TW" data-label="中文">🇹🇼 Chinese (Traditional)</div>
                <div class="lang-option" data-value="ar" data-label="AR">🇸🇦 Arabic</div>
                <div class="lang-option" data-value="de" data-label="DE">🇩🇪 German</div>
                <div class="lang-option" data-value="fr" data-label="FR">🇫🇷 French</div>
                <div class="lang-option" data-value="es" data-label="ES">🇪🇸 Spanish</div>
                <div class="lang-option" data-value="pt" data-label="PT">🇧🇷 Portuguese</div>
                <div class="lang-option" data-value="ru" data-label="RU">🇷🇺 Russian</div>
                <div class="lang-option" data-value="ko" data-label="KO">🇰🇷 Korean</div>
                <div class="lang-option" data-value="tr" data-label="TR">🇹🇷 Turkish</div>
                <div class="lang-option" data-value="vi" data-label="VI">🇻🇳 Vietnamese</div>
                <div class="lang-option" data-value="id" data-label="ID">🇮🇩 Indonesian</div>
                <div class="lang-group-label">🇮🇳 Hindi Belt</div>
                <div class="lang-option" data-value="hi" data-label="हिंदी">हिन्दी - Hindi</div>
                <div class="lang-option" data-value="bho" data-label="भोजपुरी">भोजपुरी - Bhojpuri</div>
                <div class="lang-option" data-value="mai" data-label="मैथिली">मैथिली - Maithili</div>
                <div class="lang-option" data-value="raj" data-label="राजस्थानी">राजस्थानी - Rajasthani</div>
                <div class="lang-group-label">🇮🇳 South India</div>
                <div class="lang-option" data-value="ta" data-label="தமிழ்">தமிழ் - Tamil</div>
                <div class="lang-option" data-value="te" data-label="తెలుగు">తెలుగు - Telugu</div>
                <div class="lang-option" data-value="kn" data-label="ಕನ್ನಡ">ಕನ್ನಡ - Kannada</div>
                <div class="lang-option" data-value="ml" data-label="മലയാളം">മലയാളം - Malayalam</div>
                <div class="lang-group-label">🇮🇳 West India</div>
                <div class="lang-option" data-value="mr" data-label="मराठी">मराठी - Marathi</div>
                <div class="lang-option" data-value="gu" data-label="ગુજરાતી">ગુજરાતી - Gujarati</div>
                <div class="lang-option" data-value="kok" data-label="कोंकणी">कोंकणी - Konkani</div>
                <div class="lang-group-label">🇮🇳 East India</div>
                <div class="lang-option" data-value="bn" data-label="বাংলা">বাংলা - Bengali</div>
                <div class="lang-option" data-value="or" data-label="ଓଡ଼ିଆ">ଓଡ଼ିଆ - Odia</div>
                <div class="lang-option" data-value="as" data-label="অসমীয়া">অসমীয়া - Assamese</div>
                <div class="lang-group-label">🇮🇳 North-East India</div>
                <div class="lang-option" data-value="mni" data-label="মেইতেই">মেইতেই - Meitei</div>
                <div class="lang-option" data-value="ne" data-label="नेपाली">नेपाली - Nepali</div>
                <div class="lang-group-label">🇮🇳 North India</div>
                <div class="lang-option" data-value="pa" data-label="ਪੰਜਾਬੀ">ਪੰਜਾਬੀ - Punjabi</div>
                <div class="lang-option" data-value="ur" data-label="اردو">اردو - Urdu</div>
                <div class="lang-option" data-value="ks" data-label="کٲشُر">کٲشُر - Kashmiri</div>
                <div class="lang-option" data-value="doi" data-label="डोगरी">डोगरी - Dogri</div>
                <div class="lang-option" data-value="sd" data-label="سنڌي">سنڌي - Sindhi</div>
              </div>
            </div>
          </div>
          <button type="button" id="theme-btn" class="icon-btn" aria-label="Toggle theme"></button>
        </div><!-- close .header-actions -->
      </div><!-- close .header-top -->
      <nav class="header-nav" aria-label="Jump to product area"></nav>
    `;

    const themeBtn = header.querySelector('#theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        if (window.ShunyaTheme) window.ShunyaTheme.cycle();
      });
    }

    // ── Language switcher wiring ───────────────────────────────────
    const trigger  = header.querySelector('#langTrigger');
    const dropdown = header.querySelector('#langDropdown');
    const label    = header.querySelector('#langLabel');
    const search   = header.querySelector('#langSearch');
    const list     = header.querySelector('#langList');

    function setLang(value, labelText) {
      label.textContent = labelText;
      list.querySelectorAll('.lang-option').forEach(o =>
        o.classList.toggle('active', o.dataset.value === value)
      );
      closeLang();
      localStorage.setItem('shunya_lang', value);
      triggerTranslate(value);
    }

    function openLang() {
      dropdown.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      search.value = '';
      filterLang('');
      setTimeout(() => search.focus(), 50);
    }

    function closeLang() {
      dropdown.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    function filterLang(q) {
      const query = q.toLowerCase();
      list.querySelectorAll('.lang-option').forEach(o => {
        o.style.display = o.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
      list.querySelectorAll('.lang-group-label').forEach(g => {
        let el = g.nextElementSibling;
        let hasVisible = false;
        while (el && !el.classList.contains('lang-group-label')) {
          if (el.style.display !== 'none') hasVisible = true;
          el = el.nextElementSibling;
        }
        g.style.display = hasVisible ? '' : 'none';
      });
    }

    if (trigger && dropdown) {
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        dropdown.classList.contains('open') ? closeLang() : openLang();
      });
      list.addEventListener('click', e => {
        const opt = e.target.closest('.lang-option');
        if (opt) setLang(opt.dataset.value, opt.dataset.label);
      });
      search.addEventListener('input', e => filterLang(e.target.value));
      search.addEventListener('click', e => e.stopPropagation());
      document.addEventListener('click', e => {
        if (!document.getElementById('langSwitcher')?.contains(e.target)) closeLang();
      });

      // Restore saved language on load
      const saved = localStorage.getItem('shunya_lang');
      if (saved) {
        const savedOpt = list.querySelector(`[data-value="${saved}"]`);
        if (savedOpt) {
          label.textContent = savedOpt.dataset.label;
          list.querySelector('.lang-option.active')?.classList.remove('active');
          savedOpt.classList.add('active');
          if (saved !== 'en') setTimeout(() => triggerTranslate(saved), 900);
        }
      }
    }

    return header;
  }
  const TOP_LINKS = [
    {
      id: 'home',
      label: 'Home',
      path: '/index.html',
      icon: 'home',
      match: [/index\.html$/, /\/shunya-website-documentation\/?$/, /what-is-shunya/, /glossary/, /capability-matrix/, /\/faqs/],
    },
    {
      id: 'quickstart',
      label: 'Quickstart',
      path: '/get-started/quickstart.html',
      icon: 'zap',
      match: [/\/get-started\/quickstart/],
    },
    {
      id: 'stt',
      label: 'Speech-to-Text',
      path: '/asr/overview.html',
      icon: 'stt',
      match: [/\/asr\//],
    },
    {
      id: 'tts',
      label: 'Text-to-Speech',
      path: '/tts/overview.html',
      icon: 'tts',
      match: [/\/tts\//],
    },
    {
      id: 'intel',
      label: 'Intelligence',
      path: '/intelligence/overview.html',
      icon: 'intel',
      match: [/\/intelligence\//],
    },
    {
      id: 'voice-agent',
      label: 'Voice Agent - Meera',
      path: '/voice-agent/meera.html',
      icon: 'agent',
      match: [/\/voice-agent\//],
    },
    {
      id: 'api',
      label: 'API Reference',
      path: '/api-reference/index.html',
      icon: 'api',
      match: [/\/api-reference\//],
    },
    {
      id: 'integrations',
      label: 'Integrations',
      path: '/integrations/overview.html',
      icon: 'integrations',
      match: [/\/integrations\//],
    },
    {
      id: 'deploy',
      label: 'Deployment',
      path: '/deployment/overview.html',
      icon: 'deploy',
      match: [/\/deployment\//, /\/security\//, /\/enterprise\//],
    },
  ];

  function renderHeaderNav() {
    const nav = document.querySelector('.header-nav');
    if (!nav) return;
    const path = window.location.pathname;

    nav.innerHTML = TOP_LINKS.map((item) => {
      const active = item.match && item.match.some((re) => re.test(path));
      if (item.dropdown) {
        const links = item.dropdown
          .map(
            (d) => `
          <a class="header-nav-drop-link" href="${docUrl(d.path)}">
            <span class="header-nav-drop-title">${d.label}</span>
            <span class="header-nav-drop-desc">${d.desc}</span>
          </a>`
          )
          .join('');
        return `
          <div class="header-nav-item${active ? ' is-active' : ''}" data-nav-id="${item.id}">
            <button type="button" class="header-nav-link" aria-expanded="false" aria-haspopup="true">
              ${navSvg(item.icon)}
              <span>${item.label}</span>
              ${navSvg('chevron', 'header-nav-chevron')}
            </button>
            <div class="header-nav-dropdown" role="menu">${links}</div>
          </div>`;
      }
      return `
        <a class="header-nav-link${active ? ' is-active' : ''}" href="${docUrl(item.path)}" data-nav-id="${item.id}">
          ${navSvg(item.icon)}
          <span>${item.label}</span>
        </a>`;
    }).join('');
  }

  function wireHeaderNav() {
    if (headerNavWired) return;
    document.querySelectorAll('.header-nav-item').forEach((item) => {
      const btn = item.querySelector('button.header-nav-link');
      if (!btn) return;
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
    const header = document.querySelector('.header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', setHeaderHeight);
    headerNavWired = true;
  }

  function setHeaderHeight() {
    const header = document.querySelector('.header');
    if (!header) return;
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
  }

  function initHeaderNav() {
    renderHeaderNav();
    wireHeaderNav();
    setHeaderHeight();
    requestAnimationFrame(setHeaderHeight);
  }

  function init() {
    loadGoogleTranslate(); // ← add this line
    const app = document.querySelector('.app');
    if (!app) return;

    if (!app.querySelector('.header')) {
      app.insertBefore(buildHeader(), app.firstChild);
      initHeaderNav();
    } else {
      initHeaderNav();
    }

    if (!app.querySelector('.sidebar')) {
      const sb = document.createElement('aside');
      sb.className = 'sidebar';
      sb.setAttribute('aria-label', 'Documentation sections');
      const main = app.querySelector('.main');
      if (main) app.insertBefore(sb, main);
      else app.appendChild(sb);
    }

    if (window.ShunyaTheme) window.ShunyaTheme.updateButton();

    if (!document.querySelector('script[src*="hf-links.js"]')) {
      const hf = document.createElement('script');
      hf.src = docUrl('/assets/js/hf-links.js?v=2');
      hf.defer = true;
      document.body.appendChild(hf);
    }

    if (!document.querySelector('script[src*="doc-search.js"]')) {
      const ds = document.createElement('script');
      ds.src = docUrl('/assets/js/doc-search.js?v=2');
      ds.onload = () => {
        if (window.ShunyaDocSearch) window.ShunyaDocSearch.init();
      };
      document.body.appendChild(ds);
    } else if (window.ShunyaDocSearch) {
      window.ShunyaDocSearch.init();
    }

    const navScript = document.querySelector('script[src*="nav.js"]');
    if (navScript) {
      if (!document.querySelector('script[src*="api-ref-nav.js"]')) {
        const ar = document.createElement('script');
        ar.src = docUrl('/assets/js/api-ref-nav.js?v=3');
        navScript.before(ar);
      }
      if (!document.querySelector('script[src*="intelligence-nav.js"]')) {
        const intel = document.createElement('script');
        intel.src = docUrl('/assets/js/intelligence-nav.js?v=1');
        navScript.before(intel);
      }
      if (!document.querySelector('script[src*="stt-nav.js"]')) {
        const stt = document.createElement('script');
        stt.src = docUrl('/assets/js/stt-nav.js?v=3');
        navScript.before(stt);
      }
      if (!document.querySelector('script[src*="tts-nav.js"]')) {
        const tts = document.createElement('script');
        tts.src = docUrl('/assets/js/tts-nav.js?v=1');
        navScript.before(tts);
      }
    }
  }

  window.ShunyaHeaderNav = { init: initHeaderNav, HF_ICON };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
