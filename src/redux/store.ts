import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import agentReducer from "./slices/agentSlice";
import { pokemonApi } from "@/services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";
import { agentsApi } from "@/services/agent";

const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [agentsApi.reducerPath]: agentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, agentsApi.middleware),
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
