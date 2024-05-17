import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import authenticatedUserSliceReducer from "./reducers/user.reducer";
import projectApi from "./rtk-apis/api.config";

export const store = configureStore({
  reducer: {
    authenticatedUser: authenticatedUserSliceReducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type TAppDispatch = typeof store.dispatch;
