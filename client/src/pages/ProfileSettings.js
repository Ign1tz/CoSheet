import '../Style/ProfileSettings.css'
import {useState} from "react";
export default function ProfileSettings() {
    const [data, setData] = useState([{}]);
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const[profile_picture, setProfilePicture] = useState('');
    function handleProfileSettings(){
        const data = {"username": userName, "password": password, "confirm_password": confirm_password,
            "profile_picture": profile_picture, "email": email};

        try {
            const response = async () => {
                const request = await fetch("http://localhost:5000/profileSettings", {
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
                <h3>username {userName}</h3>
                <input type="text" id="username" name="username" placeholder="New username" required value={userName}
                       onChange={(e) => setUserName(e.target.value)}/>
                <h3>e-mail {userName}</h3>
                <input type="email" id="email" name="email" placeholder="New email" required value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <h3>password {password}</h3>
                <input type="password" id="password" name="password" placeholder="New password" required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <input type="confirm_password" id="confirm_password" name="confirm_password" placeholder="Confirm new password"
                       required value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <h3>profile picture</h3>

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