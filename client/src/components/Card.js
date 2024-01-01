import "../Style/card.css"
import {Trash} from "react-bootstrap-icons"


export default function Card(props) {
    return (
        <div className="card">
            <div className="card-details">
                <p className="text-title">{props.title}</p>
                    <Trash className="can">
                    </Trash>
            </div>
            <button className="card-button">Show</button>
        </div>
    )
}



