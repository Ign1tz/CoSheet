import "../Style/card.css"
import {Trash} from "react-bootstrap-icons"
import {Link} from "react-router-dom";



export default function Card(props) {


    function deleteCard() {
        console.log(props.title)
        const delCard = async () => {
            const req = await fetch("http://localhost:5000/deleteCard")
        }
    }
    return (
        //<Link to={spreadsheet}>
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



