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
    '.logo-card',
    '.foto-band-inner',
    '.ss-pilar',
    '.boarding-abertura',
    '.passo-card',
    '.escola-card',
    '.faq-item',
    '.boarding-cta-band'
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

/* ============================================================
   CSA — abas College / Boarding (scrollspy) + accordion de FAQ

   As duas trilhas ficam visíveis na mesma página (College primeiro).
   Os botões do topo rolam até a seção e destacam a trilha em foco.
   ============================================================ */
(function () {
  'use strict';

  var links = {
    'panel-college': document.getElementById('tab-college'),
    'panel-highschool': document.getElementById('tab-highschool')
  };

  function destacar(id) {
    Object.keys(links).forEach(function (chave) {
      var link = links[chave];
      if (!link) return;
      var ativo = (chave === id);
      link.classList.toggle('aba-ativa', ativo);
      if (ativo) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  var paineis = ['panel-college', 'panel-highschool']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  // Destaque automático conforme a seção mais visível (scrollspy)
  if ('IntersectionObserver' in window && paineis.length) {
    var visibilidade = {};
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        visibilidade[e.target.id] = e.intersectionRatio;
      });
      var melhor = null;
      var maiorRazao = -1;
      paineis.forEach(function (p) {
        var r = visibilidade[p.id] || 0;
        if (r > maiorRazao) { maiorRazao = r; melhor = p.id; }
      });
      if (melhor) { destacar(melhor); }
    }, {
      rootMargin: '-140px 0px -40% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    });
    paineis.forEach(function (p) { observador.observe(p); });
  }

  // Clique: destaca de imediato (o scroll suave e o offset são do CSS)
  Object.keys(links).forEach(function (id) {
    var link = links[id];
    if (link) {
      link.addEventListener('click', function () { destacar(id); });
    }
  });

  /* ---------- FAQ: accordion simples ---------- */
  var perguntas = document.querySelectorAll('.faq-pergunta');
  Array.prototype.forEach.call(perguntas, function (botao) {
    botao.addEventListener('click', function () {
      var expandido = botao.getAttribute('aria-expanded') === 'true';
      var resposta = botao.nextElementSibling;
      botao.setAttribute('aria-expanded', expandido ? 'false' : 'true');
      if (resposta) {
        if (expandido) { resposta.setAttribute('hidden', ''); }
        else { resposta.removeAttribute('hidden'); }
      }
    });
  });
})();
