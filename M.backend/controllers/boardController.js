const boardService = require("../Services/boardService");

class boardController {

    //get boards
    async buscarTodos (req, res){
        try{
            const boards = await boardService.buscarTodos();
            return res.json(boards);

        }catch(error){
            return res.status(500).json({error: "Erro ao buscar boards..."});
        }
    }

    //get board
    async buscarId (req, res){
        try{
            const id = parseInt(req.params.id);

            const board = await boardService.buscarId(id);
            return res.json(board);

        }catch(error){
            return res.status(404).json({error: "Board não encontrado..."});
        }
    }

    //get user:board
    async buscarPorUsuario (req, res){ 
        try{
            const userId = parseInt(req.params.userId);
            const boards = await boardService.buscarPorUsuario(userId);
            return res.json(boards);

        }catch(error) {
            return res.status(500).json({ error: "Error ao buscar boards do usuário..."});
        }
    }

    //post
    async criar (req, res){
        try{
            const { title, description, userId } = req.body;
            if (!title || !userId) return res.status(400).json({ error: "title e userId são obrigatórios"});

            const novoBoard = await boardService.criar({ title, description, userId });
            return res.status(201).json(novoBoard);

        }catch(error){
            return res.status(500).json({ error: "Erro ao criar board..."});
        }
    }

    //put
    async atualizar (req, res){
        try{
            const id = parseInt(req.params.id);
            const dados = req.body;

            const atualizado = await boardService.atualizar(id, dados);
            return res.json(atualizado);

        }catch(error) {
            return res.status(404).json({ error: "board não encontrador..."});
        }
    }

    //delete
    async deletar (req, res){
        try{
            const id = parseInt(req.params.id);

            await boardService.deletar(id);
            return res.json({ message: "board foi deletado com sucesso."});

        }catch(error){
            return res.status(404).json({ error: "board não encontrado..."});
        }
    }
}

module.exports = new boardController();