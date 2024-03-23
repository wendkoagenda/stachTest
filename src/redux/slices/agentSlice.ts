import { createSlice } from "@reduxjs/toolkit";

export interface AgentState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showAgentDialogOpen: boolean;
  statusDialogOpen: boolean;
  refreshAgentList: boolean;
}

// Créer un slice pour gérer l'état des agents
const agentSlice = createSlice({
  name: "agents",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showAgentDialogOpen: false,
    statusDialogOpen: false,
    refreshAgentList: false,
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
    openAgentUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeAgentUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openAgentShowDialog: (state) => {
      state.showAgentDialogOpen = true;
    },
    closeAgentShowDialog: (state) => {
      state.showAgentDialogOpen = false;
    },
    openStatusDialog: (state) => {
      state.statusDialogOpen = true;
    },
    closeStatusDialog: (state) => {
      state.statusDialogOpen = false;
    },
    refreshAgentList: (state) => {
      state.refreshAgentList = true;
    },
    initialiseRefreshAgentList: (state) => {
      state.refreshAgentList = false;
    },
  },
});

export const {
  openAgentCreateDialog,
  closeAgentCreateDialog,
  openAgentDeleteDialog,
  closeAgentDeleteDialog,
  openAgentUpdateDialog,
  closeAgentUpdateDialog,
  openAgentShowDialog,
  closeAgentShowDialog,
  openStatusDialog,
  closeStatusDialog,
  refreshAgentList,
  initialiseRefreshAgentList,
} = agentSlice.actions;

export default agentSlice.reducer;
