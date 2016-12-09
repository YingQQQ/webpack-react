const path = require('path')
const ROOT =path.resolve(__dirname,'..');
const Public =path.resolve(ROOT,'public');
const Isomorphic =path.resolve(Public,'assets');
const Build =path.resolve(Public,'build');
const nodeModules =path.resolve(ROOT,'node_modules');
const Client =path.resolve(ROOT,'src','client');
const Server =path.resolve(ROOT,'src','server');
const Style =path.resolve(Client,'static','css');
const APP =path.resolve(ROOT,'src','client.js');
const Views =path.resolve(Server,'views');


const configPath ={
  ROOT:ROOT,
  app:APP,
  client:Client,
  build:Build,
  style:[
    path.resolve(Style,'Main.css')
  ],
  isomorphic:Isomorphic,
  views:Views
}

module.exports= configPath
