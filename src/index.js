import fs from 'fs';
import _ from 'lodash';

const getObject = (filePath) => {
  let contents;
  try {
    contents = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    return undefined;
  }

  return JSON.parse(contents);
};

export default (firstConfig, secondConfig) => {
  const config1 = getObject(firstConfig);
  const config2 = getObject(secondConfig);
  if (!config1 || !config2) {
    return undefined;
  }

  const shared = _.intersection(_.keys(config1), _.keys(config2));
  const deleted = _.difference(_.keys(config1), _.keys(config2));
  const added = _.difference(_.keys(config2), _.keys(config1));

  const sharedStr = shared.reduce((acc, key) => {
    if (config1[key] !== config2[key]) {
      return [...acc, `  + ${key}: ${config2[key]}`, `  - ${key}: ${config1[key]}`];
    }

    return [...acc, `    ${key}: ${config1[key]}`];
  }, []);
  const deletedStr = deleted.map(key => `  - ${key}: ${config1[key]}`);
  const addedStr = added.map(key => `  + ${key}: ${config2[key]}`);

  return `{\n${[...sharedStr, ...deletedStr, ...addedStr].join('\n')}\n}`;
};

