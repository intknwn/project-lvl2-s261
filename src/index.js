import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';

const diffs = [
  {
    type: 'unmodified',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    render: (obj1, obj2, key) => `    ${key}: ${obj1[key]}`,
  },
  {
    type: 'modified',
    check: (obj1, obj2, key) => obj1[key] && obj2[key] && obj1[key] !== obj2[key],
    render: (obj1, obj2, key) => `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`,
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => !_.has(obj2, key),
    render: (obj1, obj2, key) => `  - ${key}: ${obj1[key]}`,
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key),
    render: (obj1, obj2, key) => `  + ${key}: ${obj2[key]}`,
  },
];

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

const getParser = ext => parsers[ext];

const getData = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    return undefined;
  }
};

const makeDiffsArr = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys.map((key) => {
    const { render } = _.find(diffs, ({ check }) => check(obj1, obj2, key));
    return render(obj1, obj2, key);
  });
};

export default (firstConfig, secondConfig) => {
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  if (!data1 || !data2) {
    return undefined;
  }
  const ext1 = path.extname(firstConfig);
  const ext2 = path.extname(secondConfig);
  const obj1 = getParser(ext1)(data1);
  const obj2 = getParser(ext2)(data2);

  return `{\n${makeDiffsArr(obj1, obj2).join('\n')}\n}`;
};

