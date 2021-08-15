import React from 'react';
import './style.css';

const PostList = (props) => {
  const { posts } = props;

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <div className="post-list">
      <h2>Posts</h2>
      {renderedPosts}
    </div>
  );
};

export default PostList;
