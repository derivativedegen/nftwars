import React from "react";
import "./Warning.css";
import { useHistory } from "react-router-dom";

function Warning({ appChain, userChain }) {
  const history = useHistory();

  return (
    <div className="warningBanner pt-0 mt-0 d-flex justify-content-center">
      <h4
        className="textblack textbold warningtext"
        onClick={() => {
          history.push("/network");
        }}
      >
        Your Wallet Network doesn't match the App Network.
      </h4>
    </div>
  );
}

export default Warning;
