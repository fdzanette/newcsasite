/* ============================================================
   CSA — internacionalização (PT padrão / EN automático)

   - O português é a versão de origem no HTML (mercado principal + SEO).
   - Fora do Brasil (detecção por fuso horário), o site abre em inglês.
   - O usuário pode trocar manualmente no seletor PT | EN do cabeçalho;
     a escolha fica salva em localStorage.
   - Para editar/adicionar traduções, altere o objeto EN abaixo. A chave
     é o atributo data-i18n do elemento no index.html. O valor pode conter
     HTML (ex.: <strong>, <u>, ícones <i>), igual ao original em português.
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'csa-lang';

  var EN = {
    /* --- meta --- */
    'meta-title': 'College Sports Authority | Athletic Scholarships in the United States',
    'meta-desc': 'College Sports Authority guides student-athletes through the U.S. university admissions process and stays by their side throughout their college careers, opening doors to personal and professional growth.',

    /* --- botões de CTA (compartilhados) --- */
    'cta-contato': 'Get in touch',
    'cta-whatsapp': '<i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp',

    /* --- College Placement --- */
    'col-intro': '<strong>College Sports Authority</strong> is a consultancy dedicated to guiding student-athletes through the U.S. university admissions process. We support each student from the very first application to graduation day, opening doors to personal and professional growth.',
    'col-caminho-h': 'Your path to college <i class="fa-solid fa-arrow-trend-up"></i>',
    'col-caminho-p': 'We help each student strengthen both their skills and their presentation, so they stand out as the strongest candidates for the universities they’re targeting — with the best possible shot at admission. From there, we guide every step of the application: mapping requirements, tracking deadlines, planning document submissions, then reviewing and sending each package. Our support doesn’t end at acceptance — we stay involved throughout all four years of college, offering day-to-day guidance while easing the cultural adjustment.',
    'col-selecao-h': 'Selection <i class="fa-solid fa-magnifying-glass"></i>',
    'col-selecao-p': '<u>The universities that best fit</u> the athlete’s profile, with a focus on real scholarship opportunities.',
    'col-orientacao-h': 'Guidance <i class="fa-solid fa-landmark"></i>',
    'col-orientacao-p': '<u>Preparing the athlete</u> to make a strong first impression on the coaches at the universities we’ve selected.',
    'col-fatores-h': 'The size of the scholarship depends on several factors:',
    'fator-desempenho': 'Athletic performance',
    'fator-exames': 'Admission test scores (TOEFL/SAT)',
    'fator-historico': 'Academic record',
    'fator-financeiro': 'The family’s financial situation',
    'col-vantagens-h': 'Why study at a U.S. college:',
    'vant-1': 'A world-leading education system, with universities recognized around the globe.',
    'vant-2': 'Universities with world-class resources to develop your talent.',
    'vant-3': 'A smoother path into the job market, backed by the prestige of these universities and real international experience.',
    'vant-4': 'Scholarships earned through your sport.',
    'vant-5': 'A once-in-a-lifetime experience in one of the world’s most open and developed countries.',
    'vant-6': 'True fluency in English, today’s most important global language.',

    /* --- Onde estudar? --- */
    'eyebrow-onde': 'U.S. Universities',
    'onde-h': 'Where to study<span class="onde-q">?</span>',
    'onde-p': 'We work with a broad network of universities across the entire United States — coast to coast. We help each athlete find the right program for their athletic and academic profile.',

    /* --- Student Success --- */
    'ss-h': 'A standard of excellence',
    'ss-p': 'U.S. universities are among the best in the world. Take, for example, the record of prestigious scholarships at <strong>West Virginia University</strong>:',
    'ss-fonte': 'Source: West Virginia University — prestigious academic scholarships.',

    /* --- Parceiros --- */
    'eyebrow-parceiros': 'CSA Network',
    'parceiros-h': 'Our partners',

  };

  /* Fusos horários do Brasil — se o visitante NÃO estiver em um deles,
     tratamos como acesso "fora do Brasil" e abrimos em inglês. */
  var BR_TZ = /^America\/(Sao_Paulo|Bahia|Fortaleza|Recife|Belem|Manaus|Cuiaba|Campo_Grande|Boa_Vista|Porto_Velho|Rio_Branco|Noronha|Maceio|Araguaina|Santarem|Eirunepe)$/;

  function estaNoBrasil() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (!tz) return null;
      return BR_TZ.test(tz);
    } catch (e) {
      return null;
    }
  }

  // Remove preferência antiga permanente (versões anteriores usavam localStorage),
  // para que a detecção por localização volte a valer a cada visita.
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}

  function detectarIdioma() {
    // A escolha manual vale apenas durante a sessão (sessionStorage);
    // ao reabrir o site, a detecção por localização decide de novo.
    var salvo = null;
    try { salvo = sessionStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (salvo === 'pt' || salvo === 'en') return salvo;

    var brasil = estaNoBrasil();
    if (brasil === true) return 'pt';
    if (brasil === false) return 'en';

    // Fuso indisponível: cai para o idioma do navegador
    var l = (navigator.language || 'pt').toLowerCase();
    return l.indexOf('pt') === 0 ? 'pt' : 'en';
  }

  var elementos = null;
  var tituloPT = document.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  var descPT = metaDesc ? metaDesc.getAttribute('content') : null;

  function aplicar(lang) {
    if (!elementos) {
      elementos = document.querySelectorAll('[data-i18n]');
      // Guarda a versão de origem (PT) na primeira aplicação
      Array.prototype.forEach.call(elementos, function (el) {
        el.setAttribute('data-i18n-pt', el.innerHTML);
      });
    }

    Array.prototype.forEach.call(elementos, function (el) {
      var chave = el.getAttribute('data-i18n');
      if (lang === 'en' && EN[chave] != null) {
        el.innerHTML = EN[chave];
      } else {
        el.innerHTML = el.getAttribute('data-i18n-pt');
      }
    });

    // Título e meta description
    if (lang === 'en') {
      document.title = EN['meta-title'] || tituloPT;
      if (metaDesc && EN['meta-desc']) metaDesc.setAttribute('content', EN['meta-desc']);
    } else {
      document.title = tituloPT;
      if (metaDesc && descPT != null) metaDesc.setAttribute('content', descPT);
    }

    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'pt-BR');

    // Estado visual dos botões do seletor
    var botoes = document.querySelectorAll('.lang-btn');
    Array.prototype.forEach.call(botoes, function (b) {
      var ativo = b.getAttribute('data-lang') === lang;
      b.classList.toggle('lang-ativa', ativo);
      b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });
  }

  // Seletor manual PT | EN
  var botoes = document.querySelectorAll('.lang-btn');
  Array.prototype.forEach.call(botoes, function (b) {
    b.addEventListener('click', function () {
      var lang = b.getAttribute('data-lang');
      try { sessionStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      aplicar(lang);
    });
  });

  // Estado inicial
  aplicar(detectarIdioma());
})();
