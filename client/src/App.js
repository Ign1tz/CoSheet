import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Spreadsheet from "./pages/Spreadsheet";
import Login from "./pages/Login"


export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/spreadsheet' element={<Spreadsheet/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
