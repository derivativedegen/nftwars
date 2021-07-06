import React, { useState } from "react";
import "./StakeInterface.css";
import Button from "../ui/button";
import StakeModal from "./StakeModal";
import { useDispatch } from "react-redux";
import { txApproved, txConfirmed } from "../redux/transaction";

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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(txApproved(""));
    dispatch(txConfirmed(""));
    setIsOpen(true);
  };
  const hideModal = () => {
    dispatch(txApproved(""));
    dispatch(txConfirmed(""));
    setIsOpen(false);
  };

  // Check if input is greater than 0 and less than balance before executing stake function
  const stakeCheck = async (amount) => {
    if (amount > balance) {
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
    if (staked <= 0) {
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
    if (rewards <= 0) {
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
          {balance && balance < 10 ? balance.toFixed(2) : balance.toFixed(0)}
        </h1>
        <h5 className="textred textspaced">{type}</h5>
        <h1 className="textred textspaced">Balance</h1>
        <Button text="Stake" clickAction={showModal} buttonType="btn-connect" />
        <div className="modalcontainer">
          <StakeModal
            type={type}
            show={isOpen}
            hideModal={hideModal}
            balance={balance}
            stakeCheck={stakeCheck}
          />
        </div>
      </div>
      <div className="text-center p-2">
        <h1 className="bignumber textred textspaced">
          {staked && staked < 10 ? staked.toFixed(2) : staked.toFixed(0)}
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
          {rewards && rewards < 10 ? rewards.toFixed(2) : rewards.toFixed(0)}
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
