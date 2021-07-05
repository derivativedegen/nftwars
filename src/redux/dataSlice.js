import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // State for App Logic
  loading: false,
  approved: {},
  confirmed: {},

  // State for Token Balances
  warBalance: 0,
  warStakedBalance: 0,
  warRewardsBalance: 0,
  lpTokenBalance: 0,
  lpStakedBalance: 0,
  lpRewardsBalance: 0,
  fightBalance: 0,

  // State for Statistics
  fightSupply: 0,
  fightCirculating: 0,
  warSupply: 0,
  warCirculating: 0,
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {},
});

export const { getTokenData } = dataSlice.actions;
export default dataSlice.reducer;
