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
  joined: ({ name, children }, tab, tabLevel, toString) =>
    `${tab}  ${name}: {\n${toString(children, tabLevel + 1)}\n  ${tab}}`,
  modified: ({ name, currentValue, previousValue }, tab, tabLevel) =>
    [[`${tab}+ ${name}: ${stringify(currentValue, tabLevel)}`], [`${tab}- ${name}: ${stringify(previousValue, tabLevel)}`]],
  unmodified: ({ name, currentValue }, tab, tabLevel) =>
    `${tab}  ${name}: ${stringify(currentValue, tabLevel)}`,
  added: ({ name, currentValue }, tab, tabLevel) =>
    `${tab}+ ${name}: ${stringify(currentValue, tabLevel)}`,
  deleted: ({ name, currentValue }, tab, tabLevel) =>
    `${tab}- ${name}: ${stringify(currentValue, tabLevel)}`,
};

const toString = (ast, tabLevel) => {
  const tab = makeTab(tabLevel);
  return _.flatten(ast.map(obj => types[obj.type](obj, tab, tabLevel, toString))).join('\n');
};

export default ast => `{\n${toString(ast, 1)}\n}`;
