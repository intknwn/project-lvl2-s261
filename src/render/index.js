import tree from './tree';
import plain from './plain';

const renders = {
  tree,
  plain,
};

export default type => ({ toString: renders[type], options: renders });
