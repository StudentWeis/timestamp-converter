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
 * Converts UTC milliseconds to the specified timestamp unit
 */
export const utcMillisecondsToTimestamp = (
  utcMilliseconds: number,
  unit: TimestampUnit
): number => {
  switch (unit) {
    case 'seconds':
      return Math.floor(utcMilliseconds / 1000);
    case 'milliseconds':
      return utcMilliseconds;
    case 'microseconds':
      return utcMilliseconds * 1000;
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
  const trimmedValue = dateTimeString.trim();
  const match = trimmedValue.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/);

  if (!match) {
    throw new Error('Invalid date format');
  }

  const [, yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const hour = Number(hourValue);
  const minute = Number(minuteValue);
  const second = Number(secondValue);

  const localReference = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  if (
    Number.isNaN(localReference.getTime()) ||
    localReference.getUTCFullYear() !== year ||
    localReference.getUTCMonth() !== month - 1 ||
    localReference.getUTCDate() !== day ||
    localReference.getUTCHours() !== hour ||
    localReference.getUTCMinutes() !== minute ||
    localReference.getUTCSeconds() !== second
  ) {
    throw new Error('Invalid date');
  }

  const utcMilliseconds = localReference.getTime() - (timezoneOffset * 60 * 60 * 1000);

  return utcMillisecondsToTimestamp(utcMilliseconds, unit);
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
