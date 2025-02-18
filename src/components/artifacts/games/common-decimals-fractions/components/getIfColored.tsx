export function getIfColored(i: number, j: number, a: number, b: number, n: number): boolean {
  const ii: number = Math.floor(i / Math.floor(10 / a));
  const jj: number = Math.floor(j / Math.floor(10 / b));
  return b * ii + jj < n;
};