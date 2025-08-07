import React, { useState, useEffect } from 'react';
import TimestampDisplay from './TimestampDisplay';

interface TimestampConverterProps {
  timezone: number;
  unit: 'seconds' | 'milliseconds' | 'microseconds';
}

const TimestampConverter: React.FC<TimestampConverterProps> = ({ timezone, unit }) => {
  const [inputTimestamp, setInputTimestamp] = useState<string>('');
  const [inputDateTime, setInputDateTime] = useState<string>('');
  const [convertedResult, setConvertedResult] = useState<string>('');
  const [resultTimestamp, setResultTimestamp] = useState<number | null>(null);

  const formatDateTime = (timestamp: number, timezoneOffset: number): string => {
    try {
      // Check if timestamp is within reasonable range
      if (!Number.isFinite(timestamp) || timestamp < 0) {
        throw new Error('Invalid timestamp');
      }

      let utcTime: number;
      if (unit === 'seconds') {
        // Check for reasonable timestamp range (1970-2100)
        if (timestamp > 4102444800) { // 2100-01-01 in seconds
          throw new Error('Timestamp too large');
        }
        utcTime = timestamp * 1000;
      } else if (unit === 'milliseconds') {
        // Check for reasonable timestamp range
        if (timestamp > 4102444800000) { // 2100-01-01 in milliseconds
          throw new Error('Timestamp too large');
        }
        utcTime = timestamp;
      } else { // microseconds
        // Check for reasonable timestamp range
        if (timestamp > 4102444800000000) { // 2100-01-01 in microseconds
          throw new Error('Timestamp too large');
        }
        utcTime = timestamp / 1000;
      }

      const localTime = utcTime + (timezoneOffset * 60 * 60 * 1000);
      const date = new Date(localTime);

      // Check if the resulting date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      return date.toISOString().slice(0, 19).replace('T', ' ');
    } catch (error) {
      throw new Error('无法格式化时间戳');
    }
  };

  const parseDateTime = (dateTimeString: string, timezoneOffset: number): number => {
    // Parse the date string and adjust for timezone
    const date = new Date(dateTimeString + 'Z'); // Treat as UTC
    const utcTime = date.getTime();
    const localTime = utcTime - (timezoneOffset * 60 * 60 * 1000);
    if (unit === 'seconds') {
      return Math.floor(localTime / 1000);
    } else if (unit === 'milliseconds') {
      return localTime;
    } else { // microseconds
      return localTime * 1000;
    }
  };

  const handleTimestampInputChange = (value: string) => {
    // Only allow digits and handle empty strings
    if (value !== '' && !/^\d+$/.test(value)) {
      return; // Don't update if input contains non-digits
    }

    // Limit input length to prevent extremely large numbers
    if (value.length > 20) {
      return; // Don't update if input is too long
    }

    setInputTimestamp(value);
    // Clear datetime input when timestamp input changes
    if (inputDateTime !== '') {
      setInputDateTime('');
    }
    // Clear result when input changes
    setResultTimestamp(null);
    setConvertedResult('');
  };

  const handleDateTimeInputChange = (value: string) => {
    setInputDateTime(value);
    // Clear timestamp input when datetime input changes
    if (inputTimestamp !== '') {
      setInputTimestamp('');
    }
    // Clear result when input changes
    setResultTimestamp(null);
    setConvertedResult('');
  };

  const getCurrentTimestamp = () => {
    const now = Date.now();
    let timestamp;
    if (unit === 'seconds') {
      timestamp = Math.floor(now / 1000);
    } else if (unit === 'milliseconds') {
      timestamp = now;
    } else { // microseconds
      timestamp = now * 1000;
    }
    setInputTimestamp(timestamp.toString());
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    let timestamp;
    if (unit === 'seconds') {
      timestamp = Math.floor(now.getTime() / 1000);
    } else if (unit === 'milliseconds') {
      timestamp = now.getTime();
    } else { // microseconds
      timestamp = now.getTime() * 1000;
    }
    const formatted = formatDateTime(timestamp, timezone);
    setInputDateTime(formatted);
  };

  // Auto-convert timestamp when input changes
  useEffect(() => {
    if (inputTimestamp.trim() !== '') {
      try {
        const timestamp = parseInt(inputTimestamp, 10);
        if (!isNaN(timestamp) && Number.isFinite(timestamp) && timestamp >= 0) {
          // Additional range checks based on unit
          let isValid = false;
          if (unit === 'seconds' && timestamp <= 4102444800) {
            isValid = true;
          } else if (unit === 'milliseconds' && timestamp <= 4102444800000) {
            isValid = true;
          } else if (unit === 'microseconds' && timestamp <= 4102444800000000) {
            isValid = true;
          }

          if (isValid) {
            setResultTimestamp(timestamp);
            setConvertedResult('');
          } else {
            setConvertedResult('时间戳超出合理范围（不能晚于2100年）');
            setResultTimestamp(null);
          }
        } else {
          setConvertedResult('无效的时间戳');
          setResultTimestamp(null);
        }
      } catch (error) {
        setConvertedResult('时间戳过大或无效');
        setResultTimestamp(null);
      }
    } else {
      setConvertedResult('');
      setResultTimestamp(null);
    }
  }, [inputTimestamp, timezone, unit]);

  // Auto-convert datetime when input changes
  useEffect(() => {
    if (inputDateTime.trim() !== '') {
      try {
        const timestamp = parseDateTime(inputDateTime, timezone);
        setResultTimestamp(timestamp);
        setConvertedResult('');
      } catch (error) {
        setConvertedResult('无效的日期格式。请使用：YYYY-MM-DD HH:MM:SS');
        setResultTimestamp(null);
      }
    } else if (inputTimestamp.trim() === '') {
      setConvertedResult('');
      setResultTimestamp(null);
    }
  }, [inputDateTime, timezone, unit]);

  return (
    <div className="timestamp-converter">
      <h3>时间戳转换</h3>
      {/* Timestamp to DateTime */}
      <div className="converter-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="输入时间戳"
            value={inputTimestamp}
            onChange={(e) => handleTimestampInputChange(e.target.value)}
            className="converter-input"
          />
          <button onClick={getCurrentTimestamp} className="fill-btn" title="填入当前时间戳">
            现在
          </button>
        </div>
      </div>

      {/* DateTime to Timestamp */}
      <div className="converter-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="YYYY-MM-DD HH:MM:SS"
            value={inputDateTime}
            onChange={(e) => handleDateTimeInputChange(e.target.value)}
            className="converter-input"
          />
          <button onClick={getCurrentDateTime} className="fill-btn" title="填入当前时间">
            现在
          </button>
        </div>
      </div>

      {/* Result using TimestampDisplay component */}
      {resultTimestamp !== null && (
        <TimestampDisplay
          timestamp={resultTimestamp}
          timezone={timezone}
          unit={unit}
        />
      )}

      {/* Error message */}
      {convertedResult && resultTimestamp === null && (
        <div className="result-text error">{convertedResult}</div>
      )}
    </div>
  );
};

export default TimestampConverter;
