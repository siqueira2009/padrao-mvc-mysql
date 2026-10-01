// Importações de dependências
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import users from './src/routes/usersRoutes.js';

// Configura o dotenv
dotenv.config();

// Cria um app
const app = express();

// Configura os middlewares 
app.use(cors()); // Permite ou bloqueia que certos domínios peçam recursos 
app.use(express.json()); // Ativa a leitura do body em formato de JSON

// Direciona as rotas para os routes
app.use("/usuarios", users);

// Caso não exista a rota, retorna erro 404 com mensagem
app.use((req, res) =>  res.status(404).json({message: `GET ${req.originalUrl} does not exist.`}));

// Coloca o servidor para ouvir na porta do .env
const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => {
    console.warn(`✅ Server initialized in http://localhost:${PORT}`);
});