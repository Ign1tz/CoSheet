import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Spreadsheet from "./pages/Spreadsheet";
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import SpreadsheetPage from "./pages/SpreadsheetPage";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/spreadsheet' element={<SpreadsheetPage/>}></Route>
                    <Route path='/spreadsheet' element={<Spreadsheet/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/signup' element={<Signup/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
