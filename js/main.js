// Mobil menü
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('fomenu');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
})();

// Galéria: szűrés és nagyítás
(function () {
  var gallery = document.querySelector('.gallery');
  if (!gallery) return;
  var items = Array.prototype.slice.call(gallery.querySelectorAll('a'));
  var buttons = document.querySelectorAll('.filters button');

  function visible() { return items.filter(function (a) { return !a.hidden; }); }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var cat = b.getAttribute('data-filter');
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      items.forEach(function (a) { a.hidden = !(cat === 'all' || a.getAttribute('data-cat') === cat); });
    });
  });

  var box = document.querySelector('.lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var img = box.querySelector('img');
  var current = 0;

  function show(i) {
    var list = visible();
    current = (i + list.length) % list.length;
    var a = list[current];
    img.src = a.getAttribute('href');
    img.alt = a.querySelector('img').alt;
  }

  items.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      show(visible().indexOf(a));
      box.showModal();
    });
  });
  box.querySelector('[data-prev]').addEventListener('click', function () { show(current - 1); });
  box.querySelector('[data-next]').addEventListener('click', function () { show(current + 1); });
  box.querySelector('[data-close]').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
