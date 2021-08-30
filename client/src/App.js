import "./App.scss";
import { ChakraProvider } from "@chakra-ui/react"
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './components/Navbar';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import metTheme from './styles/theme';

function App() {
  return (
    <ChakraProvider theme={metTheme}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
