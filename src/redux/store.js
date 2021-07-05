import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import transactionReducer from "./transactionSlice";
import networkReducer from "./networkSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    transaction: transactionReducer,
    network: networkReducer,
  },
});

export default store;
