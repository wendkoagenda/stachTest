import { createSlice } from "@reduxjs/toolkit";

export interface AgentState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
}

// Créer un slice pour gérer l'état des agents
const agentSlice = createSlice({
  name: "agents",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
  },
  reducers: {
    openAgentCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeAgentCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openAgentDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeAgentDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
  },
});

export const {
  openAgentCreateDialog,
  closeAgentCreateDialog,
  openAgentDeleteDialog,
  closeAgentDeleteDialog,
} = agentSlice.actions;

export default agentSlice.reducer;
