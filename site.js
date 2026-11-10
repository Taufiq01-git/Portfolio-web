/* Site glue for the static build: page links and the resume link. */
(function () {
  var path = location.pathname.replace(/\/+$/, '') || '/';
  var onHome = path === '/' || path === '/index' || path === '/index.html';
  function norm(t) { return (t || '').replace(/\s+/g, ' ').replace(/^[0-9\s·.]+/, '').trim().toLowerCase(); }
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('a,button') : null;
    if (!el) return;
    var href = el.getAttribute('href');
    if (el.tagName === 'A' && href && href !== '#') return;
    var tgt = norm((el.getAttribute('data-tgt') || '').replace(/^.*·\s*/, ''));
    var labels = [el.getAttribute('aria-label'), el.getAttribute('title'), el.textContent].map(norm).concat([tgt]);
    var to = null;
    if (labels.indexOf('about me') !== -1 || tgt === 'about') to = '/about';
    else if (!onHome && (labels.indexOf('home') !== -1 || tgt === 'home')) to = '/';
    if (!to) return;
    e.preventDefault(); e.stopPropagation();
    location.href = to;
  }, true);
  /* Show "Download my resume" only once /resume.pdf exists. */
  fetch('/resume.pdf', { method: 'HEAD' }).then(function (r) {
    if (r.ok && (r.headers.get('content-type') || '').indexOf('pdf') !== -1) document.documentElement.setAttribute('data-resume-ok', '1');
  }).catch(function () {});
})();
