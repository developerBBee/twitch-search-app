const jaFormatter = new Intl.NumberFormat("ja-JP", { useGrouping: true });

export const formatNumber = (num) => {
  if (num == null || isNaN(num)) return num;
  return jaFormatter.format(Number(num));
};
