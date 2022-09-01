import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Confirm from "./pages/confirm.js";
import Header from "./components/header/header";
import Home from "./pages/home";
import Underage from "./pages/underage";
import Login from "./pages/login";
import NewPost from "./pages/newpost";
import Register from "./pages/register";
import Logout from "./pages/logout";

import EditPost from "./pages/EditPost";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn}></Header>
      <Routes>
        <Route path="/" element={<Confirm />} />
        <Route path="/home" element={<Home loggedIn={loggedIn} />} />
        <Route path="/underage" element={<Underage />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />

        {loggedIn && (
          <>
            <Route path="/edit/:id" element={<EditPost />} />

            <Route path="/new-post" element={<NewPost />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
