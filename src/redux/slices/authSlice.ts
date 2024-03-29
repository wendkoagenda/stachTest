import { LoginResponse } from "@/@types/Login";
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
    login(state, action: PayloadAction<LoginResponse>) {
      state.isAuthenticated = "yes";
      state.token = action.payload.access_token;
      localStorage.setItem("isAuthenticated", "yes");
      const heureActuelle = new Date().getTime();
      const heureFuture = new Date(heureActuelle + 3600).getTime();
      localStorage.setItem(
        "__kgfwe29__97efiyfcljbf68EF79WEFAD",
        action.payload.access_token
      );
      localStorage.setItem(
        "__OJGBXGHFKH94s__6fb99EFNvkjbv4vsv",
        action.payload.expires_in.toString()
      );
      localStorage.setItem(
        "__Ojygiuh94s__6fbkygsdiefkjbv48867",
        heureFuture.toString()
      );
      localStorage.setItem(
        "__lybbg995__g629r49659664sfkybiyfc",
        action.payload.user_id.toString()
      );
      localStorage.setItem(
        "__ubvfiwbvs6827fjyfufavc__nv24fjvk",
        action.payload.user_uuid
      );
      localStorage.setItem(
        "__ppohwr4bvkyjfiv298fjyfufavc__nv2",
        action.payload.camp_year_id.toString()
      );
      localStorage.setItem(
        "__tpiwubfacQWDBUR929dkhayfqdjMNg529q8d",
        action.payload.t_id.toString()
      );
      localStorage.setItem(
        "__spiecjwvjvQGIWUIEB598156bckeoygqoddq",
        action.payload.s_id.toString()
      );
      localStorage.setItem(
        "__albvs26dfbvnuhwf87915515kbcckqacanMM",
        action.payload.a_id.toString()
      );
      localStorage.setItem("last_name", action.payload.last_name.toString());
      localStorage.setItem("first_name", action.payload.first_name.toString());
    },
    logout(state) {
      state.isAuthenticated = "no";
      localStorage.setItem("isAuthenticated", "no");
      localStorage.removeItem("__kgfwe29__97efiyfcljbf68EF79WEFAD");
      localStorage.removeItem("__OJGBXGHFKH94s__6fb99EFNvkjbv4vsv");
      localStorage.removeItem("__Ojygiuh94s__6fbkygsdiefkjbv48867");
      localStorage.removeItem("__lybbg995__g629r49659664sfkybiyfc");
      localStorage.removeItem("__ubvfiwbvs6827fjyfufavc__nv24fjvk");
      localStorage.removeItem("__ppohwr4bvkyjfiv298fjyfufavc__nv2");
      localStorage.removeItem("__tpiwubfacQWDBUR929dkhayfqdjMNg529q8d");
      localStorage.removeItem("__spiecjwvjvQGIWUIEB598156bckeoygqoddq");
      localStorage.removeItem("__albvs26dfbvnuhwf87915515kbcckqacanMM");
      localStorage.removeItem("last_name");
      localStorage.removeItem("first_name");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
