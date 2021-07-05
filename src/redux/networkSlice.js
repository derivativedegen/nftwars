import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  address: "",
  provider: {},
  signer: {},
  connected: false,
  warning: false,
  network: "mainnet",
  userChain: "",
  appChain: "0x1",
};

// Slice
const networkSlice = createSlice({
  name: "network",
  initialState: initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setSigner: (state, action) => {
      state.signer = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setWarning: (state, action) => {
      state.warning = action.payload;
    },
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
    setUserChain: (state, action) => {
      state.userChain = action.payload;
    },
    setAppChain: (state, action) => {
      state.appChain = action.payload;
    },
  },
});

// Actions
export const {
  setAddress,
  setProvider,
  setSigner,
  setConnected,
  setWarning,
  setNetwork,
  setUserChain,
  setAppChain,
} = networkSlice.actions;

// Selectors
export const selectAddress = (state) => state.network.address;
export const selectProvider = (state) => state.network.provider;
export const selectSigner = (state) => state.network.signer;
export const selectConnected = (state) => state.network.connected;
export const selectWarning = (state) => state.network.warning;
export const selectNetworkName = (state) => state.network.network;
export const selectUserChain = (state) => state.network.userChain;
export const selectAppChain = (state) => state.network.appChain;

// Reducer
export default networkSlice.reducer;
