import React from "react";
import "./footer.css";
import Button from "../ui/button";

function footer() {
  return (
    <div className="footer d-flex justify-content-center align-items-end">
      <div className="headerbox">
        <Button text="Menu" buttonType="btn-retro" />
      </div>
    </div>
  );
}

export default footer;
