import { createSlice } from "@reduxjs/toolkit";

export interface ClasseState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showClasseDialogOpen: boolean;
}

// Créer un slice pour gérer l'état des classes
const classeSlice = createSlice({
  name: "classes",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showClasseDialogOpen: false,
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
} = classeSlice.actions;

export default classeSlice.reducer;
