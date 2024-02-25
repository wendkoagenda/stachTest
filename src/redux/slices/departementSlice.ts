import { createSlice } from "@reduxjs/toolkit";

export interface DepartementState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showDepartementDialogOpen: boolean;
}

// Créer un slice pour gérer l'état des departements
const departementSlice = createSlice({
  name: "departements",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showDepartementDialogOpen: false,
  },
  reducers: {
    openDepartementCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeDepartementCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openDepartementDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeDepartementDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
    openDepartementUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeDepartementUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openDepartementShowDialog: (state) => {
      state.showDepartementDialogOpen = true;
    },
    closeDepartementShowDialog: (state) => {
      state.showDepartementDialogOpen = false;
    },
  },
});

export const {
  openDepartementCreateDialog,
  closeDepartementCreateDialog,
  openDepartementDeleteDialog,
  closeDepartementDeleteDialog,
  openDepartementUpdateDialog,
  closeDepartementUpdateDialog,
  openDepartementShowDialog,
  closeDepartementShowDialog,
} = departementSlice.actions;

export default departementSlice.reducer;
