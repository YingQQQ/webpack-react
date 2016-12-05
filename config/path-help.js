const path = require('path');
const Root = path.resolve(__dirname)
const app = path.resolve(Root,'src','index')
const build = path.resolve(Root,'Build')
console.log(Root);

const configPath = {
	app,
	build
}
modules.export= configPath