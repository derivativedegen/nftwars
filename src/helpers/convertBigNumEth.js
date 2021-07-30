import { ethers } from "ethers";

export const convertBigNumEth = (number) => {
  const bigNum = ethers.BigNumber.from(number).toString();
  const converted = ethers.utils
    .formatEther(bigNum)
    .match(/^-?\d+(?:\.\d{0,8})?/); // cutoff 8 decimals
  const integer = Number(converted);
  return integer;
};
