// Gedrag voor de hele site: naar boven bij navigatie, header bij scrollen, mobiel menu en scroll-reveals.
// Wordt inline in elke pagina gezet, zonder extra bestand om te laden.
(function () {
  var root = document.documentElement, body = document.body;

  // Elke nieuwe pagina start bovenaan (behalve bij een #anker)
  function toTop() {
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    try { if (window.top !== window) root.scrollIntoView({ block: 'start' }); } catch (e) {}
    root.style.scrollBehavior = '';
  }
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) {
    toTop();
    requestAnimationFrame(toTop);
    window.addEventListener('load', toTop);
    window.addEventListener('pageshow', function (e) { if (e.persisted) toTop(); });
  }
  // Interne links (knoppen, footer, menu): eerst naar boven, dan pas naar de nieuwe pagina.
  // Een link naar de huidige pagina scrolt gewoon rustig naar boven.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.hash || !/^https?:/.test(url.protocol)) return;
    var here = location.pathname.replace(/(index\.html|\/)$/, ''), there = url.pathname.replace(/(index\.html|\/)$/, '');
    if (here === there) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    toTop();
  });
  var header = document.querySelector('.site-header');
  var fab = document.getElementById('call-fab');
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');

  // Header: achtergrond na scrollen, verbergen bij naar beneden scrollen
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    header.classList.toggle('hide', y > 400 && y > lastY && !body.classList.contains('menu-open'));
    fab && fab.classList.toggle('show', y > 500);
    lastY = y;
    var p = document.querySelector('.steps-progress i');
    if (p) {
      var s = p.parentElement.parentElement.getBoundingClientRect();
      var pct = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - s.top) / s.height));
      p.style.height = (pct * 100) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobiel menu
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    menu.setAttribute('aria-hidden', !open);
  }
  toggle.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  document.getElementById('to-top').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Scroll-reveal; alles wat al in beeld is, verschijnt meteen
  var els = document.querySelectorAll('.reveal, .reveal-img, .step');
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
  // Vangnet: na 2,5 s alles tonen dat nog verborgen is (bv. bij screenshots)
  setTimeout(function () { document.querySelectorAll('.reveal:not(.in), .reveal-img:not(.in)').forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
  }); }, 2500);
})();
