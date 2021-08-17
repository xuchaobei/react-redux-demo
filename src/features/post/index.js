import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostComp from './components/Post';
import ReactionButtons from './components/ReactionButtons';
import { fetchPost, addPostReaction, clearPost } from './postSlice';

const Post = () => {
  const { data, status } = useSelector((state) => state.postDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPost(id));
    return () => {
      dispatch(clearPost());
    };
  }, [id, dispatch]);

  if (status === 'loading') {
    return <div className="loader">Loading...</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <PostComp post={data}>
      <ReactionButtons
        reactions={data.reactions}
        onAddReaction={(reaction) => {
          dispatch(addPostReaction({ ...reaction, id }));
        }}
      />
    </PostComp>
  );
};

export default Post;
