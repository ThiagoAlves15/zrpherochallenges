import React, { useEffect, useState } from 'react';

function Timer() {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);

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