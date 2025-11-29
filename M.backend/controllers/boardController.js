const boardService = require("../Services/boardService");

class boardController {

    async buscarTodos(req, res) {
        try {
            const boards = await boardService.buscarTodos();
            return res.json(boards);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar boards..." });
        }
    }

    async buscarId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const board = await boardService.buscarId(id);
            return res.json(board);
        } catch (error) {
            return res.status(404).json({ error: "Board não encontrado..." });
        }
    }

    async buscarPorUsuario(req, res) {
        try {
            const userId = req.user.id;
            const boards = await boardService.buscarPorUsuario(userId);
            return res.json(boards);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar boards..." });
        }
    }

async criar(req, res) {
    try {
        const { title, description, colors } = req.body;

        const image = req.file ? `boards/${req.file.filename}` : null;

        const novoBoard = await boardService.criar({
            title,
            description,
            colors,
            image,
            userId: req.user.id
        });

        return res.status(201).json(novoBoard);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}


    async atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const {title, description, colors} = req.body;
            const newImage = req.file ? `boards/${req.file.filename}` : null;

            const board = await boardService.buscarId(id);

            if(!board){
                return res.status(404).json({ error: "Board não encontrado"});
            }

            const dadosAtualizado ={
                title,
                description,
                colors,
                image: newImage ? newImage : board.image
            };

            const atualizado = await boardService.atualizar(id, dadosAtualizado);

            return res.json({ message: " board foi atualizado", board: atualizado});

        } catch (error) {
            return res.status(500).json({ error: "ERRO ao atualizar board..." });
        }
    }

    async deletar(req, res) {
        try {
            const id = parseInt(req.params.id);

            await boardService.deletar(id);
            return res.json({ message: "Board deletado com sucesso." });

        } catch (error) {
            return res.status(404).json({ error: "board não encontrado..." });
        }
    }
}

module.exports = new boardController();

