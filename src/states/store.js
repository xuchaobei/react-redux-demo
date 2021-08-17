import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice'
import auth from './authSlice'
import postDetail from '../features/post/postSlice'

export default configureStore({
  reducer: {
    auth,
    posts,
    postDetail,
  },
});
