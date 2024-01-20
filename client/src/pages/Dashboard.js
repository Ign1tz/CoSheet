import React, {useState, useEffect} from 'react'
import Card from "../components/Card"
import "../Style/card.css"
import AddNewCard from "../components/AddNewCard";
import Header from "../components/Header"
import Home from "./Home"
import Cookies from "universal-cookie";

export default function Dashboard() {
    const [data, setData] = useState([{}])

    let cookie = new Cookies()
    if (typeof data.titles === "undefined"){
        fetch("http://localhost:5000/get-spreadsheet-titles/" + cookie.get("username")).then(res => res.json()).then(data => {
            setData(data)
            //console.log(data)
        })
    }
    //console.log(data)

    let cards=[]
    if (typeof data.titles === "undefined") {
        //cards = <p>aaaaa</p>
    }else {
        for (let i = 0; i < data.titles.length; i++) {
            cards.push(<Card title={data.titles[i]} link={data.links[i]} />)
        }
    }
    //console.log(cards)
    return (
        <section>
            <Header />
            {cards}
            <AddNewCard />
        </section>
    )
}
/*{(typeof data.titles === "undefined") ? (
                <p>No titles</p>
            ) : (
                data.titles.map(i => (
                    <Card title={i}/>
                ))
            )}*/