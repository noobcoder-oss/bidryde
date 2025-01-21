// components/PathDots.js
import React from 'react';

const PathDots = ({ path }) => {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}>
      {path.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${point}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'white',
          }}
        />
      ))}
    </div>
  );
};

export default PathDots;
