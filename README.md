# College Sports Authority — Site

Site institucional da **College Sports Authority (CSA)**: HTML + CSS + JavaScript puro, com Bootstrap 4 e Font Awesome 6 via CDN. **Sem framework e sem build step.** Um servidor Express mínimo entrega os arquivos estáticos para permitir o deploy no Heroku.

O site apresenta dois produtos, um abaixo do outro na mesma página, com uma barra de navegação no topo que leva a cada seção (College aparece primeiro, por ser o produto principal):

- **College Placement** — conteúdo histórico da CSA (colocação em universidades dos EUA).
- **High School Placement** — colocação de estudantes-atletas de 14 a 17 anos em high schools americanas.

---

## Estrutura dos arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Página única com as duas abas (College / High School) e o FAQ. |
| `style.css` | Estilos. As variáveis de cor, fonte e espaçamento ficam no bloco `:root` no topo. |
| `script.js` | Destaque do link da seção em foco (scrollspy), accordion do FAQ e animações de entrada ao rolar. As duas seções ficam sempre visíveis, uma abaixo da outra. |
| `i18n.js` | Tradução PT/EN: abre em inglês automaticamente fora do Brasil (detecção por fuso horário) e traz o seletor manual PT \| EN. |
| `server.js` | Servidor Express que serve os arquivos estáticos (usado no Heroku). |
| `package.json` | Dependência (`express`) e script `start`. |
| `Procfile` | Comando de processo web do Heroku (`web: node server.js`). |
| `images/` | Imagens do site. |
| `index.php` / `composer.json` | Arquivos legados da hospedagem anterior — mantidos, não utilizados no fluxo Node/Heroku. |

---

## Rodar localmente

Pré-requisito: **Node.js 18+**.

```bash
npm install
npm start
```

Depois abra **http://localhost:3000**.

> Alternativa sem Node: por ser um site estático, também é possível abrir o `index.html` direto no navegador ou servir a pasta com qualquer servidor estático. O `server.js` existe principalmente para o Heroku.

---

## Onde editar os textos

- **Conteúdo do College Placement:** dentro de `index.html`, na seção `<section ... id="panel-college">`.
- **Conteúdo do High School Placement:** dentro de `index.html`, na seção `<section ... id="panel-highschool">` (blocos, "Tipos de escola" e "Perguntas frequentes").
- **Cores, fontes e espaçamento:** bloco `:root` no topo de `style.css` (ex.: `--color-primary`, `--font-heading`, `--font-body`, `--section-spacing`).
- **WhatsApp:** o número aparece em links `https://wa.me/5511976562289` no cabeçalho e nos botões de CTA. Ao trocar o número, atualize todos os `wa.me/...` e o texto exibido.

---

## Idiomas (PT / EN)

O site é escrito em **português** (versão de origem, no `index.html`). O inglês vive no arquivo `i18n.js`.

- **Automático:** ao ser acessado **fora do Brasil**, o site abre em inglês. A detecção usa o **fuso horário** do navegador (qualquer fuso que não seja do Brasil → inglês), sem depender de serviço externo.
- **Manual:** o seletor **PT | EN** no cabeçalho permite trocar a qualquer momento. A escolha vale apenas durante a sessão (`sessionStorage`); ao reabrir o site, a detecção por localização decide novamente — assim o comportamento automático nunca fica "preso" em um idioma.

**Como editar/adicionar traduções:**
1. No `index.html`, cada texto traduzível tem um atributo `data-i18n="chave"` (o conteúdo em português continua ali como origem).
2. No `i18n.js`, o objeto `EN` mapeia cada `chave` para o texto em inglês. O valor pode conter HTML (ex.: `<strong>`, `<u>`, ícones `<i>`), igual ao português.
3. Ao criar um novo bloco em português, adicione um `data-i18n="nova-chave"` no elemento e a entrada correspondente em `EN` no `i18n.js`. Sem entrada em inglês, o texto simplesmente permanece em português.

## Placeholders pendentes de conteúdo real

Antes de publicar a aba de High School, procure por `<!-- PLACEHOLDER` em `index.html` e substitua por dados verificados:

- `<!-- PLACEHOLDER: substituir por número real de alunos atendidos em high school -->`
- `<!-- PLACEHOLDER: substituir por depoimento real (nome, esporte e escola) -->`

> Importante: não publicar números de alunos, universidades ou depoimentos que não sejam reais e verificados. Nenhum texto promete vaga ou bolsa garantida — qualquer menção a auxílio deixa claro que depende de desempenho esportivo, desempenho acadêmico e orçamento da família.

---

## Deploy no Heroku

Pré-requisitos: conta no Heroku e [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) instalado (`heroku login`).

```bash
# 1. Criar o app (na raiz do projeto)
heroku create

# 2. Como o projeto tem também composer.json (legado), fixe o buildpack Node
heroku buildpacks:set heroku/nodejs

# 3. Enviar o código (ajuste o nome da branch se necessário)
git push heroku main
```

Se estiver publicando a partir desta branch (`high-school-placement`), envie-a como `main` no Heroku:

```bash
git push heroku high-school-placement:main
```

Acompanhe os logs com `heroku logs --tail` e abra o app com `heroku open`.

### Domínio customizado (csauthority.com.br)

Depois do deploy funcionando:

```bash
# Adiciona os domínios ao app
heroku domains:add csauthority.com.br
heroku domains:add www.csauthority.com.br

# Mostra os alvos DNS (DNS Target) a configurar no provedor do domínio
heroku domains
```

No painel do provedor de DNS, crie os registros apontando para os **DNS Targets** informados (normalmente um `CNAME`/`ALIAS` para o subdomínio `www` e a raiz). Em seguida habilite o certificado TLS:

```bash
heroku certs:auto:enable
```

Consulte a [documentação de domínios customizados do Heroku](https://devcenter.heroku.com/articles/custom-domains) para os detalhes de cada tipo de registro DNS.
