import { ActorCreationModel } from "@/@types/ActorCreationModel";
import { AgentDaum } from "@/@types/Agent";
import AgentService from "@/services/AgentService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AgentState {
  isLoading: boolean;
  data: AgentDaum;
  success: boolean;
  errorMessages: string | null;
  creationDialogOpen: boolean;
}

// Action asynchrone pour charger tous les agents
// AgentList
export const fetchAgents = createAsyncThunk(
  "agents/fetchAgents",
  async ({ access_token }: { access_token: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(agentSlice.actions.loading());
      const serviceResult = await AgentService.fetchAgents(access_token);
      thunkAPI.dispatch(agentSlice.actions.agentReceived(serviceResult.data));
    } catch (error) {
      thunkAPI.dispatch(agentSlice.actions.error(error));
    } finally {
      thunkAPI.dispatch(agentSlice.actions.loadingComplete());
    }
  }
);
// ShowAgent
export const showAgent = createAsyncThunk(
  "agents/showAgent",
  async (
    { access_token, agentUuid }: { access_token: string; agentUuid: string },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(agentSlice.actions.loading());
      const serviceResult = await AgentService.showAgent(
        access_token,
        agentUuid
      );
      thunkAPI.dispatch(agentSlice.actions.agentReceived(serviceResult.data));
    } catch (error) {
      thunkAPI.dispatch(agentSlice.actions.error(error));
    } finally {
      thunkAPI.dispatch(agentSlice.actions.loadingComplete());
    }
  }
);
// CreateAgent
export const createAgent = createAsyncThunk(
  "agents/createAgent",
  async ({
    access_token,
    model,
  }: {
    access_token: string;
    model: ActorCreationModel;
  }) => {
    await AgentService.createAgent(access_token, model);
  }
);

// Créer un slice pour gérer l'état des agents
const agentSlice = createSlice({
  name: "agents",
  initialState: {
    isLoading: false,
    data: [],
    success: true,
    errorMessages: null,
    creationDialogOpen: false,
  },
  reducers: {
    loading(state) {
      state.isLoading = true;
      state.success = false;
    },
    loadingComplete(state) {
      state.isLoading = false;
    },
    agentReceived(state, action) {
      state.isLoading = false;
      state.success = true;
      state.errorMessages = null;
      state.data = action.payload.data;
    },
    error(state, action) {
      state.isLoading = false;
      state.success = false;
      state.data = [];
      state.errorMessages = action.payload;
    },
    openAgentCreateDialog: (state) => {
      state.creationDialogOpen = true;
    },
    closeAgentCreateDialog: (state) => {
      state.creationDialogOpen = false;
    },
  },
});

export const {
  loading,
  agentReceived,
  error,
  openAgentCreateDialog,
  closeAgentCreateDialog,
} = agentSlice.actions;

export default agentSlice.reducer;
