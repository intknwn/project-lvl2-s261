const prefix = {
  unmodified: ' ',
  added: '+',
  deleted: '-',
};

const toString = (obj) => {
  const {
    name, type, previousValue, value,
  } = obj;

  if (type === 'modified') {
    return `  + ${name}: ${value}\n  - ${name}: ${previousValue}`;
  }

  return `  ${prefix[type]} ${name}: ${value}`;
};

export default ast => ['{', ...ast.map(toString), '}'].join('\n');
