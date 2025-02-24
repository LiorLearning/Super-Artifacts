export function getIfColored(i: number, j: number, a: number, b: number, n: number): boolean {
  const ii: number = Math.floor(i / Math.floor(10 / a));
  const jj: number = Math.floor(j / Math.floor(10 / b));
  return b * ii + jj < n;
};

export function formatMessage(template: string, values: object) {
  return new Function(...Object.keys(values), `return \`${template}\`;`)(...Object.values(values));
}

// const result = formatMessage('Sum ${a} and ${b}', { a: 2, b: 3, c: 4 });
// console.log(result); //"Sum 2 and 3"


/*

function (a, b) {
    return `Sum ${a} and ${b}`;
}(2, 3);

*/
