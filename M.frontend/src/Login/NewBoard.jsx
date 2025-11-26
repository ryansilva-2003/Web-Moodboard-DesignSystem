import { useState } from "react";
import axios from "axios";

export default function NewBoard(){
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [colors, setColors] = useState("#ffffff");

    const handleBoardSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post("http://localhost:4000/boards", {
                title: title,
                description: description,
                colors: colors,
                image: image
            });

            alert("Board foi criado com sucesso!");
            setIsModalOpen(false);

        } catch(error){
            console.log(error);
            if(error.response?.data?.error){
                alert(error.response.data.error);
            }else{
                alert("Problema ao registrar novo Board.");
            }
        }
    }

return (
    <div className="w-screen min-h-screen bg-[#2b2b2b] text-white p-10">

        <h1 className="text-4xl text-black font-bold text-center mt-7">Meus Boards</h1>

        <div className="flex justify-center mt-10">
            <button 
                type="button" 
                onClick={() => setIsModalOpen(true)} 
                className="px-5 py-2 bg-transparent border border-gray-900 text-gray-500 rounded-2xl hover:text-white hover:border-blue-500 transform transition duration-500 hover:scale-105 cursor-pointer flex items-center gap-2"
            >
                <span className="material-symbols-outlined">add_2</span>
                Novo Board
            </button>
        </div>

        {IsModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-20">

                <div className="bg-[#1f1f1f] text-white p-6 rounded-xl w-[800px] h-[500px] shadow-xl flex overflow-hidden">

                    {/* lado esquerdo */}
                    <div className="w-1/2 bg-[#dfdfdf] flex flex-col justify-center">

                        <div className="flex-1 flex items-center justify-center p-5">
                            {image ? (
                                <img 
                                    src={URL.createObjectURL(image)} 
                                    alt="Preview" 
                                    className="object-contain"
                                />
                            ) : (
                                <p className="text-gray-600">Nenhuma imagem selecionada</p>
                            )}
                        </div>

                        <div className="p-4">
                            <label 
                                htmlFor="fileInput" 
                                className="flex items-center justify-center w-full py-3 px-4 bg-[#3a3a3a] text-white rounded-lg cursor-pointer hover:bg-[#4a4a4a] transition"
                            >
                                Selecionar Imagem
                            </label>

                            <input 
                                type="file" 
                                id="fileInput" 
                                onChange={(e) => setImage(e.target.files[0])} 
                                className="hidden" 
                            />
                        </div>

                    </div>

                    {/* lado direito */}
                    <form className="w-1/2 p-3 flex flex-col justify-between" onSubmit={handleBoardSubmit}>

                        <div>
                            <label className="block font-semibold mb-1">Título</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="w-full p-2 border rounded" 
                                placeholder="Ex: Inspiração de verão" 
                            />
                        </div>

                        <hr className="border-t border-gray-500 mt-2 w-full" />

                        <div>
                            <label className="block font-semibold mt-2 mb-1">Descrição</label>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-25 py-2 px-3 border rounded" 
                                placeholder="Ex: Arte que fiz para representar o verão que tive..."
                            />
                        </div>

                        <hr className="border-t border-gray-500 w-full" />

                        <div>
                            <label className="block font-semibold mt-3 mb-1">Cor do Board</label>
                            <input 
                                type="color" 
                                value={colors} 
                                onChange={(e) => setColors(e.target.value)} 
                                className="w-full h-15 p-1 cursor-pointer rounded" 
                            />
                        </div>

                        <hr className="border-t border-gray-500 w-full" />

                        <button 
                            type="submit" 
                            className="cursor-pointer w-full bg-blue-600 mt-6 text-white py-2 rounded-lg hover:bg-blue-700 transition">Criar Board</button>

                            <button type="button" onClick={() => setIsModalOPen(false)} className="cursor-pointer w-full bg-gray-600 mt-3 text-white py-2 rounded-lg hover:bg-gray-700 transition">Fechar</button>

                    </form>

            </div>

            </div>
        )}

    </div>
)};
