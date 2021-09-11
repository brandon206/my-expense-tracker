// import "./App.scss";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBarNew from "./components/Navbar-new";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBarNew />
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
