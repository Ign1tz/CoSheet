import "../Style/card.css"
import {Trash} from "react-bootstrap-icons"
import {Link} from "react-router-dom";



export default function Card(props) {


    function deleteCard() {
        console.log(props.title)
        /*const delCard = async () => {
            const req = await fetch("http://localhost:5000/deleteCard", {
                    method: 'DELETE',
                    body: JSON.stringify({"title": props.title}),
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                });
            const result = await req.json()

        }
        delCard()*/
        window.location.reload();
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



