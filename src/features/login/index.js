import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { login } from '../../states/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      const resultAction = await dispatch(login(data));
      unwrapResult(resultAction);
      history.push('/editor');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      {error && <div className="error">{error}</div>}
      <LoginForm onSubmit={handleSubmit} />
    </section>
  );
};

export default Login;
