import path from 'path';
import fs from 'fs';

import getDiff from '../src/';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

describe('Diff', () => {
  it('should work 1', () => {
    const data = getDiff(getFixturePath('before.json'), getFixturePath('after.json'));
    const result = fs.readFileSync(getFixturePath('result'), 'utf8');
    expect(data).toEqual(result);
  });

  it('should work 2', () => {
    const data = getDiff(getFixturePath('before.yml'), getFixturePath('after.yml'));
    const result = fs.readFileSync(getFixturePath('result'), 'utf8');
    expect(data).toEqual(result);
  });

  it("shouldn't work 1", () => {
    const data = getDiff(getFixturePath('non-existent-file'), getFixturePath('after.json'));
    expect(data).toBeUndefined();
  });

  it("shouldn't work 2", () => {
    const data = getDiff(getFixturePath('before.json'), getFixturePath('non-existent-file'));
    expect(data).toBeUndefined();
  });
});
