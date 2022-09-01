import React from "react";
import "./confirm.css";
import { Link } from "react-router-dom";

const Confirm = () => {
  return (
    <div className="enter">
      <div className="linkConfirm">
        <Link className="link1" to="/home">
          Man Yra 18 metu
        </Link>
        <Link className="link" to="/underage">
          Mane nera 18 metu
        </Link>
      </div>
    </div>
  );
};

export default Confirm;
