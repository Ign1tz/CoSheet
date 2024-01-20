import "../Style/Signup.css"
import React, {useEffect, useState} from "react";
import {json, Link} from "react-router-dom";


export default function Signup() {
    const [data, setData] = useState([{}]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

//keine function für email vorhanden


    function handleSubmit(e) {
        e.preventDefault()

        if (!handlePasswordEqual()) {
            return;
        }
        if (!handlePasswordRules()) {
            return;
        }
        if (!handleUsernameRules()) {
            return;
        }

        const data = {"username": userName, "password": password, "confirm_password": confirmPassword, "email": email};

        try {
            const response = async () => {
                const request = await fetch("http://localhost:5000/signup", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                });

                const result = await request.json();

                setData(result);
                return result;

            }
            response().then(res => {
                if (typeof res.error !== 'undefined') {
                    if (res.error === "abusiv"){
                        window.alert("Your username was flagged as abusiv.\n Please choose a different one!")
                        setUserName("")
                    }
                    if (res.error === "username"){
                        window.alert("Your username already exists.\n Please choose a different one!")
                        setUserName("")
                    }
                    if (res.error === "email"){
                        window.alert("There is already an account registered with this email.\n Please choose a different one!")
                        setEmail("")
                    }
                }else{

                    //window.location.href = "http://localhost:3000/login";
                }})
        } catch (error) {
            console.error("Something went wrong.", error)
        }
    }

    function handlePasswordEqual() {

        if (password === confirmPassword) {
            return true;
        } else {
            return alert("Passwords do not match");
        }
    }

    function handlePasswordRules() {
        const min_length = 8;
        const max_length = 40;
        const allowed_characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%!?@#&"

        if (!password) {
            return alert("Please enter a password.");
        } else if (password.length >= min_length && password.length <= max_length) {
            for (let char of password) {
                if (!allowed_characters.includes(char)) {
                    return alert("You used an unsupported character.")
                }
            }
            return true;
        } else if (password.length < min_length) {
            return alert("The password has to be at least 8 characters long.");
        } else {
            return alert("The password can only be a maximum of 40 characters long.");
        }
        return true;
    }

    function handleUsernameRules() {
        //console.log(userName)
        const min = 1;
        const max = 30;
        const allowed_characters = "abcdefghijklmnopqrstuvwxyz1234567890_."

        if (!userName) {
            return alert("Please enter a username.");
        } else if (userName.length >= min && userName.length <= max) {
            for (let char of userName) {
                if (!allowed_characters.includes(char)) {
                    return alert("A character you chose in your username is not supported.");
                }
            }
            return true;
        } else if (userName.length > max) {
            return alert("The username has to be shorter than 30 characters.");
        }
        return true;
    }


    return (
        <form action="#" method="post">
            <div className="form-box">
                <form className="form" onSubmit={handleSubmit}>
                    <span className="title">Sign up</span>
                    <span className="subtitle">Create a free account with your email.</span>
                    <div className="form-container">
                        <input type="text" className="input" name="username" placeholder="Username" required
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}/>
                        <input type="email" className="input" name="email" placeholder="Email" required value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" className="input" name="password" placeholder="Password"
                               required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" className="input" name="password2" placeholder="Confirm Password"
                               required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <button className={"button"} onClick={handleSubmit}>Sign up</button>
                </form>
                <div className="form-section">
                    <p>Have an account? <Link to="http://localhost:3000/login">Login</Link></p>
                </div>
            </div>
        </form>
    )
};

