const jwt = require ("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("HEADER AUTH RECEBIDO:", req.headers.authorization);


    if (!token) {
        return res.status(401).json({ erro: "Token não enviado"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch (error) {
        return res.status(401).json({ erro: "Token não disponivel"});
    }
}

module.exports = authMiddleware;