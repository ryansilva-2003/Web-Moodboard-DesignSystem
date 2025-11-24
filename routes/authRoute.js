const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/registrar", authController.registrar);

module.exports = router;