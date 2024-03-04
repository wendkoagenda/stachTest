import { agentsApi } from "@/services/agent";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import agentReducer from "./slices/agentSlice";
import studentReducer from "./slices/studentSlice";
import classeReducer from "./slices/classeSlice";
import moduleReducer from "./slices/moduleSlice";
import teacherReducer from "./slices/teacherSlice";
import departemntReducer from "./slices/departementSlice";
import authReducer from "./slices/authSlice";
import { studentsApi } from "@/services/student";
import { teachersApi } from "@/services/teacher";
import { departementsApi } from "@/services/departement";
import { classesApi } from "@/services/classe";
import { modulesApi } from "@/services/module";

const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentReducer,
    [agentsApi.reducerPath]: agentsApi.reducer,
    students: studentReducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    teachers: teacherReducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    departements: departemntReducer,
    [departementsApi.reducerPath]: departementsApi.reducer,
    classes: classeReducer,
    [classesApi.reducerPath]: classesApi.reducer,
    modules: moduleReducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      agentsApi.middleware,
      studentsApi.middleware,
      teachersApi.middleware,
      departementsApi.middleware,
      classesApi.middleware,
      modulesApi.middleware
    ),
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
