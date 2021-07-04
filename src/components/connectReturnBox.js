import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../ui/button";
import "./connectReturnBox.css";

const ConnectReturnBox = () => {
  const history = useHistory();

  return (
    <div className="gameinfo pt-2 pb-1">
      <div className="text-center">
        <div className="row justify-content-center">
          <Button
            text="Menu"
            clickAction={() => history.push("/menu")}
            buttonType={"btn-retro"}
          />
          <Button
            text="Connect"
            clickAction={() => history.push("/")}
            buttonType={"btn-retro"}
          />
        </div>
        <hr className="navbreak" />
      </div>
    </div>
  );
};

export default ConnectReturnBox;
