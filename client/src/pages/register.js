import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });
  const [user, setnewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleForm = (e) => {
    setnewUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const form = new FormData(e.target)

    // for(const key in postForm) {
    //     form.append(key, postForm[key])
    // }
    axios
      .post("/api/users/register", user)
      .then((resp) => {
        setAlert({ message: resp.data.message, status: "success" });
        setTimeout(() => navigate("/login"), 1000);
      })

      .catch((err) => setAlert({ message: err.message, status: "danger" }));
  };

  return (
    <>
      <div className="registerBody">
        <div className="registerForm">
          <div className="registerFormLeft">
            <h1>Registracija</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                placeholder="Vardas"
                name="first_name"
                onChange={(e) => handleForm(e)}
              />
              <input
                type="text"
                placeholder="Pavarde"
                name="last_name"
                onChange={(e) => handleForm(e)}
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={(e) => handleForm(e)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleForm(e)}
              />
              <input type="password" placeholder="Confirm Password" />
              <div>
                <label for="checkbox">Su taisyklemis susipazinau</label>
                <input type="checkbox" name="checkbox" />
              </div>
              <button>Registruotis</button>
            </form>
          </div>
          <div className="registerFormRight">
            <h1> Welcome to registration</h1>
            <p> If you already registered please go to </p>
            <Link className="loginLink" to="/login">
              Login
            </Link>
            <div className="container">
              <div className={"alert alert-" + alert.status}>
                {alert.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
