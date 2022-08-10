import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { OCURRENCES_URL } from '../api/consts';
import { createThreat } from './threats/threatSlice';
import { useSelector } from 'react-redux';

function OccurrencePolling() {
  const socket = io(OCURRENCES_URL);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const accessToken = useSelector((state) => state.session.accessToken);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', (reason) => {
      setIsConnected(false);
    });

    socket.on('occurrence', data => {
      console.log(data);
      // handleThreat(data)
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('ocurrence');
    };
  }, []);

  async function handleThreat(data) {
    const payload = {
      name: data.monsterName,
      tier: data.dangerLevel,
      latitude: data.location[0].lat,
      longitude: data.location[0].lng,
      accessToken: accessToken
    };

    const response = await dispatch(createThreat(payload));
    console.log(response);
  }

  return (
    <p>Connected: { '' + isConnected }</p>
  );
}

export default OccurrencePolling;