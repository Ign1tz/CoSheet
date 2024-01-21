import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Navigate, PublicHomePage} from "react-router-dom";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ProfileSettings from "./pages/ProfileSettings";
import SpreadsheetPage from "./pages/SpreadsheetPage";
import Cookies from "universal-cookie"

export default function App() {
    let cookie = new Cookies()
    const [loggedIn, setLoggedIn] = useState()
    if (typeof loggedIn === "undefined") {
        setLoggedIn((typeof cookie.get("username") !== "undefined"))
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/dashboard' element={loggedIn ? <Dashboard/> : <Navigate to="/login"/>}></Route>
                    <Route path='/login'
                           element={loggedIn ? <Navigate to="/dashboard" replace={true}/> : <Login/>}></Route>
                    <Route path='/signup'
                           element={loggedIn ? <Navigate to="/dashboard" replace={true}/> : <Signup/>}></Route>
                    <Route path="/ProfileSettings" element={loggedIn ? <ProfileSettings/> : <Navigate to="/login"/>}/>
                    <Route path='/spreadsheet/*' element={<SpreadsheetPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
