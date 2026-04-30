import React, { useEffect, useRef, useState } from 'react';
import DateTimePicker from './DateTimePicker';
import { 
  TimestampUnit, 
  getCurrentTimestamp as getTimestamp, 
  formatTimestamp,
  isValidTimestamp, 
  parseDateTime,
  timestampToUTC,
  utcMillisecondsToTimestamp,
} from '../utils/timestamp';

interface TimestampConverterProps {
  timezone: number;
  unit: TimestampUnit;
}

const TimestampConverter: React.FC<TimestampConverterProps> = ({ timezone, unit }) => {
  const [inputTimestamp, setInputTimestamp] = useState<string>('');
  const [inputDateTime, setInputDateTime] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [syncedUtcTime, setSyncedUtcTime] = useState<number | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const dateTimeInputRef = useRef<HTMLInputElement>(null);
  const datePickerTriggerRef = useRef<HTMLButtonElement>(null);
  const previousConfigRef = useRef({ timezone, unit });
  const timestampError = inputTimestamp.trim() !== '' && errorMessage !== '';
  const dateTimeError = inputDateTime.trim() !== '' && errorMessage !== '';

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
    window.requestAnimationFrame(() => {
      datePickerTriggerRef.current?.focus();
    });
  };

  const syncFromTimestamp = (value: string) => {
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }

    if (value.length > 20) {
      return;
    }

    setInputTimestamp(value);
    if (value.trim() === '') {
      setInputTimestamp('');
      setInputDateTime('');
      setSyncedUtcTime(null);
      setErrorMessage('');
      return;
    }

    try {
      const timestamp = Number.parseInt(value, 10);

      if (!isValidTimestamp(timestamp, unit)) {
        throw new Error('Invalid timestamp');
      }

      setInputDateTime(formatTimestamp(timestamp, unit, timezone));
      setSyncedUtcTime(timestampToUTC(timestamp, unit));
      setErrorMessage('');
    } catch (error) {
      setInputDateTime('');
      setSyncedUtcTime(null);
      setErrorMessage('时间戳超出合理范围或无效');
    }
  };

  const syncFromDateTime = (value: string) => {
    setInputDateTime(value);

    if (value.trim() === '') {
      setInputTimestamp('');
      setInputDateTime('');
      setSyncedUtcTime(null);
      setErrorMessage('');
      return;
    }

    try {
      const timestamp = parseDateTime(value, unit, timezone);

      if (!isValidTimestamp(timestamp, unit)) {
        throw new Error('Invalid timestamp range');
      }

      setInputTimestamp(timestamp.toString());
      setSyncedUtcTime(timestampToUTC(timestamp, unit));
      setErrorMessage('');
    } catch (error) {
      setInputTimestamp('');
      setSyncedUtcTime(null);
      setErrorMessage('无效的日期格式。请使用：YYYY-MM-DD HH:MM:SS');
    }
  };

  const getCurrentTimestamp = () => {
    syncFromTimestamp(getTimestamp(unit).toString());
  };

  const getCurrentDateTime = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateTimeSelect = (selectedDateTime: string) => {
    syncFromDateTime(selectedDateTime);
    setIsDatePickerOpen(false);
    window.requestAnimationFrame(() => {
      dateTimeInputRef.current?.focus();
    });
  };

  useEffect(() => {
    const previousConfig = previousConfigRef.current;
    const configChanged = previousConfig.timezone !== timezone || previousConfig.unit !== unit;

    previousConfigRef.current = { timezone, unit };

    if (!configChanged || syncedUtcTime === null) {
      return;
    }

    const nextTimestamp = utcMillisecondsToTimestamp(syncedUtcTime, unit);

    if (!isValidTimestamp(nextTimestamp, unit)) {
      setInputTimestamp('');
      setInputDateTime('');
      setSyncedUtcTime(null);
      setErrorMessage('时间戳超出合理范围或无效');
      return;
    }

    setInputTimestamp(nextTimestamp.toString());
    setInputDateTime(formatTimestamp(nextTimestamp, unit, timezone));
    setErrorMessage('');
  }, [syncedUtcTime, timezone, unit]);

  return (
    <div className="timestamp-converter">
      <div className="field-group converter-section">
        <label className="sr-only" htmlFor="timestamp-input">时间戳</label>
        <div className="input-group">
          <input
            id="timestamp-input"
            type="text"
            placeholder="时间戳"
            value={inputTimestamp}
            onChange={(e) => syncFromTimestamp(e.target.value)}
            className="converter-input"
            inputMode="numeric"
            aria-invalid={timestampError}
            aria-describedby={timestampError ? 'converter-status' : undefined}
          />
          <button
            type="button"
            onClick={getCurrentTimestamp}
            className="fill-btn"
            title="填入当前时间戳"
            aria-label="填入当前时间戳"
          >
            现在
          </button>
        </div>
      </div>

      <div className="field-group converter-section">
        <label className="sr-only" htmlFor="datetime-input">日期时间</label>
        <div className="input-group">
          <input
            ref={dateTimeInputRef}
            id="datetime-input"
            type="text"
            placeholder="YYYY-MM-DD HH:MM:SS"
            value={inputDateTime}
            onChange={(e) => syncFromDateTime(e.target.value)}
            className="converter-input"
            aria-invalid={dateTimeError}
            aria-describedby={dateTimeError ? 'converter-status' : undefined}
          />
          <button
            ref={datePickerTriggerRef}
            type="button"
            onClick={getCurrentDateTime}
            className="fill-btn calendar-btn"
            title="打开日期时间选择器"
            aria-label="打开日期时间选择器"
            aria-haspopup="dialog"
            aria-expanded={isDatePickerOpen}
            aria-controls="datetime-picker-dialog"
          >
            日期
          </button>
        </div>
      </div>

      <DateTimePicker
        isOpen={isDatePickerOpen}
        onClose={closeDatePicker}
        onSelect={handleDateTimeSelect}
        timezone={timezone}
        initialValue={inputDateTime}
      />

      {errorMessage && (
        <div className="result-text error" id="converter-status" role="alert">{errorMessage}</div>
      )}
    </div>
  );
};

export default TimestampConverter;
