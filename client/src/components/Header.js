import "../Style/header.css"
import {useEffect, useState} from "react";


export default function Header(props) {
    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/getUser").then(res => res.json()).then(data => {
            setData(data)
            //console.log(data)
        })
    }, []);

    console.log(data)
    return (
        <div className="header">
            <div className="CoSheet">
                <div className="logo"></div>
                <div className="title">CoSheet</div>
            </div>
            <div className="profile">
                <div className="picture"></div>
                <div className="username">{data.username}</div>
            </div>
        </div>
    )
}
