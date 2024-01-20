import "../Style/header.css"
import {useEffect, useState} from "react";
import defaultProfilePicture from "./profilepicture-menews.png"
import CoSheetLogo from "./CoSheet logo idea cropped.png"
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";


export default function Header(props) {
    const [data, setData] = useState([{}])
    const [profilePicture, setProfilePicture] = useState()
    let cookie = new Cookies()
    if (typeof data.username === "undefined") {
        setData({username: cookie.get("username")})
        fetch("http://localhost:5000/getProfilePicture/" + cookie.get("username")).then(res => res.json()).then(returnedData => {
            setProfilePicture(<img className={"profilePicture"}
                                   src={"data:image/jpeg;base64," + returnedData.profile_picture}
                                   alt={"profliePicture"}/>);
        })
    }
    //console.log(data)


    return (
        <div className="header">
            <div className="CoSheet">
                <img className={"CoSheetLogo"} src={CoSheetLogo} alt={"profliePicture"}/>
                <p className={"Title"}>CoSheet</p>
            </div>
            <div className="profile">
                <button className={"settingsBtn"} type={"button"}>
                    {profilePicture}
                    <Link to="/ProfileSettings">
                        <p className={"userName"}>{data.username}</p>
                    </Link>
                </button>
            </div>
        </div>
    )
}
