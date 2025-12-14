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
    async atualizarMe (req, res) {
        try{
            const id = req.user.id;
            const {name, bio} = req.body;
            const icon = req.file ? `boards/${req.file.filename}` : undefined;

            const dadosAtualizados = { name, bio };
            if (icon) dadosAtualizados.icon = icon;
            
            const atualizado = await userService.atualizar(id, dadosAtualizados);

            const { password, ...safeUser } = atualizado;
            return res.json(safeUser);
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao atualizar usuário"});
    }
}

    async buscarMe(req, res) {
  try {
    const userId = req.user.id;

    const user = await userService.buscarId(userId);
    const { password, ...safeUser } = user;

    return res.json(safeUser);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuário logado" });
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