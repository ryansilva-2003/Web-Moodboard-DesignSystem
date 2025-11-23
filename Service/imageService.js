const  { PrismaClient } = require ("@prisma/client");

const prisma = new PrismaClient;

class ImageService {

    //get images
    async buscarTodos(){
        return await prisma.image.findMany({
            include: { board: true }
        });
    }

    //get image:id
    async buscarId(id){
        const image = await prisma.image.findUnique({
            where: { id: parseInt(id) },
            include: { board: true }
        });
        if (!image) throw new Error("imagem não encontrada!");
        return image;
    }

    //get board:image
    async buscarPorBoard (boardId){
        return await prisma.image.findMany({
            where: { boardId: parseInt(boardId) }
        });
    }

    //post
    async criar(dados){
        return await prisma.image.create({
            data:{
                url: dados.url,
                boardId: dados.boardId
            }
        });
    }

    //put
    async atualizar(id, dados){
        return await prisma.image.update({
            where: { id: parseInt(id) },
            data: dados
        });
    }

    //delete
    async deletar(id){
        return await prisma.image.delete({
            where: { id: parseInt(id) }
        });
    }

}

module.exports = new ImageService();