import '../Style/ProfileSettings.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

export default function ProfileSettings() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [profile_picture, setProfilePicture] = useState('');
    const [picture, setPicture] = useState();
    let history = useNavigate();
    const cookie = new Cookies()

    if (typeof userName === 'undefined' || typeof email === 'undefined') {
        fetch("http://localhost:5000/getUsernameEmail/"+ cookie.get("username")).then(res => res.json().then(return_data => {setUserName(return_data.username);
        setEmail(return_data.email); setPicture(<img className={"img"}  src={"data:image/jpeg;base64," + return_data.profile_picture} alt={"Something went wrong"}></img>); }))

    }


    function handleProfileSettings() {
        const data = {
            "username": userName, "password": password, "confirm_password": confirm_password,
            "profile_picture": profile_picture, "email": email, "newPassword": newPassword};

        try {
            const response = async () => {
                const request = await fetch("http://localhost:5000/profileSettings/" + cookie.get("username"), {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                })
                let result = await request.json()
                if (typeof result.username !== "undefined") {
                    cookie.set("username", result.username)
                }
            }
            response();
        } catch (error) {
            console.error("Something went wrong.", error)
        }

    }

    function logout() {
        cookie.remove("username", { path: "/"})
        //fetch
        window.location.href = '/'
    }

    function handleImage(e) {
        //console.log(e)
        let reader = new FileReader()
        reader.onloadend = function(){
            let convertedimg = reader.result.split(',')[1]
            setProfilePicture(convertedimg)
            //console.log(convertedimg)
            setPicture(<img className={"img"} src={"data:image/jpeg;base64," + convertedimg}
                        alt={"Something went wrong"}></img>)
        }
        //console.log(e.target.files[0])
        reader.readAsDataURL(e.target.files[0])

    }

//ToDo: after combining all sides, go back to dashboard instead of history-1 bei goback button
    return (
        <div className="container_profile">
            <h1 className={"h1-profile"}>Profile Settings</h1>

                <h3 className={"h3-profile"} >username</h3>
                <input type="text" id="username" name="username" placeholder={userName} value={userName}
                       onChange={(e) => setUserName(e.target.value)}/>

                <h3>email</h3>
                <input type="email" id="email" name="email" placeholder={email}  value={email}
                       onChange={(e) => setEmail(e.target.value)}/>

                <h3>password</h3>
                <input type="password" id="current_password" name="confirm_password"
                       placeholder="Enter your current password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>

                <input type="password" id="new_password" name="password" placeholder="New password"
                       value={newPassword}
                       onChange={(e) => setNewPassword(e.target.value)}/>

                <input type="password" id="confirm_password" name="confirm_password"
                       placeholder="Confirm new password"
                        value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)}/>

                <h3>profile picture</h3>
                {picture}
                <input  className={"profile_input"} type={"file"} accept={"image/png, image/gif, image/jpeg"} name={"file"} onChange={handleImage}/>
                <button className="button saveChanges" onClick={handleProfileSettings}>
                    Save Changes
                </button>

                <button className="button GoBack" onClick={() => history(-1)}>
                    Go Back
                </button>
                <button className="button logout-btn" onClick={logout}>
                    Logout
                </button>

        </div>
    )
}