import React from 'react';

export function ProgressBar ({ progress, currentTime, duration }) {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

  return (
    <div style={{ display: 'flex', width:'100%', height: '4px' }}>
        <span>{formatTime(currentTime)}</span>
      <div style={{ width: '75%', backgroundColor: '#565656' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '4px',
            backgroundColor: 'white',
            alignContent: 'center',
          }}
        />
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
};
