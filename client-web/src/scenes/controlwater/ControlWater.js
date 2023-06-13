import React, { useState } from 'react';
import axios from 'axios';

const ControlWater = () => {
  const [valveState, setValveState] = useState('');

  const handleValveToggle = (state) => {
    axios.post('/api/valve', { state })
      .then(() => {
        setValveState(state);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={() => handleValveToggle('on')}>Open Valve</button>
      <button onClick={() => handleValveToggle('off')}>Close Valve</button>
      <p>Valve State: {valveState}</p>
    </div>
  );
};

export default ControlWater;
