import React, { useState } from "react";
import "./StakeInterface.css";
import Button from "../ui/button";
import StakeModal from "./StakeModal";
import { useDispatch } from "react-redux";
import { approved, confirmed } from "../redux/transaction";

const StakeInterface = ({
  type,
  balance,
  staked,
  rewards,
  stakeWar,
  withdrawWar,
  redeemWarRewards,
  stakeLPToken,
  withdrawLPToken,
  redeemLPRewards,
  chooseExplorer,
}) => {
  const rewardsNum = Number(rewards);
  const balanceNum = Number(balance);
  const stakedNum = Number(staked);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(approved(""));
    dispatch(confirmed(""));
    setIsOpen(true);
  };
  const hideModal = () => {
    dispatch(approved(""));
    dispatch(confirmed(""));
    setIsOpen(false);
  };

  // Check if input is greater than 0 and less than balance before executing stake function
  const stakeCheck = async (amount) => {
    if (amount > balanceNum) {
      alert(
        `Insufficient balance of ${type} to stake. The max you can stake is ${balance}.`
      );
      return;
    }
    if (type === "LP Tokens") {
      if (amount === null || amount === 0) {
        alert(`Please enter an amount to stake.`);
        return;
      }
      await stakeLPToken(amount);
    }
    if (type === "WAR Tokens") {
      if (amount < 5) {
        alert(`The minimum amount of ${type} you can stake is 5.`);
        return;
      }
      await stakeWar(amount);
    }
  };

  // Check if amount staked is 0 before executing withdraw function
  const withdrawCheck = () => {
    if (stakedNum <= 0) {
      alert("You do not have any tokens staked.");
      return;
    }
    if (type === "WAR Tokens") {
      withdrawWar();
    }
    if (type === "LP Tokens") {
      withdrawLPToken();
    }
  };

  // Check if amount staked is 0 before executing redeem function
  const redeemCheck = () => {
    if (rewardsNum <= 0) {
      alert("You have not earned any credits.");
      return;
    }
    if (type === "WAR Tokens") {
      redeemWarRewards();
    }
    if (type === "LP Tokens") {
      redeemLPRewards();
    }
  };

  return (
    <div className="col-12 d-flex justify-content-around flex-wrap">
      <div className="text-center p-2">
        <h1 className="bignumber textred textspaced">
          {balanceNum && balanceNum < 10
            ? balanceNum.toFixed(2)
            : balanceNum.toFixed(0)}
        </h1>
        <h5 className="textred textspaced">{type}</h5>
        <h1 className="textred textspaced">Balance</h1>
        <Button text="Stake" clickAction={showModal} buttonType="btn-connect" />
        <div className="modalcontainer">
          <StakeModal
            type={type}
            show={isOpen}
            hideModal={hideModal}
            balanceNum={balanceNum}
            stakeCheck={stakeCheck}
            chooseExplorer={chooseExplorer}
          />
        </div>
      </div>
      <div className="text-center p-2">
        <h1 className="bignumber textred textspaced">
          {stakedNum && stakedNum < 10
            ? stakedNum.toFixed(2)
            : stakedNum.toFixed(0)}
        </h1>
        <h5 className="textred textspaced">{type}</h5>
        <h1 className="textred textspaced">Staked</h1>
        <Button
          text="Withdraw"
          clickAction={() => withdrawCheck()}
          buttonType="btn-connect"
        />
      </div>
      <div className="text-center p-2">
        <h1 className="bignumber textred textspaced">
          {rewardsNum && rewardsNum < 10
            ? rewardsNum.toFixed(2)
            : rewardsNum.toFixed(0)}
        </h1>
        <h5 className="textred textspaced">FIGHT Tokens</h5>
        <h1 className="textred textspaced">Earned</h1>
        <Button
          text="Redeem"
          clickAction={() => redeemCheck()}
          buttonType="btn-connect"
        />
      </div>
    </div>
  );
};

export default StakeInterface;
