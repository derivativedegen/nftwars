import React from "react";
import "./headerSocial.css";
import logo from "../images/logo.png";

const HeaderSocial = () => {
  return (
    <div className="avatar-container">
      <div className="row justify-content-center mt-0">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="socialicons d-flex justify-content-center justify-content-around pt-2">
        <a
          href="https://twitter.com/nftwars"
          target="_blank"
          rel="noreferrer"
          className="socialicon"
        >
          <span className="icon-twitter"></span>
        </a>
        <a
          href="https://t.me/NFTWars"
          target="_blank"
          rel="noreferrer"
          className="socialicon"
        >
          <span className="icon-telegram"></span>
        </a>
        <a
          href="https://nftwars.medium.com/"
          target="_blank"
          rel="noreferrer"
          className="socialicon"
        >
          <span className="icon-medium"></span>
        </a>
      </div>
    </div>
  );
};

export default HeaderSocial;
