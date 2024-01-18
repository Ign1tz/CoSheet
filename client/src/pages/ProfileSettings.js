import '../Style/ProfileSettings.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./default.png"
import axios from "axios";

export default function ProfileSettings() {
    const [data, setData] = useState([{}]);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const[profile_picture, setProfilePicture] = useState('');
    let history = useNavigate();
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
            window.location.href = '/'
    }

    function handleImage(e){
        console.log(e.target.file)
        setProfilePicture(e.targeat.file[0])
    }


    function handledisplay(){
        const formData = new FormData()
        formData.append('profile_picture', profile_picture)
        axios.post("url", formData).then((res) => {
            console.log(res)
        })
    }

    return (
        <div className="container">
            <h1>Profile Settings</h1>
            <form action="#" method="post">
                <h3>username</h3>
                <input type="text" id="username" name="username" placeholder={userName} required value={userName}
                       onChange={(e) => setUserName(e.target.value)}/>

                <h3>email</h3>
                <input type="email" id="email" name="email" placeholder={email} required value={email}
                       onChange={(e) => setEmail(e.target.value)}/>

                <h3>password {password}</h3>
                <input type="password" id="current_password" name="confirm_password"
                       placeholder="Enter your current password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

                <input type="password" id="new_password" name="password" placeholder="New password" required
                       value={newPassword}
                       onChange={(e) => setNewPassword(e.target.value)}/>

                <input type="password" id="confirm_password" name="confirm_password"
                       placeholder="Confirm new password"
                       required value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)}/>

                <h3>profile picture</h3>
                <input type={"file"} name={"file"} onChange={handleImage}/>
                <button className="saveChanges" onClick={handledisplay}>
                    Save Changes
                </button>
                <button className="GoBack" onClick={() => history(-1)}>
                    Go Back
                </button>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </form>
        </div>
    )
}