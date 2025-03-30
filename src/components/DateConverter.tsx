import React, { useState } from 'react';
import { useTimezone } from '../contexts/TimezoneContext';

const DateConverter: React.FC = () => {
  const { formatToET } = useTimezone();
  const [inputDate, setInputDate] = useState<string>('');
  const [convertedDate, setConvertedDate] = useState<string>('');
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };
  
  const handleConvert = () => {
    try {
      const date = new Date(inputDate);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      setConvertedDate(formatToET(date, 'yyyy-MM-dd HH:mm:ss zzz'));
    } catch (error) {
      setConvertedDate('Invalid date');
    }
  };
  
  return (
    <div className="date-converter">
      <h2>Convert Date to Eastern Time</h2>
      <div className="converter-form">
        <input 
          type="datetime-local" 
          value={inputDate} 
          onChange={handleDateChange} 
        />
        <button onClick={handleConvert}>Convert</button>
      </div>
      {convertedDate && (
        <div className="result">
          <h3>Result:</h3>
          <p>{convertedDate}</p>
        </div>
      )}
    </div>
  );
};

export default DateConverter; 