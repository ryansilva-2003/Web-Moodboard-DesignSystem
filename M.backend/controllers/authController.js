const authService = require ("../Services/authService");

class AuthController {

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            return res.json(result);

        }catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async registrar(req, res) {
        try{
            const { nome, email, senha } = req.body;
            const user = await authService.registrar( nome, email, senha );
            return res.json(user);

        }catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();