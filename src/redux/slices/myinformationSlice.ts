import { createSlice } from "@reduxjs/toolkit";

export interface MyinformationState {
  creationDialogOpen: boolean;
  deletionDialogOpen: boolean;
  updatingDialogOpen: boolean;
  showMyinformationDialogOpen: boolean;
  statusDialogOpen: boolean;
  refreshMyinformationList: boolean;
}

// Créer un slice pour gérer l'état des myinformations
const myinformationSlice = createSlice({
  name: "myinformations",
  initialState: {
    creationDialogOpen: false,
    deletionDialogOpen: false,
    updatingDialogOpen: false,
    showMyinformationDialogOpen: false,
    statusDialogOpen: false,
    refreshMyinformationList: false,
  },
  reducers: {
    openMyinformationCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeMyinformationCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
    openMyinformationDeleteDialog: (state) => {
      state.deletionDialogOpen = true;
    },
    closeMyinformationDeleteDialog: (state) => {
      state.deletionDialogOpen = false;
    },
    openMyinformationUpdateDialog: (state) => {
      state.updatingDialogOpen = true;
    },
    closeMyinformationUpdateDialog: (state) => {
      state.updatingDialogOpen = false;
    },
    openMyinformationShowDialog: (state) => {
      state.showMyinformationDialogOpen = true;
    },
    closeMyinformationShowDialog: (state) => {
      state.showMyinformationDialogOpen = false;
    },
    openStatusDialog: (state) => {
      state.statusDialogOpen = true;
    },
    closeStatusDialog: (state) => {
      state.statusDialogOpen = false;
    },
    refreshMyinformationList: (state) => {
      state.refreshMyinformationList = true;
    },
    initialiseRefreshMyinformationList: (state) => {
      state.refreshMyinformationList = false;
    },
  },
});

export const {
  openMyinformationCreateDialog,
  closeMyinformationCreateDialog,
  openMyinformationDeleteDialog,
  closeMyinformationDeleteDialog,
  openMyinformationUpdateDialog,
  closeMyinformationUpdateDialog,
  openMyinformationShowDialog,
  closeMyinformationShowDialog,
  openStatusDialog,
  closeStatusDialog,
  refreshMyinformationList,
  initialiseRefreshMyinformationList,
} = myinformationSlice.actions;

export default myinformationSlice.reducer;
