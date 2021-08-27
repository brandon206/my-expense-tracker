import "./App.scss";
import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/register", {
        name: username,
        status: "active",
        role: "user",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default App;
