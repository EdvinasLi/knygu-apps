import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
