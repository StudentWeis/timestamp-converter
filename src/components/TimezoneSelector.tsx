import React, { useState } from 'react';

interface TimezoneSelectProps {
  selectedTimezone: number;
  onTimezoneChange: (timezone: number) => void;
}

const timezones = [
  { label: 'UTC-12 (贝克岛)', value: -12 },
  { label: 'UTC-11 (夏威夷)', value: -11 },
  { label: 'UTC-10 (阿拉斯加)', value: -10 },
  { label: 'UTC-9 (阿拉斯加)', value: -9 },
  { label: 'UTC-8 (洛杉矶)', value: -8 },
  { label: 'UTC-7 (丹佛)', value: -7 },
  { label: 'UTC-6 (芝加哥)', value: -6 },
  { label: 'UTC-5 (纽约)', value: -5 },
  { label: 'UTC-4 (圣地亚哥)', value: -4 },
  { label: 'UTC-3 (巴西)', value: -3 },
  { label: 'UTC-2 (大西洋)', value: -2 },
  { label: 'UTC-1 (佛得角)', value: -1 },
  { label: 'UTC+0 (伦敦)', value: 0 },
  { label: 'UTC+1 (巴黎)', value: 1 },
  { label: 'UTC+2 (开罗)', value: 2 },
  { label: 'UTC+3 (莫斯科)', value: 3 },
  { label: 'UTC+4 (迪拜)', value: 4 },
  { label: 'UTC+5 (伊斯兰堡)', value: 5 },
  { label: 'UTC+6 (达卡)', value: 6 },
  { label: 'UTC+7 (曼谷)', value: 7 },
  { label: 'UTC+8 (北京)', value: 8 },
  { label: 'UTC+9 (东京)', value: 9 },
  { label: 'UTC+10 (悉尼)', value: 10 },
  { label: 'UTC+11 (所罗门群岛)', value: 11 },
  { label: 'UTC+12 (新西兰)', value: 12 }
];

const TimezoneSelector: React.FC<TimezoneSelectProps> = ({ selectedTimezone, onTimezoneChange }) => {
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
