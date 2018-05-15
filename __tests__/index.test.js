import path from 'path';
import fs from 'fs';

import diff from '../src/';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

describe('Diff', () => {
  it('should work', () => {
    const data = diff(getFixturePath('before.json'), getFixturePath('after.json'));
    const result = fs.readFileSync(getFixturePath('result'), 'utf8');
    expect(data).toEqual(result);
  });

  it('shouldn\'t work 1', () => {
    const data = diff(getFixturePath('non-existent-file'), getFixturePath('after.json'));
    expect(data).toEqual(undefined);
  });

  it('shouldn\'t work 2', () => {
    const data = diff(getFixturePath('before.json'), getFixturePath('non-existent-file'));
    expect(data).toEqual(undefined);
  });
});
