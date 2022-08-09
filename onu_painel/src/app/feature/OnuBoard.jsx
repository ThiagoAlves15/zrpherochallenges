import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { OCURRENCES_URL } from '../api/consts';

const socket = io(OCURRENCES_URL);

function OnuBoard() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastOcurrence, setLastOcurrence] = useState(null);

  const currentUser = useSelector((state) => state.session.currentUser);
  const accessToken = useSelector((state) => state.session.accessToken);
  const refreshToken = useSelector((state) => state.session.refreshToken);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', (reason) => {
      console.log(reason);
      setIsConnected(false);
    });

    socket.on('ocurrence', data => {
      setLastOcurrence(data);
    });

    socket.on('connect_error', (error) => {
      console.log(error);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('ocurrence');
      socket.off('connect_error');
    };
  }, []);

  return (
    <section>
      <h1>OnuBoard</h1>

      <p>Connected: { '' + isConnected }</p>
      <p>Last ocurrence: { lastOcurrence || '-' }</p>

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
