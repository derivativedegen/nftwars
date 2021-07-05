export const chainCheck = (chain) => {
  if (
    chain === "0x1" ||
    chain === "0x3" ||
    chain === "0x89" ||
    chain === "0x13881"
  ) {
    return true;
  } else {
    return false;
  }
};
