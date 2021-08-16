import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from '../../../../components/TimeAgo';
import './style.css';

const PostList = (props) => {
  const { posts } = props;

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <span>by {post.user ? post.user.username : 'Unknown author'}</span>
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
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
