import axios from "axios";
import { useState } from "react";


export default function Header({ user, setUser }){
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [icon, setIcon] = useState(null);
    const [editUserId, setEditUserId] = useState(null);
    const token = localStorage.getItem("token");

    const limparCampos = () => {
        setEditUserId(null);
        setBio("");
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);

        if(icon){
            formData.append("icon", icon);
        }

    const response = await axios.put("http://localhost:4000/users/me", formData,{
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setUser(response.data);
    setIsModalOpen(false);
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
                    <button type="button" onClick={() => handleEdit(user)} className="mr-10 flex items-center cursor-pointer px-4 py-2 shadow-md rounded-xl hover:bg-blue-500 transition-colors duration-200 hover:text-white">Editar Perfil<span class="material-symbols-outlined">person_edit</span></button>
                )}

                    {IsModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
                            <div className="bg-[#1f1f1f] text-white p-10 w-[650px] h-[810px] rounded-xl shadow-xl">

                                <div className="w-full flex justify-center">
                                <div className="text-center text-gray-500 text-2xl font-semibold mb-5">Editar perfil</div>
                                </div>

                                <form className="p-3 flex flex-col justify-center" onSubmit={handleUserSubmit}>

                                <div className="flex h-50 w-50 items-center justify-center overflow-hidden rounded-full bg-[#404040] mx-auto border-2 border-gray-400">
                                    {icon ? (
                                        <img 
                                        src={URL.createObjectURL(icon)}
                                        alt="Preview" className="max-w-50 max-h-50 object-contain"/>
                                    ) :  user.icon ? (
                                        <img src={`http://localhost:4000/uploads/${user.icon}`} alt="iconUser" className="max-w-50 max-h-50 object-contain"/>
                                    ) : (
                                        <img src="./img/usuarioImage.jpg" className="max-w-50 max-h-50 object-contain"/>
                                    )}
                                </div>

                                <div className="p-4">
                                <label 
                                htmlFor="fileInput" 
                                className="flex items-center justify-center w-full py-3 bg-[#3a3a3a] text-white rounded-lg cursor-pointer hover:bg-[#4a4a4a] transition">
                                SELECIONAR IMAGEM<span class="material-symbols-outlined">add_photo_alternate</span></label>

                                    <input type="file" id="fileInput" onChange={(e) => setIcon(e.target.files[0])} className="hidden"/>
                                </div>

                                <hr className="border-orange-500 w-full mb-4"/>

                                <div>
                                    <label className="block font-semibold mb-1 text-1">NOME</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                                    className="w-full p-2 border rounded"/>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-1 mt-4">BIO</label>
                                    <textarea type="text" value={bio} onChange={(e) => setBio(e.target.value)}
                                    className="w-full h-30 p-2 border rounded"/>
                                </div>

                                <button type="submit" className="cursor-pointer w-full h-full bg-blue-600 p-3 rounded-lg mt-6 mb-5 hover:bg-blue-700 transition">Salvar</button>

                                <button type="button" onClick={() => {limparCampos(), setIsModalOpen(false)}} className="cursor-pointer w-full h-full bg-gray-600 p-3 rounded-lg hover:bg-gray-700 transition">Cancelar</button>
                                
                                </form>
                            </div>
                        </div>
                    )}

                    <a href="/" className="mr-10 flex items-center cursor-pointer px-4 py-2 shadow-md rounded-xl hover:bg-blue-500 transition-colors duration-200 hover:text-white">Sair<span class="material-symbols-outlined">exit_to_app</span></a>
                </nav>
            </div>
        </header>
    )
}