import React from "react";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie"

export default function AddNewCard(props) {
    let cookie = new Cookies()

    async function newSpreadsheet() {
        try {
            let response = await fetch("http://localhost:5000/createnewspreadsheet/" + cookie.get("username"))
            let result = await response.json()
            console.log(result)
            window.location.href = result
        } catch {

        }
    }

    return (
        <div className="card" onClick={newSpreadsheet}>
            <div className="card-details">
                <h1>+</h1>
            </div>
        </div>
    )
}