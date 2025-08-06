import React, { useState, useEffect } from 'react';
import TimestampDisplay from './components/TimestampDisplay';
import TimestampConverter from './components/TimestampConverter';
import TimezoneSelector from './components/TimezoneSelector';
import './styles/App.css';

interface AppState {
  currentTimestamp: number;
  selectedTimezone: number;
}

const App: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [selectedTimezone, setSelectedTimezone] = useState<number>(0); // UTC offset in hours

  // Update current timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🕐 Timestamp Converter</h1>
      </header>

      <main className="app-main">
        <section className="section">
          <TimezoneSelector
            selectedTimezone={selectedTimezone}
            onTimezoneChange={setSelectedTimezone}
          />
        </section>
        <section className="section">
          <TimestampDisplay
            timestamp={currentTimestamp}
            timezone={selectedTimezone}
          />
        </section>
        <section className="section">
          <TimestampConverter
            timezone={selectedTimezone}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
