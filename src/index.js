import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

import render from './render';

const diffs = [
  {
    type: 'unmodified',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    generate: (obj1, obj2, key) => ({
      name: key,
      type: 'unmodified',
      currentValue: obj2[key],
    }),
  },
  {
    type: 'joined',
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    generate: (obj1, obj2, key, get) => ({
      name: key,
      type: 'joined',
      children: get(obj1[key], obj2[key]),
    }),
  },
  {
    type: 'modified',
    check: (obj1, obj2, key) => obj1[key] && obj2[key] && obj1[key] !== obj2[key],
    generate: (obj1, obj2, key) => ({
      name: key,
      type: 'modified',
      previousValue: obj1[key],
      currentValue: obj2[key],
    }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => !_.has(obj2, key),
    generate: (obj1, obj2, key) => ({
      name: key,
      type: 'deleted',
      currentValue: obj1[key],
    }),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key),
    generate: (obj1, obj2, key) => ({
      name: key,
      type: 'added',
      currentValue: obj2[key],
    }),
  },
];

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParser = ext => parsers[ext];

const getAST = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys.map((key) => {
    const { generate } = _.find(diffs, ({ check }) => check(obj1, obj2, key));
    return generate(obj1, obj2, key, getAST);
  });
};

export default (firstConfig, secondConfig) => {
  const data1 = fs.readFileSync(firstConfig, 'utf8');
  const data2 = fs.readFileSync(secondConfig, 'utf8');
  const ext1 = path.extname(firstConfig);
  const ext2 = path.extname(secondConfig);
  const obj1 = getParser(ext1)(data1);
  const obj2 = getParser(ext2)(data2);

  const ast = getAST(obj1, obj2);

  return render(ast);
};

