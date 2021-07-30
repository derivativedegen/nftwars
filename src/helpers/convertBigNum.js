import { ethers } from "ethers";

export const convertBigNum = (number) => {
  const bigNum = ethers.BigNumber.from(number).toString();
  const integer = Number(bigNum);
  return integer;
};
