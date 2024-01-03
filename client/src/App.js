import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SpreadsheetSettings from "./pages/SpreadsheetSettings"

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/settings' element={<SpreadsheetSettings/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
