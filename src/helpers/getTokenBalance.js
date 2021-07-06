import { ethers } from "ethers";

const getTokenBalance = async (contract, address, type) => {
  if (!contract || !address) {
    return;
  }
  const options = { gasLimit: 100000 };
  let balance = 0;

  switch (type) {
    case "balance":
      balance = await contract.balanceOf(address, options);
      break;
    case "earned":
      balance = await contract.earned(address, options);
      break;
    case "stakedEth":
      balance = await contract.balance(address, options);
      break;
    case "stakedPolygon":
      balance = await contract.staked_balance(address, options);
      break;
  }

  const bigNum = ethers.BigNumber.from(balance).toString();
  const converted = ethers.utils
    .formatEther(bigNum)
    .match(/^-?\d+(?:\.\d{0,8})?/);
  const integer = Number(converted);
  return integer;
};

export default getTokenBalance;
