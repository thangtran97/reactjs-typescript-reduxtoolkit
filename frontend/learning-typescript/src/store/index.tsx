import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import recordReducer from "./recordSlice";
import imageReducer from "./imageSlice";
import streamSlice from "./streamSlice";

export const store = configureStore({
    reducer: {
        video: videoReducer,
        record: recordReducer,
        image: imageReducer,
        stream: streamSlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
