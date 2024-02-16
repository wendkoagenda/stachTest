import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: string;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") ?? "no",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = "yes";
      state.token = action.payload;
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
