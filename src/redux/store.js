import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feauters/auth/AuthSlice";
import postSlice from "./feauters/post/PostSlice";
import commntSlice from "./feauters/comment/CommentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commntSlice,
  },
});
