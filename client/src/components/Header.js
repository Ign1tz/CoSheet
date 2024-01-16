import "../Style/header.css"
import {useEffect, useState} from "react";
import defaultProfilePicture from "./profilepicture-menews.png"
import CoSheetLogo from "./CoSheet logo idea cropped.png"
import {Link} from "react-router-dom";


export default function Header(props) {
    const [data, setData] = useState([{}])
    if (typeof data.username === "undefined"){
        fetch("http://localhost:5000/getUser").then(res => res.json()).then(data => {
            setData(data)
        })
    }
    //console.log(data)

    let profilePicture = defaultProfilePicture

    return (
        <div className="header">
            <div className="CoSheet">
                <img className={"CoSheetLogo"} src={CoSheetLogo} alt={"profliePicture"}/>
                <p className={"Title"}>CoSheet</p>
            </div>
            <div className="profile">
                <button className={"settingsBtn"} type={"button"}>
                    <img className={"profilePicture"} src={profilePicture}  alt={"profliePicture"}/>
                    <p className={"userName"}>{data.username}</p>
                </button>
            </div>
        </div>
    )
}
