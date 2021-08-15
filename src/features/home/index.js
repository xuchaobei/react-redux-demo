import React from 'react';
import { useSelector } from 'react-redux';
import PostListComp from './components/PostList';

const Home = () => {
  const posts = useSelector((state) => state.posts)

  return (
    <section>
      <PostListComp posts={posts} />
    </section>
  );

};

export default Home;
