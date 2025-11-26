import { useState } from "react"

export default function NewBoard(){
    const [IsModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-screen min-h-screen bg-[#2b2b2b] text-white p-10">

        <h1 className="text-4xl text-black font-bold text-center mt-7">Meus Boards</h1>

        <div className="flex justify-center mt-10">
            <button type="button" onClick={() => setIsModalOpen(true)} className="px-5 py-2 bg-transparent border border-gray-900 text-gray-500 rounded-2xl hover:text-white hover:border-blue-500 hover:bg-blue-300 transform transition-transition duration-500 hover:scale-105 cursor-pointer flex items-center gap-2">
            <span class="material-symbols-outlined">add_2</span>Novo Board</button>
        </div>

        </div>
    );
}