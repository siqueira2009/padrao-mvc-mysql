import express from "express";

import * as controllers from '../controllers/usersControllers.js'; // Importa todos os controllers

// Cria um Router
const router = express.Router();

// Método GET na raiz do Router (GET /usuarios)
router.get("/", (req, res) => controllers.getUsers(req, res));

// Método GET na raiz do Router com Route Params (GET /usuarios/:ID)
router.get("/:id", (req, res) => controllers.getUser(req, res));

// Método POST na raiz do Router (POST /usuarios)
router.post("/", (req, res) => controllers.postUser(req, res));

// Método PUT na raiz do Router com Route Params (PUT /usuarios/:ID)
router.put("/:id", (req, res) => controllers.putUser(req, res));

// Método DELETE na raiz do Router com Route Params (DELETE /usuarios/:ID)
router.delete("/:id", (req, res) => controllers.deleteUser(req, res));

// Exporta o Router para ser usado no server
export default router;