install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js -f json ./__tests__/__fixtures__/before_tree.ini ./__tests__/__fixtures__/after_tree.ini
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm test
