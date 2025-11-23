const userService = require("../Service/userService");

class UserController {

    //get users
    async buscarTodos (req, res) {
        try{
            const users = await userService.buscarTodos();
            res.json(users);

        }catch(error){
            res.status(500).json({error: "Erro ao buscar usuários..."});
        }
    }

    //get id
    async buscarId (req, res) {
        try{
            const id = parseInt(req.params.id);

            const user = await userService.buscarId(id);
            res.json(user);

        }catch(error){
            res.status(404).json({error: "Erro ao buscar usuário..."});
        }
    }

    //post
    async criar (req, res) {
        try{
            const dados = req.body;

            const novoUsuario = await userService.criar(dados);
            res.status(201).json(novoUsuario);

        }catch(error){
            res.status(400).json({error: "Erro ao criar usuário..."});
        }
    }

    //put
    async atualizar (req,res) {
        try{
            const id = parseInt(req.params.id);
            const dados = req.body;

            const atualizado = await userService.atualizar(id, dados);
            res.json(atualizado);

        }catch(error){
            res.status(404).json({error: "Usuário não encontrado..."});
        }
    }

    //delete
    async deletar (req, res) {
        try{
            const id = parseInt(req.params.id);

            await userService.deletar(id);
            res.json({message: "Usuário foi deletado com sucesso."});

        }catch(error){
            res.status(404).json({ error: "usuário não encontrado..."});
        }
    }
}

module.exports = new UserController();