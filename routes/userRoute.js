const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController");

//get
router.get("/users", (req, res) => userController.buscarTodos(req, res));
router.get("/users/:id", (req, res) => userController.buscarId(req,res));

//post
router.post("/users", (req, res) => userController.criar(req, res));

//put
router.put("/users/:id", (req, res) => userController.atualizar(req, res));

//delete
router.delete("/users/:id", (req, res) => userController.deletar(req, res));

module.exports = router;