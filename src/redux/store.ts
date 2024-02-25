import { agentsApi } from "@/services/agent";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import agentReducer from "./slices/agentSlice";
import studentReducer from "./slices/studentSlice";
import teacherReducer from "./slices/teacherSlice";
import authReducer from "./slices/authSlice";
import { studentsApi } from "@/services/student";
import { teachersApi } from "@/services/teacher";

const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentReducer,
    [agentsApi.reducerPath]: agentsApi.reducer,
    students: studentReducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    teachers: teacherReducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      agentsApi.middleware,
      studentsApi.middleware,
      teachersApi.middleware
    ),
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
