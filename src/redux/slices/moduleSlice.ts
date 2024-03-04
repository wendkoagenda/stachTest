import { createSlice } from "@reduxjs/toolkit";

export interface ModuleState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showModuleDialogOpen: boolean;
}

// Créer un slice pour gérer l'état des modules
const moduleSlice = createSlice({
  name: "modules",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showModuleDialogOpen: false,
  },
  reducers: {
    openModuleCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeModuleCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openModuleDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeModuleDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
    openModuleUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeModuleUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openModuleShowDialog: (state) => {
      state.showModuleDialogOpen = true;
    },
    closeModuleShowDialog: (state) => {
      state.showModuleDialogOpen = false;
    },
  },
});

export const {
  openModuleCreateDialog,
  closeModuleCreateDialog,
  openModuleDeleteDialog,
  closeModuleDeleteDialog,
  openModuleUpdateDialog,
  closeModuleUpdateDialog,
  openModuleShowDialog,
  closeModuleShowDialog,
} = moduleSlice.actions;

export default moduleSlice.reducer;
