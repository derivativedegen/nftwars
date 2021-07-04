import React from "react";
import "./socialCard.css";

function socialCard({ title, link, icon, description, description2 }) {
  return (
    <div className="col-9 col-lg-3 col-xs-12 socialbox text-center shadow-lg pt-5 mb-4 mr-3 ml-3">
      <h1 className="textred textspaced">{title}</h1>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="socialicon-large"
      >
        <span className={icon}></span>
      </a>
      <hr className="navbreak" />
      <p className="text-white raleway pt-4">
        {description}
        <br />
        {description2}
      </p>
    </div>
  );
}

export default socialCard;
