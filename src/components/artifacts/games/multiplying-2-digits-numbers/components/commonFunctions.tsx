export function formatMessage(template: string, values: object) {
  return new Function(...Object.keys(values), `return \`${template}\`;`)(...Object.values(values));
}
