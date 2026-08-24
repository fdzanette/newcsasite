/* ============================================================
   CSA — animações de entrada ao rolar (scroll reveal), JS puro

   As seções e cards aparecem suavemente ao entrarem na viewport.
   Respeita prefers-reduced-motion e tem failsafe para nunca deixar
   conteúdo preso oculto.
   ============================================================ */
(function () {
  'use strict';

  var prefereMenosMovimento = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var seletoresReveal = [
    '.conteudo-principal-escrito',
    '.conteudo-secundario',
    '.selec-orient.card-item',
    '.fator-card',
    '.logo-img',
    '.natacao-img',
    '.conteudo-terciario-titulo',
    '.conteudo-quarto-titulo',
    '.lista-vantagens .tick-mark',
    '.secao-parceiros',
    '.onde-head',
    '.mapa-frame',
    '.ss-head',
    '.stat-card',
    '.parceiros-head',
    '.logo-card'
  ];

  var alvos = document.querySelectorAll(seletoresReveal.join(','));

  if (prefereMenosMovimento || !('IntersectionObserver' in window)) {
    // Sem animação: apenas garante que tudo fique visível
    Array.prototype.forEach.call(alvos, function (el) {
      el.classList.add('reveal', 'is-visible');
    });
    return;
  }

  var revelar = function (el) { el.classList.add('is-visible'); };

  var observadorReveal = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        revelar(entrada.target);
        observadorReveal.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  var alturaViewport = window.innerHeight || 800;

  Array.prototype.forEach.call(alvos, function (el, i) {
    el.classList.add('reveal');
    // leve efeito cascata entre elementos vizinhos
    var pai = el.parentElement;
    var irmaos = pai ? Array.prototype.indexOf.call(pai.children, el) : i;
    el.style.transitionDelay = (Math.min(irmaos, 6) * 70) + 'ms';

    // Se já está na primeira dobra, revela de imediato (evita flash e conteúdo preso)
    if (el.getBoundingClientRect().top < alturaViewport * 0.92) {
      revelar(el);
    } else {
      observadorReveal.observe(el);
    }
  });

  // Failsafe: nunca deixar conteúdo preso oculto caso o observer não dispare
  setTimeout(function () {
    Array.prototype.forEach.call(alvos, function (el) { revelar(el); });
  }, 1600);
})();
