import React, { useState, useEffect } from "react";
import "./playerInfo.css";

const PlayerInfo = ({
  address,
  warBalance,
  fightBalance,
  lpTokenBalance,
  chooseExplorer,
}) => {
  let playerAddress = "Sign In";
  const openExplorer = (address) => {
    if (address) {
      window.open(`${chooseExplorer("address") + address}`, "_blank");
    }
  };

  if (address) {
    playerAddress = "..." + address.substr(address.length - 4);
  }

  const [war, setWar] = useState(0);
  const [fight, setFight] = useState(0);
  const [lp, setLp] = useState(0);

  const setAllNumbers = () => {
    const warNum = Number(warBalance).toFixed(0);
    setWar(warNum);
    const fightNum = Number(fightBalance).toFixed(0);
    setFight(fightNum);
    const lpNum = Number(lpTokenBalance).toFixed(2);
    setLp(lpNum);
  };

  useEffect(() => {
    setAllNumbers();
  });

  return (
    <div className="d-flex justify-content-between">
      <h4
        className={"playername textspaced textred addresslink"}
        onClick={() => {
          openExplorer(address);
        }}
      >
        Player: <span className="textpurple2">{playerAddress}</span>
      </h4>
      <h4 className={"playername textspaced textred"}>
        WAR: <span className="textpurple2">{war}</span>
      </h4>
      <h4 className={"playername textspaced textred"}>
        LP: <span className="textpurple2">{lp}</span>
      </h4>
      <h4 className={"playername textspaced textred"}>
        FIGHT: <span className="textpurple2">{fight}</span>
      </h4>
    </div>
  );
};

export default PlayerInfo;
