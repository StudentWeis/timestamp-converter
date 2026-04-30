import React, { useState, useEffect } from 'react';
import TimestampDisplay from './components/TimestampDisplay';
import TimestampConverter from './components/TimestampConverter';
import TimezoneSelector from './components/TimezoneSelector';
import { TimestampUnit, getCurrentTimestamp } from './utils/timestamp';
import './styles/App.css';

const App: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(
    getCurrentTimestamp('seconds'),
  );
  const [selectedTimezone, setSelectedTimezone] = useState<number>(8); // UTC+8 default
  const [timestampUnit, setTimestampUnit] =
    useState<TimestampUnit>('milliseconds');

  const handleUnitChange = (newUnit: TimestampUnit) => {
    setTimestampUnit(newUnit);
    setCurrentTimestamp(getCurrentTimestamp(newUnit));
  };

  // Update current timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(getCurrentTimestamp(timestampUnit));
    }, 1000);

    return () => clearInterval(interval);
  }, [timestampUnit]);

  return (
    <div className="app">
      <main className="app-main">
        <section className="section">
          <div className="timezone-controls">
            <TimezoneSelector
              selectedTimezone={selectedTimezone}
              onTimezoneChange={setSelectedTimezone}
            />
            <div className="unit-control">
              <span className="sr-only" id="timestamp-unit-label">
                精度
              </span>
              <div
                className="unit-selector"
                role="group"
                aria-labelledby="timestamp-unit-label"
              >
                <button
                  type="button"
                  className={`unit-btn ${timestampUnit === 'seconds' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('seconds')}
                  aria-pressed={timestampUnit === 'seconds'}
                >
                  秒
                </button>
                <button
                  type="button"
                  className={`unit-btn ${timestampUnit === 'milliseconds' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('milliseconds')}
                  aria-pressed={timestampUnit === 'milliseconds'}
                >
                  毫秒
                </button>
                <button
                  type="button"
                  className={`unit-btn ${timestampUnit === 'microseconds' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('microseconds')}
                  aria-pressed={timestampUnit === 'microseconds'}
                >
                  微秒
                </button>
              </div>
            </div>
          </div>
          <TimestampDisplay
            timestamp={currentTimestamp}
            timezone={selectedTimezone}
            unit={timestampUnit}
          />
        </section>
        <section className="section">
          <TimestampConverter
            timezone={selectedTimezone}
            unit={timestampUnit}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
