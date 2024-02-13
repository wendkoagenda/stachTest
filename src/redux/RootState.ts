import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
// Importez d'autres réducteurs au besoin

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
