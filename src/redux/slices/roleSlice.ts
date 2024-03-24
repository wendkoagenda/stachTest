import { createSlice } from "@reduxjs/toolkit";

export interface RoleState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showRoleDialogOpen: boolean;
  statusDialogOpen: boolean;
  refreshRoleList: boolean;
}

// Créer un slice pour gérer l'état des roles
const roleSlice = createSlice({
  name: "roles",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showRoleDialogOpen: false,
    statusDialogOpen: false,
    refreshRoleList: false,
  },
  reducers: {
    openRoleCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeRoleCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openRoleDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeRoleDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
    openRoleUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeRoleUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openRoleShowDialog: (state) => {
      state.showRoleDialogOpen = true;
    },
    closeRoleShowDialog: (state) => {
      state.showRoleDialogOpen = false;
    },
    openStatusDialog: (state) => {
      state.statusDialogOpen = true;
    },
    closeStatusDialog: (state) => {
      state.statusDialogOpen = false;
    },
    refreshRoleList: (state) => {
      state.refreshRoleList = true;
    },
    initialiseRefreshRoleList: (state) => {
      state.refreshRoleList = false;
    },
  },
});

export const {
  openRoleCreateDialog,
  closeRoleCreateDialog,
  openRoleDeleteDialog,
  closeRoleDeleteDialog,
  openRoleUpdateDialog,
  closeRoleUpdateDialog,
  openRoleShowDialog,
  closeRoleShowDialog,
  openStatusDialog,
  closeStatusDialog,
  refreshRoleList,
  initialiseRefreshRoleList,
} = roleSlice.actions;

export default roleSlice.reducer;
