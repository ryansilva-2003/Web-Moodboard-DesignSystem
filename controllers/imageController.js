const imageService = require("../Service/imageService");

class imageController{

    //get images
    async buscarTodos (req, res){
        try{
            const images = await imageService.buscarTodos();
            res.json(images);

        }catch(error){
            res.status(500).json({ error: "Erro ao buscar imagens..."});
        }
    }

    //get image:id
    async buscarId(req, res){
        try{
            const id = parseInt(req.params.id);
            const image = await imageService.buscarId(id);
            res.json(image);
            
        }catch(error){
            res.status(404).json({ error: "Imagem não encontrada..."});
        }
    }

    //get board:image
    async buscarPorBoard(req, res){
        try{
            const boardId = parseInt(req.params.boardId);
            const images = await imageService.buscarPorBoard(boardId);
            res.json(images);

        }catch(error) {
            res.status(500).json({ error: "Erro ao buscar imagens do board..."})
        }
    }

    //post
    async criar(req, res){
        try{
            const { url, boardId } = req.body;
            if (!url || !boardId) return res.status(400).json({ error: "url e boardId são obrigatórios"});

            const novaImage = await imageService.criar({ url, boardId});
            res.status(200).json(novaImage);

        }catch (error) {
            res.status(500).json({ error: "Erro ao criar imagem..."});
        }
    }

    //put
    async atualizar (req, res){
        try{
            const id = parseInt(req.params.id);
            const dados = req.body;
            const atualizado = await imageService.atualizar(id, dados);
            res.json(atualizado);

        }catch (error) {
            res.status(400).json({ error: "imagem não encontrada"});
        }
    }

    //delete
    async deletar (req, res){
        try{
            const id = parseInt(req.params.id);

            await imageService.deletar(id);
            res.json({ message: "Imagem foi deletada com sucesso."});

        }catch (error){
            res.json(404).json({ error: "imagem não foi encontrada..."});
        }
    }
}

module.exports = new imageController();