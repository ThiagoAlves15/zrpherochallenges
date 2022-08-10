import React, { useEffect, useState } from 'react';

function Timer(props) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);

    // get available heros
    // get unresolved threats
    // create occurrence
    // unbusy heroes

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      Time: {time}
    </div>
  );
}

export default Timer;