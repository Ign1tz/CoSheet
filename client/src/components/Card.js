import "../Style/card.css"
import {Trash} from "react-bootstrap-icons"
import {Link} from "react-router-dom";



export default function Card(props) {


    async function deleteCard() {
            await fetch("http://localhost:5000/deleteSpreadsheet", {
                    method: 'POST',
                    body: JSON.stringify({"link": props.link}),
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                });
            window.location.reload()
    }
    return (
        //<Link to={props.link}>
        <div className="card">
            <div className="card-details">
                <p className="text-title">{props.title}</p>
                    <Trash className="can" onClick={deleteCard}>
                    </Trash>
            </div>
            <button className="card-button">Show</button>
        </div>
        //</Link>
    )
}



