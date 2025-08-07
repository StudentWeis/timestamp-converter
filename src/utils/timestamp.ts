// Timestamp utility functions
export type TimestampUnit = 'seconds' | 'milliseconds' | 'microseconds';

// Maximum safe timestamp values for each unit (year 2100)
const MAX_TIMESTAMPS = {
  seconds: 4102444800,
  milliseconds: 4102444800000,
  microseconds: 4102444800000000,
};

/**
 * Validates if a timestamp is within reasonable range
 */
export const isValidTimestamp = (timestamp: number, unit: TimestampUnit): boolean => {
  return (
    Number.isFinite(timestamp) &&
    timestamp >= 0 &&
    timestamp <= MAX_TIMESTAMPS[unit]
  );
};

/**
 * Converts timestamp to UTC milliseconds
 */
export const timestampToUTC = (timestamp: number, unit: TimestampUnit): number => {
  switch (unit) {
    case 'seconds':
      return timestamp * 1000;
    case 'milliseconds':
      return timestamp;
    case 'microseconds':
      return timestamp / 1000;
  }
};

/**
 * Gets current timestamp in specified unit
 */
export const getCurrentTimestamp = (unit: TimestampUnit): number => {
  const now = Date.now();
  switch (unit) {
    case 'seconds':
      return Math.floor(now / 1000);
    case 'milliseconds':
      return now;
    case 'microseconds':
      return now * 1000;
  }
};

/**
 * Formats timestamp to local time string with timezone offset
 */
export const formatTimestamp = (
  timestamp: number,
  unit: TimestampUnit,
  timezoneOffset: number
): string => {
  if (!isValidTimestamp(timestamp, unit)) {
    throw new Error('Invalid timestamp');
  }

  const utcTime = timestampToUTC(timestamp, unit);
  const localTime = utcTime + (timezoneOffset * 60 * 60 * 1000);
  const date = new Date(localTime);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return date.toISOString().slice(0, 19).replace('T', ' ');
};

/**
 * Parses datetime string to timestamp
 */
export const parseDateTime = (
  dateTimeString: string,
  unit: TimestampUnit,
  timezoneOffset: number
): number => {
  const date = new Date(dateTimeString + 'Z');
  const utcTime = date.getTime();
  const localTime = utcTime - (timezoneOffset * 60 * 60 * 1000);

  switch (unit) {
    case 'seconds':
      return Math.floor(localTime / 1000);
    case 'milliseconds':
      return localTime;
    case 'microseconds':
      return localTime * 1000;
  }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};
