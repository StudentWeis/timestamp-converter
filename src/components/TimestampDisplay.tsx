import React, { useState } from 'react';

interface TimestampDisplayProps {
  timestamp: number;
  timezone: number;
  unit: 'seconds' | 'milliseconds' | 'microseconds';
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({ timestamp, timezone, unit }) => {
  const [copiedItem, setCopiedItem] = useState<'timestamp' | 'datetime' | null>(null);

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

  const copyToClipboard = async (text: string, type: 'timestamp' | 'datetime') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const adjustedDate = getDateWithTimezone(timestamp, timezone);
  const formattedDate = formatDateTime(adjustedDate);

  return (
    <div className="timestamp-display">
      <div className="timestamp-info">
        <div className="timestamp-row">
          <div 
            className={`timestamp-value yellow clickable ${copiedItem === 'timestamp' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(timestamp.toString(), 'timestamp')}
            title={copiedItem === 'timestamp' ? '已复制！' : '点击复制时间戳'}
          >
            {timestamp}
            {copiedItem === 'timestamp' && <span className="copy-indicator">✓</span>}
          </div>
          <div 
            className={`timestamp-value clickable ${copiedItem === 'datetime' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(formattedDate, 'datetime')}
            title={copiedItem === 'datetime' ? '已复制！' : '点击复制时间'}
          >
            {formattedDate}
            {copiedItem === 'datetime' && <span className="copy-indicator">✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampDisplay;
