import { createSlice } from "@reduxjs/toolkit";
import { contractInfo } from "../constants/constants.js";

// Initial State
const initialState = {
  contractAddresses: contractInfo["mainnet"],
  contractWar: {},
  contractLPToken: {},
  contractStake: {},
  contractLPStake: {},
  contractFight: {},
};

// Slice
const contracts = createSlice({
  name: "contracts",
  initialState: initialState,
  reducers: {
    setContractAddresses: (state, action) => {
      state.contractAddresses = action.payload;
    },
    setContractWar: (state, action) => {
      state.contractWar = action.payload;
    },
    setContractLPToken: (state, action) => {
      state.contractLPToken = action.payload;
    },
    setContractStake: (state, action) => {
      state.contractStake = action.payload;
    },
    setContractLPStake: (state, action) => {
      state.contractLPStake = action.payload;
    },
    setContractFight: (state, action) => {
      state.contractFight = action.payload;
    },
  },
});

// Actions
export const {
  setContractAddresses,
  setContractWar,
  setContractLPToken,
  setContractStake,
  setContractLPStake,
  setContractFight,
} = contracts.actions;

// Selectors
export const selectContractAddresses = (state) =>
  state.contracts.contractAddresses;
export const selectContractWar = (state) => state.contracts.contractWar;
export const selectContractLPToken = (state) => state.contracts.contractLPToken;
export const selectContractStake = (state) => state.contracts.contractStake;
export const selectContractLPStake = (state) => state.contracts.contractLPStake;
export const selectContractFight = (state) => state.contracts.contractFight;

// Reducer
export default contracts.reducer;
