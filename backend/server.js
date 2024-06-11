const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const path = require("path"); // Para servir os arquivos estáticos

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Rotas da API
app.use("/api", taskRoutes);

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Redirecionar todas as outras solicitações para o arquivo index.html do frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
