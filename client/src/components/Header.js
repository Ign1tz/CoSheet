import "../Style/header.css"
import {useEffect, useState} from "react";
import defaultSpreadsheet from "./profilepicture-menews.png"
import {Link} from "react-router-dom";


export default function Header(props) {
    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/getUser").then(res => res.json()).then(data => {
            setData(data)
            //console.log(data)
        })
    }, []);
    console.log(data)

    let image = defaultSpreadsheet
    let username = "     "
    if (data.username)
    return (
        <div className="header">
            <div className="CoSheet">
                <div className="logo"></div>
                <div className="title">CoSheet</div>
            </div>
            <div className="profile">
                <button className={"settingsBtn"} type={"button"}>
                    <img className={"profilePicture"} src={image}  alt={"profliePicture"}/>
                    <p className={"userName"}>{data.username}</p>
                </button>
            </div>
        </div>
    )
}
