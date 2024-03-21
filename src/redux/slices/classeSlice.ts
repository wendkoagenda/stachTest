import { createSlice } from "@reduxjs/toolkit";

export interface ClasseState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showClasseDialogOpen: boolean;
  dcnfCreationDialogOpen: boolean;
}

// Créer un slice pour gérer l'état des classes
const classeSlice = createSlice({
  name: "classes",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showClasseDialogOpen: false,
    dcnfCreationDialogOpen: false,
  },
  reducers: {
    openClasseCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeClasseCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openClasseDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeClasseDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
    openClasseUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeClasseUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openClasseShowDialog: (state) => {
      state.showClasseDialogOpen = true;
    },
    closeClasseShowDialog: (state) => {
      state.showClasseDialogOpen = false;
    },
    openDCNFCreateDialog: (state) => {
      state.dcnfCreationDialogOpen = true;
    },
    closeDCNFCreateDialog: (state) => {
      state.dcnfCreationDialogOpen = false;
    },
  },
});

export const {
  openClasseCreateDialog,
  closeClasseCreateDialog,
  openClasseDeleteDialog,
  closeClasseDeleteDialog,
  openClasseUpdateDialog,
  closeClasseUpdateDialog,
  openClasseShowDialog,
  closeClasseShowDialog,
  openDCNFCreateDialog,
  closeDCNFCreateDialog,
} = classeSlice.actions;

export default classeSlice.reducer;
