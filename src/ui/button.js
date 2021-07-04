import React from "react";
import "./button.css";

const Button = ({ text, clickAction, buttonType }) => {
  return (
    <div>
      <button className={"btn textspaced " + buttonType} onClick={clickAction}>
        {text}
      </button>
    </div>
  );
};

export default Button;
