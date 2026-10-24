// Zet het gekozen thema vóór de pagina getekend wordt, zodat er geen flits is.
// Zonder opgeslagen keuze volgt de site de systeeminstelling (licht of donker).
try {
  var t = localStorage.getItem('theme');
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
document.documentElement.classList.add('js');
