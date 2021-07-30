export const switchChain = (
  connected,
  chainId,
  chainCheck,
  setAppChain,
  setConnected,
  dispatch
) => {
  if (connected) {
    dispatch(setConnected(false));
  }
  if (chainCheck(chainId)) {
    dispatch(setAppChain(chainId));
  } else {
    dispatch(setAppChain("0x1"));
  }
};
