const imageService = require("../Services/imageService");

class imageController{

    //get images
    async buscarTodos (req, res){
        try{
            const images = await imageService.buscarTodos();
            return res.json(images);

        }catch(error){
            return res.status(500).json({ error: "Erro ao buscar imagens..."});
        }
    }

    //get image:id
    async buscarId(req, res){
        try{
            const id = parseInt(req.params.id);
            const image = await imageService.buscarId(id);
            return res.json(image);
            
        }catch(error){
            return res.status(404).json({ error: "Imagem não encontrada..."});
        }
    }

    //get board:image
    async buscarPorBoard(req, res){
        try{
            const boardId = parseInt(req.params.boardId);
            const images = await imageService.buscarPorBoard(boardId);
            return res.json(images);

        }catch(error) {
            return res.status(500).json({ error: "Erro ao buscar imagens do board..."})
        }
    }

    //post
    async criar(req, res){
        try{
            const { url, boardId } = req.body;
            if (!url || !boardId) return res.status(400).json({ error: "url e boardId são obrigatórios"});

            const novaImage = await imageService.criar({ url, boardId});
            return res.status(200).json(novaImage);

        }catch (error) {
            return res.status(500).json({ error: "Erro ao criar imagem..."});
        }
    }

    //put
    async atualizar (req, res){
        try{
            const id = parseInt(req.params.id);
            const dados = req.body;
            const atualizado = await imageService.atualizar(id, dados);
            return res.json(atualizado);

        }catch (error) {
            return res.status(400).json({ error: "imagem não encontrada"});
        }
    }

    //delete
    async deletar (req, res){
        try{
            const id = parseInt(req.params.id);

            await imageService.deletar(id);
            return res.json({ message: "Imagem foi deletada com sucesso."});

        }catch (error){
            return res.json(404).json({ error: "imagem não foi encontrada..."});
        }
    }
}

module.exports = new imageController();