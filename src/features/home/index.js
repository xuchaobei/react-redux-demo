import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostListComp from './components/PostList';
import { fetchPosts } from '../../states/postsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const {posts, status, error} = useSelector((state) => state.posts)

  useEffect(() => {
    if(status === 'idle'){
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (status === 'succeeded') {
    content = <PostListComp posts={posts} />;
  } else if (status === 'error') {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;

};

export default Home;
