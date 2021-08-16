import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('auth/login', async (data) => {
  const response = await client.post('/fakeApi/login', data);
  return response.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
