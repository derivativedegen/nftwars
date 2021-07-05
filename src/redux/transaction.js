import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  loading: false,
  approved: false,
  approvedData: {},
  confirmed: false,
  confirmedData: {},
};

// Slice
const transaction = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    approved: (state, action) => {
      state.approved = action.payload;
    },
    confirmed: (state, action) => {
      state.confirmed = action.payload;
    },
  },
});

// Actions
export const { toggleLoading, approved, confirmed } = transaction.actions;

// Selectors
export const selectLoading = (state) => state.transaction.loading;
export const selectApproved = (state) => state.transaction.approved;
export const selectConfirmed = (state) => state.transaction.confirmed;

// Reducer
export default transaction.reducer;
