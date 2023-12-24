import "../Style/card.css"





export default function Card(props) {
    return (
        <div className="card">
            <div className="card-details">
                <p className="text-title">{props.title}</p>
            </div>
            <button className="card-button">Show</button>
        </div>
    )
}



