export const formatOrderIndex = (index: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = index % 100;
  const suffix =
    suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  return `${index}${suffix}`;
};