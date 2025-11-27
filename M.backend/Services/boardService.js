const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class boardService {

    // GET ALL
    async buscarTodos() {
        return await prisma.board.findMany();
    }

    // GET one
    async buscarId(id) {
        const boardId = Number(id);

        const board = await prisma.board.findUnique({
            where: { id: boardId }
        });

        if (!board) throw new Error("Board não encontrado");
        return board;
    }

    // GET boards by user
    async buscarPorUsuario(userId) {
        return await prisma.board.findMany({
            where: { userId: Number(userId) }
        });
    }

    // CREATE board
    async criar(dados) {
        return await prisma.board.create({
            data: {
                title: dados.title,
                description: dados.description || null,
                image: dados.image || null,
                colors: dados.colors || null,
                userId: Number(dados.userId)
            }
        });
    }

    // UPDATE board
    async atualizar(id, dados) {
        const boardId = Number(id);

        return await prisma.board.update({
            where: { id: boardId },
            data: {
                title: dados.title,
                description: dados.description,
                image: dados.image,
                colors: dados.colors
            }
        });
    }

    // DELETE board
    async deletar(id) {
        const boardId = Number(id);

        return await prisma.board.delete({
            where: { id: boardId }
        });
    }
}

module.exports = new boardService();

