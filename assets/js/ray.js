/* Getwiy — the travelling light, plus scroll reveal.

   The light previously mapped whole-page scroll progress onto its position.
   Once the pages grew long, scrolling through the hero barely moved it, and
   over the pale sections `mix-blend-mode: screen` did nothing at all. It is
   now driven by the scrolled distance directly, so it always moves, and the
   torch only renders on the dark theme where the blend actually shows. */

(function () {
  var root = document.documentElement;
  root.className += ' js';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- scroll reveal ---- */
  var items = document.querySelectorAll('.reveal');
  if (!items.length || reduce || !('IntersectionObserver' in window)) {
    for (var k = 0; k < items.length; k++) items[k].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-in');
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }

  /* ---- the light ---- */
  if (!document.querySelector('[data-torch]') || reduce) return;

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var tx = 46, ty = 26, cx = 46, cy = 26;
  var steerUntil = 0, lastX = null, lastY = null, frame = null;

  function fromScroll() {
    /* One full sweep per two viewport heights of scrolling. Independent of
       document length, so it moves the same amount on a short or long page. */
    var y = window.scrollY || 0;
    var span = Math.max(window.innerHeight * 2, 1);
    var p = (y % span) / span;
    ty = 14 + p * 72;
    tx = 46 + Math.sin(p * Math.PI * 2) * 24;
  }

  function loop(now) {
    if (now > steerUntil) fromScroll();
    cx += (tx - cx) * 0.09;
    cy += (ty - cy) * 0.09;
    if (cx !== lastX || cy !== lastY) {
      root.style.setProperty('--lx', cx.toFixed(2) + '%');
      root.style.setProperty('--ly', cy.toFixed(2) + '%');
      lastX = cx; lastY = cy;
    }
    frame = requestAnimationFrame(loop);
  }

  if (fine) {
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
      steerUntil = performance.now() + 1400;
    }, { passive: true });
  }

  window.addEventListener('scroll', fromScroll, { passive: true });
  window.addEventListener('resize', fromScroll, { passive: true });
  fromScroll();
  frame = requestAnimationFrame(loop);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) cancelAnimationFrame(frame);
    else frame = requestAnimationFrame(loop);
  });
})();
           
