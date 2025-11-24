const { Router } = require("express");
const router = Router();
const boardController = require("../controllers/boardController");

//get
router.get("/boards", (req, res) => boardController.buscarTodos(req, res));
router.get("/boards/:id", (req,res) => boardController.buscarId(req, res));
router.get("/users/:userId/boards", (req, res) => boardController.buscarPorUsuario(req,res));

//post
router.post("/boards", (req, res) => boardController.criar(req, res));

//put
router.put("/boards/:id", (req, res) => boardController.atualizar(req, res));

//delete
router.delete("/boards/:id", (req, res) => boardController.deletar(req, res));

module.exports = router;