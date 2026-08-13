/* ============================================================
   CSA — navegação por âncora com destaque + accordion de FAQ
   (JavaScript puro)

   As duas seções (College Placement e High School Placement) ficam
   sempre visíveis, uma abaixo da outra, com College primeiro. Os links
   do topo apenas rolam até a seção correspondente (scroll suave via CSS)
   e o link da seção em foco fica destacado.
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
        if (r > maiorRazao) {
          maiorRazao = r;
          melhor = p.id;
        }
      });
      if (melhor) {
        destacar(melhor);
      }
    }, {
      // banda de detecção abaixo do cabeçalho fixo + barra sticky
      rootMargin: '-140px 0px -40% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    });

    paineis.forEach(function (p) { observador.observe(p); });
  }

  // Clique: destaca de imediato (o scroll suave e o offset são do CSS)
  Object.keys(links).forEach(function (id) {
    var link = links[id];
    if (link) {
      link.addEventListener('click', function () {
        destacar(id);
      });
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
        if (expandido) {
          resposta.setAttribute('hidden', '');
        } else {
          resposta.removeAttribute('hidden');
        }
      }
    });
  });
})();
