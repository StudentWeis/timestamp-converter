import React from 'react';
import { timezones } from '../constants/timezones';

interface TimezoneSelectProps {
  selectedTimezone: number;
  onTimezoneChange: (timezone: number) => void;
}

const TimezoneSelector: React.FC<TimezoneSelectProps> = ({
  selectedTimezone,
  onTimezoneChange,
}) => {
  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newTimezone = parseInt(event.target.value, 10);
    onTimezoneChange(newTimezone);
  };

  return (
    <div className="timezone-selector compact">
      <label className="sr-only" htmlFor="timezone-select">
        时区
      </label>
      <div className="selector-container">
        <select
          id="timezone-select"
          value={selectedTimezone}
          onChange={handleTimezoneChange}
          className="timezone-select"
          aria-label="选择时区"
        >
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimezoneSelector;
