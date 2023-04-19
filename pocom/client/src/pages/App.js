import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route exact path="/" Component={Home}/>
        <Route exact path="/home" Component={Home}/>
        <Route exact path="/login" Component={Login}/>
        <Route exact path="/signup" Component={Signup}/>
        <Route exact path="/profile" Component={Profile}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
