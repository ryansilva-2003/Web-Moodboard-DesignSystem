const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserService{

    //get users
    async buscarTodos(){
        return await prisma.user.findMany();
    }

    //get user
    async buscarId(id){
        const userId = parseInt(id);

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) throw new Error("usuário não encontrado");
        return user;
    }

    //post
    async criar(dados){
        return await prisma.user.create({
            data: dados
        });
    }

    //put
    async atualizar(id, dados){
        const userId = parseInt(id);

        return await prisma.user.update({
            where: { id: userId },
            data: dados
        });
    }

    //delete
    async deletar(id){
        const userId = parseInt(id);

        return await prisma.user.delete({
            where: { id: userId }
        });
    }
}

module.exports = new UserService();