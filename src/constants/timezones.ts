export interface Timezone {
  label: string;
  value: number;
}

export const timezones: Timezone[] = [
  { label: 'UTC-12', value: -12 },
  { label: 'UTC-11', value: -11 },
  { label: 'UTC-10', value: -10 },
  { label: 'UTC-9', value: -9 },
  { label: 'UTC-8 (PST)', value: -8 },
  { label: 'UTC-7 (MST)', value: -7 },
  { label: 'UTC-6 (CST)', value: -6 },
  { label: 'UTC-5 (EST)', value: -5 },
  { label: 'UTC-4', value: -4 },
  { label: 'UTC-3', value: -3 },
  { label: 'UTC-2', value: -2 },
  { label: 'UTC-1', value: -1 },
  { label: 'UTC+0 (GMT)', value: 0 },
  { label: 'UTC+1 (CET)', value: 1 },
  { label: 'UTC+2', value: 2 },
  { label: 'UTC+3', value: 3 },
  { label: 'UTC+4', value: 4 },
  { label: 'UTC+5', value: 5 },
  { label: 'UTC+6', value: 6 },
  { label: 'UTC+7', value: 7 },
  { label: 'UTC+8 (CST)', value: 8 },
  { label: 'UTC+9 (JST)', value: 9 },
  { label: 'UTC+10', value: 10 },
  { label: 'UTC+11', value: 11 },
  { label: 'UTC+12', value: 12 }
];
