import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  comments: [],
  isLoading: false,
  status: null,
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commntSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    //Create comment
    [createComment.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [createComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //Get all post comments
    [getPostComments.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.comments = action.payload;
    },
    [getPostComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
  },
});

export default commntSlice.reducer;
