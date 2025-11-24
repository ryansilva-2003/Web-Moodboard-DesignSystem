const { Router } = require("express");
const router = Router();
const imageController = require("../controllers/imageController");

//get
router.get("/images", (req, res) => imageController.buscarTodos(req, res));
router.get("/images/:id", (req, res) => imageController.buscarId(req,res));
router.get("/boards/:boardId/images", (req, res) => imageController.buscarPorBoard(req,res));

//post
router.post("/images", (req, res) => imageController.criar(req,res));

//put
router.put("/images/:id", (req, res) => imageController.atualizar(req,res));

//delete
router.delete("/images/:id", (req, res) => imageController.deletar(req, res));

module.exports = router;