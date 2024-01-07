import React from "react";
import {Link} from "react-router-dom";

export default function AddNewCard(props) {
    return (
        <Link to={"/spreadsheet"}>
            <div className="card">
                <div className="card-details">
                    <h1>+</h1>
                </div>
            </div>
        </Link>
    )
}