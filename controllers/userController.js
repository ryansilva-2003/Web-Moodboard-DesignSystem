const userService = require("../Services/userService");

class UserController {

    //get users
    async buscarTodos (req, res) {
        try{
            const users = await userService.buscarTodos();
            return res.json(users);

        }catch(error){
            return res.status(500).json({error: "Erro ao buscar usuários..."});
        }
    }

    //get id
    async buscarId (req, res) {
        try{
            const id = parseInt(req.params.id);

            const user = await userService.buscarId(id);
            return res.json(user);

        }catch(error){
            return res.status(404).json({error: "Erro ao buscar usuário..."});
        }
    }

    //post
    async criar (req, res) {
        try{
            const dados = req.body;

            const novoUsuario = await userService.criar(dados);
            const  { password, ...userSafe } = novoUsuario;
            return res.status(201).json(novoUsuario);

        }catch(error){
            return res.status(400).json({error: "Erro ao criar usuário..."});
        }
    }

    //put
    async atualizar (req,res) {
        try{
            const id = parseInt(req.params.id);
            const dados = req.body;

            const atualizado = await userService.atualizar(id, dados);
            return res.json(atualizado);

        }catch(error){
            return res.status(404).json({error: "Usuário não encontrado..."});
        }
    }

    //delete
    async deletar (req, res) {
        try{
            const id = parseInt(req.params.id);

            await userService.deletar(id);
            return res.json({message: "Usuário foi deletado com sucesso."});

        }catch(error){
            return res.status(404).json({ error: "usuário não encontrado..."});
        }
    }
}

module.exports = new UserController();