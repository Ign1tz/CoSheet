import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Navigate, PublicHomePage} from "react-router-dom";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import Spreadsheet from "./pages/Spreadsheet";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ProfileSettings from "./pages/ProfileSettings";


export default function App() {
    const [data, setData] = useState([{}])
    const [loggedIn, setLoggedIn] = useState()
    let username
    if (typeof username === "undefined") {
        let test = () => {
            fetch("http://localhost:5000/getUser").then((data) => data.json()).then((data) => {
                username = data.username
                setLoggedIn(username !== "noone") // ToDo: change to !==
            })
        }
        test()
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/dashboard' element={loggedIn ? <Dashboard/> : <Navigate to="/login"/>}></Route>
                    <Route path='/spreadsheet' element={<Spreadsheet/>}></Route>
                    <Route path='/login'
                           element={loggedIn ? <Navigate to="/dashboard" replace={true}/> : <Login/>}></Route>
                    <Route path='/signup'
                           element={loggedIn ? <Navigate to="/dashboard" replace={true}/> : <Signup/>}></Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/ProfileSettings" element={<ProfileSettings/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
