// Importações de dependências
// Importando somente o 'mysql2' fará com que toda função usada tenha callbacks
// Usando 'mysql2/promise', as funções funcionam com async/await
import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';

// Configura o dotenv
dotenv.config();

// Cria uma pool SQL usando as credenciais do .env
const pool = mysql.createPool({
    host: process.env.DB_HOST, // HOST do DB
    user: process.env.DB_USER, // Usuário do DB
    password: process.env.DB_PASSWORD, // Senha do DB
    database: process.env.DB_DATABASE, // Nome do DB
    port: process.env.DB_PORT, // Porta do DB
    waitForConnections: true, // Fala para esperar se tiver o máximo de conexões ativas (10)
    connectionLimit: 10 // Máximo de conexões ativas ao mesmo tempo
});

// Exporta essa pool para ser usada nos models
export default pool;