import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { NEW_THREAT_URL } from '../../api/consts';
import { createThreat } from './threatSlice';
import { useDispatch, useSelector } from 'react-redux';

function ThreatPolling() {
  const socket = io(NEW_THREAT_URL);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const accessToken = useSelector((state) => state.session.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);

      socket.on('occurrence', (data) => {
        console.log(data);
        // handleIncomingThreat(data);
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('ocurrence');
      socket.off('disconnect');
    };
  }, []);

  async function handleIncomingThreat(data) {
    const payload = {
      name: data.monsterName,
      tier: data.dangerLevel,
      latitude: data.location[0].lat,
      longitude: data.location[0].lng,
      accessToken: accessToken
    };

    console.log(payload);

    const response = await dispatch(createThreat(payload));
    console.log(response);
  }

  return (
    <p>Connected: { '' + isConnected }</p>
  );
}

export default ThreatPolling;