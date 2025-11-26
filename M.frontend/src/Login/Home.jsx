import { useState  } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import NewBoard from "./NewBoard";

export default function Home() {
    const [IsModalOPen, setIsModalOPen] = useState(false);
    const [bio, setBio] = useState("");

    return(
        <div className="w-screen h-screen bg-[#2b2b2b] flex flex-col">
            <Header/>
            <div className="flex flex-col items-center mt-20">
                <img src="./img/icon.jpg" alt="icone" className="w-24 h-24 rounded-full border-2 border-gray-400" ></img>

                <span className="mt-2 text-lg font-semibold text-white">Ryan Silva</span>
                <label className="mt-5 text-lg font-semibold text-white">mexendo com programação 👾</label>

                  <hr className="border-t border-gray-400 w-1/2 mt-4" />
            </div>
            <NewBoard/>
        </div>
    );
}