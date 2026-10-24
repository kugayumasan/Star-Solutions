// Offerteformulier: controleert de velden en opent het e-mailprogramma (mailto).
(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var email = form.dataset.email;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var missing = ['naam', 'email', 'bericht'].filter(function (k) { return !String(d.get(k) || '').trim(); });
    if (missing.length) {
      status.hidden = false;
      status.classList.add('is-error');
      status.textContent = 'Vul uw naam, e-mail en bericht in.';
      return;
    }
    var body = 'Naam: ' + d.get('naam') + '\nTelefoon: ' + (d.get('telefoon') || '-') + '\nE-mail: ' + d.get('email') + '\nDienst: ' + (d.get('dienst') || '-') + '\n\n' + d.get('bericht');
    var subject = 'Offerteaanvraag' + (d.get('dienst') ? ' – ' + d.get('dienst') : '');
    status.hidden = false;
    status.classList.remove('is-error');
    status.textContent = 'Uw e-mailprogramma opent met het bericht klaar. Verstuur het daar, of mail rechtstreeks naar ' + email + '.';
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
