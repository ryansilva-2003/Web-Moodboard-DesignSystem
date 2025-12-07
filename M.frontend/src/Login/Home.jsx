import { useState  } from "react";
import Header from "./Header";
import NewBoard from "./NewBoard";
import { useEffect } from "react";

export default function Home() {
    const [bio, setBio] = useState("");
    const [user, setUser] = useState(null);
    const username = localStorage.getItem("username");

    useEffect(()=>{
        const savedUser = localStorage.getItem("user");
        if (savedUser){
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return(
        <div className="w-screen min-h-screen bg-[#2b2b2b] flex flex-col">
            <Header/>
            <div className="flex flex-col items-center mt-20">
                <img src="./img/eu.jpeg" alt="icone" className="w-30 h-30 rounded-full border-2 border-gray-400 object-cover" ></img>

                <span className="mt-4 text-2xl font-semibold text-white">{username}</span>
                <label className="mt-7 text-base font-semibold text-white">Mexendo com programação👨‍💻</label>

                  <hr className="border-t border-gray-400 w-1/2 mt-4" />
            </div>
            <NewBoard/>
        </div>
    );
}