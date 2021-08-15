import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice'

export default configureStore({
  reducer: {
    posts
  },
});
