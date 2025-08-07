import React, { useState } from 'react';

interface TimestampDisplayProps {
  timestamp: number;
  timezone: number;
  unit: 'seconds' | 'milliseconds' | 'microseconds';
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({ timestamp, timezone, unit }) => {
  const [copiedItem, setCopiedItem] = useState<'timestamp' | 'datetime' | null>(null);

  // Create date object with timezone offset with error handling
  const getDateWithTimezone = (timestamp: number, timezoneOffset: number): Date | null => {
    try {
      // Check if timestamp is within reasonable range first
      if (!Number.isFinite(timestamp) || timestamp < 0) {
        return null;
      }

      let utcTime: number;
      if (unit === 'seconds') {
        // Check for reasonable timestamp range (1970-2100)
        if (timestamp > 4102444800) {
          return null;
        }
        utcTime = timestamp * 1000;
      } else if (unit === 'milliseconds') {
        // Check for reasonable timestamp range
        if (timestamp > 4102444800000) {
          return null;
        }
        utcTime = timestamp;
      } else { // microseconds
        // Check for reasonable timestamp range
        if (timestamp > 4102444800000000) {
          return null;
        }
        utcTime = timestamp / 1000;
      }

      // Additional check for utcTime
      if (!Number.isFinite(utcTime) || utcTime < 0) {
        return null;
      }

      const localTime = utcTime + (timezoneOffset * 60 * 60 * 1000);
      const date = new Date(localTime);

      // Check if the resulting date is valid
      if (isNaN(date.getTime())) {
        return null;
      }

      return date;
    } catch (error) {
      return null;
    }
  };

  const formatDateTime = (date: Date | null): string => {
    if (!date || isNaN(date.getTime())) {
      return '无效的时间戳';
    }
    try {
      return date.toISOString().slice(0, 19).replace('T', ' ');
    } catch (error) {
      return '时间格式错误';
    }
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
  const isValidTimestamp = adjustedDate !== null;

  // Don't render if timestamp is invalid to prevent crashes
  if (!isValidTimestamp) {
    return (
      <div className="timestamp-display">
        <div className="timestamp-info">
          <div className="result-text error">
            时间戳过大或无效，无法显示
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="timestamp-display">
      <div className="timestamp-info">
        <div className="timestamp-row">
          <div
            className={`timestamp-value clickable ${copiedItem === 'datetime' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(formattedDate, 'datetime')}
            title={copiedItem === 'datetime' ? '已复制！' : '点击复制时间'}
          >
            {formattedDate}
            {copiedItem === 'datetime' && <span className="copy-indicator">✓</span>}
          </div>
          <div
            className={`timestamp-value yellow clickable ${copiedItem === 'timestamp' ? 'copied' : ''}`}
            onClick={() => copyToClipboard(timestamp.toString(), 'timestamp')}
            title={copiedItem === 'timestamp' ? '已复制！' : '点击复制时间戳'}
          >
            {timestamp}
            {copiedItem === 'timestamp' && <span className="copy-indicator">✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampDisplay;
