import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid, unwrapResult } from '@reduxjs/toolkit';
import { useHistory,Redirect } from 'react-router-dom';
import AddPostForm from './components/AddPostForm';
import { addPost } from '../../states/postsSlice';

// 版本1
const AddPost1 = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (data) => {
    await dispatch(
      addPost({
        ...data,
        id: nanoid(),
      }),
    );
    history.push('/');
  };

  return (
    <AddPostForm onSubmit={handleSubmit} />
  )
};


const AddPost2 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);


  if (!user) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (data) => {
    try {
      setAddRequestStatus('pending');
      const resultAction = await dispatch(
        addPost({
          ...data,
          userId: user.id
        }),
      );
      unwrapResult(resultAction);
      setAddRequestStatus('idle');
      history.push('/');
    } catch (err) {
      setError(err.message);
      setAddRequestStatus('idle');
    }
  };


  return (
    <section>
      {addRequestStatus === 'pending' && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <AddPostForm onSubmit={handleSubmit} />
    </section>
  )
};

// export default AddPost1;
export default AddPost2;
