const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/uploadMiddleware.js");
const auth = require("../middlewares/authMiddleware.js");

//get
router.get("/me", auth, userController.buscarMe);

router.get("/s", (req, res) => userController.buscarTodos(req, res));
router.get("/:id", (req, res) => userController.buscarId(req,res));

//post
router.post("/", (req, res) => userController.criar(req, res));

//put
router.put("/me", auth, upload.single("icon"), userController.atualizarMe);

//delete
router.delete("/:id", (req, res) => userController.deletar(req, res));

module.exports = router;