import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import agentReducer from "./slices/agentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentReducer,
  },
});

export default store;
