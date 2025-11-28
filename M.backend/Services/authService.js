const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class authService {

    async login(email, password) {
        const user = await prisma.user.findUnique({where: { email }});
        if(!user) throw new Error("Usuário não encontrado");

        const senhaCorreta = await bcrypt.compare(password, user.password);
        if(!senhaCorreta) throw new Error("Senha inválida");

        const token = jwt.sign(
            {id: user.id, email: user.email, name: user.name},
            process.env.JWT_SECRET,
            { expiresIn: "5m" }
        );

        return {
            token,
            user: {
                id: user.id,
                nome: user.name,
                email: user.email
            }
        };
    }

    async registrar (nome, email, senha) {
        const hash = await bcrypt.hash(senha, 10);

        return await prisma.user.create({
            data: {
                name: nome,
                email: email,
                password: hash
            }
        });
    }
}

module.exports = new authService();