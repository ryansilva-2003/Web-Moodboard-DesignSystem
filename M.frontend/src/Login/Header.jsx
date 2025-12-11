import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


export default function Header(){
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [icon, setIcon] = useState(null);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
    async function fetchUser() {
        const response = await axios.get(`http://localhost:4000/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
    }

        fetchUser();
    }, []);

    const limparCampos = () => {
        setEditUserId(null);
        setBio("");
    };


    const handleUserSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);

        if(icon){
            formData.append("icon", icon);
        }

        try {

            let response;

            if(editUserId){
                response = await axios.put(`http://localhost:4000/users/${editUserId}`, formData, {
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-type": "multipart/form-data"
                    }
                });

                alert("Perfil foi atualizado com sucesso!");
            }
        } catch(error){
            console.log(error);
            alert(error.response?.data?.error || "Problema ao atualizar perfil.");
        }
    };

        const handleEdit = (user) => {
        setEditUserId(user.id);
        setName(user.name);
        setBio(user.bio);
        setIcon(null);
        setIsModalOpen(true);
    };

    return(
        <header className="bg-gradient-to-r from-orange-300 to-blue-400 text-black shadow-xl">
            <div className="mx-auto px-10 py-6 flex justify-between items-center">
                <div className="text-3xl font-bold">MoodBoard</div>

           <nav className="space-x-6 flex">
                {user && (
                    <button type="button" onClick={() => handleEdit(user)} className="hover:text-gray-200 mr-10 flex items-center gap-1 cursor-pointer">Editar Perfil</button>
                )}

                    {IsModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-20">
                            <div className="bg-[#1f1f1f] text-white p-10 w-[800px] h-[700px] rounded-xl shadow-xl overflow-hidden relative">

                                <div className="w-full flex justify-center">
                                <div className="text-center text-gray-500 text-2xl font-semibold">Editar perfil</div>
                                </div>

                                <form className="w-1/2 p-3 flex flex-col justify-center" onSubmit={handleUserSubmit}>

                                <div className="flex flex-col items-center mt-15 w-30 h-30 rounded-full border-2 border-gray-400 object-cover">
                                    {icon ? (
                                        typeof icon ==="string" ? (
                                            <img src={`http://localhost:4000/uploads/${icon}`} alt="userIcon" className="object-contain max-h-full max-w-full"/>
                                        ) : (
                                            <img src={URL.createObjectURL(icon)} alt="userPreview" className="object-contain max-h-full max-w-full"/>
                                        )
                                    ) : (
                                    <img src="./img/usuarioImage.jpg" alt="userImage" className="object-contain max-h-full max-w-full"/>
                                    )}
                                </div>

                                <div className="p-4">
                                    <label htmlFor="fileInput" className="flex items-center justify-center w-full py-3 px-4 bg-red text-white rounded-lg cursor-pointer">ENVIAR ARQUIVO</label>

                                    <input type="file" id="fileInput" onChange={(e) => setIcon(e.target.files[0])} className="hidden"/>
                                </div>

                                <hr className="border-orange-500 w-full"/>

                                <div>
                                    <label className="block font-semibold mb-1 text-1">NOME</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                                    className="w-full p-2 border rounded"/>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-1">BIO</label>
                                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)}
                                    className="w-full p-2 border rounded"/>
                                </div>

                                <button type="button" onClick={() => {limparCampos(), setIsModalOpen(false)}} className="cursor-pointer w-full h-full">Cancelar</button>
                                
                                </form>
                            </div>
                        </div>
                    )}

                    <a href="/" className="hover:text-gray-200 mr-10 flex items-center gap-1">Sair<span class="material-symbols-outlined">exit_to_app</span></a>
                </nav>
            </div>
        </header>
    )
}