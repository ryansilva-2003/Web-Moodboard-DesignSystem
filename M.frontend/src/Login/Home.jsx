import { useState  } from "react";
import Header from "./Header";
import NewBoard from "./NewBoard";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        "http://localhost:4000/users/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUser(response.data);
    }

    fetchUser();
  }, []);

  if(!user) return null;

    return(
        <div className="w-screen min-h-screen bg-[#2b2b2b] flex flex-col">
            <Header user={user} setUser={setUser} />

            <div className="flex flex-col items-center mt-20">
                <img src={user.icon ? `http://localhost:4000/uploads/${user.icon}` : "./img/usuarioImage.jpg"} className="w-40 h-40 rounded-full border-2 border-gray-400 object-cover"/>

                <span className="mt-4 text-3xl font-semibold text-white">{user.name}</span>
                <label className="mt-7 text-lg font-semibold text-[#aaaaaa] max-w-3xl mx-auto line-clamp-3">{user.bio}</label>

                  <hr className="border-t border-gray-400 w-1/2 mt-4" />
            </div>
            <NewBoard/>
        </div>
    );
}