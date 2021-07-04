import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Web3Modal from "web3modal";
import "./start.css";

const Start = ({ onClick }) => {
  return (
    <div className="start d-flex justify-content-center alignt-items-center">
      <div className="col-10 col-md-6 col-xl-4">
        <Link to="/menu">
          <img src={logo} className="startimage" alt="start" />

          <p className="starttext blink_me textspaced bomberescortfill">
            START GAME
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Start;
