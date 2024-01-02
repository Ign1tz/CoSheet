import './Spreadsheet.css'
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Spreadsheet() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/spreadsheet", {
                    method: 'GET',
                    body: FormData,
                });
                const result = await response.json();

                setData(result);
            }
            catch (error) {
                console.error("Error in Spreadsheet.", error)
            }
        }
    }, []);

    return (
        <div className="container">
            <p className="test">test</p>
        </div>
    )
}