import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function OnuBoard() {
  const currentUser = useSelector((state) => state.session.currentUser);
  const accessToken = useSelector((state) => state.session.accessToken);
  const refreshToken = useSelector((state) => state.session.refreshToken);

  return (
    <section>
      <h1>OnuBoard</h1>

      <ul>
        <li>Current User
          <ul>
            <li>Id: {currentUser?.id} </li>
            <li>email: {currentUser?.email} </li>
            <li>role: {currentUser?.role} </li>
            <li>createdAt: {currentUser?.createdAt} </li>
          </ul>
        </li>

        <li>Access token: {accessToken}</li>
        <li>Refresh Token: {refreshToken}</li>
      </ul>
    </section>
  )
}

export default OnuBoard;
