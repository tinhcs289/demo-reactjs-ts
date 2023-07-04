export default function getFileSizeWithUnit(size: number): string {
  const UNIT = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (size > 900) {
    size /= 1024;
    i++;
  }
  const sizeText = `${Math.round(size * 100) / 100} ${UNIT[i]}`;
  return sizeText;
}
