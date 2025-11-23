const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class boardService {

    //get boards
    async buscarTodos(){
        return await prisma.board.findMany();
    }

    //get board
    async buscarId(id){
        const boardId = parseInt(id);

        const board = await prisma.board.findUnique({
            where: {id: boardId }
        });

        if (!board) throw new Error ("Board não encontrado");
        return board;
    }

    //get user:board
    async buscarPorUsuario(userId) {
        return await prisma.board.findMany({ where: { userId: Number(userId) } });
}


    //post
    async criar(dados){
        return await prisma.board.create({
            data: {
                title: dados.title,
                description: dados.description,
                userId: dados.userId
            }
        });
    }

    //put
    async atualizar(id, dados){
        const boardId = parseInt(id);

        return await prisma.board.update({
            where: { id: boardId },
            data: dados
        });
    }

    //delete
    async deletar(id){
        const boardId = parseInt(id);

        return await prisma.board.delete({
            where: { id: boardId }
        });
    }
}

module.exports = new boardService();