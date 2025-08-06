import React from 'react';

interface TimestampDisplayProps {
  timestamp: number;
  timezone: number;
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({ timestamp, timezone }) => {
  // Create date object with timezone offset
  const getDateWithTimezone = (timestamp: number, timezoneOffset: number): Date => {
    const utcTime = timestamp * 1000;
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
      <h2>Current Timestamp</h2>
      <div className="timestamp-info">
        <div className="timestamp-row">
          <div className="timestamp-value large">{timestamp}</div>
        </div>
        <div className="timestamp-row">
          <div className="timestamp-value">{formattedDate}</div>
        </div>
        <div className="timestamp-row">
          <div className="timestamp-value">
            UTC{timezone >= 0 ? '+' : ''}{timezone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampDisplay;
