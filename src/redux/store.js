import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import transactionReducer from "./transaction";
import networkReducer from "./network";

const store = configureStore({
  reducer: {
    data: dataReducer,
    transaction: transactionReducer,
    network: networkReducer,
  },
});

export default store;
