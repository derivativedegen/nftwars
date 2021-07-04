import React from "react";
import "./networkCard.css";

const NetworkCard = ({ name, img, onClick, network }) => {
  const networkClass = () => {
    if (name == network) {
      return "networkselected";
    } else {
      return "networkcard";
    }
  };

  return (
    <div className="row justify-content-center pt-1 pb-1">
      <div className={networkClass()} onClick={onClick}>
        <img src={img} className="networkpicture" alt="network logo" />
        <h3 className="textwhite textspaced pt-3">{name}</h3>
      </div>
    </div>
  );
};

export default NetworkCard;
