const { Router } = require("express");
const router = Router();
const boardController = require("../controllers/boardController");
const upload = require("../middlewares/uploadMiddleware");

//get
router.get("/boards", (req, res) => boardController.buscarTodos(req, res));
router.post("/create", upload.single("image"), boardController.criar);
router.get("/users/:userId/boards", (req, res) => boardController.buscarPorUsuario(req,res));

//post
router.post("/create", upload.single("image"), boardController.criar);

//put
router.put("/boards/:id", (req, res) => boardController.atualizar(req, res));

//delete
router.delete("/boards/:id", (req, res) => boardController.deletar(req, res));

module.exports = router;