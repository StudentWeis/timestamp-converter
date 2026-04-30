import React, { useEffect, useState } from 'react';
import {
  TimestampUnit,
  formatTimestamp,
  isValidTimestamp,
  copyToClipboard,
} from '../utils/timestamp';

interface TimestampDisplayProps {
  timestamp: number;
  timezone: number;
  unit: TimestampUnit;
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({
  timestamp,
  timezone,
  unit,
}) => {
  const [copiedItem, setCopiedItem] = useState<'timestamp' | 'datetime' | null>(
    null,
  );

  useEffect(() => {
    if (!copiedItem) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedItem(null);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [copiedItem]);

  const handleCopy = async (text: string, type: 'timestamp' | 'datetime') => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedItem(type);
    }
  };

  if (!isValidTimestamp(timestamp, unit)) {
    return (
      <div className="timestamp-display">
        <div className="timestamp-info">
          <div className="result-text error">时间戳过大或无效，无法显示</div>
        </div>
      </div>
    );
  }

  let formattedDate: string;
  try {
    formattedDate = formatTimestamp(timestamp, unit, timezone);
  } catch {
    return (
      <div className="timestamp-display">
        <div className="timestamp-info">
          <div className="result-text error">时间格式错误</div>
        </div>
      </div>
    );
  }

  return (
    <div className="timestamp-display">
      <div className="timestamp-info">
        <div className="timestamp-row">
          <button
            type="button"
            className={`timestamp-value datetime-display clickable ${copiedItem === 'datetime' ? 'copied' : ''}`}
            onClick={() => handleCopy(formattedDate, 'datetime')}
            title={copiedItem === 'datetime' ? '已复制！' : '点击复制时间'}
            aria-label={`复制格式化时间 ${formattedDate}`}
          >
            {formattedDate}
            {copiedItem === 'datetime' && (
              <span className="copy-indicator">✓</span>
            )}
          </button>
          <button
            type="button"
            className={`timestamp-value accent clickable ${copiedItem === 'timestamp' ? 'copied' : ''}`}
            onClick={() => handleCopy(timestamp.toString(), 'timestamp')}
            title={copiedItem === 'timestamp' ? '已复制！' : '点击复制时间戳'}
            aria-label={`复制时间戳 ${timestamp}`}
          >
            {timestamp}
            {copiedItem === 'timestamp' && (
              <span className="copy-indicator">✓</span>
            )}
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {copiedItem === 'datetime' && '已复制格式化时间'}
          {copiedItem === 'timestamp' && '已复制时间戳'}
        </span>
      </div>
    </div>
  );
};

export default TimestampDisplay;
