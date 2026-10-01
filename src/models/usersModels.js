// Importa a pool do banco de dados
import pool from "../config/db.js";

// Função responsável por selecionar todos os usuários do banco
export async function selectUsers() {
    const QUERY = `SELECT * FROM usuarios`; // Query SQL usando SELECT
    const [rows] = await pool.query(QUERY); // Resposta da query

    return rows;
}

// Função responsável por selecionar um usuário do banco
export async function selectUser(data) {
    const QUERY = `SELECT * FROM usuarios WHERE id = ?`; // Query SQL usando SELECT e WHERE
    const [rows] = await pool.query(QUERY, data); // Resposta da query

    return rows;
}

// Função responsável por inserir usuários no banco de dados
export async function insertUser(data) {
    const QUERY = `INSERT INTO usuarios (nome, email) VALUES (?, ?)`; // Query SQL usando INSERT
    const [result] = await pool.query(QUERY, data); // Faz a query passando parâmetros (substituindo os ?) 

    return result;
}

// Função responsável por atualizar um usuário no banco de dados
export async function updateUser(data) {
    // Query SQL com UPDATE e COALESCE
    // O COALESCE serve para para pegar o primeiro que não seja NULL entre o novo dado e o dado atual
    // Desse jeito, impede-se que haja um nome ou email nulo no banco de dados
    const QUERY = `UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?`;
    const [result] = await pool.query(QUERY, data); // Faz a query passando parâmetros

    return result;
}

// Função responsável por deletar um usuário no banco de dados
export async function deleteUser(id) {
    const QUERY = `DELETE FROM usuarios WHERE id = ?`; // Query SQL com DELETE
    const [result] = await pool.query(QUERY, [id]); // Faz a query passando parâmetros

    return result;
}