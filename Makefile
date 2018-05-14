install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js before.json after.json
publish:
	npm publish
lint:
	npm run eslint .
