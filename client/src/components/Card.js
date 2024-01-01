import "../Style/card.css"
import {Trash} from "react-bootstrap-icons"



export default function Card(props) {


    function deleteCard() {
        console.log(props.title)
        const delCard = async () => {
            const req = await fetch("http://localhost:5000/deleteCard")
        }
    }
    return (
        <div className="card">
            <div className="card-details">
                <p className="text-title">{props.title}</p>
                    <Trash className="can" onClick={deleteCard}>
                    </Trash>
            </div>
            <button className="card-button">Show</button>
        </div>
    )
}



