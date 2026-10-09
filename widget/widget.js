// Embeddable Profit-Safe CPC calculator.
//
// The arithmetic below is identical to the on-site calculator in
// seo-calculators.js. If the two ever disagree the embed becomes a liability,
// so scripts/validate-seo.mjs asserts they stay in step.
//
// The widget makes no network requests of any kind — the /embed/* CSP sets
// connect-src 'none', so a publisher can verify that rather than trust it.
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const num = (id) => {
    const raw = $(id)?.value?.trim();
    if (!raw) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  };
  const money = (v) => Number.isFinite(v) ? `$${v.toFixed(2)}` : '—';
  const pct = (v) => Number.isFinite(v) ? `${v.toFixed(1)}%` : '—';
  const put = (id, v) => { const n = $(id); if (n) n.textContent = v; };

  function recalculate() {
    const price = num('w-price'), landed = num('w-landed'), fees = num('w-fees');
    const other = num('w-other') ?? 0, protect = num('w-protect') ?? 0, cvr = num('w-cvr');
    if (price === null || landed === null || fees === null || cvr === null
      || price <= 0 || landed < 0 || fees < 0 || other < 0 || protect < 0 || cvr < 0 || cvr > 100) {
      ['w-contribution', 'w-breakeven', 'w-acos', 'w-cpc'].forEach((id) => put(id, '—'));
      return;
    }
    const contribution = price - landed - fees - other;
    const allowable = Math.max(0, contribution - protect);
    put('w-contribution', money(contribution));
    put('w-breakeven', money(contribution * (cvr / 100)));
    put('w-acos', pct((allowable / price) * 100));
    put('w-cpc', money(allowable * (cvr / 100)));
  }

  // Let a host page size the iframe to the content instead of guessing.
  function reportHeight() {
    const height = Math.ceil(document.documentElement.getBoundingClientRect().height);
    try { parent.postMessage({ type: 'ceilr:embed:height', height }, '*'); } catch { /* not framed */ }
  }

  for (const id of ['w-price', 'w-landed', 'w-fees', 'w-other', 'w-protect', 'w-cvr']) {
    $(id)?.addEventListener('input', () => { recalculate(); reportHeight(); });
  }
  recalculate();
  reportHeight();
  addEventListener('load', reportHeight);
  if (typeof ResizeObserver === 'function') new ResizeObserver(reportHeight).observe(document.documentElement);
})();
