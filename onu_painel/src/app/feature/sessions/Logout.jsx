import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './sessionSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = useSelector((state) => state.session.refreshToken);

  useEffect(() => {
    if (refreshToken) {
      dispatch(logoutUser(refreshToken));
    }

    navigate('/login');
  }, []);

  return (
    <div>Logout</div>
  )
}

export default Logout;
