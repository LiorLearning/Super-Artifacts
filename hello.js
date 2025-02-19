function formatMessage(template, values) {
  return new Function(...Object.keys(values), `return \`${template}\`;`)(...Object.values(values));
}

const result = formatMessage('Sum ${a} and ${b}', { a: 2, b: 3, c: 4 });
console.log(result); //"Sum 2 and 3"