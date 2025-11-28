const { Router } = require("express");
const router = Router();
const boardController = require("../controllers/boardController");
const upload = require("../Middlewares/uploadMiddleware");
const auth = require("../Middlewares/authMiddleware");

//get
router.get("/boards", (req, res) => boardController.buscarTodos(req, res));
router.get("/boards/user", auth, (req, res) => boardController.buscarPorUsuario(req,res));

//post
router.post("/boards", auth, upload.single("image"), boardController.criar);

//put
router.put("/boards/:id", (req, res) => boardController.atualizar(req, res));

//delete
router.delete("/boards/:id", (req, res) => boardController.deletar(req, res));

module.exports = router;