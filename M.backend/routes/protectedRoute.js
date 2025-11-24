const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/authMiddleware");

router.get("/teste", auth, (req, res) => {
    res.json({
        mensagem: "Token válido!",
        usuario: req.user
    });
});

module.exports = router;
