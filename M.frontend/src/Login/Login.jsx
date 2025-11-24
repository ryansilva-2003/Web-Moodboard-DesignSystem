import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [IsModalOPen, setIsModalOPen] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('teste', username, password);
        console.log("Envio");
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        setIsModalOpen(false);
    };

    return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-tr from-blue-300 to-purple-500">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-5 mt-10 text-4xl font-bold">Bem-Vindo ao MoodBoard</span>
                    <span className="font-light text-gray-400 mb-8">Por favor! Coloque seus dados.</span>

                    <div className="py-6">
                    <input type = "email" placeholder='E-mail' onChange={(e) => setUsername(e.target.value)}  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/> 
                    </div>

                    <div className="py-6">
                    <input type = "password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                    </div>

                    <div className="flex justify-between w-full py-5">
                        <div className="mr-24">
                            <input type="checkbox" name="ch" id="ch" className="mr-2"></input>
                            <span className="text-md">Lembrar de mim</span>
                        </div>
                    </div>

                    <button className="w-full bg-black text-white p-2 rounded-lg mb-10 hover:bg-gradient-to-tr from-gray-500 to-gray-700 hover:text-white hover:border hover:border-gray-300 cursor-pointer">Entrar</button>

                    <div className="text-center text-gray-400">Não tem nenhuma conta? <button className="font-bold text-black cursor-pointer hover:underline" onClick={() => setIsModalOPen(true)}>Registrar</button>
                    </div>
                    </div>
                </form>

                    <div className="relative">
                        <img src="./img/image.jpg" alt="img" className="w-[450px] h-full hidden rounded-r-2xl md:block object-cover shadow-r-2x1"></img>
                    </div>

                    <div className="absolute hidden bottom-10 right-20 p-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg md:block">
                    <span className="text-white text-sm font-medium">Organize suas artes e inspire sua criatividade</span>
                    </div>



                    {IsModalOPen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-10">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl font-bold mb-4">Registrar Usuário</h2>
                                <form className="flex flex-col gap-3" onSubmit={handleRegisterSubmit}>
                                    <input type="text" placeholder="Nome" className="p-2 border border-gray-300 rounded"></input>

                                    <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded"></input>

                                    <input type="password" placeholder="Senha" className="p-2 border border-gray-300 rounded"></input>

                                    <button type="submit" className="bg-blue-500 hover:bg-gradient-to-tr from-blue-300 to-purple-500 mt-5 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">Registrar</button>
                                </form>

                                <button onClick={() => setIsModalOPen(false)} className="mt-4 text-sm text-gray-500 hover:underline cursor-pointer">Fechar</button>

                            </div>
                        </div>
                    )}
        </div>
    </div>
    )
};
