install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js -f plain ./__tests__/__fixtures__/before_tree.json ./__tests__/__fixtures__/after_tree.json
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm test
