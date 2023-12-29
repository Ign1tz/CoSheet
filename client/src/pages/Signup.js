import "./Signup.css"
import React, {useState, useEffect} from "react";

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
                    </div>
                    <button>Sign up</button>
                </form>
                <div className="form-section">
                    <p>Have an account? <a href="">Log in</a></p>
                </div>
            </div>
        </form>
    )
};

