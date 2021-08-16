import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchPost = createAsyncThunk('post/fetchPost', async (id) => {
  const response = await client.get(`/fakeApi/posts/${id}`);
  return response.post;
});

export const addPostReaction = createAsyncThunk(
  'post/addPostReaction',
  async ({ id, reaction }) => {
    const response = await client.post(`/fakeApi/posts/${id}/reaction`, {
      reaction,
    });
    return response.post;
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPost(state, action) {
      return initialState;
    },
  },
  extraReducers: {
    [fetchPost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    [fetchPost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addPostReaction.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { clearPost } = postSlice.actions;

export default postSlice.reducer;
