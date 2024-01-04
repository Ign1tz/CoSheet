import '../Style/Login.css'
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Login() {

    const [data, setData] = useState([{}]);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleLogin(e) {
        e.preventDefault()

        const data = {"password": password, "email": email};
        try {
            const response = async () => {
                const request = await fetch("http://localhost:5000/login", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                });

                const result = await request.json();

                setData(result);

            }
            response();
        } catch (error) {
            console.error("Something went wrong.", error)
            //let password_empty = document.getElementById("password")
            //password_empty = " "
            setPassword('')
        }
    }


    return (
        <div className="container">
            <div className="heading">Login</div>
            <form action="" className="form">
                <input required="" className="input" type="email" name="email" id="email"
                       placeholder="e-mail or username"
                       onChange={(e) => setEmail(e.target.value)}/>
                <input required="" className="input" type="password" name="password" id="password"
                       placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <span className="forgot-password"><Link
                    to="http://localhost:3000/signup">Don't have an account yet?</Link></span>
                <input className="login-button" type="submit" value="Login" onClick={handleLogin} redir/>
            </form>
        </div>
    )
};
