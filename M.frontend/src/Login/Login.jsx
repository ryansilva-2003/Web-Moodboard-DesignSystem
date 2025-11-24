import { useState } from "react";

import "./Login.css";

const Login = () => {
    const [username, serusername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('teste', username, password);
        console.log("Envio");

        alert("Enviando dados de Login:" + username + " - " + password);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Bem Vindo ao MoodBoard</h1>
                <div>
                <input type = "email" placeholder='E-mail' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                <input type = "password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox"/>
                        Lembre de mim
                    </label>
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <button>Entrar</button>

                <div className="sign-btn">
                    <button>Registrar</button>
                </div>
            </form>
        </div>
    )
};

export default Login;