import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";


export default function App() {
    const [data, setData] = useState([{}])



    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/Dashboard" element=<Dashboard/>/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
