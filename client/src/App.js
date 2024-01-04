import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SpreadsheetPage from "./pages/SpreadsheetPage";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/spreadsheet' element={<SpreadsheetPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
