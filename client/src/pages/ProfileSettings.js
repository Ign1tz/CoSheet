import '../Style/ProfileSettings.css'
import {useState} from "react";
export default function ProfileSettings() {
    const [data, setData] = useState([{}]);
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    function handleProfileSettings(){
        const data = {"username": userName, "password": password, "profile_picture": profile_picture, "email": email};

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

            }
            response();
        } catch (error) {
            console.error("Something went wrong.", error)
        }
    }
    function logout() {
            alert('Logout successful!');

    }
    function saveChanges() {
        alert('Save changes successful!');
    }

    function GoBack() {
        alert('Go Back.');
    }
    return (
        <div className="container">
            <h1>Profile Settings</h1>
            <form action="#" method="post">
                <h2>username</h2>
                <input type="text" id="username" name="username" placeholder="Username" required/>
                <h2>e-mail</h2>
                <input type="email" id="email" name="email" placeholder="Email" required/>
                <h2>password</h2>
                <input type="password" id="password" name="password" placeholder="Password" required/>

                <button className="saveChanges" onClick={saveChanges}>
                    Save Changes
                </button>
                <button className="GoBack" onClick={GoBack}>
                    Go Back
                </button>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </form>
        </div>
    )
}