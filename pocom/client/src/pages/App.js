import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Community from "./Community";
import NotFoundPage from "./NotFoundPage";
import withAuth from "../hocs/withAuth";
import CreateCommunity from "./CreateCommunity";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/home" Component={Home} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/signup" Component={Signup} />
        <Route exact path="/community" Component={Community} />
        <Route exact path="/profile" Component={withAuth(Profile)} />
        <Route exact path="/CreateCommunity" Component={withAuth(CreateCommunity)} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
