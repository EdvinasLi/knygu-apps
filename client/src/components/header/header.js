import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
const Header = (props) => {
  const loggedIn = props.loggedIn;
  const [showHeader, setShowHeader] = useState(true);
  //const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" ? setShowHeader(false) : setShowHeader(true);
  }, [location]);

  return (
    showHeader && (
      <>
        <div className="mainDiv">
          <div className="header">
            <div className="right">
              <div className="logo">Edvinuko Knygynas</div>
            </div>
            <div className="left">
              <ul className="linksContainer">
                {loggedIn ? (
                  <>
                    <Link to="/home">
                      <li className="linkItem">Pagrindinis</li>
                    </Link>

                    <Link to="/logout">
                      <li className="linkItem">Atsijungti</li>
                    </Link>
                    <Link to="/new-post">
                      <li className="linkItem">Naujas irasas</li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <li className="linkItem">Registruotis</li>
                    </Link>
                    <Link to="/login">
                      <li className="linkItem">Prisijungti</li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Header;
