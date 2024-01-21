import React, {useState} from 'react'
import Card from "../components/Card"
import "../Style/card.css"
import AddNewCard from "../components/AddNewCard";
import Header from "../components/Header"
import Cookies from "universal-cookie";

export default function Dashboard() {
    const [data, setData] = useState([{}])
    const [reqested, setReqested] = useState(false)

    let cookie = new Cookies()
    if (typeof data.titles === "undefined" && !reqested) {
        fetch("http://localhost:5000/get-spreadsheet-titles/" + cookie.get("username")).then(res => res.json()).then(data => {
            setData(data)
            setReqested(true)
            //console.log(data)
        })
    }

    let cards = []
    if (typeof data.titles === "undefined") {
    } else {
        for (let i = 0; i < data.titles.length; i++) {
            cards.push(<Card key={i} title={data.titles[i]} link={data.links[i]}/>)
        }
    }
    return (
        <section>
            <Header/>
            {cards}
            <AddNewCard/>
        </section>
    )
}