import { createSlice } from "@reduxjs/toolkit";

export interface TeacherState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showTeacherDialogOpen: boolean;
  refreshTeacherList: boolean;
}

// Créer un slice pour gérer l'état des teachers
const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showTeacherDialogOpen: false,
    refreshTeacherList: false,
  },
  reducers: {
    openTeacherCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeTeacherCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openTeacherDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeTeacherDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
    openTeacherUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeTeacherUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openTeacherShowDialog: (state) => {
      state.showTeacherDialogOpen = true;
    },
    closeTeacherShowDialog: (state) => {
      state.showTeacherDialogOpen = false;
    },
    refreshTeacherList: (state) => {
      state.refreshTeacherList = true;
    },
    initialiseRefreshTeacherList: (state) => {
      state.refreshTeacherList = false;
    },
  },
});

export const {
  openTeacherCreateDialog,
  closeTeacherCreateDialog,
  openTeacherDeleteDialog,
  closeTeacherDeleteDialog,
  openTeacherUpdateDialog,
  closeTeacherUpdateDialog,
  openTeacherShowDialog,
  closeTeacherShowDialog,
  refreshTeacherList,
  initialiseRefreshTeacherList,
} = teacherSlice.actions;

export default teacherSlice.reducer;
