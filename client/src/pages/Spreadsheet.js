import './Spreadsheet.css'
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Spreadsheet() {

    const [data, setData]= useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/spreadsheet");
                const jsonData = await response.json();
                setData(jsonData);
            }
            catch (error) {
                console.error("Error in Spreadsheet.", error)
            }
        };


    }, []);

    return (
        <div className="container">
            <p className="test">test</p>
        </div>
    );
}