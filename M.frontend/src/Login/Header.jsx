import React from "react";
import { useState } from "react";


export default function Header(){
    const [IsModalOpen, setIsModalOpen] = useState(false);

    return(
        <header className="bg-gradient-to-r from-orange-300 to-blue-400 text-black shadow-xl">
            <div className="mx-auto px-10 py-6 flex justify-between items-center">
                <div className="text-3xl font-bold">MoodBoard</div>

                <nav className="space-x-6 flex">
                    <button type="button" onClick={() => setIsModalOpen(true)} className="hover:text-gray-200 mr-10 flex items-center gap-1 cursor-pointer">Editar Perfil</button>

                    {IsModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-20">
                            <div className="bg-[#1f1f1f] text-white p-10 w-[800px] h-[700px] rounded-xl shadow-xl overflow-hidden relative">

                                <div className="w-full flex justify-center">
                                <div className="text-center text-gray-500 text-2xl font-semibold">Editar perfil</div>
                                </div>

                                <form className=""></form>

                                <div className="flex flex-col items-center mt-15">
                                    <img src="./img/usuarioImage.jpg" alt="userImage" className="w-30 h-30 rounded-full border-2 border-gray-400 object-cover"/>
                                </div>

                                <div className=""></div>
                                
                            </div>
                        </div>
                    )}

                    <a href="/" className="hover:text-gray-200 mr-10 flex items-center gap-1">Sair<span class="material-symbols-outlined">exit_to_app</span></a>
                </nav>
            </div>
        </header>
    )
}