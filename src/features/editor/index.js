import React from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import AddPostForm from './components/AddPostForm';
import { addPost } from '../../states/postsSlice';

const AddPost = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (data) => {
    dispatch(
      addPost({
        ...data,
        id: nanoid(),
      }),
    );
    history.push('/');
  };

  return <AddPostForm onSubmit={handleSubmit} />;
};

export default AddPost;
