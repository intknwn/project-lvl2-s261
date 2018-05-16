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
      value: obj2[key],
    }),
  },
  {
    type: 'modified',
    check: (obj1, obj2, key) => obj1[key] && obj2[key] && obj1[key] !== obj2[key],
    generate: (obj1, obj2, key) => ({
      name: key,
      type: 'modified',
      previousValue: obj1[key],
      value: obj2[key],
    }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => !_.has(obj2, key),
    generate: (obj1, obj2, key) => ({
      name: key,
      type: 'deleted',
      value: obj1[key],
    }),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key),
    generate: (obj1, obj2, key) => ({
      name: key,
      type: 'added',
      value: obj2[key],
    }),
  },
];

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParser = ext => parsers[ext];

const getData = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    throw new Error(`${filePath}: No such file.`);
  }
};

const getAST = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys.map((key) => {
    const { generate } = _.find(diffs, ({ check }) => check(obj1, obj2, key));
    return generate(obj1, obj2, key);
  });
};

export default (firstConfig, secondConfig) => {
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  const ext1 = path.extname(firstConfig);
  const ext2 = path.extname(secondConfig);
  const obj1 = getParser(ext1)(data1);
  const obj2 = getParser(ext2)(data2);

  const ast = getAST(obj1, obj2);

  return render(ast);
};

