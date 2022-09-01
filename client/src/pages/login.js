import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = (props) => {
  const { setLoggedIn } = props;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/login/", form)
      .then((resp) => {
        localStorage.setItem("loggedin", true);
        setLoggedIn(true);

        setAlert({
          message: resp.data,
          status: "success",
        });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  };

  return (
    <div className="loginBody">
      <div className="loginForm">
        <div className="loginFormLeft">
          <h1>Welcome to login page</h1>
          <p>Jei nesate uzsiregistraves prasome uzsiregistruoti</p>
          <Link className="registerLink" to="/register">
            Registracija
          </Link>
        </div>
        <div className="loginFormRight">
          <h1> Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleForm}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleForm}
            />
            <button>Login</button>

            <div className="container">
              <div className={"alert alert-" + alert.status}>
                {alert.message}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
