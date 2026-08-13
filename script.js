/* ============================================================
   CSA — navegação por abas + accordion de FAQ (JavaScript puro)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Abas: College Placement / High School Placement ---------- */
  var abas = {
    'college-placement': {
      tab: document.getElementById('tab-college'),
      panel: document.getElementById('panel-college')
    },
    'high-school-placement': {
      tab: document.getElementById('tab-highschool'),
      panel: document.getElementById('panel-highschool')
    }
  };

  var ordem = ['college-placement', 'high-school-placement'];

  function ativarAba(chave, atualizarHash, focar) {
    if (!abas[chave]) {
      chave = 'college-placement';
    }

    ordem.forEach(function (k) {
      var item = abas[k];
      if (!item.tab || !item.panel) return;
      var ativo = (k === chave);

      item.tab.classList.toggle('aba-ativa', ativo);
      item.tab.setAttribute('aria-selected', ativo ? 'true' : 'false');
      item.tab.setAttribute('tabindex', ativo ? '0' : '-1');

      item.panel.classList.toggle('hidden', !ativo);
      if (ativo) {
        item.panel.removeAttribute('hidden');
      } else {
        item.panel.setAttribute('hidden', '');
      }
    });

    if (atualizarHash) {
      // history.replaceState evita empilhar entradas a cada clique
      if (history.replaceState) {
        history.replaceState(null, '', '#' + chave);
      } else {
        window.location.hash = chave;
      }
    }

    if (focar && abas[chave].tab) {
      abas[chave].tab.focus();
    }
  }

  function chaveDoHash() {
    var hash = (window.location.hash || '').replace('#', '');
    return abas[hash] ? hash : 'college-placement';
  }

  ordem.forEach(function (chave, indice) {
    var item = abas[chave];
    if (!item.tab) return;

    // Clique / toque
    item.tab.addEventListener('click', function () {
      ativarAba(chave, true, false);
    });

    // Navegação por teclado (setas, Home, End) — padrão ARIA de tablist
    item.tab.addEventListener('keydown', function (e) {
      var novoIndice = null;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          novoIndice = (indice + 1) % ordem.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          novoIndice = (indice - 1 + ordem.length) % ordem.length;
          break;
        case 'Home':
          novoIndice = 0;
          break;
        case 'End':
          novoIndice = ordem.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      ativarAba(ordem[novoIndice], true, true);
    });
  });

  // Link direto/compartilhável: reage a mudanças de hash
  window.addEventListener('hashchange', function () {
    ativarAba(chaveDoHash(), false, false);
  });

  // Estado inicial a partir da URL
  ativarAba(chaveDoHash(), false, false);

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
