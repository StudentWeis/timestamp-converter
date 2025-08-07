import React from 'react';
import { timezones } from '../constants/timezones';

interface TimezoneSelectProps {
  selectedTimezone: number;
  onTimezoneChange: (timezone: number) => void;
}

const TimezoneSelector: React.FC<TimezoneSelectProps> = ({ 
  selectedTimezone, 
  onTimezoneChange 
}) => {
  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimezone = parseInt(event.target.value, 10);
    onTimezoneChange(newTimezone);
  };

  return (
    <div className="timezone-selector compact">
      <div className="selector-container">
        <select
          value={selectedTimezone}
          onChange={handleTimezoneChange}
          className="timezone-select"
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
