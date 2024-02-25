import { createSlice } from "@reduxjs/toolkit";

export interface StudentState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showStudentDialogOpen: boolean;
}

// Créer un slice pour gérer l'état des students
const studentSlice = createSlice({
  name: "students",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showStudentDialogOpen: false,
  },
  reducers: {
    openStudentCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeStudentCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openStudentDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeStudentDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
    openStudentUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeStudentUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openStudentShowDialog: (state) => {
      state.showStudentDialogOpen = true;
    },
    closeStudentShowDialog: (state) => {
      state.showStudentDialogOpen = false;
    },
  },
});

export const {
  openStudentCreateDialog,
  closeStudentCreateDialog,
  openStudentDeleteDialog,
  closeStudentDeleteDialog,
  openStudentUpdateDialog,
  closeStudentUpdateDialog,
  openStudentShowDialog,
  closeStudentShowDialog,
} = studentSlice.actions;

export default studentSlice.reducer;