import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import agentReducer from "./slices/agentSlice";

// Importez d'autres réducteurs au besoin

const rootReducer = combineReducers({
  auth: authReducer,
  agents: agentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
