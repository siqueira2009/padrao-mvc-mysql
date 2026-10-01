# Atividade 5 - API REST com Node.js e MySQL

Este projeto é uma API REST para gerenciamento de usuários, desenvolvida em Node.js com Express e MySQL. A aplicação segue o padrão MVC (Model, View, Controller), com rotas organizadas, controllers para a lógica de negócio e models para acesso ao banco de dados.

## Objetivo

Permitir o cadastro, consulta, atualização e exclusão de usuários em um banco de dados MySQL, utilizando operações CRUD.

## Stack

- Node.js
- Express
- MySQL2
- dotenv
- CORS
- JavaScript ES Modules

## Estrutura do projeto

```bash
.
├── server.js
├── package.json
├── .env.example
├── README.md
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── usersControllers.js
│   ├── models/
│   │   └── usersModels.js
│   └── routes/
│       └── usersRoutes.js
```

## Requisitos

- Node.js instalado
- MySQL ou MariaDB instalado e em execução
- npm
- Um banco de dados configurado localmente

## Como rodar o projeto

### 1) Instale as dependências

```bash
npm install
```

### 2) Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=dev_db
DB_PORT=3306
```

> O arquivo `.env.example` já existe no projeto, e pode servir como base para a criação do `.env`.

### 3) Crie o banco e a tabela no MySQL

No MySQL Workbench ou no cliente do banco, execute o script abaixo:

```sql
CREATE DATABASE dev_db;
USE dev_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

INSERT INTO usuarios (nome, email) VALUES
('Alice', 'alice@email.com'),
('Bruno', 'bruno@email.com'),
('Carla', 'carla@email.com');
```

### 4) Inicie a aplicação

Modo normal:

```bash
npm start
```

Modo desenvolvimento com reinicialização automática:

```bash
npm run dev
```

A API ficará disponível em:

```bash
http://localhost:3002
```

## Endpoints e rotas

A aplicação expõe os endpoints na rota base `/usuarios`.

### 1) Listar todos os usuários

- Método: `GET`
- Rota: `/usuarios`
- Descrição: retorna todos os usuários cadastrados.

Exemplo:

```http
GET http://localhost:3002/usuarios
```

Resposta esperada:

```json
[
  {
    "id": 1,
    "nome": "Alice",
    "email": "alice@email.com"
  }
]
```

### 2) Buscar um usuário por ID

- Método: `GET`
- Rota: `/usuarios/:id`
- Descrição: retorna um usuário específico.

Exemplo:

```http
GET http://localhost:3002/usuarios/1
```

### 3) Cadastrar usuário

- Método: `POST`
- Rota: `/usuarios`
- Descrição: cria um novo usuário.
- Body obrigatório:

```json
{
  "nome": "Daniel",
  "email": "daniel@email.com"
}
```

Se algum campo estiver ausente, a API retorna erro `400`.

Exemplo:

```http
POST http://localhost:3002/usuarios
Content-Type: application/json
```

### 4) Atualizar usuário

- Método: `PUT`
- Rota: `/usuarios/:id`
- Descrição: atualiza os dados de um usuário existente.
- Body obrigatório: pelo menos um dos campos deve ser enviado (`nome` e/ou `email`).

Exemplo:

```json
{
  "nome": "Daniel Silva"
}
```

ou

```json
{
  "email": "daniel.novo@email.com"
}
```

Exemplo:

```http
PUT http://localhost:3002/usuarios/1
Content-Type: application/json
```

### 5) Deletar usuário

- Método: `DELETE`
- Rota: `/usuarios/:id`
- Descrição: remove um usuário pelo ID.

Exemplo:

```http
DELETE http://localhost:3002/usuarios/1
```

## Códigos de resposta

- `200` OK
- `201` Created
- `400` Bad Request
- `404` Not Found
- `500` Internal Server Error