import React, { useState } from 'react';

interface TimestampConverterProps {
  timezone: number;
}

const TimestampConverter: React.FC<TimestampConverterProps> = ({ timezone }) => {
  const [inputTimestamp, setInputTimestamp] = useState<string>('');
  const [inputDateTime, setInputDateTime] = useState<string>('');
  const [convertedResult, setConvertedResult] = useState<string>('');

  const formatDateTime = (timestamp: number, timezoneOffset: number): string => {
    const utcTime = timestamp * 1000;
    const localTime = utcTime + (timezoneOffset * 60 * 60 * 1000);
    const date = new Date(localTime);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  const parseDateTime = (dateTimeString: string, timezoneOffset: number): number => {
    // Parse the date string and adjust for timezone
    const date = new Date(dateTimeString + 'Z'); // Treat as UTC
    const utcTime = date.getTime();
    const localTime = utcTime - (timezoneOffset * 60 * 60 * 1000);
    return Math.floor(localTime / 1000);
  };

  const handleTimestampConvert = () => {
    const timestamp = parseInt(inputTimestamp, 10);
    if (!isNaN(timestamp)) {
      const converted = formatDateTime(timestamp, timezone);
      setConvertedResult(`Timestamp ${timestamp} → ${converted} (UTC${timezone >= 0 ? '+' : ''}${timezone})`);
    } else {
      setConvertedResult('Invalid timestamp');
    }
  };

  const handleDateTimeConvert = () => {
    try {
      const timestamp = parseDateTime(inputDateTime, timezone);
      setConvertedResult(`${inputDateTime} (UTC${timezone >= 0 ? '+' : ''}${timezone}) → ${timestamp}`);
    } catch (error) {
      setConvertedResult('Invalid date format. Use: YYYY-MM-DD HH:MM:SS');
    }
  };

  const getCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000);
    setInputTimestamp(now.toString());
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const formatted = formatDateTime(Math.floor(now.getTime() / 1000), timezone);
    setInputDateTime(formatted);
  };

  return (
    <div className="timestamp-converter">
      <h3>Convert Timestamp</h3>
      
      {/* Timestamp to DateTime */}
      <div className="converter-section">
        <h4>Unix Timestamp → Human Readable</h4>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter unix timestamp"
            value={inputTimestamp}
            onChange={(e) => setInputTimestamp(e.target.value)}
            className="converter-input"
          />
          <button onClick={handleTimestampConvert} className="convert-btn">
            Convert
          </button>
          <button onClick={getCurrentTimestamp} className="fill-btn" title="Fill current timestamp">
            Now
          </button>
        </div>
      </div>

      {/* DateTime to Timestamp */}
      <div className="converter-section">
        <h4>Human Readable → Unix Timestamp</h4>
        <div className="input-group">
          <input
            type="text"
            placeholder="YYYY-MM-DD HH:MM:SS"
            value={inputDateTime}
            onChange={(e) => setInputDateTime(e.target.value)}
            className="converter-input"
          />
          <button onClick={handleDateTimeConvert} className="convert-btn">
            Convert
          </button>
          <button onClick={getCurrentDateTime} className="fill-btn" title="Fill current datetime">
            Now
          </button>
        </div>
      </div>

      {/* Result */}
      {convertedResult && (
        <div className="converter-result">
          <h4>Result:</h4>
          <div className="result-text">{convertedResult}</div>
        </div>
      )}
    </div>
  );
};

export default TimestampConverter;
