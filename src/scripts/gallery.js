// Fotogalerij en lightbox op de dienstpagina's.
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var dlg = document.getElementById('lightbox');
  if (!items.length || !dlg || !dlg.showModal) return;
  var img = dlg.querySelector('img'), count = dlg.querySelector('.lb-count'), cur = 0;
  function show(i) {
    cur = (i + items.length) % items.length;
    img.src = items[cur].dataset.full;
    count.textContent = (cur + 1) + ' / ' + items.length;
  }
  items.forEach(function (b, i) { b.addEventListener('click', function () { show(i); dlg.showModal(); }); });
  var hero = document.querySelector('.detail-hero-media');
  if (hero) { hero.classList.add('zoomable'); hero.addEventListener('click', function () { show(0); dlg.showModal(); }); }
  dlg.addEventListener('click', function (e) {
    var a = e.target.getAttribute('data-lb');
    if (a === 'close' || e.target === dlg) dlg.close();
    else if (a) show(cur + Number(a));
  });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') show(cur + 1);
    if (e.key === 'ArrowLeft') show(cur - 1);
  });
  var x0 = null;
  dlg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
  });
  var more = document.querySelector('[data-more]');
  if (more) more.addEventListener('click', function () {
    document.querySelectorAll('.gallery-item.extra').forEach(function (el) { el.classList.remove('extra'); el.classList.add('in'); });
    more.remove();
  });
})();
