import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: string;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") ?? "no",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = "yes";
      localStorage.setItem("isAuthenticated", "yes"); // Met à jour le local storage
    },
    logout(state) {
      state.isAuthenticated = "no";
      localStorage.setItem("isAuthenticated", "no"); // Met à jour le local storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
