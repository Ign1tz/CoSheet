import "../Style/card.css"
import {Trash} from "react-bootstrap-icons"
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";


export default function Card(props) {

    let cookie = new Cookies()

    async function deleteCard(event) {
        event.stopPropagation()
        await fetch("http://localhost:5000/deleteSpreadsheet/" + cookie.get("username"), {
            method: 'POST',
            body: JSON.stringify({"link": props.link}),
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        });
        window.location.reload()
    }

    function relocate() {
        window.location.href = props.link
    }

    return (

        <div className="card" onClick={relocate}>
            <div className="card-details">
                <p className="text-title">{props.title}</p>
                <Trash className="can" onClick={deleteCard}>
                </Trash>

            </div>
            <button className="card-button">Show</button>
        </div>
    )
}



