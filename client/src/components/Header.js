import "../Style/header.css"
import {useEffect, useState} from "react";
import defaultProfilePicture from "./profilepicture-menews.png"
import CoSheetLogo from "./CoSheet logo idea cropped.png"
import {Link} from "react-router-dom";


export default function Header(props) {
    const [data, setData] = useState([{}])
    const [profilePicture, setProfilePicture] = useState()
    if (typeof data.username === "undefined"){
        fetch("http://localhost:5000/getUser").then(res => res.json()).then(data => {
            setData(data)
        })
        fetch("http://localhost:5000/getProfilePicture").then(res => res.json()).then(returnedData => {setProfilePicture(<img className={"profilePicture"} src={"data:image/jpeg;base64," + returnedData.profilePicture.slice(2,-1)}  alt={"profliePicture"}/>); console.log(returnedData.profilePicture.slice(2,-1))})
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
                    <p className={"userName"}>{data.username}</p>
                </button>
            </div>
        </div>
    )
}
