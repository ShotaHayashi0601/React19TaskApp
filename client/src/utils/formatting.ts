import { format, isAfter, parseISO, startOfDay } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
export function formatDateTime(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm');
}
export function isOverDate(targetDate?: string): boolean {
  if (!targetDate) return false;
  const today = startOfDay(new Date()); // 今日の日付を00:00に設定
  const due = startOfDay(parseISO(targetDate)); // ISO形式の文字列をDateに変換し00:00に設定
  return isAfter(today, due); // 今日 > 期限ならtrue
}
