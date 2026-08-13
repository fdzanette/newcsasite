// Servidor mínimo para o Heroku: apenas entrega os arquivos estáticos
// (HTML/CSS/JS/imagens) da raiz do projeto. Sem build, sem bundler.
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve todos os arquivos estáticos da raiz do projeto.
app.use(express.static(__dirname));

// Garante que a home responda no "/" (index.html).
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CSA site rodando na porta ${PORT}`);
});
