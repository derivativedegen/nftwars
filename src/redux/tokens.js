import { createSlice } from "@reduxjs/toolkit";
import { contractInfo } from "../constants/constants.js";

const initialState = {
  warSupply: 0,
  warCirculating: 0,
  warBalance: 0,
  warStakedBalance: 0,
  warRewardsBalance: 0,
  lpTokenBalance: 0,
  lpStakedBalance: 0,
  lpRewardsBalance: 0,
  fightBalance: 0,
  fightSupply: 0,
  fightCirculating: 0,
};

const tokens = createSlice({
  name: "tokens",
  initialState: initialState,
  reducers: {
    setWarSupply: (state, action) => {
      state.warSupply = action.payload;
    },
    setWarCirculating: (state, action) => {
      state.warCirculating = action.payload;
    },
    setWarBalance: (state, action) => {
      state.warBalance = Number(action.payload);
    },
    setWarStakedBalance: (state, action) => {
      state.warStakedBalance = Number(action.payload);
    },
    setWarRewardsBalance: (state, action) => {
      state.warRewardsBalance = Number(action.payload);
    },
    setLpTokenBalance: (state, action) => {
      state.lpTokenBalance = Number(action.payload);
    },
    setLpStakedBalance: (state, action) => {
      state.lpStakedBalance = Number(action.payload);
    },
    setLpRewardsBalance: (state, action) => {
      state.lpRewardsBalance = Number(action.payload);
    },
    setFightTokenBalance: (state, action) => {
      state.fightBalance = Number(action.payload);
    },
    setFightSupply: (state, action) => {
      state.fightSupply = action.payload;
    },
    setFightCirculating: (state, action) => {
      state.fightCirculating = action.payload;
    },
  },
});

// Actions
export const {
  setWarSupply,
  setWarCirculating,
  setWarBalance,
  setWarStakedBalance,
  setWarRewardsBalance,
  setLpTokenBalance,
  setLpStakedBalance,
  setLpRewardsBalance,
  setFightTokenBalance,
  setFightSupply,
  setFightCirculating,
} = tokens.actions;

// Selectors
export const selectWarSupply = (state) => state.tokens.warSupply;
export const selectWarCirculating = (state) => state.tokens.warCirculating;
export const selectWarBalance = (state) => state.tokens.warBalance;
export const selectWarStakedBalance = (state) => state.tokens.warStakedBalance;
export const selectWarRewardsBalance = (state) =>
  state.tokens.warRewardsBalance;
export const selectLpTokenBalance = (state) => state.tokens.lpTokenBalance;
export const selectLpStakedBalance = (state) => state.tokens.lpStakedBalance;
export const selectLpRewardsBalance = (state) => state.tokens.lpRewardsBalance;
export const selectFightBalance = (state) => state.tokens.fightBalance;
export const selectFightSupply = (state) => state.tokens.fightSupply;
export const selectFightCirculating = (state) => state.tokens.fightCirculating;

// Reducer
export default tokens.reducer;
