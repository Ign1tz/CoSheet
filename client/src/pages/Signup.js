import "./Signup.css"
import React, {useEffect, useState} from "react";

export default function Signup() {
    const [data, setData] = useState([{}])

    function handleSubmit(e) {
        e.preventDefault()
        const form = e.target
        const FormData = new FormData(form)
        useEffect(() => {
            fetch("http://localhost:5000/signup", {method: "POST", body: FormData}
            )
        })
    }

    function handlePasswordEqual(password, password2) {
        if (password === password2) {
            return true
        } else {
            return "Passwords do not match"
        }
    }

    function handlePasswordRules(password) {
        const min_length = 8
        const max_length = 40
        const not_allowed_characters = ["(", ")", "[", "]", "|", "¬", "'", "¦", "§", "$", "^", "°", "&", "*", "~", "<", ">", ":", ";",
            "#", "_", "-", "+", "=", "@", ",", "%", "£", "."]
        if (password >= min_length && max_length <= 40) {
            if (not_allowed_characters instanceof password) {
                return true;
            } else {
                return "You are not allowed to use these characters: ()[]{}|¬'¦§$%&°^*~<>:;#_-+=@,%£.";
            }
        } else if (password < min_length) {
            return "The password has to be at least 8 characters long.";
        }
        else{
            return "The password can only be a maximum of 40 characters long.";
        }
    }

    return (
        <form action="#" method="post">
            <div className="form-box">
                <form className="form" onSubmit={handleSubmit}>
                    <span className="title">Sign up</span>
                    <span className="subtitle">Create a free account with your email.</span>
                    <div className="form-container">
                        <input type="text" className="input" name="username" placeholder="Username" required/>
                        <input type="email" className="input" name="email" placeholder="Email" required/>
                        <input type="password" className="input" name="password" placeholder="Password"
                               required="Password"/>
                        <input type="confirm" className="input" name="confirm" placeholder="Confirm Password" required/>
                    </div>
                    <button onClick={() => {handlePasswordEqual(); handlePasswordRules()}}>Sign up</button>
                </form>
                <div className="form-section">
                    <p>Have an account? <a href="">Log in</a></p>
                </div>
            </div>
        </form>
    )
};

