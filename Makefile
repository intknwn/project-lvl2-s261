install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js before.yml after.yml
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm test
