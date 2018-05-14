import fs from 'fs';
import path from 'path';

export default (path1, path2) => {
  const currentDir = process.cwd();
  const file1 = fs.readFileSync(path.join(currentDir, path1), 'utf8');
  const file2 = fs.readFileSync(path.join(currentDir, path2), 'utf8');
  console.log(`${file1}${file2}`);
};
