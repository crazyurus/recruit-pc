import dayjs from 'dayjs';

export function unique(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

export function formatTimestamp(timestamp: number): string {
  return dayjs(timestamp * 1000).format('YYYY-M-D');
}
