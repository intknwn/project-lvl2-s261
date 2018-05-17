import path from 'path';
import fs from 'fs';

import getDiff from '../src/';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);
const result = fs.readFileSync(getFixturePath('result'), 'utf8');
const resultTree = fs.readFileSync(getFixturePath('result_tree'), 'utf8');

describe('Diff', () => {
  it('should work 1', () => {
    const data = getDiff(getFixturePath('before.json'), getFixturePath('after.json'));
    expect(data).toEqual(result);
  });

  it('should work 2', () => {
    const data = getDiff(getFixturePath('before.yml'), getFixturePath('after.yml'));
    expect(data).toEqual(result);
  });

  it('should work 3', () => {
    const data = getDiff(getFixturePath('before.ini'), getFixturePath('after.ini'));
    expect(data).toEqual(result);
  });

  it('should work 4', () => {
    const data = getDiff(getFixturePath('before_tree.json'), getFixturePath('after_tree.json'));
    expect(data).toEqual(resultTree);
  });

  it('should work 5', () => {
    const data = getDiff(getFixturePath('before_tree.yml'), getFixturePath('after_tree.yml'));
    expect(data).toEqual(resultTree);
  });

  it('should work 6', () => {
    const data = getDiff(getFixturePath('before_tree.ini'), getFixturePath('after_tree.ini'));
    expect(data).toEqual(resultTree);
  });

  it("shouldn't work 1", () => {
    function getError() {
      getDiff(getFixturePath('non-existent-before-file'), getFixturePath('after.json'));
    }
    expect(getError).toThrowError('No such file.');
  });

  it("shouldn't work 2", () => {
    function getError() {
      getDiff(getFixturePath('before.json'), getFixturePath('non-existent-after-file'));
    }
    expect(getError).toThrowError('No such file.');
  });
});
