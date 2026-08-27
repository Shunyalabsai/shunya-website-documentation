/* Shared Mermaid bootstrap.
 *
 * Captures each diagram's original source code before Mermaid renders
 * for the first time, then re-renders using that snapshot whenever the
 * site theme flips between light and dark.
 *
 * Bug we're guarding against: once Mermaid renders, .textContent of the
 * .mermaid div is the SVG's accumulated text, not the original DSL - if
 * we fed that back as the source on a re-render, we'd get
 * "Syntax error in text" from Mermaid. So we capture sources up front
 * and never read .textContent again. */
(function () {
  if (typeof window === 'undefined') return;

  const DARK = {
    background: 'transparent',
    primaryColor: '#10131d',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: 'rgba(129, 140, 248, 0.4)',
    secondaryColor: '#141722',
    secondaryTextColor: '#e0e7ff',
    secondaryBorderColor: 'rgba(99, 102, 241, 0.5)',
    tertiaryColor: '#181b26',
    tertiaryTextColor: '#ddd6fe',
    tertiaryBorderColor: 'rgba(168, 85, 247, 0.5)',
    lineColor: '#64748b',
    textColor: '#f8fafc',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '14px',
    nodeBorder: 'rgba(129, 140, 248, 0.35)',
    edgeLabelBackground: '#07080b',
    clusterBkg: '#0d0f15',
    clusterBorder: 'rgba(255, 255, 255, 0.12)',
    actorBkg: '#10131d',
    actorBorder: 'rgba(129, 140, 248, 0.4)',
    actorTextColor: '#f8fafc',
    actorLineColor: '#64748b',
    signalColor: '#cbd5e1',
    signalTextColor: '#f8fafc',
    labelBoxBkgColor: '#10131d',
    labelBoxBorderColor: 'rgba(129, 140, 248, 0.4)',
    labelTextColor: '#f8fafc',
    loopTextColor: '#f8fafc',
    noteBkgColor: '#1e1b4b',
    noteTextColor: '#e0e7ff',
    noteBorderColor: '#6366f1',
  };

  const LIGHT = {
    background: 'transparent',
    primaryColor: '#ffffff',
    primaryTextColor: '#0f172a',
    primaryBorderColor: '#cbd5e1',
    secondaryColor: '#f8fafc',
    secondaryTextColor: '#1e1b4b',
    secondaryBorderColor: '#6366f1',
    tertiaryColor: '#faf5ff',
    tertiaryTextColor: '#3b0764',
    tertiaryBorderColor: '#a855f7',
    lineColor: '#64748b',
    textColor: '#0f172a',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '14px',
    edgeLabelBackground: '#ffffff',
    clusterBkg: '#f8fafc',
    clusterBorder: '#e2e8f0',
    actorBkg: '#ffffff',
    actorBorder: '#cbd5e1',
    actorTextColor: '#0f172a',
    actorLineColor: '#94a3b8',
    signalColor: '#475569',
    signalTextColor: '#0f172a',
    labelBoxBkgColor: '#f8fafc',
    labelBoxBorderColor: '#cbd5e1',
    labelTextColor: '#0f172a',
    loopTextColor: '#0f172a',
    noteBkgColor: '#fffbeb',
    noteTextColor: '#78350f',
    noteBorderColor: '#f59e0b',
  };

  const isDark = () => document.documentElement.classList.contains('dark');

  function makeConfig() {
    return {
      startOnLoad: false,
      theme: 'base',
      themeVariables: isDark() ? DARK : LIGHT,
      flowchart: { curve: 'basis', padding: 14, htmlLabels: true },
      sequence: { useMaxWidth: true, mirrorActors: false, bottomMarginAdj: 0 },
      securityLevel: 'loose',
    };
  }

  /* Snapshot every .mermaid block's source code into a dataset attr.
     MUST run before mermaid renders for the first time. */
  function captureSources() {
    document.querySelectorAll('.mermaid').forEach((el) => {
      if (el.dataset.mermaidSource) return; // already captured
      const src = (el.getAttribute('data-src') || el.textContent || '').trim();
      el.dataset.mermaidSource = src;
    });
  }

  async function renderAll() {
    if (typeof mermaid === 'undefined') return;
    document.querySelectorAll('.mermaid').forEach((el) => {
      el.removeAttribute('data-processed');
      // restore the captured source so mermaid sees the original DSL
      el.innerHTML = el.dataset.mermaidSource || '';
    });
    try {
      await mermaid.run({ querySelector: '.mermaid' });
    } catch (err) {
      // Surface in the console so debugging is possible without breaking the page
      console.warn('Mermaid render failed:', err);
    }
  }

  function boot() {
    if (typeof mermaid === 'undefined') {
      // mermaid library hasn't loaded yet - try again shortly
      setTimeout(boot, 50);
      return;
    }
    captureSources();
    mermaid.initialize(makeConfig());
    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  /* Watch <html> class for theme flips. Re-render every diagram with
     the new themeVariables. We debounce via rAF so a rapid sequence
     of class mutations only triggers one re-render pass. */
  let pending = false;
  const observer = new MutationObserver(() => {
    if (pending || typeof mermaid === 'undefined') return;
    pending = true;
    requestAnimationFrame(async () => {
      mermaid.initialize(makeConfig());
      await renderAll();
      pending = false;
    });
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
})();
