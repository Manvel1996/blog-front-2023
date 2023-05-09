import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  status: null,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removePost = createAsyncThunk("post/removePost", async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // Create post
    [createPost.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //Get all posts
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message;
      state.posts = action.payload?.posts;
      state.popularPosts = action.payload?.popularPosts;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //Remove post
    [removePost.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [removePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [removePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //Update post
    [updatePost.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message;
      state.posts = state.posts.map((post) => {
        if (post._id !== action.payload._id) {
          return action.payload;
        } else return post;
      });
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
  },
});

export default postSlice.reducer;
