import "./Signup.css"
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";



export default function Signup() {
    const [data, setData] = useState([{}]);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://localhost:5000/signup", {
                        method: 'POST',
                        body: FormData,
                    });

                    const result = await response.json();

                    setData(result);
                } catch (error) {
                    console.error("Something went wrong.", error)
                }
            }
        }, []);

    function handleSubmit(e) {
        e.preventDefault()
        const form = e.target
        const FormData = new FormData(form)

        /* useEffect(() => {
            fetch("http://localhost:5000/signup", {method: "POST", body: FormData}
            )
        })*/
        if (!handlePasswordEqual()){
            return;
        }

        if (!handlePasswordRules()){
            return;
        }

        if (!handleUsernameRules()){
            return;
        }
    }

    function handlePasswordEqual() {
        if (password === password2) {
            return true;
        } else {
            return alert("Passwords do not match");
        }
    }

    function handlePasswordRules() {
        const min_length = 8;
        const max_length = 40;
        const allowed_characters = new RegExp('a-zA-Z0-9%_/.]*$')

        if (!password){
            return alert("Please enter a password.");
        }
        else if (password.length >= min_length && password.length <= max_length) {
                if (allowed_characters.includes(password)) {
                    return true;
                } else {
                    return alert("You used an unsupported character.")
                }
        } else if (password.length < min_length) {
            return alert("The password has to be at least 8 characters long.");
        }
        else{
            return alert("The password can only be a maximum of 40 characters long.");
        }
    }

    function handleUsernameRules(username){
        if (!username){
            return alert("Please enter a username.");
        }
        else if (username.length >= 1 && username.length <= 30){
            return true;
        } else if (username.length > 30){
            return alert("The username can only be short than 30 characters.");
        }
    }


    return (
        <form action="#" method="post">
            <div className="form-box">
                <form className="form" onSubmit={handleSubmit}>
                    <span className="title">Sign up</span>
                    <span className="subtitle">Create a free account with your email.</span>
                    <div className="form-container">
                        <input type="text" className="input" name="username" placeholder="Username" required value={userName}
                        onChange={(e) => setUserName(e.target.value)}/>
                        <input type="email" className="input" name="email" placeholder="Email" required/>
                        <input type="password" className="input" name="password" placeholder="Password"
                               required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" className="input" name="password2" placeholder="Confirm Password"
                               required value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                    </div>
                    <button onClick={() => {handlePasswordEqual(); handlePasswordRules()}}>Sign up</button>
                </form>
                <div className="form-section">
                    <p>Have an account? <Link to="http://localhost:3000/login">Login</Link></p>
                </div>
            </div>
        </form>
    )
};

