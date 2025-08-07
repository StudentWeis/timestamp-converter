import React from 'react';

interface TimestampDisplayProps {
  timestamp: number;
  timezone: number;
  unit: 'seconds' | 'milliseconds' | 'microseconds';
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({ timestamp, timezone, unit }) => {
  // Create date object with timezone offset
  const getDateWithTimezone = (timestamp: number, timezoneOffset: number): Date => {
    let utcTime: number;
    if (unit === 'seconds') {
      utcTime = timestamp * 1000;
    } else if (unit === 'milliseconds') {
      utcTime = timestamp;
    } else { // microseconds
      utcTime = timestamp / 1000;
    }
    const localTime = utcTime + (timezoneOffset * 60 * 60 * 1000);
    return new Date(localTime);
  };

  const formatDateTime = (date: Date): string => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  const adjustedDate = getDateWithTimezone(timestamp, timezone);
  const formattedDate = formatDateTime(adjustedDate);

  return (
    <div className="timestamp-display">
      <div className="timestamp-info">
        <div className="timestamp-row">
          <div className="timestamp-value yellow">{timestamp}</div>
          <div className="timestamp-value">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default TimestampDisplay;
