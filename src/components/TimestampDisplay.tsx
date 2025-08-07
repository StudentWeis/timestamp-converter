import React, { useState } from 'react';
import { TimestampUnit, formatTimestamp, isValidTimestamp, copyToClipboard } from '../utils/timestamp';

interface TimestampDisplayProps {
  timestamp: number;
  timezone: number;
  unit: TimestampUnit;
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({ timestamp, timezone, unit }) => {
  const [copiedItem, setCopiedItem] = useState<'timestamp' | 'datetime' | null>(null);

  const handleCopy = async (text: string, type: 'timestamp' | 'datetime') => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  if (!isValidTimestamp(timestamp, unit)) {
    return (
      <div className="timestamp-display">
        <div className="timestamp-info">
          <div className="result-text error">
            时间戳过大或无效，无法显示
          </div>
        </div>
      </div>
    );
  }

  let formattedDate: string;
  try {
    formattedDate = formatTimestamp(timestamp, unit, timezone);
  } catch (error) {
    return (
      <div className="timestamp-display">
        <div className="timestamp-info">
          <div className="result-text error">
            时间格式错误
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="timestamp-display">
      <div className="timestamp-info">
        <div className="timestamp-row">
          <div
            className={`timestamp-value clickable ${copiedItem === 'datetime' ? 'copied' : ''}`}
            onClick={() => handleCopy(formattedDate, 'datetime')}
            title={copiedItem === 'datetime' ? '已复制！' : '点击复制时间'}
          >
            {formattedDate}
            {copiedItem === 'datetime' && <span className="copy-indicator">✓</span>}
          </div>
          <div
            className={`timestamp-value yellow clickable ${copiedItem === 'timestamp' ? 'copied' : ''}`}
            onClick={() => handleCopy(timestamp.toString(), 'timestamp')}
            title={copiedItem === 'timestamp' ? '已复制！' : '点击复制时间戳'}
          >
            {timestamp}
            {copiedItem === 'timestamp' && <span className="copy-indicator">✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampDisplay;
