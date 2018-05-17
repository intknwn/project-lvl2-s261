import _ from 'lodash';

const makeTab = times => '  '.repeat(times);

const stringify = (obj, tabLevel) => {
  if (!_.isObject(obj)) {
    return obj;
  }

  const tab = makeTab(tabLevel + 1);
  const arr = _.keys(obj).map(key => `${tab}  ${key}: ${obj[key]}`);

  return `{\n${arr.join('\n')}\n${tab}}`;
};

const types = {
  joined: ({ name, children }, tab, tabLevel, f) =>
    `${tab}  ${name}: {\n${children.map(o => f(o, tabLevel + 1)).join('\n')}\n  ${tab}}`,
  modified: ({ name, currentValue, previousValue }, tab, tabLevel) =>
    `${tab}+ ${name}: ${stringify(currentValue, tabLevel)}\n${tab}- ${name}: ${stringify(previousValue, tabLevel)}`,
  unmodified: ({ name, currentValue }, tab, tabLevel) =>
    `${tab}  ${name}: ${stringify(currentValue, tabLevel)}`,
  added: ({ name, currentValue }, tab, tabLevel) =>
    `${tab}+ ${name}: ${stringify(currentValue, tabLevel)}`,
  deleted: ({ name, currentValue }, tab, tabLevel) =>
    `${tab}- ${name}: ${stringify(currentValue, tabLevel)}`,
};

const toString = (obj, tabLevel) => {
  const tab = makeTab(tabLevel);
  return types[obj.type](obj, tab, tabLevel, toString);
};

export default ast => `{\n${ast.map(o => toString(o, 1)).join('\n')}\n}`;
