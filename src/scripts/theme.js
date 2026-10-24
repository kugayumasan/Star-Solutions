// Themaknop in de header: wisselt tussen licht en donker en onthoudt de keuze.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var system = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    var t = root.getAttribute('data-theme');
    return t === 'light' || t === 'dark' ? t : (system.matches ? 'dark' : 'light');
  }
  function sync() {
    var dark = current() === 'dark';
    btn.setAttribute('aria-label', dark ? 'Licht thema aanzetten' : 'Donker thema aanzetten');
    btn.setAttribute('aria-pressed', dark);
  }
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
  if (system.addEventListener) system.addEventListener('change', sync);
  sync();
})();
