import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import Spreadsheet from "./pages/Spreadsheet";
import Login from "./pages/Login"
import Signup from "./pages/Signup"


export default function App() {
    const [data, setData] = useState([{}])



    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/Dashboard" element=<Dashboard/>/>
                    <Route path='/spreadsheet' element={<Spreadsheet/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/signup' element={<Signup/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
