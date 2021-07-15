import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectTesting } from "../redux/network";
import "./menu.css";

const Menu = ({ logoutOfWeb3Modal }) => {
  const history = useHistory();
  const testing = useSelector(selectTesting);

  const disconnect = async () => {
    //window.location = "/";
    logoutOfWeb3Modal();
    history.push("/");
  };

  return (
    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
      <div className="menubox justify-content-center shadow-lg mb-5">
        <h2 class="textred textspaced bomberescortfill">
          <u>Main Menu</u>
        </h2>

        <ul className="navbar-nav">
          {testing ? (
            <li
              className="nav-item textspaced"
              onClick={() => history.push("/game")}
            >
              Play
            </li>
          ) : null}
          <li
            className="nav-item textspaced"
            onClick={() => history.push("/about")}
          >
            About
          </li>

          <li
            className="nav-item textspaced"
            onClick={() => history.push("/stake")}
          >
            Stake
          </li>
          <li
            className="nav-item textspaced"
            onClick={() => history.push("/stats")}
          >
            Contracts
          </li>
          <li
            className="nav-item textspaced"
            onClick={() => history.push("/trade")}
          >
            Buy WAR
          </li>
          <li
            className="nav-item textspaced"
            onClick={() => history.push("/addliquidity")}
          >
            Add LP
          </li>
          <li
            className="nav-item textspaced"
            onClick={() => history.push("/social")}
          >
            Social
          </li>

          <hr className="navbreak" />
          <li
            className="nav-item textspaced bomberescortfill"
            onClick={() => disconnect()}
          >
            Restart
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
