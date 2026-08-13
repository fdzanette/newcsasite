# College Sports Authority — Site

Site institucional da **College Sports Authority (CSA)**: HTML + CSS + JavaScript puro, com Bootstrap 4 e Font Awesome 6 via CDN. **Sem framework e sem build step.** É um site estático, servido no Heroku pela mesma estrutura de sempre (buildpack PHP/Apache) — **sem Node**.

Produto: **College Placement** — assessoria a estudantes-atletas nos processos seletivos de universidades dos Estados Unidos.

---

## Estrutura dos arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Página do site (conteúdo, cabeçalho, seletor de idioma). |
| `style.css` | Estilos. As variáveis de cor, fonte e espaçamento ficam no bloco `:root` no topo. |
| `script.js` | Animações de entrada ao rolar (scroll reveal), em JS puro. |
| `i18n.js` | Tradução PT/EN: abre em inglês automaticamente fora do Brasil (detecção por fuso horário) e traz o seletor manual PT \| EN. |
| `images/` | Imagens do site. |
| `index.php` | Ponto de entrada da hospedagem PHP: apenas inclui o `index.html`. |
| `composer.json` | Marca o projeto como app PHP para o Heroku (buildpack PHP). |
| `Procfile` | Processo web do Heroku: `web: heroku-php-apache2` (Apache servindo os arquivos estáticos). |

---

## Rodar localmente

Como as imagens usam caminho absoluto (`/images/...`), abrir o `index.html` com dois cliques (`file://`) mostra o layout mas **quebra as imagens**. Use um servidor estático simples — qualquer um destes:

```bash
php -S localhost:8000
```

```bash
npx serve
```

Ou a extensão **Live Server** do VS Code. Depois abra o endereço indicado (ex.: `http://localhost:8000`).

---

## Onde editar os textos

- **Conteúdo:** dentro de `index.html`.
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

---

## Deploy no Heroku

O app roda como site **PHP/estático** (buildpack PHP servindo os arquivos com Apache) — a mesma estrutura de sempre. Não há passo de build nem Node.

```bash
# Garante o buildpack PHP (necessário se ele tiver sido trocado)
heroku buildpacks:set heroku/php -a morning-waters-51258

# Publica
git push heroku main
```

Acompanhe com `heroku logs --tail -a morning-waters-51258` e abra com `heroku open -a morning-waters-51258`.

### Domínio customizado (csauthority.com.br)

Os domínios `csauthority.com.br` e `www.csauthority.com.br` já apontam para o app via **PointDNS**, com registros `herokudns.com` (ALIAS no apex e CNAME no `www`) e certificado gerenciado (ACM). Para conferir os alvos:

```bash
heroku domains -a morning-waters-51258
```
