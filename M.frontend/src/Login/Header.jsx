import React from "react";

export default function Header(){
    return(
        <header className="bg-gradient-to-r from-orange-300 to-blue-500 text-black shadow-xl">
            <div className="mx-auto px-10 py-4 flex justify-between items-center">
                <div className="text-3xl font-bold">MoodBoard</div>

                <nav className="space-x-6">
                    <a href="/" className="hover:text-gray-200 mr-10 flex items-center gap-1">SAIR<span class="material-symbols-outlined">power_settings_new</span></a>
                </nav>
            </div>
        </header>
    )
}