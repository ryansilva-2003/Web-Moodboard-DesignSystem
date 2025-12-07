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
            return res.status(201).json(userSafe);

        }catch(error){
            return res.status(400).json({error: "Erro ao criar usuário..."});
        }
    }

    //put
    async atualizar (req, res) {
        try{
            const id = parseInt(req.params.id);
            const {name, bio} = req.body;
            const icon = req.file ? `users/${req.file.filename}` : null;

            const user = await userService.buscarId(id);

            if(!user){
                return res.status(404).json({ error: "Usuário não encotrado..."});
            }

            const dadosAtualizado ={
                name,
                newIcon,
                bio
            };
            
            const atualizado = await userService.atualizar(id, dadosAtualizado);

            const { password, ...safeUser } = atualizado;
            return res.json(safeUser);

            return res.json({ message: "Dados do usuário foram atualizados!", user: atualizado});

    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao atualizar usuário"});
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