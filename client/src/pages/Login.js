import '../Style/Login.css'
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Login() {

const [data, setData] = useState([{}]);
const [password, setPassword] = useState('');
const [userName, setUserName] = useState('');
const [email, setEmail] = useState('');

useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://localhost:5000/login", {
                        method: 'GET',
                        body: FormData,
                    });

                    const result = await response.json();

                    setData(result);
                } catch (error) {
                    console.error("Something went wrong.", error)
                }
            }
        }, []);


    return (
        <div className="container">
            <div className="heading">Login</div>
            <form action="" className="form">
                <input required="" className="input" type="email" name="emailorusername" id="emailorusername" placeholder="e-mail or username"
                onChange={(e) => setUserName(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}/>
                <input required="" className="input" type="password" name="password" id="password"
                placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <span className="forgot-password"><Link to="http://localhost:3000/signup">Don't have an account yet?</Link></span>
                <input className="login-button" type="submit" value="Login"/>
            </form>
        </div>
    )
}
