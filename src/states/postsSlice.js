import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.posts;
});

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', { post: initialPost });
    return response.post;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // addPost(state, action) {
    //   state.posts.push(action.payload);
    // },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addPost.fulfilled]: (state, action) => {
      state.status = 'idle'
    },
  },
});

// export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
