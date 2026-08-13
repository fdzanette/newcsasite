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
    'meta-title': 'College Sports Authority | Sports Scholarships in the United States',
    'meta-desc': 'College Sports Authority is a consultancy specialized in supporting student-athletes through the admissions process of U.S. universities, guiding them throughout their college journey and creating opportunities for personal and professional development.',

    /* --- botões de CTA (compartilhados) --- */
    'cta-contato': 'Get in touch',
    'cta-whatsapp': '<i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp',

    /* --- College Placement --- */
    'col-intro': 'The <strong>College Sports Authority</strong> is a consultancy specialized in supporting student-athletes through the admissions process of universities in the United States, guiding them throughout their college journey while offering support and creating opportunities for personal and professional development.',
    'col-caminho-h': 'Path to college <i class="fa-solid fa-arrow-trend-up"></i>',
    'col-caminho-p': 'Guidance so the student develops their skills and presentation in order to become the strongest candidate for the universities they choose, maximizing their chances of being accepted. Support throughout the admission process, such as: identifying prerequisites and deadlines, planning document submissions, and reviewing and sending application packages. Support throughout the four years of college with guidance for everyday situations and help with cross-cultural adaptation.',
    'col-selecao-h': 'Selection <i class="fa-solid fa-magnifying-glass"></i>',
    'col-selecao-p': '<u>of the university options </u>best suited to the athlete’s profile, seeking scholarship opportunities.',
    'col-orientacao-h': 'Guidance <i class="fa-solid fa-landmark"></i>',
    'col-orientacao-p': '<u>so the athlete prepares</u> properly to be presented to the coaches of the selected universities.',
    'col-fatores-h': 'The scholarship amount will depend on several factors:',
    'fator-desempenho': 'Athletic performance',
    'fator-exames': 'Admission test scores (TOEFL/SAT)',
    'fator-historico': 'Academic record',
    'fator-financeiro': 'The family’s financial capacity',
    'col-vantagens-h': 'Advantages of studying at a U.S. college:',
    'vant-1': 'A leading education system, with universities recognized worldwide.',
    'vant-2': 'Universities with the best resources to develop your talent.',
    'vant-3': 'Easier access to the job market, thanks to the prestige of the universities and international experience.',
    'vant-4': 'Scholarships through playing sports.',
    'vant-5': 'A unique experience in the most open and developed country in the world.',
    'vant-6': 'Fluency in English, the most important language in the world.',

    /* --- High School Placement --- */
    'hs-intro': '<strong>High School Placement</strong> is the first step of an academic and athletic journey in the United States. CSA guides student-athletes aged <strong>14 to 17</strong> — in any sport — toward placement in American high schools, combining academic and athletic development. It is a stage that may, later and not necessarily, evolve into College Placement.',
    'hs-caminho-h': 'Path to High School in the USA <i class="fa-solid fa-school-flag"></i>',
    'hs-caminho-p': 'Studying at an American high school is the first step of an academic and athletic journey in the United States. For student-athletes aged 14 to 17, in any sport, it is the opportunity to mature academically, grow within their own sport, and experience American culture while still in high school — building, early on, a solid profile that can open the way to future university opportunities.',
    'hs-avaliacao-h': 'Assessment <i class="fa-solid fa-clipboard-check"></i>',
    'hs-avaliacao-p': '<u>academic, athletic and family</u> assessment of the student, to understand where the student stands, their goals and the family’s context before any recommendation.',
    'hs-matching-h': 'School Matching <i class="fa-solid fa-people-arrows"></i>',
    'hs-matching-p': '<u>identifying the schools most compatible</u> with the student’s profile — not the “most famous” one, but the one best suited to their academic, athletic and personal goals.',
    'hs-tipos-h': 'Types of school:',
    'escola-public-p': 'Public schools with an exchange program. Individual sports (tennis, swimming, golf) can benefit from a day school near a specialized club or academy.',
    'escola-private-p': 'Private schools, many on a day-school basis. A good option for individual sports that depend on training at a nearby reference club or academy.',
    'escola-boarding-p': 'Boarding schools with an integrated structure of study, housing and sport. Team sports (volleyball, basketball) tend to benefit from this integrated ecosystem.',
    'hs-faq-h': 'Frequently asked questions <i class="fa-solid fa-circle-question"></i>',
    'faq-q1': 'From what age can I apply?',
    'faq-a1': 'CSA’s High School Placement serves student-athletes aged <strong>14 to 17</strong>. The ideal entry age depends on the student’s school year in Brazil and their academic and athletic goals, something we define together during the Assessment stage.',
    'faq-q2': 'Do I need an English test?',
    'faq-a2': 'Generally, yes. Many schools require a proficiency test such as the <strong>Duolingo English Test</strong> or the <strong>TOEFL Junior</strong>. For students still developing the language, several schools offer <strong>ESL</strong> (English as a Second Language) programs as support during the adaptation. Requirements vary according to each school’s policy.',
    'faq-q3': 'Are there scholarships in high school?',
    'faq-a3': 'Some schools offer financial support in forms such as <strong>financial aid</strong>, <strong>merit aid</strong> and <strong>athletic aid</strong>, always according to each institution’s policy. The existence and amount of any support depend on academic performance, athletic performance and the family’s budget — they are not guaranteed.',
    'faq-q4': 'Does CSA guarantee a spot or a scholarship?',
    'faq-a4': '<strong>No.</strong> CSA does not promise a guaranteed spot or a guaranteed scholarship. Our work is to guide, assess the profile and connect the student to the most compatible schools, maximizing the chances. The outcome will depend on <strong>athletic performance</strong>, <strong>academic performance</strong> and the <strong>family’s budget</strong>, as well as each school’s policy.',
    'faq-q5': 'After high school, can I move on to a college scholarship?',
    'faq-a5': 'Yes. American high school is a natural preparation for the next step. Those who wish to continue to a U.S. university can proceed with the <strong>College Placement</strong> already offered by CSA, taking advantage of all the academic and athletic experience built during high school.'
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

  function detectarIdioma() {
    var salvo = null;
    try { salvo = localStorage.getItem(STORAGE_KEY); } catch (e) {}
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
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      aplicar(lang);
    });
  });

  // Estado inicial
  aplicar(detectarIdioma());
})();
