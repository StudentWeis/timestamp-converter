export interface Timezone {
  label: string;
  value: number;
}

export const timezones: Timezone[] = [
  { label: 'UTC-12 贝克岛', value: -12 },
  { label: 'UTC-11 美属萨摩亚', value: -11 },
  { label: 'UTC-10 夏威夷', value: -10 },
  { label: 'UTC-9 阿拉斯加', value: -9 },
  { label: 'UTC-8 洛杉矶', value: -8 },
  { label: 'UTC-7 丹佛', value: -7 },
  { label: 'UTC-6 芝加哥', value: -6 },
  { label: 'UTC-5 纽约', value: -5 },
  { label: 'UTC-4 哈利法克斯', value: -4 },
  { label: 'UTC-3 布宜诺斯艾利斯', value: -3 },
  { label: 'UTC-2 大西洋中部', value: -2 },
  { label: 'UTC-1 亚速尔群岛', value: -1 },
  { label: 'UTC+0 伦敦', value: 0 },
  { label: 'UTC+1 柏林', value: 1 },
  { label: 'UTC+2 开罗', value: 2 },
  { label: 'UTC+3 莫斯科', value: 3 },
  { label: 'UTC+4 迪拜', value: 4 },
  { label: 'UTC+5 卡拉奇', value: 5 },
  { label: 'UTC+6 达卡', value: 6 },
  { label: 'UTC+7 曼谷', value: 7 },
  { label: 'UTC+8 北京', value: 8 },
  { label: 'UTC+9 东京', value: 9 },
  { label: 'UTC+10 悉尼', value: 10 },
  { label: 'UTC+11 努美阿', value: 11 },
  { label: 'UTC+12 奥克兰', value: 12 }
];
