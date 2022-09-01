import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = (props) => {
  const navigate = useNavigate();
  const { setLoggedIn } = props;
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });
  useEffect(() => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        localStorage.clear();
        setLoggedIn(false);
        setAlert({ message: res.data, status: "success" });
        setTimeout(() => navigate("/home"), 1000);
      })
      .catch((err) => {
        setAlert({ message: err.message, status: "danger" });
      });
  }, [navigate]);
  return (
    alert.message && (
      <div className="container">
        <div className={"alert alert-" + alert.status}>{alert.message}</div>
      </div>
    )
  );
};
export default Logout;
