import _ from 'lodash';

const prefix = {
  joined: ' ',
  unmodified: ' ',
  added: '+',
  deleted: '-',
};

const makeIndent = times => '  '.repeat(times);

const stringify = (obj, level) => {
  if (!_.isObject(obj)) {
    return obj;
  }

  const i = makeIndent(level + 1);
  const arr = _.keys(obj).map(key => `${i}  ${key}: ${obj[key]}`);

  return `{\n${arr.join('\n')}\n${i}}`;
};

const toString = (obj, level) => {
  const {
    name, type, previousValue, currentValue, children,
  } = obj;

  const i = makeIndent(level);

  if (children) {
    return `${i}${prefix[type]} ${name}: {\n${children.map(o => toString(o, level + 1)).join('\n')}\n  ${i}}`;
  }

  if (type === 'modified') {
    return `${i}+ ${name}: ${stringify(currentValue, level)}\n${i}- ${name}: ${stringify(previousValue, level)}`;
  }

  return `${i}${prefix[type]} ${name}: ${stringify(currentValue, level)}`;
};

export default ast => `{\n${ast.map(o => toString(o, 1)).join('\n')}\n}`;
