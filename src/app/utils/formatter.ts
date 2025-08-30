const jaFormatter = new Intl.NumberFormat("ja-JP", { useGrouping: true });

export const formatNumber = (num: number | null | undefined): string => {
  if (num == null || isNaN(num)) return String(num || 0);
  return jaFormatter.format(Number(num));
};
