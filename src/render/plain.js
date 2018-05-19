import _ from 'lodash';

const getName = (name, path) => (path !== '' ? `${path}.${name}` : name);
const getValue = value =>
  (_.isObject(value) ? 'complex value' : `'${value}'`);

const types = {
  joined: ({ name, children }, path, toString) => {
    const newPath = getName(name, path);
    return toString(children, newPath);
  },
  modified: ({ name, previousValue, currentValue }, path) =>
    `Property '${getName(name, path)}' was updated. From ${getValue(previousValue)} to ${getValue(currentValue)}.`,
  unmodified: () => null,
  added: ({ name, currentValue }, path) =>
    `Property '${getName(name, path)}' was added with ${getValue(currentValue)}.`,
  deleted: ({ name }, path) =>
    `Property '${getName(name, path)}' was removed.`,
};

const toString = (ast, path = '') =>
  ast.map(obj => types[obj.type](obj, path, toString)).filter(x => x).join('\n');

export default ast => toString(ast);
