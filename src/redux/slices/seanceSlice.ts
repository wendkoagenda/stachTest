import { createSlice } from "@reduxjs/toolkit";

export interface SeanceState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showSeanceDialogOpen: boolean;
}

// Créer un slice pour gérer l'état des seances
const seanceSlice = createSlice({
  name: "seances",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showSeanceDialogOpen: false,
  },
  reducers: {
    openSeanceCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeSeanceCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openSeanceDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeSeanceDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
    openSeanceUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeSeanceUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openSeanceShowDialog: (state) => {
      state.showSeanceDialogOpen = true;
    },
    closeSeanceShowDialog: (state) => {
      state.showSeanceDialogOpen = false;
    },
  },
});

export const {
  openSeanceCreateDialog,
  closeSeanceCreateDialog,
  openSeanceDeleteDialog,
  closeSeanceDeleteDialog,
  openSeanceUpdateDialog,
  closeSeanceUpdateDialog,
  openSeanceShowDialog,
  closeSeanceShowDialog,
} = seanceSlice.actions;

export default seanceSlice.reducer;
