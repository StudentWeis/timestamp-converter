import React, { useState, useEffect } from 'react';
import TimestampDisplay from './components/TimestampDisplay';
import TimestampConverter from './components/TimestampConverter';
import TimezoneSelector from './components/TimezoneSelector';
import './styles/App.css';

interface AppState {
  currentTimestamp: number;
  selectedTimezone: number;
  timestampUnit: 'seconds' | 'milliseconds' | 'microseconds';
}

const App: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [selectedTimezone, setSelectedTimezone] = useState<number>(8); // UTC+8 (China Standard Time)
  const [timestampUnit, setTimestampUnit] = useState<'seconds' | 'milliseconds' | 'microseconds'>('seconds');

  // Function to handle unit change with immediate update
  const handleUnitChange = (newUnit: 'seconds' | 'milliseconds' | 'microseconds') => {
    setTimestampUnit(newUnit);
    // Immediately update timestamp to reflect the new unit
    const now = Date.now();
    if (newUnit === 'seconds') {
      setCurrentTimestamp(Math.floor(now / 1000));
    } else if (newUnit === 'milliseconds') {
      setCurrentTimestamp(now);
    } else { // microseconds
      setCurrentTimestamp(now * 1000); // Convert to microseconds
    }
  };

  // Update current timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (timestampUnit === 'seconds') {
        setCurrentTimestamp(Math.floor(now / 1000));
      } else if (timestampUnit === 'milliseconds') {
        setCurrentTimestamp(now);
      } else { // microseconds
        setCurrentTimestamp(now * 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timestampUnit]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🕐 时间戳工具</h1>
      </header>

      <main className="app-main">
        <section className="section">
          <div className="timezone-controls">
            <TimezoneSelector
              selectedTimezone={selectedTimezone}
              onTimezoneChange={setSelectedTimezone}
            />
            <div className="unit-selector">
              <button
                className={`unit-btn ${timestampUnit === 'seconds' ? 'active' : ''}`}
                onClick={() => handleUnitChange('seconds')}
              >
                秒
              </button>
              <button
                className={`unit-btn ${timestampUnit === 'milliseconds' ? 'active' : ''}`}
                onClick={() => handleUnitChange('milliseconds')}
              >
                毫秒
              </button>
              <button
                className={`unit-btn ${timestampUnit === 'microseconds' ? 'active' : ''}`}
                onClick={() => handleUnitChange('microseconds')}
              >
                微秒
              </button>
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
