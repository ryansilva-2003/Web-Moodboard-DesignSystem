import { use, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function NewBoard(){
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [colors, setColors] = useState("#ffffff");
    const [boards, setBoards] = useState([]);
    const token = localStorage.getItem("token");
    const [editId, setEditId] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    console.log("TOKEN:", token);

    useEffect(() => {
        async function carregarBoards() {
            try {
                const response = await axios.get("http://localhost:4000/boards/user", {
                    headers:{Authorization: `Bearer ${token}`
                    }
                });
                setBoards(response.data);
            } catch (error) {
                console.log("Erro ao carregar boards:", error);
            }
        }

        if(token){
        carregarBoards();
        }

    }, [token]);

            const limparCampos = () => {
            setEditId(null);
            setTitle("");
            setDescription("");
            setImage(null);
            setColors("#ffffff");
        };

    const handleBoardSubmit = async (event) => {
        event.preventDefault();

        if (!title) {
            alert("Título é obrigatório.");
             return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("colors", colors);

        if(image){
        formData.append("image", image);
        }

        try{

            let response;

            if(editId){
            response = await axios.put(`http://localhost:4000/boards/${editId}`, formData, {
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            setBoards(prev => prev.map(b => (b.id === editId ? response.data.board : b)));

            alert("Board foi atualizado com sucesso!");
        } else {

            response = await axios.post("http://localhost:4000/boards", formData,{
                headers:{ Authorization:`Bearer ${token}`, "Content-Type": "multipart/form-data"
            }
        });
        setBoards(prev => [response.data,...prev]);
        alert("Board foi criado com sucesso!");
    }

            setIsModalOpen(false);
            setEditId(null);
            setTitle("");
            setDescription("");
            setImage(null);
            setColors("#ffffff");

        } catch(error){
            console.log(error);
                alert(error.response.data.error || "Problema ao registrar novo Board.");
        }
    };

        const handleEdit = (board) => {
            setEditId(board.id);
            setTitle(board.title);
            setDescription(board.description);
            setColors(board.colors);
            setImage(board.image);
            setIsModalOpen(true);
        }

        async function deletarBoard() {
            try{
                const res = await axios.delete(`http://localhost:4000/boards/${editId}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });

                alert("Board deletado!");

                setBoards(prev => prev.filter(b=>b.id !== editId));

                setIsModalOpen(false);
                setEditId(null);

            } catch(error){
                console.log(error);
                alert("Erro ao deletar");
            }
        }

return (
    <div className="w-screen min-h-screen bg-[#2b2b2b] text-white p-10">

        <h1 className="text-4xl font-semibold text-center mt-3 tracking-wide">Meus Boards</h1>

        <div className="flex justify-center mt-6">
            <button 
                type="button" 
                onClick={() => setIsModalOpen(true)} 
                className="px-3 py-3 bg-transparent border border-gray-900 text-gray-500 text-sm rounded-full hover:text-white hover:border-gray-500 transform transition duration-500 hover:scale-105 cursor-pointer flex items-center gap-2 hover:shadow-[0_0_5px_gray]">
                <span className="material-symbols-outlined">add_2</span></button>
        </div>

        {IsModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-20">

                <div className="bg-[#1f1f1f] text-white p-6 rounded-xl w-[1100px] h-[800px] shadow-xl flex overflow-hidden">


                    {/* lado esquerdo */}
                    <div className="w-1/2 flex flex-col justify-center mr-10">

                    <h1 className="text-white text-2xl underline underline-offset-5 decoration-orange-400">{editId ? "EDITAR BOARD" : "CRIAR BOARD"}</h1>
                        <div className="flex-1 flex items-center justify-center p-5 max-h-[650px]">
                            {image ? (
                                typeof image === "string" ? (
                                    <img 
                                    src={`http://localhost:4000/uploads/${image}`}
                                    alt="Preview"
                                    className="object-contain max-h-full max-w-full"/>
                                ) : (
                                <img 
                                    src={URL.createObjectURL(image)} 
                                    alt="Preview" 
                                    className="object-contain max-w-full max-h-full"/>
                                )
                            ) : (
                                <p className="text-gray-600 bg-[#a0a0a0] w-full h-full flex items-center justify-center">Nenhuma imagem selecionada<span class="material-symbols-outlined">hide_image</span></p>
                            )}
                        </div>

                        <div className="p-4">
                            <label 
                                htmlFor="fileInput" 
                                className="flex items-center justify-center w-full py-3 px-4 bg-[#3a3a3a] text-white rounded-lg cursor-pointer hover:bg-[#4a4a4a] transition">
                                SELECIONAR IMAGEM<span class="material-symbols-outlined">add_photo_alternate</span></label>

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
                            <label className="block font-semibold mb-1 text-xl">TÍTULO</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="w-full p-2 border rounded" 
                                placeholder="Ex: Inspiração de verão" 
                            />
                        </div>

                        <hr className="border-t border-orange-500 mt-2 w-full" />

                        <div>
                            <label className="block font-semibold mb-1 text-xl">DESCRIÇÃO</label>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-60 py-2 px-3 border rounded" 
                                placeholder="Ex: Arte que fiz para representar o verão que tive..."
                            />
                        </div>

                        <hr className="border-orange-500 w-full"/>

                        <div>
                            <label className="block font-semibold mb-1 text-xl">COR DO BOARD</label>
                            
                            <input 
                                type="color" 
                                value={colors} 
                                onChange={(e) => setColors(e.target.value)} 
                                className="w-full h-16 cursor-pointer"/>
                        </div>

                        <hr className="border-orange-500 w-full"/>

                        <button 
                            type="submit" 
                            className="cursor-pointer w-full bg-blue-600 mt-6 text-white py-3 rounded-lg hover:bg-blue-700 transition">{editId ? "SALVAR ALTERAÇÕES" : "CRIAR NOVO BOARD"}</button>

                            {editId && (
                            <button type="button" className="cursor-pointer w-full bg-gray-500 mt-3 py-2 rounded-lg hover:bg-red-700 transition flex justify-center" onClick={deletarBoard}><span class="material-symbols-outlined">delete</span>Deletar</button>
                            )}

                            <button type="button" onClick={() => {limparCampos(); setIsModalOpen(false)}}className="cursor-pointer w-full bg-gray-600 mt-1 text-white py-2 rounded-lg hover:bg-gray-700 transition">Cancelar</button>
                    </form>

            </div>

            </div>
        )}

            <div className="mt-10 columns-6 gap-5">
                {boards.map(board => (
                <div key={board.id} className="bg-[#404040] p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer border border-gray-700 mb-6 break-inside-avoid">
                {board.image && (
                <img 
                    src={`http://localhost:4000/uploads/${board.image}`} 
                    alt="imagem" 
                    className="max-w-full h-auto object-cover rounded-xl mb-3 cursor-pointer"
                    onClick={() => {
            if (!board.image) return;
                const src = typeof board.image === "string" ? `http://localhost:4000/uploads/${board.image}` : URL.createObjectURL(board.image);
            setPreviewImage(src);
        }}

                    
            />)}
            <h2 className="text-xl font-semibold text-white">{board.title}</h2>
            {board.description && <p className="text-gray-400 text-sm mt-1">{board.description}</p>}
            {board.colors && (
                <div 
                    className="w-full h-7 rounded mt-5" 
                    style={{ backgroundColor: board.colors }}/>
                )}

            <button 
            onClick={() => handleEdit(board)}
            className="px-2 mt-2 cursor-pointer text-2xl text-white hover:bg-gray-600 rounded-xl">...
            </button>
        </div>
        ))}
</div>

{previewImage && (
  <div 
    className="fixed inset-0 bg-black/90 flex items-center justify-center cursor-pointer"
    onClick={() => setPreviewImage(null)}
  >
    <img src={previewImage} alt="Preview Grande" className="max-h-[90%] max-w-[90%] object-contain rounded-lg shadow-xl"/>
  </div>
)}

    </div>
);
}
