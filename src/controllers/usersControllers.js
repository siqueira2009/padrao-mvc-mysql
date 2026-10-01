import * as models from '../models/usersModels.js';

// Função responsável pro pegar usuários (READ)
export async function getUsers(req, res) {
    try { // Tenta pegar a resposta da query (usando os models)
        const response = await models.selectUsers();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Função responsável pro pegar UM usuário (READ)
export async function getUser(req, res) {
    try { 
        // Pega o ID do Route Params
        const { id } = req.params;

        // Tenta pegar a resposta da query (usando os models)
        const response = await models.selectUser([id]);

        if (response.length == 0) return res.status(404).json({message: "User not found."});

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Função responsável por adicionar usuário (CREATE)
export async function postUser(req, res) {
    try {
        // Pega os dados do body
        const { nome, email } = req.body;
        // Se estiver faltando algum, retorna erro 400 (Bad Request)
        if (nome == undefined || email == undefined) return res.status(400).json({message: "Missing required fields (name/email)."});

        // Pega a resposta da inserção (usando models)
        const response = await models.insertUser([nome, email]);

        res.status(201).json({id: response.insertId, nome, email});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Função resposável por atualizar usuário (UPDATE)
export async function putUser(req, res) {
    try {
        // Pega o ID do Route Params e nome/email do body
        const { id } = req.params;
        const { nome, email } = req.body;

        // Se tiver faltando ambos os dados, retorna erro 400 (Bad Request)
        if (nome == undefined && email == undefined) return res.status(400).json({message: "Missing required fields (name/email)."});

        // Pega a resposta da atualização (usando models)
        const response = await models.updateUser([nome || null, email || null, id]); 

        // Se nada for atualizado, quer dizer que o usuário não existe (404 - Resource Not Found)
        if (!response.affectedRows) return res.status(404).json({message: "User not found."});

        res.status(200).json({ message: "User updated successfully."});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Função responsável por deletar usuário (DELETE)
export async function deleteUser(req, res) {
    try {
        // Pega o ID do Route Params
        const { id } = req.params;

        // Pega a resposta da deleção (usando models)
        const response = await models.deleteUser([id]);

        // Se nada for atualizado, quer dizer que o usuário não existe (404 - Resource Not Found)
        if (!response.affectedRows) return res.status(404).json({message: "User not found."});

        res.status(200).json({message: "User deleted successfully."});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}