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
    'col-intro': '<strong>College Sports Authority</strong> is a consultancy dedicated to guiding student-athletes through the U.S. university admissions process. We support each student from the very first application to graduation day, opening doors to personal and professional growth. <strong>Over our history, we have guided more than 1,300 student-athletes through this journey.</strong>',
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

    /* --- Student Success (padrão de serviço CSA) --- */
    'ss-h': 'A standard of excellence',
    'ss-p1': 'We find and place our student-athletes at the best U.S. universities, according to each one’s academic-athletic profile and personal priorities.',
    'ss-p2': 'Finding the right university is a fully individualized process. We take care of every detail along the academic and athletic preparation journey, building the strongest possible student-athlete profile to present to U.S. university coaches.',
    'ss-p3': 'Placement demands deep expertise and a wide network of relationships: contact is always made directly with the members of each team’s coaching staff. At <strong>College Sports Authority</strong>, we stand by the student-athlete from the very first conversation to enrollment day — and throughout their entire college journey.',

    /* --- Parceiros --- */
    'eyebrow-parceiros': 'CSA Network',
    'parceiros-h': 'Our partners',

    /* --- Abas (trilhas de serviço) --- */
    'tab-college': 'College Placement',
    'tab-highschool': 'Boarding School Placement',

    /* --- Boarding School Placement: abertura --- */
    'eyebrow-boarding': 'New CSA track',
    'hs-titulo': 'Boarding School Placement',
    'hs-intro': '<strong>Boarding School Placement</strong> is the first step of an academic and athletic journey in the United States. CSA places student-athletes aged <strong>14 to 17</strong> in American boarding schools, where academics and sport grow side by side. It’s a stage that can later lead into College Placement, though it doesn’t have&nbsp;to.',
    'chip-idade': 'Ages 14–17',
    'chip-nivel': 'Secondary school in the U.S.',
    'chip-campus': 'Live, study & train on campus',

    /* --- Boarding: caminho --- */
    'eyebrow-boarding-2': 'Boarding School Placement',
    'hs-caminho-h': 'Your path to boarding school in the U.S. <i class="fa-solid fa-school-flag"></i>',
    'hs-caminho-p': 'An American boarding school is where it all starts. For students aged 14 to 17, it’s a chance to grow in the classroom, develop in their sport, and experience American culture early on — building a strong profile from day one that can open the door to future university opportunities.',

    /* --- Boarding: como funciona (etapas) --- */
    'hs-como-h': 'How it works <i class="fa-solid fa-list-check"></i>',
    'hs-avaliacao-h': 'Assessment <i class="fa-solid fa-clipboard-check"></i>',
    'hs-avaliacao-p': '<u>An academic, athletic, and family assessment</u> to understand where the student stands, what they’re aiming for, and their family circumstances — before we recommend anything.',
    'hs-matching-h': 'School Matching <i class="fa-solid fa-people-arrows"></i>',
    'hs-matching-p': '<u>Finding the schools that fit best</u> — not the most famous name, but the right match for the student’s academic, athletic, and personal goals.',
    'hs-aplicacao-h': 'Application &amp; support <i class="fa-solid fa-plane-departure"></i>',
    'hs-aplicacao-p': '<u>Support through the application</u> (documents, English tests, and deadlines) and ongoing guidance as the student-athlete settles into school and life in the United States.',

    /* --- Boarding: a boarding school americana --- */
    'hs-tipos-h': 'The American boarding school',
    'escola-boarding-p': 'Boarding schools in the United States are far more than places to study — they are true ecosystems where the student-athlete lives, studies, and trains on one campus throughout the entire school year. Alongside full academic and extracurricular programs, many of these schools offer highly competitive, top-tier athletic facilities that become a central part of the student experience.<br><br>A boarding school exchange is the ideal gateway for students already in — or about to enter — secondary school who want a transformative experience abroad: studying in an environment of excellence while competing on a high-level team, with all the athletic infrastructure that only the United States can offer.',
    'dest-campus': 'Live, study & train on one campus',
    'dest-esporte': 'Top-tier athletic facilities',
    'dest-academico': 'Full academic program',
    'dest-cultura': 'Cultural immersion from the start',

    /* --- Boarding: FAQ --- */
    'hs-faq-h': 'Frequently asked questions <i class="fa-solid fa-circle-question"></i>',
    'faq-q1': 'At what age can I apply?',
    'faq-a1': 'CSA’s Boarding School Placement is for student-athletes aged <strong>14 to 17</strong>. The best time to start depends on the student’s current school year in Brazil and their academic and athletic goals — something we work out together during the Assessment stage.',
    'faq-q2': 'Do I need an English test?',
    'faq-a2': 'Usually, yes. Many schools ask for a proficiency test such as the <strong>Duolingo English Test</strong> or <strong>TOEFL Junior</strong>. For students still developing the language, schools often provide <strong>ESL</strong> (English as a Second Language) support during the transition. Requirements vary from school to school.',
    'faq-q3': 'Are there scholarships in boarding school?',
    'faq-a3': 'Some schools offer support such as <strong>financial aid</strong>, <strong>merit aid</strong>, or <strong>athletic aid</strong>, always according to each school’s policy. Whether any aid is available — and how much — depends on academic performance, athletic performance, and the family’s budget. Nothing is guaranteed.',
    'faq-q4': 'Does CSA guarantee a spot or a scholarship?',
    'faq-a4': '<strong>No.</strong> CSA never promises a guaranteed spot or scholarship. What we do is guide the family, assess the student’s profile, and connect them with the schools that fit best — giving them the strongest possible chance. The outcome depends on <strong>athletic performance</strong>, <strong>academic performance</strong>, and the <strong>family’s budget</strong>, along with each school’s policy.',
    'faq-q5': 'After boarding school, can I go on to a college scholarship?',
    'faq-a5': 'Yes. An American boarding school is the natural runway to what comes next. Students who want to continue to a U.S. university can move on with the <strong>College Placement</strong> that CSA already offers, building on everything they’ve gained academically and athletically in boarding school.',

    /* --- Boarding: chamada final --- */
    'hs-cta-h': 'Ready to take the first step?',
    'hs-cta-p': 'Talk to CSA and discover the American boarding school path that fits your profile.',

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
