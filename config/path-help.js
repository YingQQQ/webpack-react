const path = require('path')
const ROOT =path.resolve(__dirname,'..');
const Public =path.resolve(ROOT,'public');
const Isomorphic =path.resolve(ROOT,'public','assets');
const Build =path.resolve(ROOT,'public','build');
const nodeModules =path.resolve(ROOT,'node_modules');
const App =path.resolve(ROOT,'src');
const Style =path.resolve(App,'style');


const configPath ={
  ROOT:ROOT,
  app:App,
  build:Build,
  style:[
    path.resolve(Style,'Main.scss')
  ],
  Isomorphic:Isomorphic
}

module.exports= configPath
