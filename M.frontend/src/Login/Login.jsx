import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [IsModalOPen, setIsModalOPen] = useState(false);
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('teste', email, password);
        console.log("Envio");

        try{
            const response = await axios.post("http://localhost:4000/auth/login", {
                email: email,
                password: password
            });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.user.nome);
    
            alert("Login realizado com sucesso!");
            navigate("/Home");

        }catch(error){
            console.error(error);
            if (error.response?.data?.error){
                alert(error.response.data.error);
            }else{
                    alert("Problema no Login!");
                }
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/auth/registrar", {
                nome: regName,
                email: regEmail,
                senha: regPassword
            });

            alert("Usuário foi registrado com sucesso! Agora você pode logar");
            setIsModalOPen(false);

        }catch(error) {
            console.error(error);
            if (error.response?.data?.error){
                alert(error.response.data.error);
            }else{
                    alert("Problema ao cadastrar usuário!");
                }
            }
    };

    return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-tr from-orange-300 to-blue-600">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-5 mt-10 text-4xl font-bold">Bem-Vindo ao MoodBoard</span>
                    <span className="font-light text-gray-400 mb-8">Por favor! Coloque seus dados.</span>

                    <div className="py-4">
                    <input type = "email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"/> 
                    </div>

                    <div className="py-4">
                    <input type = "password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"/>
                    </div>

                    <button className="w-full bg-black text-white p-2 rounded-lg mt-7 mb-10 hover:bg-gradient-to-tr from-gray-500 to-gray-700 hover:text-white hover:border hover:border-gray-300 cursor-pointer">Entrar</button>

                    <div className="text-center text-gray-400">Não tem nenhuma conta? <button className="font-bold text-black cursor-pointer hover:underline" type="button" onClick={() => setIsModalOPen(true)}>Registrar</button>
                    </div>

                    <div className="text-center text-gray-400 mt-50">Desenvolvido por Ryan Oliveira</div>
                    </div>
                </form>

                <div className="relative flex flex-col justify-center items-center">
                    <img src="./img/image.jpg" alt="img" className="w-[450px] h-full hidden rounded-r-2xl md:block object-cover shadow-r-2x1"/>

                    <div className="absolute bottom-10 right-10 p-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg md:block">
                    <span className="text-white text-sm font-medium text-center block">Crie boards, salve suas imagens e descreva suas ideias.</span>
                    </div>
                </div>


                    {IsModalOPen && (
                        <div className="fixed inset-0 flex items-center text-center justify-center bg-black/80 z-10">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl font-bold mb-4">Registrar Usuário</h2>
                                <form className="flex flex-col gap-3" onSubmit={handleRegisterSubmit}>
                                    <input type="text" placeholder="Nome" value={regName} onChange={(e) => setRegName(e.target.value)} className="p-2 border border-gray-300 rounded"></input>

                                    <input type="email" placeholder="E-mail" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="p-2 border border-gray-300 rounded"></input>

                                    <input type="password" placeholder="Senha" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="p-2 border border-gray-300 rounded"></input>

                                    <button type="submit" className="bg-black hover:bg-gradient-to-tr from-orange-300 to-blue-500 mt-5 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">Registrar</button>
                                </form>

                                <button type="button" onClick={() => setIsModalOPen(false)} className="mt-4 text-sm text-gray-500 hover:underline cursor-pointer">Fechar</button>

                            </div>
                        </div>
                    )}
        </div>
    </div>
    )
};
