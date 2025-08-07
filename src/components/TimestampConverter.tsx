import React, { useState, useEffect } from 'react';
import TimestampDisplay from './TimestampDisplay';
import DateTimePicker from './DateTimePicker';
import { 
  TimestampUnit, 
  getCurrentTimestamp as getTimestamp, 
  isValidTimestamp, 
  parseDateTime
} from '../utils/timestamp';

interface TimestampConverterProps {
  timezone: number;
  unit: TimestampUnit;
}

const TimestampConverter: React.FC<TimestampConverterProps> = ({ timezone, unit }) => {
  const [inputTimestamp, setInputTimestamp] = useState<string>('');
  const [inputDateTime, setInputDateTime] = useState<string>('');
  const [convertedResult, setConvertedResult] = useState<string>('');
  const [resultTimestamp, setResultTimestamp] = useState<number | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const handleTimestampInputChange = (value: string) => {
    // Only allow digits and handle empty strings
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }

    // Limit input length to prevent extremely large numbers
    if (value.length > 20) {
      return;
    }

    setInputTimestamp(value);
    if (inputDateTime !== '') {
      setInputDateTime('');
    }
    setResultTimestamp(null);
    setConvertedResult('');
  };

  const handleDateTimeInputChange = (value: string) => {
    setInputDateTime(value);
    if (inputTimestamp !== '') {
      setInputTimestamp('');
    }
    setResultTimestamp(null);
    setConvertedResult('');
  };

  const getCurrentTimestamp = () => {
    const timestamp = getTimestamp(unit);
    setInputTimestamp(timestamp.toString());
  };

  const getCurrentDateTime = () => {
    // 打开日历选择器而不是直接填入当前时间
    setIsDatePickerOpen(true);
  };

  const handleDateTimeSelect = (selectedDateTime: string) => {
    setInputDateTime(selectedDateTime);
    setIsDatePickerOpen(false);
  };

  // Auto-convert timestamp when input changes
  useEffect(() => {
    if (inputTimestamp.trim() !== '') {
      try {
        const timestamp = parseInt(inputTimestamp, 10);
        if (!isNaN(timestamp) && isValidTimestamp(timestamp, unit)) {
          setResultTimestamp(timestamp);
          setConvertedResult('');
        } else {
          setConvertedResult('时间戳超出合理范围或无效');
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
        const timestamp = parseDateTime(inputDateTime, unit, timezone);
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
          <button onClick={getCurrentDateTime} className="fill-btn calendar-btn" title="打开日历选择器">
            📅 选择日期
          </button>
        </div>
      </div>

      {/* Date Time Picker */}
      <DateTimePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSelect={handleDateTimeSelect}
        timezone={timezone}
        initialValue={inputDateTime}
      />

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
