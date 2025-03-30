import React, { createContext, useContext, ReactNode } from 'react';
import { format, toZonedTime } from 'date-fns-tz';

// Eastern Time Zone
const ET_TIMEZONE = 'America/New_York';

// Context interface
interface TimezoneContextType {
  formatToET: (date: Date, formatStr: string) => string;
  getCurrentETTime: () => Date;
}

// Create the context with default values
const TimezoneContext = createContext<TimezoneContextType>({
  formatToET: () => '',
  getCurrentETTime: () => new Date(),
});

// Props for the provider component
interface TimezoneProviderProps {
  children: ReactNode;
}

export const TimezoneProvider: React.FC<TimezoneProviderProps> = ({ children }) => {
  // Convert any date to Eastern Time and format it
  const formatToET = (date: Date, formatStr: string): string => {
    const etDate = toZonedTime(date, ET_TIMEZONE);
    return format(etDate, formatStr, { timeZone: ET_TIMEZONE });
  };

  // Get the current time in Eastern Time
  const getCurrentETTime = (): Date => {
    return toZonedTime(new Date(), ET_TIMEZONE);
  };

  const value = {
    formatToET,
    getCurrentETTime,
  };

  return (
    <TimezoneContext.Provider value={value}>
      {children}
    </TimezoneContext.Provider>
  );
};

// Custom hook to use the timezone context
export const useTimezone = (): TimezoneContextType => {
  const context = useContext(TimezoneContext);
  if (context === undefined) {
    throw new Error('useTimezone must be used within a TimezoneProvider');
  }
  return context;
}; 