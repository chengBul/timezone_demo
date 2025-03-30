import React, { useState, useEffect } from 'react';
import { useTimezone } from '../contexts/TimezoneContext';

const Clock: React.FC = () => {
  const { formatToET } = useTimezone();
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(formatToET(now, 'yyyy-MM-dd HH:mm:ss zzz'));
    };
    
    // Update immediately
    updateClock();
    
    // Update every second
    const intervalId = setInterval(updateClock, 1000);
    
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [formatToET]);
  
  return (
    <div className="clock">
      <h2>Current Eastern Time</h2>
      <div className="time">{time}</div>
      <div className="local-info">
        <p>Your local time: {new Date().toLocaleString()}</p>
        <p>Your local timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
      </div>
    </div>
  );
};

export default Clock; 