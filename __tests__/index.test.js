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

  it('should work 3', () => {
    const data = getDiff(getFixturePath('before.ini'), getFixturePath('after.ini'));
    const result = fs.readFileSync(getFixturePath('result'), 'utf8');
    expect(data).toEqual(result);
  });

  it('should work 4', () => {
    const data = getDiff(getFixturePath('before_tree.json'), getFixturePath('after_tree.json'));
    const resultTree = fs.readFileSync(getFixturePath('result_tree'), 'utf8');
    expect(data).toEqual(resultTree);
  });

  it('should work 5', () => {
    const data = getDiff(getFixturePath('before_tree.yml'), getFixturePath('after_tree.yml'));
    const resultTree = fs.readFileSync(getFixturePath('result_tree'), 'utf8');
    expect(data).toEqual(resultTree);
  });

  it('should work 6', () => {
    const data = getDiff(getFixturePath('before_tree.ini'), getFixturePath('after_tree.ini'));
    const resultTree = fs.readFileSync(getFixturePath('result_tree'), 'utf8');
    expect(data).toEqual(resultTree);
  });

  it('should work 7', () => {
    const data = getDiff(getFixturePath('before_tree.ini'), getFixturePath('after_tree.ini'), 'plain');
    const resultPlain = fs.readFileSync(getFixturePath('result_plain'), 'utf8');
    expect(data).toEqual(resultPlain);
  });

  it('should work 8', () => {
    const data = getDiff(getFixturePath('before_tree.ini'), getFixturePath('after_tree.ini'), 'json');
    const resultPlain = fs.readFileSync(getFixturePath('result_json'), 'utf8');
    expect(data).toEqual(resultPlain);
  });

  it("shouldn't work 1", () => {
    function getError() {
      getDiff(getFixturePath('non-existent-before-file'), getFixturePath('after.json'));
    }
    expect(getError).toThrowError('ENOENT');
  });

  it("shouldn't work 2", () => {
    function getError() {
      getDiff(getFixturePath('before.json'), getFixturePath('non-existent-after-file'));
    }
    expect(getError).toThrowError('ENOENT');
  });
});
