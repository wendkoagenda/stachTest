import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import agentReducer, { AgentState } from "./slices/agentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  agents: agentReducer,
});

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  agents: AgentState;
};

export default rootReducer;
