import React from 'react';
import TimeAgo from '../../../../components/TimeAgo';

const Post = (props) => {
  const {
    post: { title, user, date, content },
    children,
  } = props;

  return (
    <section>
      <article className="post">
        <h2>{title}</h2>
        <div>
          <span>by {user ? user.username : 'Unknown author'}</span>
          <TimeAgo timestamp={date} />
        </div>
        <p className="post-content">{content}</p>
        {children}
      </article>
    </section>
  );
};

export default Post;
