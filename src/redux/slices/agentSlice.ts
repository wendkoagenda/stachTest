import { createSlice } from "@reduxjs/toolkit";

export interface AgentState {
  creationDialogOpen: boolean;
}

// Créer un slice pour gérer l'état des agents
const agentSlice = createSlice({
  name: "agents",
  initialState: {
    creationDialogOpen: false,
  },
  reducers: {
    openAgentCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeAgentCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
  },
});

export const { openAgentCreateDialog, closeAgentCreateDialog } =
  agentSlice.actions;

export default agentSlice.reducer;
